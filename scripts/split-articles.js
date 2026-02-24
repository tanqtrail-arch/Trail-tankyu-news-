const fs = require('fs');
const path = require('path');

// === 読み込み ===
const articles = JSON.parse(fs.readFileSync('articles.json', 'utf8'));
const totalCount = articles.length;

// === publishDateがない記事にはdateフィールドから生成する ===
// dateフィールドの形式: "2026年2月20日" → "2026-02-20"
function parseDateToPublishDate(dateStr) {
  const match = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!match) return null;
  const [, year, month, day] = match;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

let fixedCount = 0;
articles.forEach(article => {
  if (!article.publishDate) {
    const generated = parseDateToPublishDate(article.date);
    if (generated) {
      article.publishDate = generated;
      fixedCount++;
    } else {
      console.error(`ERROR: Cannot parse date for article id=${article.id}, date="${article.date}"`);
      process.exit(1);
    }
  }
});

if (fixedCount > 0) {
  console.log(`publishDateを${fixedCount}件の記事に補完しました`);
}

// === 月ごとにグループ化 ===
const monthGroups = {};
articles.forEach(article => {
  const yearMonth = article.publishDate.slice(0, 7); // "YYYY-MM"
  if (!monthGroups[yearMonth]) {
    monthGroups[yearMonth] = [];
  }
  monthGroups[yearMonth].push(article);
});

// === 各月のファイルをpublishDate降順でソートして保存 ===
const articlesDir = path.join('.', 'articles');
if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir, { recursive: true });
}

const sortedMonths = Object.keys(monthGroups).sort().reverse();
sortedMonths.forEach(month => {
  monthGroups[month].sort((a, b) => {
    // publishDate降順、同日ならid降順
    if (a.publishDate !== b.publishDate) {
      return b.publishDate.localeCompare(a.publishDate);
    }
    return b.id - a.id;
  });

  const filePath = path.join(articlesDir, `${month}.json`);
  fs.writeFileSync(filePath, JSON.stringify(monthGroups[month], null, 2), 'utf8');
});

// === index.json を作成（body, tankyuPoint, oyakoTalk を除外）===
const indexEntries = articles
  .map(article => {
    const yearMonth = article.publishDate.slice(0, 7);
    return {
      id: article.id,
      date: article.date,
      dateKey: article.dateKey,
      category: article.category,
      heroEmoji: article.heroEmoji,
      title: article.title,
      summary: article.summary,
      tags: article.tags,
      file: `articles/${yearMonth}.json`,
      publishDate: article.publishDate
    };
  })
  .sort((a, b) => b.id - a.id); // id降順

fs.writeFileSync('index.json', JSON.stringify(indexEntries, null, 2), 'utf8');

// === 結果出力 ===
console.log('');
console.log('=== 分割結果 ===');
console.log(`元の記事数: ${totalCount}件`);
console.log(`分割ファイル数: ${sortedMonths.length}個`);
console.log(`index.json の記事数: ${indexEntries.length}件`);
console.log('各ファイルの記事数:');
sortedMonths.forEach(month => {
  console.log(`  articles/${month}.json: ${monthGroups[month].length}件`);
});

if (totalCount === indexEntries.length) {
  console.log('✅ 元の記事数とindex.jsonの記事数が一致');
} else {
  console.log('❌ 記事数が不一致！');
  process.exit(1);
}
