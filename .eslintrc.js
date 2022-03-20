const TSCONFIG_PROJECTS = ['tsconfig.eslint.json', 'packages/**/tsconfig.json'];

module.exports = {
  root: true,
  plugins: ['simple-import-sort'],
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  env: { es6: true, browser: true, node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: TSCONFIG_PROJECTS,
    tsconfigRootDir: __dirname,
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
    jest: { version: 'detect' },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts', '.tsx'],
      },
      typescript: {
        project: TSCONFIG_PROJECTS,
      },
    },
  },
  rules: {
    'sort-imports': 0,
    'import/order': 0,
    'simple-import-sort/imports': 2,
    'simple-import-sort/exports': 2,
    'no-unused-vars': [2, { argsIgnorePattern: '^_' }],
    'no-underscore-dangle': [2, { allow: ['_id'] }],
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).ts?(x)', 'jest.config.ts', 'setupTests.ts'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
        'plugin:jest-formatting/recommended',
      ],
      rules: {
        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
      },
    },
  ],
};