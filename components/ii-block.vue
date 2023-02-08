<template lang="pug">
.section
    .ii-bg
        img(src="~/assets/img/fonII.png")
    .ii-info(v-if="content")
        info-subcomponent.anim-content__opacity.anim-content__translateY(
            :content="content.info"
            :btn="'оформить подписку'"
            type="iiBlock"
            data-scroll 
        )
    .ii-chat.anim-content__opacity(
        data-scroll
        v-if="content && content.info.chatAnimate"
    )
        chat-animation
    .ii-mobile.anim-content__opacity(
        data-scroll
        v-if="content && content.info.mobile"
    )
        .ii-image
            img(
                src="~/assets/img/mobile.png"
                alt="mobile"
            )

</template>

<script>
import infoSubcomponent from '~/components/info-subcomponent.vue'
import chatAnimation from '~/components/chat-animation.vue'
export default {
    components: {
        infoSubcomponent,
        chatAnimation
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
    padding: desktop-vw(90) desktop-vw(94) desktop-vw(90) desktop-vw(94);
    // height: desktop-vw(1253);
    display: flex;
    //justify-content: center;
    justify-content: space-around;
    align-items: center;
    grid-gap: desktop-vw(100);
}

.ii-bg {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    img {
        width: 100%;
    }
}

.ii-info {
    max-width: desktop-vw(545);
    width: 100%;
    // position: absolute;
    // bottom: desktop-vw(326);
    // left: desktop-vw(94);
    margin-top: desktop-vw(30);
    height: fit-content;
}

.ii-chat {
    // position: absolute;
    // top: desktop-vw(424);
    // right: desktop-vw(148);
    width: desktop-vw(556);
}

.ii-image {
    pointer-events: none;
    user-select: none;
    width: desktop-vw(275);
    height:  desktop-vw(560);

    img {
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
}

@media screen and (max-width: $tablet) {
    .section {
        padding: tablet-vw(90) tablet-vw(56) tablet-vw(90) tablet-vw(56);
        display: flex;
        flex-direction: column-reverse;
        height: auto;
        min-height: 0;
    }

    .ii-bg {
        display: none;
    }

    .ii-info {
        position: relative;
        max-width: tablet-vw(590);
        bottom: auto;
        left: auto;
        margin: 0 auto;
        
    }

    .ii-chat {
        position: relative;
        top: auto;
        right: auto;
        max-width: unset;
        width: 100%;
        margin: 0;
        height: tablet-vw(300);
    }

    .ii-image {
        width: tablet-vw(275);
        height:  tablet-vw(560);
    }
}

@media screen and (max-width: $mobile) {
    .section {
        padding: mobile-vw(48) mobile-vw(24) mobile-vw(48) mobile-vw(24);
        display: flex;
        flex-direction: column-reverse;
        height: auto;
    }

    .ii-info {
        position: relative;
        max-width: mobile-vw(545);
        bottom: auto;
        left: auto;
    }

    .ii-chat {
        position: relative;
        top: auto;
        right: auto;
        // margin: 0 auto mobile-vw(39) auto;
        max-width: 100%;
        height: mobile-vw(250);
    }

    .ii-image {
        width: mobile-vw(206);
        height:  mobile-vw(420);
    }
}

</style>