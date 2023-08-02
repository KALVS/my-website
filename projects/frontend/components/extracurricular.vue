<template>
    <div class="window glass transparent" style="width 60%">
        <div class="title-bar">
            <div class="title-bar-text">Extra Curricular Activities</div>
            <div class="title-bar-controls">
                <button
                    aria-label="Close"
                    @click="$emit('selectedradio', false)"
                ></button>
            </div>
        </div>
        <div class="window-body">
            <h5>QUT Code Network 2019 Vice President</h5>
            Code Network is QUT's premier software development student club. In
            2019 Alex held the position of Vice President, a role that saw him
            organizing and moderating the weekly guest lectures. He was also
            instrumental in planning and executing the 2019 Winter Hackathon.
            QUT White Hats
            <h5>2018 Co-Founder & General Committee</h5>
            White Hats is the QUT Cybersecurity student club. It organizes
            weekly presentations from industry experts and student researched
            topics. Alex helped found the club in late 2018.
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
