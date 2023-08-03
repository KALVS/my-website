<template>
  <div class="App">
    <form id="payment-form">
      <div id="card-element">
        <!-- Elements will create input elements here -->
      </div>

      <!-- We'll put the error messages in this element -->
      <div id="card-errors" role="alert" />

      <button id="submit" class="pay-button" @click="handleSubmit($event)">
        Pay Now
      </button>
    </form>

    <div v-if="showAlert">
      <Alert :alert="{ alertMessage: alertMessage }" @close="handleClose" />
    </div>
  </div>
</template>

<script lang="ts">
import crypto from 'crypto'
import { sign } from 'aws4'

import Vue from 'vue'

// eslint-disable-next-line import/default
import $stripe from 'nuxt-stripe-module'
import {
  StripeCardElement,
  StripeElements,
  StripeElementsOptionsClientSecret
} from '@stripe/stripe-js'
import Alert from '../santa/alert.vue'

export default Vue.extend({
  name: 'StripeComponent',
  components: {
    Alert
  },
  props: {
    clientSecret: {
      type: String,
      required: true
    },
    participants: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      $stripe: typeof $stripe,
      stripe: {
        paymentElement: null as unknown as StripeElements,
        elements: null as unknown as StripeElements
      },
      showAlert: false,
      alertMessage: '' as string,
      options: {
        appearance: {
          theme: 'stripe'
        }
      }
    }
  },
  mounted() {
    this.mountElement()
  },
  methods: {
    calculateHash(data) {
      const hash = crypto.createHash('sha256')
      hash.update(JSON.stringify(data))
      return hash.digest('hex')
    },
    handleClose() {
      this.showAlert = false
      location.reload()
    },
    mountElement() {
      if (this.stripe) {
        const options: StripeElementsOptionsClientSecret = {
          clientSecret: this.clientSecret
        }

        this.stripe.elements = this.$stripe.elements(options)

        const card = this.stripe.elements.create('card', {
          hidePostalCode: true
        })
        card.mount('#card-element')
      }
    },
    handleSubmit(e) {
      e.preventDefault()

      const cardElement: StripeCardElement = this.stripe.elements.getElement(
        'card'
      ) as StripeCardElement

      this.$stripe
        .confirmCardPayment(this.clientSecret, {
          payment_method: {
            card: cardElement
          }
        })
        .then((result) => {
          if (result.error) {
            // Show error to your customer (for example, insufficient funds)
            // eslint-disable-next-line no-console
            console.log(result.error.message)
          } else if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer

            const accessKey = process.env.AWS_ACCESS_KEY
            const secretKey = process.env.AWS_SECRET_KEY
            const region = 'ap-southeast-2'

            const request = {
              host: 'https://6tcfaewsq8.execute-api.ap-southeast-2.amazonaws.com',
              method: 'POST',
              path: '/secretSanta/secretSanta',
              service: 'execute-api',
              // url: 'https://6tcfaewsq8.execute-api.ap-southeast-2.amazonaws.com/secretSanta/secretSanta',
              body: {
                participants: this.participants
              },
              data: { participants: this.participants },
              region,
              headers: {
                'Content-Type': 'application/json',
                'X-Amz-Content-Sha256': this.calculateHash({
                  participants: this.participants
                })
              }
            }

            const signedRequest = sign(request as any, {
              accessKeyId: accessKey,
              secretAccessKey: secretKey
              // region: region,
              // service: 'execute-api',
            })
            if (signedRequest.headers) {
              delete signedRequest.headers.Host
              delete signedRequest.headers['Content-Length']
            }

            this.$axios(signedRequest as any)
              .then((_response) => {
                this.alertMessage =
                  'Success! You should be receiving your text messages shortly!'
                this.showAlert = true
              })
              .catch((_error) => {
                this.alertMessage = 'Oh no! Something went wrong!'
                this.showAlert = true
              })
          }
        })
    }
  }
})
</script>

<style>
.pay-button {
  margin-block-start: 20px;
}
</style>
