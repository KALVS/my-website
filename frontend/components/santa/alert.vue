<template>
    <div class="window glass transparent">
        <div class="title-bar">
            <div class="title-bar-text">Alert!</div>
            <div class="title-bar-controls">
                <button aria-label="Close" @click="closeComponent"></button>
            </div>
        </div>
        <div class="window-body">
            {{ alertMessage }}
            <section class="field-row" style="justify-content: flex-end">
                <button @click="closeComponent">Okay</button>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Alert',
    methods: {
        closeComponent() {
            this.$emit('close')
        },
    },
    computed: {
        alertMessage() {
            return this.alert.alertMessage
        },
    },
    props: {
        alert: {
            type: Object,
            required: true,
        },
    },
})
</script>
