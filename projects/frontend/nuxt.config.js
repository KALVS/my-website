/* eslint-disable no-console */
// import "7.css/dist/7.css";
require('dotenv').config();

// const APP_URL = process.env.APP_URL || 'http://localhost:4000';
// const API_URL = process.env.API_URL || 'http://localhost:3000';

if (!process.env.APP_URL || !process.env.API_URL) {
  console.warn('No API_URL or APP_URL provided in environment, using defaults');
}
if (!process.env.NUXT_ENV) {
  console.warn('No environments provided in environment, using defaults');
}

export default {
  head: {
    title: 'Alex Holm',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0'
      }],
  },
  css: [
    // Load a Node.js module directly (here it's a Sass file)
    '7.css/dist/7.css',
  ],
  ssr: true,
  components: 'true',
};
