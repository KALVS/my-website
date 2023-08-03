<template>
  <div class="window glass transparent" style="width 60%">
    <div class="title-bar">
      <div class="title-bar-text">Technology</div>
      <div class="title-bar-controls">
        <button
          aria-label="Close"
          @click="$emit('selectedradio', false)"
        ></button>
      </div>
    </div>
    <div class="window-body">
      <h5 style="font-size: 16px">
        <strong> Tech Stack and knowledge:</strong>
      </h5>

      <p>
        <strong> Web app development: </strong> <br />
        Angular, PrimeNG
      </p>

      <p>
        <strong> Mobile app development:</strong>
        <br />
        Angular, Ionic Backend development: Java, SpringBoot, SQL (Postgres)
      </p>
      <p>
        <strong> DevOps:</strong>
        <br />
        GitHub, CircleCI, SonarCloud, AWS CDK/CloudFormation
      </p>
      <p><strong> E2E testing:</strong> <br />Cypress</p>
      <p>
        <strong> Responsibilities: </strong>
        <br />
        Daily scrum and Jira kanban management
        <br />
        Roadmap planning and estimatation
        <br />
        High level and detailed design of key features
        <br />
        Bug testing and fixes
        <br />
        Codereviews Monthly team retrospectives
      </p>
      <p>
        <strong> Projects: </strong>
        <br />
        Rebuilt biometric data collection of existing NativeScript mobile app
        <br />
        Major upgrades of club management application <br />
        Creation of SpringBoot REST APIs to support all applications
        <br />
        Complete rebuild of mobile app using Ionic Integration with wearable
        providers
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
.transparent::before,
.transparent > .title-bar {
  background-color: transparent;
}

.window {
  margin-top: auto;
  margin-bottom: auto;
  position: absolute;
  left: 20%;
  top: 10%;
}
</style>
