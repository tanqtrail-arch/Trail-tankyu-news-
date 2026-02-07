# TRAIL探究ニュース 記事更新ガイド

## 📁 ファイル構成

```
trail-tankyu-news/
├── index.html        ← サイト本体（触らなくてOK）
├── articles.json     ← 記事データ（ここだけ編集）
└── README.md
```

## ✏️ 記事を追加する手順（3ステップ）

### Step 1: articles.json を開く
GitHubのリポジトリで `articles.json` をクリック → 鉛筆アイコン（Edit）

### Step 2: 最後の `}` の後にカンマを追加し、新しい記事を貼り付ける

```json
  },     ← 既存の最後の記事の閉じカッコにカンマがあることを確認
  {      ← ここから新しい記事
    "id": 901,
    "date": "2026年2月8日",
    "dateKey": "0208",
    "category": "tankyu",
    "heroEmoji": "🔍",
    "title": "ここにタイトル",
    "summary": "ここに要約（50〜80字）",
    "tags": ["タグ1", "タグ2", "タグ3"],
    "body": [
      { "type": "text", "content": "本文テキスト" },
      { "type": "heading", "content": "見出し" },
      { "type": "text", "content": "続きのテキスト" }
    ],
    "tankyuPoint": "探究ポイント（子ども向け）",
    "oyakoTalk": "親子トーク（保護者向け）"
  }
]        ← 配列の閉じカッコ（最後の記事の後にはカンマ不要）
```

### Step 3: 「Commit changes」を押す
→ 数秒でサイトに反映！

---

## 📝 記事テンプレート（コピペ用）

### 基本テンプレート
```json
  {
    "id": 000,
    "date": "2026年2月○日",
    "dateKey": "02○○",
    "category": "tankyu",
    "heroEmoji": "🔍",
    "title": "",
    "summary": "",
    "tags": [],
    "body": [
      { "type": "text", "content": "" },
      { "type": "heading", "content": "" },
      { "type": "text", "content": "" }
    ],
    "tankyuPoint": "",
    "oyakoTalk": ""
  }
```

---

## 🧱 使えるブロックタイプ一覧

### テキスト（基本）
```json
{ "type": "text", "content": "本文テキスト" }
```

### 見出し
```json
{ "type": "heading", "content": "見出しテキスト" }
```

### 横棒グラフ 📊
```json
{
  "type": "chart",
  "title": "グラフタイトル",
  "unit": "倍",
  "data": [
    { "label": "項目A", "value": 80 },
    { "label": "項目B", "value": 60 },
    { "label": "項目C", "value": 95, "color": "#E8453C" }
  ],
  "source": "出典元"
}
```

### 数字カード 📈
```json
{
  "type": "stat",
  "items": [
    { "value": "49%", "label": "説明ラベル" },
    { "value": "12.4万人", "label": "説明ラベル" },
    { "value": "3倍", "label": "説明ラベル" }
  ]
}
```

### 引用 💬
```json
{
  "type": "quote",
  "content": "引用テキスト",
  "source": "出典元（任意）"
}
```

### コールアウト（注目ボックス） 📌
```json
{
  "type": "callout",
  "style": "info",
  "title": "💡 タイトル",
  "content": "本文テキスト"
}
```
styleの種類: `"info"`(青), `"warning"`(黄), `"success"`(緑), `"pink"`(ピンク)

### テーブル
```json
{
  "type": "table",
  "title": "表タイトル",
  "headers": ["列1", "列2", "列3"],
  "rows": [
    ["データA", "データB", "データC"],
    ["データD", "データE", "データF"]
  ]
}
```

### リスト
```json
{
  "type": "list",
  "items": ["項目1", "項目2", "項目3"]
}
```

---

## 🏷️ カテゴリ一覧

| category値 | 表示名 | 使い分け |
|-----------|--------|---------|
| `juken`   | 🎯 中学受験 | 入試速報、倍率、併願戦略 |
| `school`  | 🏫 注目校 | 学校紹介、共学化、新設校 |
| `tankyu`  | 🔬 探究 | 探究学習、思考力、記述力 |
| `ai`      | 🤖 AI×教育 | AI教育、プログラミング |
| `oyako`   | 👨‍👩‍👧 親子 | メンタル、声かけ、キャリア |

---

## 📅 dateKey のルール
- 2月1日 → `"0201"`
- 2月15日 → `"0215"`
- カレンダーフィルターに使われます

## 🔢 id のルール
- 100番台: 2/1記事、200番台: 2/2記事、...
- 新しい日付は 900番台〜 を使う
- 重複しなければOK

---

## ⚠️ よくあるミス

1. **カンマ忘れ** — 記事と記事の間には `,` が必要
2. **最後のカンマ** — 配列の最後の記事の後にはカンマ不要
3. **引用符の閉じ忘れ** — `"` は必ずペアで
4. **JSONでは `'` ではなく `"` を使う**（シングルクォートNG）

GitHubの編集画面でエラーが出たら、[JSONLint](https://jsonlint.com/) に貼り付けてチェックすると原因が分かります。
