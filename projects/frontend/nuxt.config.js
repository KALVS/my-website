// import "7.css/dist/7.css";
require('dotenv').config();


const APP_URL = process.env.APP_URL || 'http://localhost:4000';
const API_URL = process.env.API_URL || 'http://localhost:3000';

if (!process.env.APP_URL || !process.env.API_URL) {
    console.warn('No API_URL or APP_URL provided in environment, using defaults');
  }
  if (!process.env.NUXT_ENV) {
    console.warn('No environments provided in environment, using defaults');
  }

export default {
    head: {
        title: 'my title',
        meta: [
          { charset: 'utf-8' }]
    },
    css: [
        // Load a Node.js module directly (here it's a Sass file)
        "7.css/dist/7.css"
    ],
    mode: "spa",
    components: 'true'
}