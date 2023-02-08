<template lang="pug">
.section
    //- .outer
    //-     #renderModule2.mainContainer(ref="renderContainer")
    .circles.anim-content__opacity(
        data-scroll
    )
        img.circles__fon(src="~/assets/img/circles-fon.png")
        .circles__centerInfo.anim-content__opacity.anim-content__translateY(
            data-scroll
            v-if="content"
        )
            .circles__title(
                v-if="content.title" 
            ) {{ content.title }}
            .circles__text(
                v-if="content.text"
            ) {{ content.text }}
        .circles__list-ball
            ball-subcomponent(
                v-for="(item, index) in content.listBall"
                :key="index" 
                :content="item"
            )
</template>

<script>
// import {
//     InitThree,
//     InitScene,
//     frameRednererStart,
//     SetScrollPage,
//     SetScroll,
//     SetMousePos,
//     CheckResizingWindow,
//     LoadCallBack,
//     CameraController
// } from '~/plugins/renderBuble3.js';
// function HandleMouseMove(event) {
//     let x = (event.clientX / window.innerWidth - 0.5) * 2;
//     let y = (event.clientY / window.innerHeight - 0.5) * 2;
//     SetMousePos(x, y);
// }

import ballSubcomponent from "~/components/ball-subcomponent.vue";
export default {
    components: {
        ballSubcomponent,
    },
    props: ["content"],
    // data() {
    //     return {
    //         pause: false,
    //         stop0: 0,
    //         stop1: 0,
    //         pageContainer: null,
    //         SceneData: {
    //             backgroundColor: 0x111111, // color of background
    //             buble: { // settings for buble
    //                 bubleColor: {
    //                     front: 0x00EFAB,
    //                     middle: 0x007FAB,
    //                     back: 0x002B00,
    //                 },
    //                 pointSize: 3.3,
    //                 rotationAnimSpeed: 0.0125, // sphere-points transform rotation speed (by all axis)
    //             },
    //             mouseSens: 0.025, // sens for rotation transform by mouse pos
    //             cameraFov: 50, // static camera fov
    //             aspectRationsForCalculatePositions: { // maket aspect ratio
    //                 mobile: 0.5625,
    //                 tablet: 0.6566637246,
    //                 desktop: 1.7733990,
    //             },
    //             cameraPositions: [ // camera "scenes"
    //             {
    //                 x: 0, // x - percentage position (in float) (used by scroll percentage for example);
    //                 data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
    //                                 mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
    //                                 tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
    //                                 desktop: {pos: {x: 0, y: 0, z: 200}, rot: {x: 0, y: 0, z: 0}},
    //                             }
    //             },
    //             {
    //                 x: 0.15, // x - percentage position (in float) (used by scroll percentage for example);
    //                 data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
    //                                 mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
    //                                 tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
    //                                 desktop: {pos: {x: 0, y: 0, z: 100}, rot: {x: 0, y: 0, z: 0}},
    //                             }
    //             },
    //             {
    //                 x: 0.17, // x - percentage position (in float) (used by scroll percentage for example);
    //                 data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
    //                                 mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
    //                                 tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
    //                                 desktop: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
    //                             }
    //             },
    //             {
    //                 x: 1, // x - percentage position (in float) (used by scroll percentage for example);
    //                 data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
    //                                 mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
    //                                 tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
    //                                 desktop: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
    //                             }
    //             },
    //             // {
    //             //     x: 1, // x - percentage position (in float) (used by scroll percentage for example);
    //             //     data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
    //             //         mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
    //             //         tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
    //             //         desktop: {pos: {x: -30, y: 2, z: 128}, rot: {x: 0, y: 0, z: 0}},
    //             //     }
    //             // },
    //             ],
    //             Optimization: {
    //                 minRenderResolution: 1,
    //                 maxRenderResolution: 1.75,
    //                 targetFPS: 50, // resolution = lerp(minRenderResolution,maxRenderResolution, _fps/targetFPS)
    //                 enableDynamicResolution: true, //if disabled - used maxRenderResolution, cant be changed on runtime, use UpdateSceneData(data) for update;
    //             }
    //         }
    //     };
    // },
    // mounted() {
    //     const vHeight = window.innerHeight
    //     const vWidth = window.innerWidth

    //     if(vWidth < 1200 && vWidth >= 768) {
    //         this.SceneData.cameraPositions[2].data.desktop = {
    //             ...this.SceneData.cameraPositions[2].data.desktop,
    //             pos: {x: 0, y: 0, z: 100}
    //         }

    //         this.SceneData.cameraPositions[3].data.desktop = {
    //             ...this.SceneData.cameraPositions[3].data.desktop,
    //             pos: {x: 0, y: 0, z: 100}
    //         }
    //     }



    //     this.$nextTick(() => {

    //             const s1 = document.querySelector('[data-block="0"]')
    //             const s2 = document.querySelector('[data-block="1"]')
    //             const s3 = document.querySelector('[data-block="2"]')
    //             const s4 = document.querySelector('[data-block="3"]')
    //             const s5 = document.querySelector('[data-block="4"]')

    //             this.stop0 = s1.offsetHeight + s2.offsetHeight + s3.offsetHeight + s4.offsetHeight - vHeight/2
    //             this.stop1 = this.stop0 + s5.offsetHeight + vHeight/2
    //             InitThree(this.$refs.renderContainer, true);
    //             LoadCallBack(this.SetSceneLoaded);
    //             InitScene(this.SceneData);
    //             CameraController.SetAspectRatioForCameraPos(1.7733990);
    //             CameraController.SetCameraSceneByScrollPercent(0);

    //             window.addEventListener('mousemove', e => HandleMouseMove(e));

    //             this.pause = true
    //             CameraController.pause()


    //             window.lmS.on('scroll', args => {



    //                 let y = args.scroll.y
    //                 if ((y >= this.stop0 && y < this.stop1) && this.pause) {
    //                     this.pause = false
    //                     CameraController.play()
    //                 }

    //                 if ((y < this.stop0 || y >= this.stop1) && !this.pause) {
    //                     this.pause = true
    //                     CameraController.pause()
    //                 }



    //                 let progressPercent = (args.scroll.y - this.stop0)  / this.stop1
    //                 // console.log(progressPercent)
    //                 if (!this.pause) {
    //                     let pp = progressPercent - 0.1
    //                     let opacity = 1 - ((pp)/0.06);
    //                     this.$refs.renderContainer.style.opacity = opacity > 1 ? 1 : opacity < 0 ? 0 : opacity
    //                     CameraController.SetCameraSceneByScrollPercent(progressPercent)
    //                 }
    //             })
    //     })
    // },
    // methods: {
    //     SetMainPageContainer(container){
    //         this.pageContainer = container;
            
    //         SetScrollPage(this.pageContainer);
    //     },
    //     SetSceneLoaded() {
    //         // console.log('SetSceneLoaded');
    //         this.SceneLoaded = true;
    //         frameRednererStart();
    //     },
    // }
};
</script>

<style lang="scss" scoped>

#renderModule2 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;

        & ::v-deep(canvas) {
            width: 100% !important;
            height: 100% !important;
        }
    }

@media screen and (min-width: $tablet) {
    .outer {
    position: absolute;
        top: 16.5vw;
        left: 50%;
        // transform: translate(-50%, -50%) translateY(10%);
        transform: translateX(-50%);
        width: 100vw;
        height: auto;
        right: auto;
        bottom: auto;

        &:before {
            content: "";
            display: block;
            padding-top: 56.38%;
        }

        > * {
            width: 100% !important;
            height: 100% !important;
        }
    }

    #renderModule2 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;

        & ::v-deep(canvas) {
            width: 100% !important;
            height: 100% !important;
        }
    }

    .mainContainer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    }
}


.section {
    position: relative;
    min-height: 100vh;
    width: 100%;
    padding: desktop-vw(90) desktop-vw(48) desktop-vw(90) desktop-vw(48);
    display: flex;
    justify-content: center;
}

.circles {
    max-width: desktop-vw(955);
    position: relative;
    margin-top: desktop-vw(40);
    display: flex;
    justify-content: center;
    align-items: center;
    height: max-content;


    // &__list-ball{
    //     animation: 40s linear 0s normal none infinite running rot;
    // }

    // @keyframes rot {
    //     0% {
    //         transform: rotate(0deg);
    //     }
    //     100% {
    //         transform: rotate(360deg);
    //     }
    // }

    img {
        width: 100%;
    }

    &__centerInfo {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 2;
        // transform: scale(0);
    }

    &__title {
        font-style: normal;
        font-weight: 700;
        font-size: desktop-vw(62);
        line-height: 120%;
        color: #ffffff;
        text-align: center;
        margin-bottom: desktop-vw(18);
        
    }

    &__text {
        font-style: normal;
        font-weight: 300;
        font-size: desktop-vw(18);
        line-height: 158%;
        color: #ffffff;
        max-width: desktop-vw(390);
        text-align: center;
    }

    // &.is-inview {
    //     .circles__centerInfo {
    //         transition: all 2s ease;
    //         transform: scale(1);
    //     }
    // }
}

.circles__list-ball {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

@media screen and (max-width: $tablet) {

    .outer {
        position: absolute;
        top: 36.5vw;
        left: 50%;
        // transform: translate(-50%, -50%) translateY(10%);
        transform: translateX(-50%) scale(0.7);
        transform-origin: 50%;
        width: 100vw;
        height: auto;
        right: auto;
        bottom: auto;

    }

    .section {
        padding: tablet-vw(90) tablet-vw(48) tablet-vw(90) tablet-vw(48);
        height: tablet-vw(1200);
    }

    .circles {
        max-width: none;
        width: tablet-vw(955);
        position: absolute;
        margin-top: tablet-vw(40);

        &__title {
            font-size: tablet-vw(62);
            margin-bottom: tablet-vw(18);
        }

        &__text {
            font-size: tablet-vw(18);
            max-width: tablet-vw(390);
        }
    }
}

@media screen and (max-width: $mobile) {
    .section {
        padding: mobile-vw(45) mobile-vw(48) mobile-vw(45) mobile-vw(48);
        height: auto;
        min-height: mobile-vw(680);
    }

    .outer {
        position: absolute;
        top: 16.5vw;
        left: 50%;
        // transform: translate(-50%, -50%) translateY(10%);
        transform: translateX(-50%);
        width: 100vw;
        height: auto;
        right: auto;
        bottom: auto;

    }

    #get #renderModule2 {
        width: 104vw;
        height: 74vh;
    }

    .circles {
        max-width: none;
        width: mobile-vw(503);
        position: absolute;
        margin-top: mobile-vw(40);

        &__title {
            font-size: mobile-vw(32);
            margin-bottom: mobile-vw(18);
        }

        &__text {
            font-size: mobile-vw(14);
            // max-width: mobile-vw(390);
            max-width: 50%;
        }
    }

}
</style>
