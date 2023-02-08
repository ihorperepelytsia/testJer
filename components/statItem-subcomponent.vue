<template lang="pug">
.statItem.falseOpacity(
    v-if="content"
    data-scroll
)   
    .statItem__borderLeft
    .statItem__img
        img(
            :src="content.img"
        )
    .statItem__info
        .statItem__number {{ content.single }}
        .statItem__text {{ content.text }}
    .statItem__borderRight
</template>

<script>

export default {
    props: [
        'content',
    ],
    data(){
        return{
        }
    }
}
</script>

<style lang="scss" scoped>
@keyframes visibleRight {
  100%{opacity: 1; transform: translate3D(0, 0, 0);}
}
.statItem {
    min-height: desktop-vw(231);
    padding: 0 desktop-vw(40);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    transform: translate3D(80%, 0, 0);

    &.is-inview {
        &:nth-child(2) {
            animation: visibleRight 1s forwards;
            animation-delay: .1s;
        }

        &:nth-child(3) {
            animation: visibleRight 1s forwards;
            animation-delay: .2s;
        }

        &:nth-child(4) {
            animation: visibleRight 1s forwards;
            animation-delay: .3s;
        }
        
    }

    & > div:first-child {
        position: absolute;
    }

    &__borderRight {
        display: block;
        width: 1px;
        height: 100%;
        position: absolute;
        right: 0;
        bottom: 0;
        background: #FFFFFF;
        // transform: translateX(10000%)
    }

    &:first-child {
        .statItem__borderLeft {
            display: block;
            width: 1px;
            height: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            // background: #FFFFFF;
            // transform: translateX(10000%)
        }
    } 

    &__img {
        max-width: desktop-vw(85);
        img {
            width: 100%;
        }
    }

    &__number {
        font-weight: 700;
        font-size: desktop-vw(48);
        line-height: 120%;
        text-align: center;
        color: #FFFFFF;
        text-align: left;
    }

    &__text {
        font-style: normal;
        font-weight: 300;
        font-size: desktop-vw(16);
        line-height: 158%;
        color: #FFFFFF;
        text-align: left;
    }

}
.falseOpacity {
    opacity: 0;
}

@media screen and (max-width: $tablet) {
    .statItem {
        min-height: tablet-vw(231);
        padding: 0 tablet-vw(40);

        &__img {
            max-width: tablet-vw(85);
            img {
                width: 100%;
            }
        }

        &__number {
            font-size: tablet-vw(48);
        }

        &__text {
            font-size: tablet-vw(16);
        }
    }
}

@media screen and (max-width: $mobile) {
    .statItem {
        min-height: mobile-vw(231);
        padding: 0 mobile-vw(40);

        &__img {
            max-width: mobile-vw(85);
            img {
                width: 100%;
            }
        }

        &__number {
            font-size: mobile-vw(32);
        }

        &__text {
            font-size: mobile-vw(16);
        }

    }
}

</style>