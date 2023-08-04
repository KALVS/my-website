<template>
  <div class="window glass transparent" style="width 60%">
    <div class="title-bar">
      <div class="title-bar-text">
        {{ technology.title }}
      </div>
      <div class="title-bar-controls">
        <button aria-label="Close" @click="$emit('selectedradio', false)" />
      </div>
    </div>
    <div class="window-body">
      <span v-for="(tech, index) in technology.content" :key="index">
        <h5 style="font-size: 16px">
          <strong>{{ tech.heading }}</strong>
        </h5>

        <p>
          <strong>{{ tech.heading }}</strong> <br />
          {{ tech.text }}
        </p>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { technology } from '~/contants/copy'

export default {
  name: 'TechnologyComponent',
  data() {
    return {
      technology
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
  top: 45%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-height: 60ch;
}
</style>
