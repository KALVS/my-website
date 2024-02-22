<script lang="ts">
import Vue from 'vue'
// import { Container, Draggable } from 'vue-smooth-dnd'

export type PlayingCardProps = {
  parentShowFront: boolean
  showFront: boolean
  suitSymbol: string
  suit: string
  value: string
  suitColor: string
}

export default Vue.extend({
  name: 'PlayingCard',
  // components: { Container, Draggable },
  props: {
    parentShowFront: {
      type: Boolean,
      required: true
    },
    suitSymbol: {
      type: String,
      required: true
    },
    suit: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    suitColor: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showFront: this.parentShowFront
    }
  },
  computed: {
    getShowFrontProp() {
      return this.parentShowFront
    }
  },
  mounted() {
    this.showFront = this.parentShowFront
    console.log(this.parentShowFront)
    // setTimeout(() => {
    //   showFront = true
    // }, 1000)
    // const svg = document.querySelector('svg')
    // const svgWidth = parseFloat(svg.getAttributeNS(null, 'width'))
    // const svgHeight = parseFloat(svg.getAttributeNS(null, 'height'))
    // function scaleSVG(percent) {
    //   svg.setAttributeNS(null, 'width', (svgWidth * percent).toString())
    //   svg.setAttributeNS(null, 'height', (svgHeight * percent).toString())
    //   svg.setAttributeNS(null, 'viewBox', '0 0 ' + svgWidth + ' ' + svgHeight)
    // }
    // let
    // const inputPercent = inputs[0]
    // inputPercent.oninput = (event) => {
    //   const percent = parseFloat(event.target.value)
    // scaleSVG(1)
  },
  methods: {
    emitClick() {
      console.log('clicking emitting')
      this.$emit('click')
    }
  }
})
</script>

<template>
  <div class="playing-card">
    <div v-if="showFront" @click="emitClick">
      <!-- <Container>
        <Draggable drag-class="card-ghost"> -->
      <svg width="100" height="150" xmlns="http://www.w3.org/2000/svg">
        <!-- Card border -->
        <rect
          width="100%"
          height="100%"
          rx="10"
          ry="10"
          stroke="black"
          stroke-width="3"
          fill="white"
        />

        <text x="7" y="35" font-size="30" :fill="suitColor">
          {{ value }}
        </text>

        <text x="60" y="35" font-size="24" :fill="suitColor">
          {{ suitSymbol }}
        </text>
      </svg>
      <!-- </Draggable>
      </Container> -->
    </div>
    <div v-else @click="emitClick">
      <svg width="100" height="150" xmlns="http://www.w3.org/2000/svg">
        <!-- Card back design (customize as needed) -->
        <rect width="100%" height="100%" rx="10" ry="10" fill="blue" />
        <circle cx="50%" cy="50%" r="40" fill="white" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.playing-card {
  cursor: pointer;
  width: 100px;
  height: 150px;
  position: relative;
  margin-top: -99%;
  z-index: 1; /* Ensures the top card is visible */
}

.card-ghost {
  width: 1000px;
}

.playing-card:first-child {
  margin-top: 0; /* No overlap for the first card */
}
</style>
