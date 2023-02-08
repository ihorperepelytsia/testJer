<template lang="pug">
.section.team
    .team__info(data-scroll)
        info-subcomponent.anim-content__opacity.anim-content__translateY(
            :content="content.info"
            data-scroll 
        )
    .taem-scroll
        .team__wrap
            team-card(
                v-for="item in content.teams"
                :key="item.id"
                :trader="item"
                data-scroll
                data-scroll-offset="20%, 80%"
            )
</template>

<script>
import infoSubcomponent from '~/components/info-subcomponent.vue'
import teamCard from '~/components/team-card.vue'

export default {
    components: {
        infoSubcomponent,
        teamCard
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
    padding: desktop-vw(90) desktop-vw(48) desktop-vw(90) desktop-vw(48);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.team {
    
    &__info {
        max-width: desktop-vw(407);
        margin-bottom: desktop-vw(64);
    }

    &__wrap {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        max-width: desktop-vw(970);
        grid-gap: desktop-vw(32);
        gap: desktop-vw(32);
    }
}

@media screen and (max-width: $tablet) {
    .section {
        padding: tablet-vw(90) tablet-vw(32) tablet-vw(90) tablet-vw(32);
    }

    .taem-scroll {
        width: 100%;
    }

    .team {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        

        &__info {
            position: relative;
            max-width: 100%;
            bottom: auto;
            left: auto;
            margin: 0 auto;
        }

        &__wrap {
            min-width: tablet-vw(704);
            margin-top: tablet-vw(72);
            position: relative;
            display: flex;
            max-width: none;
            padding-top: 0;
            padding-right: 0;
            grid-gap: tablet-vw(24);
        }
    }
}

@media screen and (max-width: $mobile) {
    .section {
        padding: mobile-vw(48) 0 mobile-vw(48) 0;
        min-height: 0;
    }

    .taem-scroll {
        overflow-x: scroll;
        overflow-y: visible;
        width: 100%;
        padding-bottom: mobile-vw(20);
        padding-left: mobile-vw(32);
    }

    .team {
        display: flex;
        flex-direction: column;
        

        &__info {
            position: relative;
            max-width: mobile-vw(407);
            bottom: auto;
            left: auto;
        }

        &__wrap {
            min-width: mobile-vw(704);
            margin-top: mobile-vw(42);
            overflow: visible;
            position: relative;
            display: flex;
            max-width: none;
            padding-top: 0;
            padding-right: 0;
            grid-gap: mobile-vw(24);
        }
    }
}

</style>