<template>
  <div class="window glass transparent" style="width 60%">
    <div class="title-bar">
      <div class="title-bar-text">
        {{ extracurricular.title }}
      </div>
      <div class="title-bar-controls">
        <button aria-label="Close" @click="$emit('selectedradio', false)" />
      </div>
    </div>
    <div class="window-body">
      <span v-for="(exc, index) in extracurricular.content" :key="index">
        <h5>{{ exc.heading }}</h5>
        {{ exc.text }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { extracurricular } from '~/contants/copy'

export default {
  name: 'ExtracurricularComponent',
  data() {
    return {
      extracurricular
    }
  }
}
</script>

<style scoped>
.transparent::before,
.transparent > .title-bar {
  background-color: transparent;
}

.window {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-height: 600px;
}
</style>
