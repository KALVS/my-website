<template>
  <div class="window glass transparent" style="width 60%">
    <div class="title-bar">
      <div class="title-bar-text">Resume</div>
      <div class="title-bar-controls">
        <button aria-label="Close" @click="$emit('selectedradio', false)"></button>
      </div>
    </div>
    <div class="window-body">
      <h3>EDUCATION</h3>      
      <h4> Queensland University of Technology</h4>
      <h5>Bachelor of Information Technology Major: Computer Science
      February 2017 -> November 2020</h5>
      During his time at QUT, Alex immersed
      himself in the Computer Science &
      Entrepreneurship ecosystems. This exposed
      him to running student clubs, working with
      startups and participating in a wide array
      of university programs including:
      <br>
      <h5>Disrupting Law 2018 </h5>- A hackathon between IT & Law students where the aim is to solve an issue in the legal industry using technology.
      <h5>Maurice Blackburn Hackathon 2018 </h5> - Alex and his team designed a tool that improved access to justice for unfair dismissal claims. 
      
      <h3>EXTRACURRICULAR</h3>
<h4>QUT Code Network 
2019 Vice President</h4>
Code Network is QUT's premier software
development student club. In 2019 Alex
held the position of Vice President, a
role that saw him organizing and
moderating the weekly guest lectures. He
was also instrumental in planning and
executing the 2019 Winter Hackathon.
QUT White Hats
<h4>2018 Co-Founder & General Committee</h4>
White Hats is the QUT Cybersecurity
student club. It organizes weekly
presentations from industry experts and
student researched topics. Alex helped
found the club in late 2018.

Web Developer January 2021 -> Now
         In this role Alex is part of the
         engineering team that builds and maintains
         iNSPIRETEK's sports analytics mobile
         application and data analytics pipeline.
         He primarily uses Angular and Nativescript
         to build a responsive mobile app that
         communicates with a backend hosted in
         Google Cloud Platform.
LitePages
Technical Co-Founder
June 2019 -> January 2021
         In 2018 Alex joined the LitePages team as
         the Lead Engineer and Technical Co-
         Founder. LitePages is a lead generation
         and marketing tool for tradesmen & small
         businesses.
         His role consisted of full stack
         development using Pug and NuxtJS for front
         end with a NodeJS 10 backend. He utilized
         AWS Elastic Beanstalk and CircleCI to
         build an automatic delivery pipeline for
         developement and production workloads.
         As the lead developer he was also
         responsible for training and managing a
         small team of developer interns.
Massachusetts Institute of Technology
StartMIT Participant
January 2020 -> January 2020
         StartMIT is a two-and-a-half week course
         where students hear from leaders in
         innovation, participate in activities to
         refine their projects, and attend events
         with alumni and other leaders in the MIT
         entrepreneurial ecosystem
  
    </div>
</div>
</template>
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
<script>
export default {


    
}
</script>