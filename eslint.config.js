import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', '.angular/**'],
  },
  ...tseslint.configs.recommended.map((config) => ({ ...config, files: ['**/*.ts'] })),
  ...tseslint.configs.stylistic.map((config) => ({ ...config, files: ['**/*.ts'] })),
  ...angular.configs.tsRecommended.map((config) => ({ ...config, files: ['**/*.ts'] })),
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/eqeqeq': 'warn',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
    },
  },
  eslintConfigPrettier,
  {
    ...eslintPluginPrettierRecommended,
    ignores: ['**/*.ts', '**/*.tsx'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
      globals: {
        console: 'readonly',
        window: 'readonly',
      },
    },
    processor: angular.processInlineTemplates,
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'prettier/prettier': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'enumMember', format: ['UPPER_CASE'], leadingUnderscore: 'forbid' },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: { regex: '^I[A-Z]', match: true },
        },
        { selector: 'typeProperty', format: null },
      ],
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
      '@typescript-eslint/consistent-generic-constructors': ['error', 'type-annotation'],
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unnecessary-type-arguments': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/object-curly-spacing': ['warn', 'always'],
      '@stylistic/template-curly-spacing': ['warn', 'always'],
      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],
      '@stylistic/quotes': [
        'warn',
        'single',
        { avoidEscape: true, allowTemplateLiterals: 'always' },
      ],
      '@stylistic/padded-blocks': ['error', { classes: 'always' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  ...angular.configs.templateRecommended.map((config) => ({ ...config, files: ['**/*.html'] })),
  ...angular.configs.templateAccessibility.map((config) => ({ ...config, files: ['**/*.html'] })),
);
