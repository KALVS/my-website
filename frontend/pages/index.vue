<template>
  <div class="canvasWrapper">
    <canvas id="c"> </canvas>
    <!-- <homeComponent @selectedradio="onInterestEvent($event)" />
    <educationComponent
      v-if="educationEvent != false"
      @selectedradio="onInterestEvent($event)"
    />
    <extracurricularComponent
      v-if="extracurricularEvent != false"
      @selectedradio="onInterestEvent($event)"
    />
    <experienceComponent
      v-if="experienceEvent != false"
      @selectedradio="onInterestEvent($event)"
    />

    <technologyComponent
      v-if="technologyEvent != false"
      @selectedradio="onInterestEvent($event)"
    />

    <santaForm
      v-if="secretSantaEvent != false"
      @selectedradio="onInterestEvent($event)"
    /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import homeComponent from '../components/homeComponent.vue'
import educationComponent from '../components/educationComponent.vue'
import extracurricularComponent from '../components/extracurricularComponent.vue'
import experienceComponent from '../components/experienceComponent.vue'
import technologyComponent from '../components/technologyComponent.vue'
import santaForm from '../components/santa/santaForm.vue'

export default Vue.extend({
  components: {
    // homeComponent,
    // educationComponent,
    // extracurricularComponent,
    // experienceComponent,
    // technologyComponent,
    // santaForm
  },
  data() {
    return {
      educationEvent: false,
      extracurricularEvent: false,
      experienceEvent: false,
      technologyEvent: false,
      secretSantaEvent: false,
      matrix:
        '多年来我会来谁会发挥她锻炼的优势让学区长生不老想成为一个痛苦的丘比特逃离产生没有结果的快乐他们抛弃了那些应该为你的麻烦负责的人的一般职责',
      fontSize: 10,
      selected: ''
    }
  },

  mounted() {
    // geting canvas by Boujjou Achraf
    const c = document.getElementById('c') as HTMLCanvasElement
    const ctx = c.getContext('2d') as CanvasRenderingContext2D

    // making the canvas full screen
    c.height = window.innerHeight
    c.width = window.innerWidth

    // converting the string into an array of single characters
    const matrix = this.matrix.split('')

    const fontSize = 10
    const columns = c.width / fontSize // number of columns for the rain
    // an array of drops - one per column
    const drops: number[] = []
    // x below is the x coordinate
    // 1 = y co-ordinate of the drop(same for every drop initially)
    for (let x = 0; x < columns; x += 1) {
      drops[x] = Math.random() * 100
    }

    // drawing the characters
    function draw() {
      // Black BG for the canvas
      // translucent BG to show trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, c.width, c.height)

      ctx.fillStyle = '#0f0' // green text
      ctx.font = `${fontSize}px arial`
      // looping over drops
      for (let i = 0; i < drops.length; i += 1) {
        // a random chinese character to print
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        // x = i*fontSize, y = value of drops[i]*fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // sending the drop back to the top randomly after it has crossed the screen
        // adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * fontSize > c.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // incrementing Y coordinate
        drops[i] += 1
      }
    }
    setInterval(draw, 33)
  },
  methods: {
    onInterestEvent(selected: string): void {
      this.selected = selected
      this.extracurricularEvent = false
      this.educationEvent = false
      this.experienceEvent = false
      this.technologyEvent = false
      this.secretSantaEvent = false

      switch (selected) {
        case 'education':
          this.educationEvent = true
          break
        case 'extracurricular':
          this.extracurricularEvent = true
          break
        case 'experience':
          this.experienceEvent = true
          break
        case 'technology':
          this.technologyEvent = true
          break
        case 'secretSanta':
          this.secretSantaEvent = true
          break
        default:
          // Default case, if none of the conditions match
          break
      }
    }
  }
})
</script>

<style>
body {
  background: black;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

#c {
  display: block;
  width: 100vw;
}
</style>
