<template>
  <div class="window glass transparent">
    <div class="title-bar">
      <div class="title-bar-text">
        {{ secretSanta.titleBarText }}
      </div>
      <div class="title-bar-controls">
        <button aria-label="Close" @click="$emit('selectedradio', false)" />
      </div>
    </div>
    <div class="window-body">
      <h4>{{ secretSanta.secretSantaForm.title }}</h4>
      <p v-if="participants.length !== 0">
        {{ secretSanta.secretSantaForm.participants }}
      </p>
      <div class="confirmedParticipantsWrapper">
        <ul
          v-for="(confirmed, index) in participants"
          :key="index"
          role="listbox"
        >
          <li role="option">
            <div class="container">
              <div class="participant-info">
                <p><strong>Name:</strong> {{ confirmed.name }}</p>
                <p><strong>Number:</strong> {{ confirmed.number }}</p>
              </div>
              <button
                type="button"
                class="remove-button"
                @click="removeParticipant(index)"
              >
                {{ secretSanta.secretSantaForm.removeButton }}
              </button>
            </div>
          </li>
        </ul>
      </div>
      <form @submit.prevent="">
        <div class="form-group">
          <label for="name" class="form-label">{{
            secretSanta.secretSantaForm.nameLabel
          }}</label>
          <input
            id="name"
            v-model="participant.name"
            type="text"
            name="name"
            class="form-input"
            required
            aria-describedby="nameTooltipId"
            @keydown.enter="validateAndAddParticipant()"
            @keydown="hideNameTooltip"
          />
          <div id="nameTooltipId" role="tooltip" :hidden="nameTooltipHidden">
            {{ secretSanta.secretSantaForm.invalidName }}
          </div>

          <label :for="'number'" class="form-label">{{
            secretSanta.secretSantaForm.phoneLabem
          }}</label>
          <div>
            <input
              id="number"
              v-model="participant.number"
              aria-describedby="toolTip"
              type="text"
              name="number"
              class="form-input"
              pattern="[0-9]{10}"
              inputmode="numeric"
              required
              @keydown.enter="validateAndAddParticipant()"
              @keydown="hideNumberTooltip"
            />
            <div
              id="numberTooltipId"
              role="tooltip"
              :hidden="numberTooltipHidden"
            >
              {{ secretSanta.secretSantaForm.invalidPhone }}
            </div>
          </div>
        </div>

        <button
          type="button"
          class="add-button"
          @click="validateAndAddParticipant()"
        >
          {{ secretSanta.secretSantaForm.addButton }}
        </button>

        <button @click="submit($event)">
          {{ secretSanta.secretSantaForm.submitButton }}
        </button>

        <div v-if="clientSecret">
          <Index
            :quantity="quantity"
            :client-secret="clientSecret"
            :participants="participants"
          />
        </div>
      </form>
    </div>
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
import $axios from '@nuxtjs/axios'
import { ParticipantType } from '../../contants/types'
import Alert from './alert.vue'
import { secretSanta } from '~/contants/copy'
import Index from '@/components/stripe/index.vue'

export default Vue.extend({
  name: 'SecretSanta',
  components: {
    Index,
    Alert
  },
  data() {
    return {
      secretSanta,
      $axios: typeof $axios,
      showCheckout: false as boolean,
      showAlert: false as boolean,
      alertMessage: '' as string,
      quantity: 1 as number,
      participant: { name: '', number: '' } as ParticipantType,
      participants: [] as ParticipantType[],
      nameTooltipHidden: true as boolean,
      numberTooltipHidden: true as boolean,
      clientSecret: ''
    }
  },
  methods: {
    handleClose() {
      this.showAlert = false
    },
    hideNameTooltip() {
      this.nameTooltipHidden = true
    },
    hideNumberTooltip() {
      this.numberTooltipHidden = true
    },
    updateQuanity() {
      this.quantity = this.participants.length
    },
    removeParticipant(index) {
      this.participants.splice(index, 1)
    },
    calculateHash(data) {
      const hash = crypto.createHash('sha256')
      hash.update(JSON.stringify(data))
      return hash.digest('hex')
    },
    validateAndAddParticipant() {
      if (this.participant.name !== '') {
        if (/^\d{10}$/.test(this.participant.number)) {
          this.participants.push({
            name: this.participant.name,
            number: this.participant.number
          })
          this.participant = { name: '', number: '' }
          this.updateQuanity()
          this.nameTooltipHidden = true
          this.numberTooltipHidden = true
        } else {
          this.numberTooltipHidden = false
        }
      } else {
        this.nameTooltipHidden = false
      }
    },
    submit(event) {
      event.preventDefault()
      if (this.participants.length === 0) {
        this.alertMessage =
          'You have not submitted any participants, you should add one (probably more) to use this service'
        this.showAlert = true
        return
      } else if (
        this.participant.name !== '' ||
        this.participant.number !== ''
      ) {
        this.alertMessage =
          'You have an incomplete participant, you should add them or clear the form.'
        this.showAlert = true
        return
      }
      this.createPaymentIntent()
    },
    createPaymentIntent() {
      const accessKey = process.env.AWS_ACCESS_KEY
      const secretKey = process.env.AWS_SECRET_KEY
      const region = 'ap-southeast-2'

      const request = {
        host: 'https://6tcfaewsq8.execute-api.ap-southeast-2.amazonaws.com',
        method: 'POST',
        path: '/secretSanta/createPaymentIntent',
        service: 'execute-api',
        url: 'https://6tcfaewsq8.execute-api.ap-southeast-2.amazonaws.com/secretSanta/createPaymentIntent',
        body: { quantity: this.quantity },
        data: { quantity: this.quantity },
        region,
        headers: {
          'Content-Type': 'application/json',
          'X-Amz-Content-Sha256': this.calculateHash({
            quantity: this.quantity
          })
        }
      }

      const signedRequest = sign(request as any, {
        accessKeyId: accessKey,
        secretAccessKey: secretKey
      })
      if (signedRequest.headers) {
        delete signedRequest.headers.Host
        delete signedRequest.headers['Content-Length']
      }
      this.$axios(signedRequest as any)
        .then((response) => {
          const resp = JSON.parse(response.data.body)
          this.clientSecret = resp.clientSecret
          this.showCheckout = true
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    }
  }
})
</script>

<style scoped>
h2 {
  font-size: 16px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  margin-block-start: 20px;
}

.form-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 5px;
  border-radius: 2px;
  height: 26px;
}
.confirmedParticipantsWrapper {
  margin-bottom: 8px;
  margin-top: 8px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.participant-info {
  display: flex;
  gap: 10px;
}

.participant-info p {
  width: 90px;
}

.remove-button {
  margin-right: 24px;
  flex-shrink: 0;
}

.add-button {
  margin-bottom: 16px;
}

@media only screen and (max-width: 600px) {
  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-input {
    width: 100%;
  }

  .add-button {
    margin-bottom: 16px;
  }

  .form-submit,
  .add-button {
    width: 100%;
  }
}
</style>
