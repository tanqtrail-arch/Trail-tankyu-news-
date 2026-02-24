const fs = require('fs');
const data = JSON.parse(fs.readFileSync('articles.json', 'utf8'));

console.log('Total articles:', data.length);

const missing = data.filter(a => !a.publishDate);
console.log('Missing publishDate count:', missing.length);
missing.forEach(a => console.log('  id:', a.id, 'date:', a.date));

const withDate = data.filter(a => a.publishDate);
const months = [...new Set(withDate.map(a => a.publishDate.slice(0, 7)))].sort();
console.log('Unique months:', months);
months.forEach(m => {
  const count = withDate.filter(a => a.publishDate.slice(0, 7) === m).length;
  console.log(`  ${m}: ${count} articles`);
});
