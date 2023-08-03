<template>
  <div class="window glass transparent" style="width 60%">
    <div class="title-bar">
      <div class="title-bar-text">Experience</div>
      <div class="title-bar-controls">
        <button
          aria-label="Close"
          @click="$emit('selectedradio', false)"
        ></button>
      </div>
    </div>
    <div class="window-body has-scrollbar">
      <h5>iNSPIRETEK</h5>
      <strong>Web Developer January 2021 -> Now</strong>
      In this role Alex is part of the engineering team that builds and
      maintains iNSPIRETEK's sports analytics mobile application and data
      analytics pipeline. He primarily uses Angular and Typescript to build a
      responsive mobile app that communicates with a backend hosted in AWS.
      <h5>LitePages</h5>
      <strong>Technical Co-Founder June 2019 -> January 2021</strong>
      LitePages is a lead generation and marketing tool for tradesmen & small
      businesses. His role consisted of full stack development using Pug and
      NuxtJS for front end with a NodeJS 10 backend. He utilized AWS Elastic
      Beanstalk and CircleCI to build an automatic delivery pipeline for
      developement and production workloads. As the lead developer he was also
      responsible for training and managing a small team of developer interns
      <h5>Pizza Roulette</h5>
      <strong>Software Engineer | Streamer 2019 June -> 2020 March</strong>
      Alex played a supportive role working at Pizza Roulette, working with Nuxt
      and Node to create an online game of chance where users could win a pizza
      in exchange for $2. During this time, Pizza Roulette would live stream
      games while Alex would stream games such as RuneScape and Sims
      <h5>StartMIT Participant</h5>
      <strong>Participant January 2020 -> January 2020</strong>
      StartMIT is a two-and-a-half week course where students hear from leaders
      in innovation, participate in activities to refine their projects, and
      attend events with alumni and other leaders in the MIT entrepreneurial
      ecosystem
    </div>
  </div>
</template>
<script lang="ts">
export default {}
</script>
<style>
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
