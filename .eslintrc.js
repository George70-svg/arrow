import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    files: ['**/*.{ts,tsx}'],
    extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
    },
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    rules: {
        '@typescript-eslint/ban-ts-comment': 1,
        '@typescript-eslint/no-non-null-assertion': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    overrides: [],
}
