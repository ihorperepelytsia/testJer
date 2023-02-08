<template lang="pug">
.section
    .poster-content-bottom(v-if="content")
        info-subcomponent(
            :content="content.info"
            :type="'main'"
            data-scroll
        )
</template>

<script>
import infoSubcomponent from '~/components/info-subcomponent.vue'
export default {
    components: {
        infoSubcomponent
    },
    props: [
        'content'
    ],
    data(){
        return{
        }
    }
}
</script>

<style lang="scss" scoped>
.section {
    position: relative;
    min-height: 100vh;
    width: 100%;
    padding: desktop-vw(124) desktop-vw(48) desktop-vw(63) desktop-vw(48);
}

.poster-content-bottom {
    position: absolute;
    bottom: desktop-vw(63);
    left: desktop-vw(48);
    max-width: desktop-vw(452);
    z-index: 2;
}

@media screen and (max-width: $tablet) {
    .poster-content-bottom {
        bottom: tablet-vw(50);
        left: tablet-vw(57);
        max-width: tablet-vw(452);
    }
}

@media screen and (max-width: $mobile) {
    .poster-content-bottom {
        bottom: mobile-vw(65);
        left: mobile-vw(25);
        max-width: mobile-vw(352);
    }
}

</style>