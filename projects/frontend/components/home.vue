<template>
  <div class="window glass transparent" style="">
    <div class="title-bar">
      <div class="title-bar-text"></div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Restore"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body">
      <menu role="tablist">
        <button role="tab" id="meTab" aria-controls="me"
            @click="toggleTab(1)" aria-selected="true">About me</button>
        <button role="tab" id="projectTab" aria-controls="project"
            @click="toggleTab(2)" aria-selected="false">Projects</button>
        <button role="tab" id="funTab" aria-controls="fun"
            @click="toggleTab(3)" aria-selected="false">Fun stuff</button>
      </menu>
      <article role="tabpanel" id="me">
        <div class="container">
          <div id=headerContainer>
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/SNice.svg"
              alt="A picture of Alex" height="50px" width="50px" class="">
              <div width="25%">
                <h4 id="nameHeader" >Alex Holm</h4>
                <h6 id="nameHeader" >Software Engineer</h6>
              </div>
            <!-- <div id="titleHeader">
            </div> -->
          </div>
          <div id="links">
            <fieldset>
              <legend>Show:</legend>
              <div class="field-row">
                <input id="radio25" type="radio" name="fieldset-example2" @click="testClick()">
                <label for="radio25">Education</label>
              </div>
              <div class="field-row">
                <input id="radio26" type="radio" name="fieldset-example2">
                <label for="radio26">Extracurricular</label>
              </div>
              <div class="field-row">
                <input id="radio27" type="radio" name="fieldset-example2">
                <label for="radio27">Experience</label>
              </div>
              <div class="field-row">
                <input id="radio28" type="radio" name="fieldset-example2">
                <label for="radio28">All of the above</label>
              </div>
            </fieldset>
          </div>
        </div>
        <button disabled="disabled" id="inputRadioButton" @click="submitRadio()"> wtf</button>
        <section class="field-row">
          <button>Reset Alarm...</button>
          <label>Try this to get some attention</label>
        </section>
      </article>

      <article role="tabpanel" hidden id="project">

        <!-- // eslint-disable-next-line max-len -->
        <img style="width: 100%" src="https://upload.wikimedia.org/wikipedia/commons/e/e0/SNice.svg" />
      </article>

      <article role="tabpanel" hidden id="fun">
        <p>
          You create the content for each tab by using an <code>article</code> tag.
        </p>
        <iframe width="100%" height="200" src="https://www.youtube.com/embed/TODJBQ0tnow" frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </article>
      <section class="field-row" style="justify-content: flex-end">
        <button>OK</button>
        <button>Cancel</button>
      </section>
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
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40vw
}

#headerContainer {
  height:100px;
  width: 100%;
  float: left;
  background-color: red;
  /* margin-top: -30px; */
}

.profilePicture {
  float:left
}

#titleHeader  {
  height:100px;
  width: 25%;
  float: right;
  background-color: blue;
  /* margin-top: -30px; */
}


#nameHeader {
  margin-top:0px;
  float:right;
  height: 20px;
}

#jobHeader {
  margin-bottom:0px;
  float:right;
  height: 20px;
}
#links {
  margin-top: 10px;
}

</style>

<script>
export default {
  data() {
  },
  methods: {
    testClick() {
    },
    toggleTab(number) {
      const me = document.getElementById('me');
      const project = document.getElementById('project');
      const fun = document.getElementById('fun');
      const meTab = document.getElementById('meTab');
      const projectTab = document.getElementById('projectTab');
      const funTab = document.getElementById('funTab');
      switch (number) {
        case 1:
          me.hidden = false;
          project.ariaSelected = true;
          fun.hidden = true;
          projectTab.ariaSelected = false;
          fun.hidden = true;
          funTab.ariaSelected = false;
          break;
        case 2:

          me.hidden = true;
          meTab.ariaSelected = false;
          project.hidden = false;
          projectTab.ariaSelected = true;
          fun.hidden = true;
          funTab.ariaSelected = false;
          break;
        case 3:
          me.hidden = true;
          meTab.ariaSelected = false;
          project.hidden = true;
          projectTab.ariaSelected = false;
          fun.hidden = false;
          funTab.ariaSelected = true;
          break;

        default:
          break;
      }
    },
  },
};

</script>
