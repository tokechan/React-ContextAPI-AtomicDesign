# React × Laravel デモアプリケーション

フロントエンド（React + Vite）とバックエンド（Laravel 11 API）をまとめて検証。
Docker Compose でバックエンドを立ち上げつつ、フロントエンドは Node.js で起動します。単体の起動手順も用意しているので、Docker を使わない検証も可能。

## プロジェクト構成

```
React-Router-demo/
├── frontend/                    # React TypeScript アプリ
│   ├── public/                  # 静的ファイル
│   ├── src/
│   │   ├── api/                 # Axios クライアント
│   │   ├── components/
│   │   │   ├── atoms/           # Atomic Design: atoms
│   │   │   ├── molecules/       # Atomic Design: molecules
│   │   │   └── organisms/       # Atomic Design: organisms
│   │   ├── context/             # Auth/Memo コンテキスト
│   │   ├── hooks/               # カスタムフック
│   │   ├── pages/               # 画面コンポーネント
│   │   ├── schemas/             # Zod スキーマ
│   │   ├── services/            # 認証サービスなど
│   │   ├── types.ts             # 型定義
│   │   ├── App.tsx              # ルートコンポーネント
│   │   └── main.tsx             # エントリーポイント
│   ├── vite.config.ts           # Vite 設定
│   ├── eslint.config.js         # ESLint (Flat Config)
│   ├── .prettierrc.json / .prettierignore
│   └── package.json             # 依存関係
├── backend/                     # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/    # API コントローラー (Memo/Auth)
│   │   └── Models/              # モデル (Memo, User)
│   ├── config/                  # 設定ファイル
│   ├── database/                # マイグレーション / シーダー
│   ├── docker/                  # Nginx 設定
│   ├── routes/                  # api.php など
│   ├── docker-compose.yml       # バックエンド用 Docker Compose
│   └── composer.json            # PHP 依存関係
└── .github/workflows/
    ├── lint.yml                 # ESLint & Prettier チェック
    └── deploy-pages.yml         # Cloudflare Pages 用デプロイ
```

## ローカルセットアップ

### 前提条件
- Docker / Docker Compose
- Node.js / npm

### バックエンド

```bash
git clone <repository>
cd React-Router-demo/backend
composer install
cp .env.example .env
php artisan key:generate
docker compose up -d
docker compose exec app php artisan migrate
docker compose exec app php artisan db:seed    # テストユーザー投入（任意）
```

### フロントエンド

```bash
cd ../frontend
npm install
cp .env.example .env
npm run dev

# スタイルチェック
npm run lint
npm run format:check
```

DB をリセットする場合は `docker compose exec app php artisan migrate:fresh --seed` を使用してください。

## 動作確認ユーザー

シーディングすると以下のユーザーが作成されます。

- メールアドレス: `test@example.com`
- パスワード: `password`

## 品質チェックと CI

- `npm run lint`（ESLint）と `npm run format:check`（Prettier）でローカル確認が可能。
- `.github/workflows/lint.yml` で PR / push 時に自動チェック。違反がある場合は CI が失敗します。

## Cloudflare Pages への自動デプロイ

- `.github/workflows/deploy-pages.yml` により、`main` ブランチへの push または手動実行で Cloudflare Pages へビルド＆デプロイします。
- GitHub リポジトリに以下のシークレットを登録してください。  
  - `CLOUDFLARE_ACCOUNT_ID`  
  - `CLOUDFLARE_API_TOKEN`（Pages:Edit 権限付き）  
  - `CLOUDFLARE_PAGES_PROJECT_NAME`
- Cloudflare Pages ダッシュボードの「Settings > Environment Variables」で `VITE_API_BASE_URL` などの環境変数を設定します（Preview / Production 個別設定が可能）。
- ワークフロー内では `npm run ci:lint` → `npm run build` → `frontend/dist` をアップロードするため、Lint/Prettier を通過しないコードはデプロイされません。
