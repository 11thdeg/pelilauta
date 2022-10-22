module.exports = {
  root: true,
  env: {
    node: true,
  },
  // parser: '@typescript-eslint/parser',
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    // 'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'semi': [1, 'never'],
    'indent': ['error', 2],
    'quotes': ['error', 'single']
  }
}