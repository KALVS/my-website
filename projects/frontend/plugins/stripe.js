import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_TEST_SKEY);

export default (context, inject) => {
  stripePromise.then((stripe) => {
    inject('stripe', stripe);
  });
};