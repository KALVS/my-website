<template>
  <div class="window glass transparent" style="width 60%">
    <div class="title-bar">
      <div class="title-bar-text">
        {{ experience.title }}
      </div>
      <div class="title-bar-controls">
        <button aria-label="Close" @click="$emit('selectedradio', false)" />
      </div>
    </div>
    <div class="window-body has-scrollbar">
      <span v-for="(exp, index) in experience.content" :key="index">
        <h5>{{ exp.heading }}</h5>
        <strong>{{ exp.role }} {{ exp.duration }}</strong>
        <br />
        <p>
          {{ exp.text }}
        </p>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { experience } from '~/contants/copy'

export default {
  name: 'ExperienceComponent',
  data() {
    return { experience }
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
  top: 45%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-height: 60ch;
  overflow-y: scroll;
}
</style>
