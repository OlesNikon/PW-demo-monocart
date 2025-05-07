import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import js from '@eslint/js';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['playwright-report/*', 'test-results/*', 'monocart-report/*'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended',
    'prettier'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',
      },
    },

    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      semi: ['error', 'always'],
      'function-paren-newline': ['error', 'consistent'],
      'function-call-argument-newline': ['error', 'consistent'],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'constructor-super': ['error'],
      'no-constant-condition': ['off'],
      'no-undef': ['off'],
      'no-unused-vars': ['off'],
      'no-empty': ['off'],
      'no-empty-function': ['off'],
      'no-var': ['error'],
      'no-extra-semi': ['error'],
      'prefer-const': ['off'],
      'spaced-comment': ['error', 'always'],
      'ban-ts-comment': ['off'],
      'no-multi-spaces': ['error'],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'playwright/expect-expect': 'off',
    },
  },
];
