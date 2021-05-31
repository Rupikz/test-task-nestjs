module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'optimize-regex', 'promise'],
  extends: [
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': 'off',
    'no-undefined': 'off',
    'optimize-regex/optimize-regex': 'warn',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'lines-between-class-members': ['error', 'always'],
    'padded-blocks': ['error', 'never', { allowSingleLineBlocks: true }],
    quotes: ['error', 'single'],
    'no-trailing-spaces': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'angle-bracket' },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always', { omitLastInOneLineBlock: true }],
    'array-bracket-newline': ['error', { multiline: true }],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Function: false,
        },
      },
    ],
  },
};
