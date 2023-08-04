<template>
  <div class="window glass transparent" style="">
    <div class="title-bar">
      <div class="title-bar-text">
        {{ home.tabs.about }}
      </div>
      <div class="title-bar-controls">
        <button aria-label="Minimize" />
        <button aria-label="Close" />
      </div>
    </div>
    <div class="window-body">
      <menu role="tablist">
        <button
          id="meTab"
          role="tab"
          aria-controls="me"
          aria-selected="true"
          @click="toggleTab(1)"
        >
          {{ home.tabs.about }}
        </button>
        <button
          id="funTab"
          role="tab"
          aria-controls="fun"
          aria-selected="false"
          @click="toggleTab(3)"
        >
          {{ home.tabs.fun }}
        </button>
      </menu>
      <article id="me" role="tabpanel">
        <div id="wrapper">
          <div id="left">
            <h4 style="margin: 0">
              {{ home.about.name }}
            </h4>
            <h5 style="margin: 0">
              {{ home.about.role }}
            </h5>
            <h5 style="margin: 0">
              <a :href="home.about.linkedIn.url">{{
                home.about.linkedIn.text
              }}</a>
            </h5>
            <h5 style="margin: 0">
              <a :href="home.about.github.url">{{ home.about.github.text }}</a>
            </h5>
          </div>
          <div id="right">
            <img
              src="../assets/pictures/PictureofAlex.jpg"
              :alt="home.pictureAlt"
              class="profilePicture"
              height="100px"
            />
          </div>
        </div>
        <div id="links">
          <fieldset>
            <legend>{{ home.about.intro.name }}</legend>
            <div class="field-row">
              <button
                :id="home.links.education"
                @click="$emit('selectedradio', 'education')"
              >
                {{ home.links.education }}
              </button>
            </div>
            <div class="field-row">
              <button
                :id="home.links.extracurricular"
                @click="$emit('selectedradio', 'extracurricular')"
              >
                {{ home.links.extracurricular }}
              </button>
            </div>
            <div class="field-row">
              <button
                :id="home.links.experience"
                @click="$emit('selectedradio', 'experience')"
              >
                {{ home.links.experience }}
              </button>
            </div>
            <div class="field-row">
              <button
                :id="home.links.technology"
                @click="$emit('selectedradio', 'technology')"
              >
                {{ home.links.technology }}
              </button>
            </div>
          </fieldset>
        </div>
      </article>
      <article id="fun" role="tabpanel" hidden>
        <fieldset>
          <div class="field-row">
            <button
              :id="home.fun.secretSanta"
              @click="$emit('selectedradio', 'secretSanta')"
            >
              {{ home.fun.secretSanta }}
            </button>
          </div>
        </fieldset>
      </article>
      <section class="field-row" style="justify-content: flex-end">
        <button>
          <a :href="'mailto:' + home.contact.email" class="mailLink">
            {{ home.contact.okay }}
          </a>
        </button>
        <button>{{ home.contact.cancel }}</button>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { home } from '../contants/copy'

export default {
  name: 'HomeComponent',
  data() {
    return {
      home,
      selected: false
    }
  },
  methods: {
    toggleTab(number) {
      const me = document.getElementById('me') as HTMLElement
      const fun = document.getElementById('fun') as HTMLElement
      const meTab = document.getElementById('meTab') as HTMLElement
      const funTab = document.getElementById('funTab') as HTMLElement
      switch (number) {
        case 1:
          me.hidden = false
          meTab.ariaSelected = 'true'
          fun.hidden = true
          funTab.ariaSelected = 'false'
          break
        case 2:
          me.hidden = true
          meTab.ariaSelected = 'false'
          fun.hidden = true
          funTab.ariaSelected = 'false'
          break
        case 3:
          me.hidden = true
          meTab.ariaSelected = 'false'
          fun.hidden = false
          funTab.ariaSelected = 'true'
          break

        default:
          break
      }
    }
  }
}
</script>

<style>
.mailLink {
  color: inherit;
  text-decoration: none;
}

#wrapper {
  display: flex;
  width: 100%;
}

#left {
  flex: 0 0 65%;
}

#right {
  flex: 1;
  float: right;
  margin-right: 0px;
}

#headerContainer {
  height: 100px;
  width: 100%;
}

.profilePicture {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#titleContainer {
  width: 50%;
}

#nameHeader {
  margin-top: 15px;
  height: 20px;
}

#links {
  margin-top: 10px;
}
</style>
