<template>
    <div class="window glass transparent" style="">
        <div class="title-bar">
            <div class="title-bar-text"></div>
            <div class="title-bar-controls">
                <button aria-label="Minimize"></button>
                <!-- <button aria-label="Maximize"></button>
        <button aria-label="Restore"></button> -->
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
                <!-- <button
                    role="tab"
                    id="projectTab"
                    aria-controls="project"
                    @click="toggleTab(2)"
                    aria-selected="false"
                >
                    Projects
                </button> -->
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
                            <a href="http://linkedin.com/in/alex-holm-4b10a4175"
                                >LinkedIn</a
                            >
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
                        <legend>What are you interested in knowing?</legend>
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
                                @click="
                                    $emit('selectedradio', 'extracurricular')
                                "
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
                        <div class="field-row">
                            <button
                                id="inputRadioButton"
                                @click="$emit('selectedradio', 'technology')"
                            >
                                Technologies
                            </button>
                        </div>
                    </fieldset>
                </div>
            </article>

            <!-- <article role="tabpanel" hidden id="project">
                // eslint-disable-next-line max-len
                <p>Alex enjoys 3d printing, travelling and is eager to learn</p>
                <p></p>
            </article> -->

            <article role="tabpanel" hidden id="fun">
                <fieldset>
                    <div class="field-row">
                        <button
                            @click="$emit('selectedradio', 'secretSanta')"
                            id="secretSanta"
                        >
                            Secret Santa as a service
                        </button>
                    </div>
                </fieldset>
            </article>
            <section class="field-row" style="justify-content: flex-end">
                <button>
                    <a
                        class="mailLink"
                        href="mailto:alexholmsoftware@gmail.com"
                    >
                        Okay
                    </a>
                </button>
                <button>Cancel</button>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            selected: false,
        }
    },
    methods: {
        submitRadio() {
            console.info('Hello ${User}, you sure know how to press my buttons')
        },
        toggleTab(number) {
            const me = document.getElementById('me') as HTMLElement
            const project = document.getElementById('project') as HTMLElement
            const fun = document.getElementById('fun') as HTMLElement
            const meTab = document.getElementById('meTab') as HTMLElement
            const projectTab = document.getElementById(
                'projectTab'
            ) as HTMLElement
            const funTab = document.getElementById('funTab') as HTMLElement
            switch (number) {
                case 1:
                    me.hidden = false
                    meTab.ariaSelected = 'true'
                    // project.hidden = true
                    // projectTab.ariaSelected = false
                    fun.hidden = true
                    funTab.ariaSelected = 'false'
                    break
                case 2:
                    me.hidden = true
                    meTab.ariaSelected = 'false'
                    // project.hidden = false
                    // projectTab.ariaSelected = true
                    fun.hidden = true
                    funTab.ariaSelected = 'false'
                    break
                case 3:
                    me.hidden = true
                    meTab.ariaSelected = 'false'
                    // project.hidden = true
                    // projectTab.ariaSelected = false
                    fun.hidden = false
                    funTab.ariaSelected = 'true'
                    break

                default:
                    break
            }
        },
    },
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
