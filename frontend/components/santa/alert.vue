<template>
  <div class="window glass transparent">
    <div class="title-bar">
      <div class="title-bar-text">
        {{ alertContent.title }}
      </div>
      <div class="title-bar-controls">
        <button aria-label="Close" @click="closeComponent" />
      </div>
    </div>
    <div class="window-body">
      {{ alertMessage }}
      <section class="field-row" style="justify-content: flex-end">
        <button @click="closeComponent">
          {{ alertContent.okay }}
        </button>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { alert } from '~/contants/copy'

export default Vue.extend({
  name: 'AlertModal',
  props: {
    alert: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      alertContent: alert
    }
  },
  computed: {
    alertMessage() {
      return this.alert.alertMessage
    }
  },
  methods: {
    closeComponent() {
      this.$emit('close')
    }
  }
})
</script>
