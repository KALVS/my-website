require('dotenv').config();
import express from 'express';
import cors from 'cors'
import Stripe from 'stripe';


console.log(process.env.STRIPE_TEST_SKEY)


const stripe = new Stripe(process.env.STRIPE_TEST_SKEY, {apiVersion: '2022-11-15'});
const BASE_URL = 'https://api.stripe.com';

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
  });

app.get('/api/greeting', (req, res) => {
    // Endpoint logic goes here
    res.json({ message: 'Hello from the endpoint!' });
  });

app.post('/api/create-payment-intent', async (req,res) => {
    console.log(req.body)
    const quantity = req.body.quantity
    const paymentInent = await stripe.paymentIntents.create({
        amount: quantity * 100,
        currency: "aud",
        automatic_payment_methods: {
          enabled: true,
        },
        
    })

    res.send({
        clientSecret: paymentInent.client_secret
    })
})

app.post('/api/payment', async (req, res) => {
    console.log(req.body)
  try {
    const payload = {
      success_url: req.body.success_url,
      cancel_url: req.body.cancel_url,
      line_items: req.body.line_items,
      mode: req.body.mode,
    };
    const session = await stripe.checkout.sessions.create(payload);
    console.log(session)
    res.send(session);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});


// export const api = app;
// export the server middleware 
module.exports = { path: '/api', handler: app }
