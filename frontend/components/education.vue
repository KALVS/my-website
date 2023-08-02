<template>
    <div class="window glass transparent" style="width 60%">
        <div class="title-bar">
            <div class="title-bar-text">Educational Activities</div>
            <div class="title-bar-controls">
                <button
                    aria-label="Close"
                    @click="$emit('selectedradio', false)"
                ></button>
            </div>
        </div>
        <div class="window-body">
            <h5>
                Bachelor of Information Technology Major: Computer Science
                February 2017 -> November 2020
            </h5>
            During his time at QUT, Alex immersed himself in the Computer
            Science & Entrepreneurship ecosystems. This exposed him to running
            student clubs, working with startups and participating in a wide
            array of university programs including:
            <br />
            <h5>Disrupting Law 2018</h5>
            - A hackathon between IT & Law students where the aim is to solve an
            issue in the legal industry using technology.
            <h5>Maurice Blackburn Hackathon 2018</h5>
            - Alex and his team designed a tool that improved access to justice
            for unfair dismissal claims.
            <br />
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
<script lang="ts">
export default {}
</script>
