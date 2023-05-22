<script>
import Cookies from 'js-cookie'
export default {
    mounted() {
        const storedParticipants = Cookies.get('participants')
        console.log(storedParticipants)
        if (storedParticipants) {
            this.confirmedParticipants = decodeURI(storedParticipants)
        }
        console.log('2participants', this.confirmedParticipants)

        console.log('Success')
        // console.log('participants()', participants())
        // axios
        //     .post(process.env.SECRET_SANTA_ENDPONT, this.participants)
        //     .then((response) => {
        //         // Handle the response from Lambda if needed
        //         console.log(response.data)
        //     })
        //     .catch((error) => {
        //         // Handle the error if the request fails
        //         console.error(error)
        //     })
        this.$router.push('/')
    },
}
</script>

<template></template>
