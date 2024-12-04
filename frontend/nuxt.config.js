/* eslint-disable no-console */

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
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    STRIPE_PKEY: process.env.STRIPE_PKEY
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
    '@nuxtjs/axios',
    [
      'nuxt-stripe-module',
      {
        publishableKey:
          'pk_live_51N7DUbA5NSCLB33rSNbmAlVqevYKtNj8tdu502XpAm9pOq0ZoyJaQ7BT4qH7JmauWEbhQgX3Yg88vk34RbD6qpLY005xDDBwjG'
      }
    ]
  ],
  stripe: {
    publishableKey:
      'pk_live_51N7DUbA5NSCLB33rSNbmAlVqevYKtNj8tdu502XpAm9pOq0ZoyJaQ7BT4qH7JmauWEbhQgX3Yg88vk34RbD6qpLY005xDDBwjG',
    apiVersion: '2020-08-27'
  },
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/eslint-module']
}
