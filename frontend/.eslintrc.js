module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',  // <-- here
      tsconfigRootDir: __dirname,
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['prettier'],
    extends: [
      'plugin:prettier/recommended',
    ],
    rules: {
      "prettier/prettier": "error",
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
  