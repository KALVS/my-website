<template>
    <div class="window glass transparent">
        <div class="title-bar">
            <div class="title-bar-text">Secret Santa as a Service</div>
            <div class="title-bar-controls">
                <button
                    aria-label="Close"
                    @click="$emit('selectedradio', false)"
                ></button>
            </div>
        </div>
        <div class="window-body">
            <h4>Secret Santa Form</h4>
            <p v-if="participants.length !== 0">Participants:</p>
            <div class="confirmedParticipantsWrapper">
                <ul
                    role="listbox"
                    :key="index"
                    v-for="(confirmed, index) in participants"
                >
                    <li role="option">
                        <div class="container">
                            <div class="participant-info">
                                <p>
                                    <strong>Name:</strong> {{ confirmed.name }}
                                </p>
                                <p>
                                    <strong>Number:</strong>
                                    {{ confirmed.number }}
                                </p>
                            </div>
                            <button
                                type="button"
                                @click="removeParticipant(index)"
                                class="remove-button"
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <form @submit.prevent="">
                <div class="form-group">
                    <label for="name" class="form-label">Name: </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        v-model="participant.name"
                        class="form-input"
                        required
                        @keydown.enter="validateAndAddParticipant()"
                        aria-describedby="nameTooltipId"
                        @keydown="hideNameTooltip"
                    />
                    <div
                        id="nameTooltipId"
                        role="tooltip"
                        :hidden="nameTooltipHidden"
                    >
                        Invalid name.
                    </div>

                    <label :for="'number'" class="form-label">
                        Mobile Number:
                    </label>
                    <div>
                        <input
                            aria-describedby="toolTip"
                            id="number"
                            type="text"
                            name="number"
                            v-model="participant.number"
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
                            Invalid phone number.
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    @click="validateAndAddParticipant()"
                    class="add-button"
                >
                    Add Participant
                </button>

                <button @click="submit($event)">Submit</button>

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
            <Alert
                @close="handleClose"
                :alert="{ alertMessage: alertMessage }"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Index from '@/components/stripe/index.vue'
import Alert from './alert.vue'
import { ParticipantType, SignedRequest } from '../../contants/types'

import crypto from 'crypto'
import aws4, { Request } from 'aws4'
import Vue from 'vue'
import $axios, { AxiosOptions } from '@nuxtjs/axios'

export default Vue.extend({
    components: {
        Index,
        Alert,
    },
    name: 'SecretSanta',
    data() {
        return {
            $axios: typeof $axios,
            showCheckout: false as boolean,
            showAlert: false as boolean,
            alertMessage: '' as string,
            quantity: 1 as number,
            participant: { name: '', number: '' } as ParticipantType,
            participants: [] as ParticipantType[],
            nameTooltipHidden: true as boolean,
            numberTooltipHidden: true as boolean,
            clientSecret: '',
        }
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
        },
        hideNameTooltip() {
            this.nameTooltipHidden = true
        },
        hideNumberTooltip() {
            this.numberTooltipHidden = true
        },
        validateAndAddParticipant() {
            console.log('hey')
            if (this.participant.name !== '') {
                console.log('name')
                if (/^\d{10}$/.test(this.participant.number)) {
                    console.log('number')
                    this.participants.push({
                        name: this.participant.name,
                        number: this.participant.number,
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
        updateQuanity() {
            console.log(this.quantity)
            this.quantity = this.participants.length
            console.log(this.quantity)
        },
        removeParticipant(index) {
            this.participants.splice(index, 1)
        },
        submit(event) {
            console.log(this.quantity)
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
        async createPaymentIntent() {
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
                region: region,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Amz-Content-Sha256': this.calculateHash({
                        quantity: this.quantity,
                    }),
                },
            }

            const signedRequest = aws4.sign(request as any, {
                accessKeyId: accessKey,
                secretAccessKey: secretKey,
                // region: region,
                // service: 'execute-api',
            })
            if (signedRequest.headers) {
                delete signedRequest.headers['Host']
                delete signedRequest.headers['Content-Length']
            }

            console.log(signedRequest)
            this.$axios(signedRequest as any)
                // await this.$axios({options: signedRequest} )

                //     'https://6tcfaewsq8.execute-api.ap-southeast-2.amazonaws.com/secretSanta/createPaymentIntent',
                //     {}
                // ).request(signedRequest)
                //     // .post(
                //     //     'https://6tcfaewsq8.execute-api.ap-southeast-2.amazonaws.com/secretSanta/createPaymentIntent',
                //     //     signedRequest
                //     // )
                .then((response) => {
                    this.clientSecret = response.data.body.clientSecret
                    this.showCheckout = true
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    },
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
