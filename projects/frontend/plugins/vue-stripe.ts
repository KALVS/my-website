import Vue from 'vue';
import VueSession from 'vue-session';
import { StripePlugin } from '@vue-stripe/vue-stripe';

const options = {
  pk: process.env.STRIPE_TEST_PKEY,
  testMode: true, // Boolean. To override the insecure host warning
  stripeAccount: process.env.STRIPE_ACCOUNT,
  apiVersion: '2022-11-15',
  locale: 'auto',
};

Vue.use(VueSession);
Vue.use(StripePlugin, options);
