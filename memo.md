# タスク管理アプリのセットアップ手順

# Node.js と npm のインストール

npm create vite@latest my-task-app -- --template react-ts
cd my-task-app
npm install

# 開発環境

npm install -D eslint prettier eslint-plugin-react eslint-config-prettier eslint-plugin-react-hooks

## UIツール

npm install @mantine/core @mantine/hooks @emotion/react

## ツール

npm instal uuid
npm install react-router-dom
npm install date-fns
npm install framer-motion

# 永続化

npm install firebase
# 開発サーバー起動

npm run dev

# ディレクトリ設計

src/
├── components/ # 共通UIコンポーネント（Header, Buttonなど）
├── features/ # タスク、プロジェクトなどのドメイン別機能
│ └── tasks/
│ ├── TaskList.tsx
│ └── TaskItem.tsx
├── pages/ # 各ページ（Home, ProjectViewなど）
├── hooks/ # カスタムフック
├── types/ # 型定義
├── utils/ # ユーティリティ関数
├── App.tsx
└── main.tsx

# .eslintrc.cjsの設定例

module.exports = {
parser: '@typescript-eslint/parser',
extends: [
'eslint:recommended',
'plugin:react/recommended',
'plugin:@typescript-eslint/recommended',
'prettier',
],
plugins: ['react', '@typescript-eslint'],
parserOptions: {
ecmaVersion: 2020,
sourceType: 'module',
ecmaFeatures: { jsx: true },
},
rules: {},
settings: {
react: {
version: 'detect',
},
},
}

# .prettierrcの設定例

{
"semi": false,
"singleQuote": true,
"trailingComma": "all"
}
