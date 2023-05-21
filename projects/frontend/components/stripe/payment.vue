<template>
    <div>
        <stripe-checkout
            ref="checkoutRef"
            :pk="pk"
            :lineItems="lineItems"
            :successUrl="successUrl"
            :cancelUrl="cancelUrl"
            mode="payment"
        />
        <button class="button" type="button" @click="checkout">Checkout</button>
    </div>
</template>

<script>
export default {
    name: 'Payment',
    props: {
        quantity: {
            type: Number,
            required: true,
        },
    },
    data() {
        this.pk =
            'pk_test_51N7DUbA5NSCLB33rqQiKcIJOnB3nMcz7OHHvUqNdEY8Map06b73vMn6H3Dk6N1v4hwPheSiuxBF03V9dkP2d26iQ00jwsYMtk4'
        return {
            lineItems: [
                {
                    price: 'price_1NA8CBA5NSCLB33rti4ceGwn',
                    quantity: this.quantity,
                },
            ],
            successUrl: 'http://localhost:3000/success',
            cancelUrl: 'http://localhost:3000',
        }
    },
    methods: {
        checkout() {
            this.lineItems[0].quantity = this.quantity
            console.log(this.quantity)
            this.$refs.checkoutRef.redirectToCheckout()
        },
    },
}
</script>

<style>
@media only screen and (max-width: 600px) {
    .button {
        width: 100%;
    }
}
</style>
