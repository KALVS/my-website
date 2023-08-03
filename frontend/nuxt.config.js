if (!process.env.APP_URL || !process.env.API_URL) {
  console.warn('No API_URL or APP_URL provided in environment, using defaults')
}
if (!process.env.NUXT_ENV) {
  console.warn('No environments provided in environment, using defaults')
}

export default {
  ssr: false, // Set the mode to 'spa' for Single-Page Application
  env: {
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY
  },
  head: {
    title: 'Alex Holm',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0'
      }
    ],
    link: [{ rel: 'stylesheet', href: '@/assets/global.css' }],
    script: [{ src: 'https://js.stripe.com/v3' }]
  },
  css: [
    '@/assets/global.css',
    // Load a Node.js module directly (here it's a Sass file)
    '7.css/dist/7.css'
  ],
  modules: [
    // '@nuxtjs/eslint-module',
    '@nuxtjs/axios',
    [
      'nuxt-stripe-module',
      {
        publishableKey: process.env.STRIPE_TEST_PKEY
      }
    ]
  ],
  stripe: {
    publishableKey: process.env.STRIPE_TEST_SKEY,
    apiVersion: '2020-08-27'
  },
  buildModules: ['@nuxt/typescript-build']
}
