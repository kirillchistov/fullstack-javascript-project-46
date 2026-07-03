import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: ['coverage/', 'node_modules/'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'off',
    },
  },
];
