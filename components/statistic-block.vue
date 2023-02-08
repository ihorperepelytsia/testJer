<template lang="pug">
.section
    .staticticInfo.anim-content__opacity.anim-content__translateY(
        data-scroll 
    )
        info-subcomponent(
            :content="content.info" 
        )
    .propertyList-wrap   
        .propertyList
            .propertyList_borderLeft(data-scroll)
            statItem-subcomponent(
                v-for="(item, index) in content.listStat"
                :key="index" 
                :content="item"
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
    // min-height: 100vh;
    width: 100%;
    padding: desktop-vw(90) desktop-vw(48) desktop-vw(90) desktop-vw(48);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.staticticInfo {
    max-width: desktop-vw(558);
    margin: 0 auto desktop-vw(76) auto;
}

.propertyList-wrap {
    padding-bottom: desktop-vw(20);
    width: max-content;
    margin: 0 auto;
}

.propertyList {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, desktop-vw(399)) minmax(0, desktop-vw(399)) minmax(0, desktop-vw(399));
    min-width: desktop-vw(1179);
    &_borderLeft {
        display: block;
        width: 1px;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #FFFFFF;
        transform: translateX(35000%);
        opacity: 0;

        &.is-inview {
            animation: visibleRight 1s forwards;
        }
    }
}

@keyframes visibleRight {
  100%{opacity: 1; transform: translateX(0);}
}

@media screen and (max-width: $tablet) {

    .propertyList-wrap {
        padding-bottom: tablet-vw(20);
        overflow-x: auto;
        width: 100%;
    }

    .section {
        padding: tablet-vw(90) 0 tablet-vw(90) 0;
    }

    .staticticInfo {
        max-width: tablet-vw(558);
        margin-bottom: tablet-vw(40);
        padding-left: tablet-vw(48);
    }

    .propertyList {
        min-width: tablet-vw(1179);
        grid-template-columns: 1fr 1fr 1fr;
        padding-left: tablet-vw(48);

        &_borderLeft {
            left: tablet-vw(48);
        }
    }

}

@media screen and (max-width: $mobile) {
    .propertyList-wrap {
        padding-bottom: mobile-vw(20);
        overflow-x: auto;
    }

    .section {
        padding: mobile-vw(48) 0 mobile-vw(48) 0;
        min-height: 0;
    }

    .staticticInfo {
        max-width: mobile-vw(558);
        margin-bottom: mobile-vw(40);
        padding-left: mobile-vw(24);
    }

    .propertyList {
        min-width: mobile-vw(900);
        grid-template-columns: 1fr 1fr 1fr;
        padding-left: mobile-vw(24);

        &_borderLeft {
            left: mobile-vw(24);
        }
    }
}

</style>