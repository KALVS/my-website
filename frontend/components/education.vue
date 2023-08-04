<template>
  <div class="window glass transparent" style="width 60%">
    <div class="title-bar">
      <div class="title-bar-text">
        {{ 'Educational Activities' }}
      </div>
      <div class="title-bar-controls">
        <button aria-label="Close" @click="$emit('selectedradio', false)" />
      </div>
    </div>
    <div class="window-body">
      <span v-for="(edu, index) in education.content" :key="index">
        <h5>
          {{ edu.heading }}
          {{ edu.duration }}
        </h5>
        {{ edu.text }}
        <br />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { education } from '~/contants/copy'

export default {
  name: 'EducationComponent',
  data() {
    return {
      education
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
