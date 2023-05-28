<template>
    <div class="App">
        <form id="payment-form">
            <div id="card-element">
                <!-- Elements will create input elements here -->
            </div>

            <!-- We'll put the error messages in this element -->
            <div id="card-errors" role="alert"></div>

            <button id="submit" @click="handleSubmit($event)">Pay Now</button>
        </form>

        <!-- <form id="payment-form">
            <div id="payment-element">
                
            </div>
            <button id="submit" @click="handleSubmit($event)">
                <span id="button-text">
                    <div>Pay now</div>
                </span>
                <span id="button-text"> </span>
            </button>
            <div v-if="message" id="payment-message">{{ message }}</div>
            <div id="error-message">
                
            </div>
        </form> -->
    </div>
</template>

<script>
// import Appearance from '../stripe/apperanceStripe.js'
import CheckoutForm from '~/components/stripe/CheckoutForm.vue'

export default {
    props: {
        clientSecret: {
            type: String,
            required: true,
        },
        participants: {
            type: Array,
            required: true,
        },
    },
    components: {
        CheckoutForm,
    },
    data() {
        return {
            stripe: {
                paymentElement: null,
                elements: null,
            },
            message: 'hello',
            options: {
                appearance: {
                    theme: 'stripe',
                },
            },
        }
    },
    mounted() {
        // this.createPaymentIntent()
        this.mountElement()
    },
    created() {
        // this.$stripe
        //     .retrievePaymentIntent(this.clientSecret)
        //     .then(({ paymentIntent }) => {
        //         switch (paymentIntent.status) {
        //             case 'succeeded':
        //                 this.message = 'Payment succeeded!'
        //                 break
        //             case 'processing':
        //                 this.message = 'Your payment is processing.'
        //                 break
        //             case 'requires_payment_method':
        //                 this.message =
        //                     'Your payment was not successful, please try again.'
        //                 break
        //             default:
        //                 this.message = 'Something went wrong.'
        //                 break
        //         }
        //     })
    },

    methods: {
        mountElement() {
            if (this.$stripe) {
                // Fully customizable with appearance API.
                const appearance = {
                    theme: 'none',
                    variables: {
                        fontFamily: 'Verdana',
                        fontLineHeight: '1.5',
                        borderRadius: '0',
                    },
                    rules: {
                        '.Input, .CheckboxInput, .CodeInput': {
                            boxShadow:
                                'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080',
                        },
                        '.Input--invalid': {
                            color: '#DF1B41',
                        },
                        '.Tab, .Block, .PickerItem--selected': {
                            backgroundColor: '#dfdfdf',
                            boxShadow:
                                'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
                        },
                        '.Tab:hover': {
                            backgroundColor: '#eee',
                        },
                        '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover':
                            {
                                backgroundColor: '#ccc',
                            },
                        '.PickerItem': {
                            backgroundColor: '#dfdfdf',
                            boxShadow:
                                'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
                        },
                        '.PickerItem:hover': {
                            backgroundColor: '#eee',
                        },
                        '.PickerItem--highlight': {
                            outline: '1px solid blue',
                        },
                        '.PickerItem--selected:hover': {
                            backgroundColor: '#dfdfdf',
                        },
                    },
                }
                // mode: 'payment',
                // currency: 'usd',
                // amount: 1099,
                // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 3
                // const elements = this.$stripe.elements(options)
                console.log('clientSecret', this.clientSecret)

                const options = {
                    clientSecret: this.clientSecret,
                    appearance: appearance,
                    // paymentMethodOrder: ['apple_pay', 'google_pay', 'card'],
                }
                // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 3
                this.stripe.elements = this.$stripe.elements(options)
                // Create and mount the Payment Element
                // this.stripe.paymentElement =
                //     this.stripe.elements.create('payment')
                // this.stripe.paymentElement.mount('#payment-element')

                var card = this.stripe.elements.create('card', {
                    hidePostalCode: true,
                })
                card.mount('#card-element')
            }
        },
        async handleSubmit(e) {
            e.preventDefault()

            const paymentElement = await this.stripe.elements.getElement(
                'payment'
            )

            const cardElement = await this.stripe.elements.getElement('card')
            const cardNumberElement = await this.stripe.elements.getElement(
                'cardNumber'
            )
            const cardExpiryElement = await this.stripe.elements.getElement(
                'cardExpiry'
            )
            const cardCvcElement = await this.stripe.elements.getElement(
                'cardCvc'
            )

            // const resp = await this.$stripe.confirmPayment(this.clientSecret, {
            //     clientSecret: this.clientSecret,

            //     payment_method: {
            //         card: paymentElement,
            //     },
            //     redirect: 'if_required',
            //     // confirmParams: {
            //     //     // Make sure to change this to your payment completion page
            //     //     return_url: 'http://localhost:3000',
            //     // },
            // })

            // const resp1 = await this.$stripe.confirmPayment({
            //     clientSecret: this.clientSecret,
            //     payment_method: paymentElement,
            //     redirect: 'if_required',
            // })

            this.$stripe
                .confirmCardPayment(this.clientSecret, {
                    payment_method: {
                        card: cardElement,
                    },
                })
                .then((result) => {
                    if (result.error) {
                        // Show error to your customer (for example, insufficient funds)
                        console.log(result.error.message)
                    } else {
                        // The payment has been processed!
                        if (result.paymentIntent.status === 'succeeded') {
                            // Show a success message to your customer
                            // There's a risk of the customer closing the window before callback
                            // execution. Set up a webhook or plugin to listen for the
                            // payment_intent.succeeded event that handles any business critical
                            // post-payment actions.
                            console.log('success', this.participants)

                            this.$axios.post(
                                'https://po1zj2h5mj.execute-api.ap-southeast-2.amazonaws.com/secretSanta',
                                { participants: this.participants }
                            )
                        }
                    }
                })
            // console.log(resp)
            // if (
            //     error.type === 'card_error' ||
            //     error.type === 'validation_error'
            // ) {
            //     this.message = error.message
            // } else {
            //     this.message = 'An unexpected error occurred.'
            // }
        },
    },
}
</script>
