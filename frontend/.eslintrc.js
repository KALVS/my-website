module.exports = {
  root: true,
  // parser: '@babel/eslint-parser',
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: false
    }
  },
  extends: ['@nuxtjs/eslint-config-typescript'],
  rules: {
    'space-before-function-paren': ['error', 'never'],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'always',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }]
  }
}
