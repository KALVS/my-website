<template>
    <div style="padding: 0px; margin: 0px">
        <canvas id="c"></canvas>
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
    </div>
</template>

<script>
import home from '../components/home.vue'

import education from '../components/education.vue'
import extracurricular from '../components/extracurricular.vue'
import experience from '../components/experience.vue'

export default {
    data() {
        return {
            educationEvent: false,
            extracurricularEvent: false,
            experienceEvent: false,
            technologyEvent: false,
        }
    },
    components: { home, education, experience, extracurricular },
    methods: {
        onInterestEvent: function (selected) {
            console.log(selected, ',')
            if (selected === 'education') {
                this.selected === 'education'
                this.educationEvent = selected
                this.extracurricularEvent = false
                this.experienceEvent = false
                this.technologyEvent = false
            } else if (selected === 'extracurricular') {
                this.selected === 'extracurricular'
                this.extracurricularEvent = selected
                this.experienceEvent = false
                this.educationEvent = false
                this.technologyEvent = false
            } else if (selected === 'experience') {
                this.selected === 'experiencecurricular'
                this.experienceEvent = selected
                this.extracurricularEvent = false
                this.educationEvent = false
                this.technologyEvent = false
            } else if (selected === 'technology') {
                this.selected === 'technology'
                this.technologyEvent = selected
                this.experienceEvent = false
                this.extracurricularEvent = false
                this.educationEvent = false
            } else {
                console.log("This shouldn't happen....")
                this.educationEvent = false
                this.experienceEvent = false
                this.extracurricularEvent = false
                this.technologyEvent = false
            }
        },
    },

    mounted() {
        // geting canvas by Boujjou Achraf
        const c = document.getElementById('c')
        const ctx = c.getContext('2d')

        // making the canvas full screen
        c.height = window.innerHeight
        c.width = window.innerWidth

        // chinese characters - taken from the unicode charset
        let matrix =
            '多年来我会来谁会发挥她锻炼的优势让学区长生不老想成为一个痛苦的丘比特逃离产生没有结果的快乐他们抛弃了那些应该为你的麻烦负责的人的一般职责'
        // eslint-disable-next-line max-len
        // var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        // converting the string into an array of single characters
        matrix = matrix.split('')

        const fontSize = 10
        const columns = c.width / fontSize // number of columns for the rain
        // an array of drops - one per column
        const drops = []
        // x below is the x coordinate
        // 1 = y co-ordinate of the drop(same for every drop initially)
        for (let x = 0; x < columns; x += 1) drops[x] = Math.random() * 100

        // drawing the characters
        function draw() {
            // Black BG for the canvas
            // translucent BG to show trail
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
            ctx.fillRect(0, 0, c.width, c.height)

            ctx.fillStyle = '#0f0' // green text
            ctx.font = `${fontSize}px arial`
            // looping over drops
            for (let i = 0; i < drops.length; i += 1) {
                // a random chinese character to print
                const text = matrix[Math.floor(Math.random() * matrix.length)]
                // x = i*fontSize, y = value of drops[i]*fontSize
                ctx.fillText(text, i * fontSize, drops[i] * fontSize)

                // sending the drop back to the top randomly after it has crossed the screen
                // adding a randomness to the reset to make the drops scattered on the Y axis
                if (drops[i] * fontSize > c.height && Math.random() > 0.975)
                    drops[i] = 0

                // incrementing Y coordinate
                drops[i] += 1
            }
        }

        setInterval(draw, 33)
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
    position: fixed;
    margin: 0;
    padding: 0;
    z-index: -1;
}
</style>
