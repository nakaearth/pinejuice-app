# Pinejuice Frontend

Next.jsで構築されたチケット管理システムのフロントエンドアプリケーションです。

## 機能

- チケット一覧表示
- チケット作成
- チケット詳細表示

## セットアップ

### 必要な環境

- Node.js 18以上
- npm または yarn

### インストール

```bash
# nvmをダウンロードしてインストールする：
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
# シェルを再起動する代わりに実行する
\. "$HOME/.nvm/nvm.sh"
# Node.jsをダウンロードしてインストールする：
nvm install 24
# Node.jsのバージョンを確認する：
node -v # "v24.14.0"が表示される。
# npmのバージョンを確認する：
npm -v 

cd frontend
npm install
```

### 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Rails APIが別のポートで動作している場合は、適切なURLに変更してください。

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3001](http://localhost:3001) を開いてください。

## プロジェクト構造

```
frontend/
├── app/                    # Next.js App Router
│   ├── tickets/           # チケット関連ページ
│   │   ├── page.tsx       # 一覧ページ
│   │   ├── new/           # 作成ページ
│   │   └── [id]/          # 詳細ページ
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   └── globals.css        # グローバルスタイル
├── lib/                    # ユーティリティ
│   └── api.ts             # APIクライアント
├── types/                  # TypeScript型定義
│   └── ticket.ts          # チケット型
└── package.json
```

## APIエンドポイント

フロントエンドは以下のRails APIエンドポイントを使用します：

- `GET /api/tickets` - チケット一覧取得
- `GET /api/tickets/:id` - チケット詳細取得
- `POST /api/tickets` - チケット作成

## ビルド

```bash
npm run build
npm start
```
