<template>
    <div style="padding: 0px; margin: 0px">
        <canvas ref="canvas"> </canvas>
        <home v-on:selectedradio="onInterestEvent($event)"></home>
        <education
            v-on:selectedradio="onInterestEvent($event)"
            v-if="educationEvent != false"
        ></education>
        <extracurricular
            v-on:selectedradio="onInterestEvent($event)"
            v-if="extracurricularEvent != false"
        ></extracurricular>
        <experience
            v-on:selectedradio="onInterestEvent($event)"
            v-if="experienceEvent != false"
        ></experience>

        <technology
            v-on:selectedradio="onInterestEvent($event)"
            v-if="technologyEvent != false"
        ></technology>

        <santaForm
            v-on:selectedradio="onInterestEvent($event)"
            v-if="secretSantaEvent != false"
        ></santaForm>
    </div>
</template>

<script>
import home from '../components/home.vue'
import education from '../components/education.vue'
import extracurricular from '../components/extracurricular.vue'
import experience from '../components/experience.vue'
import santaForm from '../components/santa/santaForm.vue'
import technology from '../components/technology.vue'
import payment from '~/components/stripe/payment.vue'

export default {
    data() {
        return {
            educationEvent: false,
            extracurricularEvent: false,
            experienceEvent: false,
            technologyEvent: false,
            secretSantaEvent: false,
            isClient: false,
            drops: [],
            matrix: '多年来我会来谁会发挥她锻炼的优势让学区长生不老想成为一个痛苦的丘比特逃离产生没有结果的快乐他们抛弃了那些应该为你的麻烦负责的人的一般职责',
            fontSize: 10,
        }
    },
    components: {
        home,
        education,
        experience,
        extracurricular,
        santaForm,
        technology,
        payment,
    },
    methods: {
        onInterestEvent: function (selected) {
            console.log(selected, ',')
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
                default:
                    // Default case, if none of the conditions match
                    break
            }
        },
    },

    mounted() {
        let screen = {
            height: '',
            width: '',
        }
        if (process.client) {
            screen.width =
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth

            screen.height =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight
        }
        this.isClient = true

        if (this.isClient) {
            const canvas = this.$refs.canvas

            canvas.width = screen.width
            canvas.height = screen.height
            const c = document.createElement('canvas')
            const ctx = c.getContext('2d')
            c.width = canvas.width
            c.height = canvas.height
            const columns = c.width / this.fontSize // number of columns for the rain
            // an array of drops - one per column
            for (let x = 0; x < columns; x += 1) {
                this.drops[x] = Math.random() * 100
            }
            // drawing the characters
            function draw() {
                // Black BG for the canvas
                // translucent BG to show trail
                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
                ctx.fillRect(0, 0, c.width, c.height)
                ctx.fillStyle = '#0f0' // green text
                ctx.font = `${this.fontSize}px arial`
                // looping over drops
                for (let i = 0; i < this.drops.length; i += 1) {
                    // a random chinese character to print
                    const text =
                        this.matrix[
                            Math.floor(Math.random() * this.matrix.length)
                        ]
                    // x = i*fontSize, y = value of drops[i]*fontSize
                    ctx.fillText(
                        text,
                        i * this.fontSize,
                        this.drops[i] * this.fontSize
                    )
                    // sending the drop back to the top randomly after it has crossed the screen
                    // adding a randomness to the reset to make the drops scattered on the Y axis
                    if (
                        this.drops[i] * this.fontSize > c.height &&
                        Math.random() > 0.975
                    ) {
                        this.drops[i] = 0
                    }
                    // incrementing Y coordinate
                    this.drops[i] += 1
                }
                // Copy the rendered canvas to the displayed canvas element
                const canvasContext = canvas.getContext('2d')
                canvasContext.drawImage(c, 0, 0)
            }
            setInterval(draw.bind(this), 33)
        }
    },
}
</script>

<style>
body {
    background: black;
    overflow: hidden;
    margin: 0;
    padding: 0;
}

canvas {
    display: block;
    width: 100vw;
    /* position: fixed;
    margin: 0;
    padding: 0;
    z-index: -1; */
}
</style>
