<template lang="pug">
.section
    .tariffs-info
        info-subcomponent.anim-content__opacity.anim-content__translateY(
            :content="content.info"
            :prize="content.prize"
            data-scroll 
        )
    .tariffsList-wrap
        .tariffsList
            tariffsCart-subcomponent(
                v-for="(item, index) in content.tariffsList"
                :key="index" 
                :content="item"
                :index="index"
            )
</template>

<script>
import tariffsCartSubcomponent from '~/components/tariffsCart-subcomponent.vue'
import infoSubcomponent from '~/components/info-subcomponent.vue'
export default {
    components: {
        tariffsCartSubcomponent,
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
    // min-height: 100vh;
    width: 100%;
    padding: desktop-vw(90) desktop-vw(112) desktop-vw(90) desktop-vw(48);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tariffs-info {
    max-width: desktop-vw(407);
    margin-bottom: desktop-vw(64);
    text-align: center;
}

.tariffsList {
    display: flex;
    grid-gap: desktop-vw(32);
}

@media screen and (max-width: $tablet) {
    .tariffsList-wrap {
        width: 100%;
        overflow-x: auto;
        padding-bottom:  tablet-vw(20);
        height: auto;
    }

    .section {
        padding: tablet-vw(90) tablet-vw(32) tablet-vw(90) tablet-vw(32);
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
    }

    .tariffs-info {
        width: 100%;
        max-width: unset;
        margin-bottom: tablet-vw(72);
    }

    .tariffsList {
        display: flex;
        justify-content: center;
        grid-gap: tablet-vw(32);
        min-width: tablet-vw(990);
    }
}

@media screen and (max-width: $mobile) {

    .section {
        min-height: 0;
    }

    .tariffsList-wrap {
        width: 100%;
        overflow-x: visible;
        overflow-y: visible;
        padding-bottom:  mobile-vw(20);
    }

    .section {
        padding: mobile-vw(48) mobile-vw(24) mobile-vw(48) mobile-vw(24);
    }

    .tariffs-info {
        max-width: mobile-vw(407);
        margin-bottom: mobile-vw(40);
    }

    .tariffsList {
        display: flex;
        flex-direction: column;
        grid-gap: mobile-vw(24);
        min-width: auto;
    }
}

</style>