<template>
    <div class="App">
        <form id="payment-form">
            <div id="card-element">
                <!-- Elements will create input elements here -->
            </div>

            <!-- We'll put the error messages in this element -->
            <div id="card-errors" role="alert"></div>

            <button
                id="submit"
                class="pay-button"
                @click="handleSubmit($event)"
            >
                Pay Now
            </button>
        </form>

        <div v-if="showAlert">
            <Alert
                @close="handleClose"
                :alert="{ alertMessage: this.alertMessage }"
            />
        </div>
    </div>
</template>

<script>
import Alert from '../santa/alert.vue'
import aws4 from 'aws4'

import crypto from 'crypto'

export default {
    components: {
        Alert,
    },
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

    data() {
        return {
            stripe: {
                paymentElement: null,
                elements: null,
            },
            showAlert: false,
            alertMessage: '',
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
        calculateHash(data) {
            const hash = crypto.createHash('sha256')
            hash.update(JSON.stringify(data))
            return hash.digest('hex')
        },
        handleClose() {
            // Perform any actions you need when the component is closed
            // For example, hide the component or reset some data

            this.showAlert = false
            location.reload()
        },
        mountElement() {
            if (this.stripe) {
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

            // const paymentElement = await this.stripe.elements.getElement(
            //     'payment'
            // )

            const cardElement = await this.stripe.elements.getElement('card')
            // const cardNumberElement = await this.stripe.elements.getElement(
            //     'cardNumber'
            // )
            // const cardExpiryElement = await this.stripe.elements.getElement(
            //     'cardExpiry'
            // )
            // const cardCvcElement = await this.stripe.elements.getElement(
            //     'cardCvc'
            // )

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
                .then(async (result) => {
                    if (result.error) {
                        // Show error to your customer (for example, insufficient funds)
                        console.log(result.error.message)
                    } else {
                        // The payment has been processed!
                        if (result.paymentIntent.status === 'succeeded') {
                            // Show a success message to your customer

                            const accessKey = process.env.AWS_ACCESS_KEY
                            const secretKey = process.env.AWS_SECRET_KEY
                            const region = 'ap-southeast-2'

                            const request = {
                                host: 'https://6tcfaewsq8.execute-api.ap-southeast-2.amazonaws.com',
                                method: 'POST',
                                path: '/secretSanta/secretSanta',
                                service: 'execute-api',
                                url: 'https://6tcfaewsq8.execute-api.ap-southeast-2.amazonaws.com/secretSanta/secretSanta',
                                body: { participants: this.participants },
                                data: { participants: this.participants },
                                region: region,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-Amz-Content-Sha256': this.calculateHash({
                                        participants: this.participants,
                                    }),
                                },
                            }

                            const signedRequest = new aws4.sign(request, {
                                accessKeyId: accessKey,
                                secretAccessKey: secretKey,
                                region: region,
                                service: 'execute-api',
                            })

                            delete signedRequest.headers['Host']
                            delete signedRequest.headers['Content-Length']

                            this.$axios(signedRequest)
                                .then((response) => {
                                    this.alertMessage =
                                        'Success! You should be receiving your text messages shortly!'
                                    this.showAlert = true
                                    return
                                })
                                .catch((error) => {
                                    this.alertMessage =
                                        'Oh no! Something went wrong!'
                                    this.showAlert = true
                                    return
                                })
                        }
                    }
                })
        },
    },
}
</script>

<style>
.pay-button {
    margin-block-start: 20px;
}
</style>
