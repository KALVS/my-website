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
        <button
          role="tab"
          id="meTab"
          aria-controls="me"
          @click="toggleTab(1)"
          aria-selected="true"
        >
          About me
        </button>
        <button
          role="tab"
          id="projectTab"
          aria-controls="project"
          @click="toggleTab(2)"
          aria-selected="false"
        >
          Projects
        </button>
        <button
          role="tab"
          id="funTab"
          aria-controls="fun"
          @click="toggleTab(3)"
          aria-selected="false"
        >
          Fun stuff
        </button>
      </menu>
      <article role="tabpanel" id="me">
        <div id="wrapper">
          <div id="left">
            <h4 style="margin: 0">Alex Holm</h4>
            <h5 style="margin: 0">Software Engineer</h5>
            <h5 style="margin: 0">
              <a href="http://linkedin.com/in/alex-holm-4b10a4175">LinkedIn</a>
            </h5>
            <h5 style="margin: 0">
              <a href="http://github.com/KALVS"> Github </a>
            </h5>
          </div>
          <div id="right">
            <img
              src="../assets/pictures/PictureofAlex.jpg"
              alt="A picture of Alex"
              class="profilePicture"
              height="100px"
            />
          </div>
        </div>
        <div id="links">
          <fieldset>
            <legend>Lets get some data:</legend>
            <div class="field-row">
              <button
                id="inputRadioButton"
                @click="$emit('selectedradio', 'education')"
              >
                Education
              </button>
            </div>
            <div class="field-row">
              <button
                id="inputRadioButton"
                @click="$emit('selectedradio', 'extracurricular')"
              >
                Extracurricular
              </button>
            </div>
            <div class="field-row">
              <button
                id="inputRadioButton"
                @click="$emit('selectedradio', 'experience')"
              >
                Experience
              </button>
            </div>
          </fieldset>
        </div>
      </article>

      <article role="tabpanel" hidden id="project">
        <!-- // eslint-disable-next-line max-len -->
        <img
          style="width: 100%"
          src="https://upload.wikimedia.org/wikipedia/commons/e/e0/SNice.svg"
        />
      </article>

      <article role="tabpanel" hidden id="fun">
        <p>
          You create the content for each tab by using an
          <code>article</code> tag.
        </p>
        <iframe
          width="100%"
          height="200"
          src="https://www.youtube.com/embed/TODJBQ0tnow"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
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
  width: 50vw;
  max-height: 600px;
}

@media only screen and (max-width: 600px) {
  .window {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60vw;
    max-height: 500px;
  }
}

#wrapper {
  display: flex;
  width: 60%;
}

#left {
  flex: 0 0 65%;
}

#right {
  flex: 1;
}

#headerContainer {
  height: 100px;
  width: 100%;
  background-color: palegoldenrod;
  /* margin-top: -30px; */
}

.profilePicture {
  display: block;
  background-color: blue;
  margin-left: auto;
  margin-right: auto;
}

#titleContainer {
  /* background-color: firebrick; */
  width: 50%;
  background-color: rebeccapurple;
}

#nameHeader {
  margin-top: 15px;
  height: 20px;
  background-color: saddlebrown;
}

#links {
  margin-top: 10px;
}
</style>

<script>
export default {
  data() {
    return {
      selected: false,
    };
  },
  methods: {
    submitRadio() {
      console.log("aaah");
    },
    toggleTab(number) {
      const me = document.getElementById("me");
      const project = document.getElementById("project");
      const fun = document.getElementById("fun");
      const meTab = document.getElementById("meTab");
      const projectTab = document.getElementById("projectTab");
      const funTab = document.getElementById("funTab");
      switch (number) {
        case 1:
          me.hidden = false;
          meTab.ariaSelected = true;
          project.hidden = true;
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
