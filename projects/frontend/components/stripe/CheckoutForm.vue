<template>
    <p>hello wrold</p>
</template>
<script>
export default {}
</script>

<!-- <template>
    <form id="payment-form" @submit="handleSubmit">
        <LinkAuthenticationElement
            id="link-authentication-element"
            v-model="email"
        />
        <PaymentElement id="payment-element" :options="paymentElementOptions" />
        <button :disabled="isLoading || !stripe || !elements" id="submit">
            <span id="button-text">
                <div v-if="isLoading" class="spinner" id="spinner"></div>
                <div v-else>Pay now</div>
            </span>
            <span id="button-text"> </span>
        </button>
        <div v-if="message" id="payment-message">{{ message }}</div>
    </form>
</template>

<script>
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements,
} from '@vue-stripe/vue-stripe'

export default {
    components: {
        PaymentElement,
        LinkAuthenticationElement,
    },

    name: 'CheckoutForm',
    data() {
        return {
            stripe: null,
            elements: null,
            email: '',
            message: null,
            isLoading: false,
            paymentElementOptions: {
                layout: 'tabs',
            },
        }
    },
    created() {
        this.stripe = useStripe()
        this.elements = useElements()

        if (!this.stripe) {
            return
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret'
        )

        if (!clientSecret) {
            return
        }

        this.stripe
            .retrievePaymentIntent(clientSecret)
            .then(({ paymentIntent }) => {
                switch (paymentIntent.status) {
                    case 'succeeded':
                        this.message = 'Payment succeeded!'
                        break
                    case 'processing':
                        this.message = 'Your payment is processing.'
                        break
                    case 'requires_payment_method':
                        this.message =
                            'Your payment was not successful, please try again.'
                        break
                    default:
                        this.message = 'Something went wrong.'
                        break
                }
            })
    },
    methods: {
        async handleSubmit(e) {
            e.preventDefault()

            if (!this.stripe || !this.elements) {
                // Stripe.js hasn't yet loaded.
                // Make sure to disable form submission until Stripe.js has loaded.
                return
            }

            this.isLoading = true

            const { error } = await this.stripe.confirmPayment({
                elements: this.elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: 'http://localhost:3000',
                },
            })

            // This point will only be reached if there is an immediate error when
            // confirming the payment. Otherwise, your customer will be redirected to
            // your `return_url`. For some payment methods like iDEAL, your customer will
            // be redirected to an intermediate site first to authorize the payment, then
            // redirected to the `return_url`.
            if (
                error.type === 'card_error' ||
                error.type === 'validation_error'
            ) {
                this.message = error.message
            } else {
                this.message = 'An unexpected error occurred.'
            }

            this.isLoading = false
        },
    },
}
</script> -->
