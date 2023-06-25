/* eslint-env node */
module.exports = {
    extends: ["plugin:sonarjs/recommended", 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', "sonarjs", "vue"],
    root: true,
  };