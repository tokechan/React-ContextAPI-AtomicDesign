<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'], // フロントエンドのURL（Viteは利用可能なポートを自動選択）
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // トークンベース認証のみを使用する場合はfalse
];