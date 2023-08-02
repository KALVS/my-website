const { Stripe } = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET);

exports.handler = async (event, context) => {
  try {
    const { quantity } = event;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: quantity * 100,
        currency: "aud",
        automatic_payment_methods: {
            enabled: true 
        },
    });

    return {
      statusCode: 200,
      body:{clientSecret: paymentIntent.client_secret}
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};