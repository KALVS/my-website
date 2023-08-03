/* eslint-env node */
module.exports = {
  root: true,
  // parser: '@babel/eslint-parser',
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2017,
    // requireConfigFile: false,
    sourceType: 'module',
    babelOptions: {
      parserOpts: {
        plugins: ['typescript']
      }
    }
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'space-before-function-paren': ['error', 'never']
  }
}
// {
//     extends: ["plugin:sonarjs/recommended",   "plugin:nuxt/recommended"],
//     parser: '@typescript-eslint/parser',
//     plugins: ['@typescript-eslint', "sonarjs", "vue"],
//     root: true,
//     ignorePatterns: [
//       "node_modules/",
//       "dist/",
//       "assets/*",
//       "*.css"
//       // Add more patterns if needed
//   ],
//   };
