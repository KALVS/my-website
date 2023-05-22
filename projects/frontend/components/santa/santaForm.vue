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
                <ul role="listbox" v-for="(confirmed, index) in participants">
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
            <form @submit.prevent="submitForm">
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
                    @click="validateAndAddParticipant(participants.length - 1)"
                    class="add-button"
                >
                    Add Participant
                </button>
                <div @click="">
                    <Payment :quantity="quantity" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Payment from '@/components/stripe/payment.vue'

export default {
    components: {
        Payment,
    },
    name: 'SecretSanta',
    data() {
        return {
            quantity: 1,
            participant: { name: '', number: '' },
            participants: [],
            nameTooltipHidden: true,
            numberTooltipHidden: true,
        }
    },
    methods: {
        hideNameTooltip() {
            this.nameTooltipHidden = true
        },
        hideNumberTooltip() {
            this.numberTooltipHidden = true
        },
        validateAndAddParticipant() {
            if (this.participant.name !== '') {
                if (/^\d{10}$/.test(this.participant.number)) {
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
            this.quantity = this.participants.length
            console.log(this.quantity)
        },
        removeParticipant(index) {
            this.participants.splice(index, 1)
        },
        checkout() {
            event.preventDefault()
            // Make an HTTP POST request to your Lambda function
            // axios
            //   .post('YOUR_LAMBDA_ENDPOINT', this.participants)
            //   .then((response) => {
            //     // Handle the response from Lambda if needed
            //     console.log(response.data);
            //     // Clear the form fields
            //     this.participants = [{ name: '', number: '' }];
            //   })
            //   .catch((error) => {
            //     // Handle the error if the request fails
            //     console.error(error);
            //   });
        },
    },
}
</script>

<style scoped>
h2 {
    font-size: 16px;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
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
