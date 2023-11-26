<template>
  <div class="playing-card">
    <div v-if="showFront">
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

        <text x="7" y="35" font-size="30" :fill="suitColor">{{ value }}</text>

        <text x="5" y="60" font-size="24" :fill="suitColor">
          {{ suitSymbol }}
        </text>
      </svg>
    </div>
    <div v-else>
      <svg width="100" height="150" xmlns="http://www.w3.org/2000/svg">
        <!-- Card back design (customize as needed) -->
        <rect width="100%" height="100%" rx="10" ry="10" fill="blue" />
        <circle cx="50%" cy="50%" r="40" fill="white" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayingCard',
  props: {
    showFront: {
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
  mounted() {
    const svg = document.querySelector('svg')

    const svgWidth = parseFloat(svg.getAttributeNS(null, 'width'))
    const svgHeight = parseFloat(svg.getAttributeNS(null, 'height'))

    function scaleSVG(percent) {
      svg.setAttributeNS(null, 'width', svgWidth * percent)
      svg.setAttributeNS(null, 'height', svgHeight * percent)
      svg.setAttributeNS(null, 'viewBox', '0 0 ' + svgWidth + ' ' + svgHeight)
    }
    // let

    // const inputPercent = inputs[0]

    // inputPercent.oninput = (event) => {
    //   const percent = parseFloat(event.target.value)

    scaleSVG(10)
  }
}
</script>

<style scoped>
.playing-card {
  width: 100px;
  height: 150px;
}
</style>
