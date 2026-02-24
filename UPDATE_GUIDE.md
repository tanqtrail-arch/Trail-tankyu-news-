# 記事更新ガイド

## 記事の追加方法

### 1. 記事を生成する
ClaudeまたはClaude Codeで、カテゴリごとに記事を生成する。

### 2. 月別ファイルに追加する
生成された記事JSONを `articles/YYYY-MM.json` に追加する。

例：2026年3月の記事 → `articles/2026-03.json`

- ファイルが存在しない月は、新規作成する（配列 `[]` の中に記事を入れる）
- 記事はpublishDateの降順（新しい順）で並べる

### 3. index.json を更新する
`index.json` の配列の先頭に、新しい記事のメタデータを追加する。

追加するフィールド：
- id, date, dateKey, category, heroEmoji, title, summary, tags, file, publishDate
- ※ body, tankyuPoint, oyakoTalk は含めない

### 4. コミット＆プッシュ
```
git add articles/YYYY-MM.json index.json
git commit -m "記事追加: YYYY-MM-DD"
git push
```

### スマホから更新する場合
1. Claudeチャットで記事を生成してもらう
2. GitHubのブラウザで `articles/YYYY-MM.json` を編集
3. GitHubのブラウザで `index.json` を編集
4. それぞれCommit changesする

## ファイル構成
- `index.json` — 全記事のメタデータ一覧（軽量）
- `articles/YYYY-MM.json` — 月別の記事全文
- `index.html` — フロントエンド
