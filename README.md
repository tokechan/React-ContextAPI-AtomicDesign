# 夫婦共有メモアプリ

夫婦間で共有できるシンプルなメモアプリケーションです。「メモっとくね」や「ちゃんとやった？」などのステータスを持つメモを管理できます。

## 概要

このアプリケーションは、夫婦間でタスクやメモを共有するためのプラットフォームを提供します。
これを使って、コミュニケーションロスにより起こる変な気持ちのすれ違いを解消したい！と思って作ってみました。
暖かみがありながらもクールな印象のデザインと使いやすいインターフェースで、日常生活の小さなタスクを管理することができます。

### 主な機能

- メモの作成、表示、編集、削除
- メモのステータス管理（「メモっとくね」「ちゃんとやった？」）
- 作成者の記録（夫/妻）
- 完了状態の管理

## 技術スタック

### バックエンド
- **フレームワーク**: Laravel 11
- **データベース**: MySQL 8.0
- **コンテナ化**: Docker & Docker Compose
- **Web サーバー**: Nginx
- **データベース管理**: Adminer

### フロントエンド
- **フレームワーク**: React
- **HTTP クライアント**: Axios
- **スタイリング**: CSS（明るいオレンジ #f39c12 をアクセントカラーとして使用）

## セットアップ方法

### 前提条件
- Docker と Docker Compose がインストールされていること
- Node.js と npm がインストールされていること

### バックエンドのセットアップ

1. リポジトリをクローン
   ```bash
   git clone <リポジトリURL>
   cd React-Router-demo
   ```

2. バックエンドディレクトリに移動し依存関係をインストール
   ```bash
   cd backend
   composer install
   ```

3. 環境変数ファイルを作成してアプリキーを生成
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Docker コンテナを起動  
   ※ Intel/AMD 環境ではそのまま、Apple Silicon では `docker-compose.yml` の `platform` 行をコメント解除してください。
   ```bash
   docker-compose up -d
   ```

5. マイグレーションを実行
   ```bash
   docker-compose exec app php artisan migrate
   ```

6. （任意）シーディングでテストユーザーを登録
   ```bash
   docker-compose exec app php artisan db:seed
   ```

### フロントエンドのセットアップ

1. フロントエンドディレクトリに移動
   ```bash
   cd ../frontend
   ```

2. 依存関係をインストール
   ```bash
   npm install
   ```

3. 環境変数ファイルを作成
   ```bash
   cp .env.example .env
   ```

4. 開発サーバーを起動
   ```bash
   npm run dev
   ```

5. コード品質チェック（任意）
   ```bash
   npm run lint          # ESLint
   npm run format:check  # Prettier
   ```

## プロジェクト構造

```
React-Router-demo/
├── backend/         # Laravel バックエンド
│   ├── app/         # アプリケーションコード
│   │   └── Http/Controllers/API/  # APIコントローラー
│   ├── config/      # 設定ファイル
│   ├── database/    # マイグレーションとシード
│   ├── docker/      # Docker設定
│   ├── routes/      # ルート定義
│   └── ...
├── frontend/        # React フロントエンド
│   ├── src/         # ソースコード
│   │   ├── components/  # UIコンポーネント
│   │   ├── api/     # APIクライアント
│   │   ├── context/ # 認証・メモの状態管理
│   │   └── ...
│   └── ...
└── .gitignore       # Git無視設定
```

## データベース構造

**memos テーブル**:
- `id`: 主キー
- `content`: メモの内容（text型）
- `status`: ステータス（string型、デフォルト「メモっとくね」）
- `creator`: 作成者（夫/妻）（string型）
- `completed`: 完了フラグ（boolean型、デフォルトfalse）
- `created_at`: 作成日時
- `updated_at`: 更新日時

## API エンドポイント

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| GET     | /api/memos   | すべてのメモを取得 |
| POST    | /api/memos   | 新しいメモを作成 |
| GET     | /api/memos/{id} | 特定のメモを取得 |
| PUT     | /api/memos/{id} | メモを更新 |
| DELETE  | /api/memos/{id} | メモを削除 |

## テストユーザー

以下のコマンドでシーディングすると、開発用ユーザーが1件作成されます。

```bash
docker-compose exec app php artisan db:seed
```

- メールアドレス: `test@example.com`
- パスワード: `password`

## ローカル起動まとめ

初回セットアップが完了した後の起動手順は以下の通りです。

```bash
# backend
cd backend
docker compose up -d
docker compose exec app php artisan migrate --seed  # DB 初期化＆テストユーザー投入

# frontend（別ターミナル）
cd ../frontend
npm run dev
```

DB をリセットしたい場合は `docker compose exec app php artisan migrate:fresh --seed` を実行してください。

## 品質チェックとCI

- フロントエンドでは ESLint と Prettier を導入しています。`npm run lint` や `npm run format`, `npm run format:check` で手元のコードを検証・整形できます。
- `.github/workflows/lint.yml` に GitHub Actions ワークフローを追加しており、PR/主要ブランチへの push 時に `npm run lint` と `npm run format:check` が自動実行されます。違反がある場合は CI が失敗し、PR がマージできない状態になります。
