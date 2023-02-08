<template lang="pug">
.section
    .outer
        #renderModule2.mainContainer(ref="renderContainer")
    //- .three-elements-content-bottom(v-if="content" )
    //-     //- .three-elements-content-bottom__title(data-scroll) {{ content.title }}
    //-     .three-elements-content-bottom__title.three-elements-content-bottom__title(
    //-       v-for="(item, idx1) in titleDesc"
    //-       data-scroll
    //-       :key="idx1"
    //-     ) {{ item }}
    //-     .three-elements-content-bottom__title.three-elements-content-bottom__title_mob(
    //-       v-for="(item, idx2) in titleMob"
    //-       data-scroll
    //-       :key="idx2"
    //-     ) {{ item }}
    .three-elements-content-bottom(v-if="content" )
        .three-elements-content-bottom__title(data-scroll) {{ content.title }}
    .three-elements-img
        .three-elements-items(v-if="content.elements && content.elements.length !== 0")
            .three-elements-item(
                v-for="(item, index) in content.elements"
                :key="index"
                data-scroll
                )
                .three-elements-item__content.content-item(data-scroll)
                    .content-item__title(@click="openPopup(index)") {{ item.title }}
                    .content-item__text {{ item.smallText }}
                .three-elements-item__circle   
                .three-elements-item__line
</template>

<script>
import {
    mapState
} from "vuex";
import {
    InitThree,
    InitScene,
    frameRednererStart,
    SetScrollPage,
    SetScroll,
    SetMousePos,
    CheckResizingWindow,
    LoadCallBack,
    CameraController
} from '~/plugins/renderBuble2.js';

function HandleMouseMove(event) {
    let x = (event.clientX / window.innerWidth - 0.5) * 2;
    let y = (event.clientY / window.innerHeight - 0.5) * 2;
    SetMousePos(x, y);
}
export default {
    props: [],
    data() {
        return {
            pause: false,
            stop0: 0,
            stop1: 0,
            pageContainer: null,
            SceneData: {
                backgroundColor: 0x111111, // color of background
                buble: { // settings for buble
                    bubleColor: {
                        front: 0x00EFAB,
                        middle: 0x007FAB,
                        back: 0x002B00,
                    },
                    pointSize: 3.3,
                    rotationAnimSpeed: 0.0125, // sphere-points transform rotation speed (by all axis)
                },
                mouseSens: 0.025, // sens for rotation transform by mouse pos
                cameraFov: 50, // static camera fov
                aspectRationsForCalculatePositions: { // maket aspect ratio
                    mobile: 0.5625,
                    tablet: 0.6566637246,
                    desktop: 1.7733990,
                },
                cameraPositions: [ // camera "scenes"
                    {
                        x: 0, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {
                                pos: {
                                    x: 0,
                                    y: 0,
                                    z: 0
                                },
                                rot: {
                                    x: 0,
                                    y: 0,
                                    z: 0
                                }
                            },
                            tablet: {
                                pos: {
                                    x: 0,
                                    y: 0,
                                    z: 300
                                },
                                rot: {
                                    x: 0,
                                    y: 0,
                                    z: 0
                                }
                            },
                            desktop: {
                                pos: {
                                    x: 0,
                                    y: 0,
                                    z: 160
                                },
                                rot: {
                                    x: 0,
                                    y: 0,
                                    z: 0
                                }
                            },
                        }
                    },
                    {
                        x: 1, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {
                                pos: {
                                    x: 0,
                                    y: 0,
                                    z: 0
                                },
                                rot: {
                                    x: 0,
                                    y: 0,
                                    z: 0
                                }
                            },
                            tablet: {
                                pos: {
                                    x: 0,
                                    y: 0,
                                    z: 300
                                },
                                rot: {
                                    x: 0,
                                    y: 0,
                                    z: 0
                                }
                            },
                            desktop: {
                                pos: {
                                    x: 0,
                                    y: 0,
                                    z: 160
                                },
                                rot: {
                                    x: 0,
                                    y: 0,
                                    z: 0
                                }
                            },
                        }
                    },
                    // {
                    //     x: 1, // x - percentage position (in float) (used by scroll percentage for example);
                    //     data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                    //         mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                    //         tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                    //         desktop: {pos: {x: -30, y: 2, z: 128}, rot: {x: 0, y: 0, z: 0}},
                    //     }
                    // },
                ],
                Optimization: {
                    minRenderResolution: 1,
                    maxRenderResolution: 1.75,
                    targetFPS: 50, // resolution = lerp(minRenderResolution,maxRenderResolution, _fps/targetFPS)
                    enableDynamicResolution: true, //if disabled - used maxRenderResolution, cant be changed on runtime, use UpdateSceneData(data) for update;
                }
            }
        };
    },
    mounted() {

        const vHeight = window.innerHeight
        const vWidth = window.innerWidth

        this.$nextTick(() => {

            const s1 = document.querySelector('[data-block="0"]')
            const s2 = document.querySelector('[data-block="1"]')
            const s3 = document.querySelector('[data-block="2"]')
            const s4 = document.querySelector('[data-block="3"]')

            this.stop0 = s1.offsetHeight + s2.offsetHeight
            this.stop1 = s1.offsetHeight + s2.offsetHeight + s3.offsetHeight + s4.offsetHeight + vHeight
            InitThree(this.$refs.renderContainer, true);
            LoadCallBack(this.SetSceneLoaded);
            InitScene(this.SceneData);
            CameraController.SetAspectRatioForCameraPos(1.7733990);
            CameraController.SetCameraSceneByScrollPercent(0);

            window.addEventListener('mousemove', e => HandleMouseMove(e));

            this.pause = true
            CameraController.pause()

            window.lmS.on('scroll', args => {

                let y = args.scroll.y
                if ((y >= this.stop0 && y < this.stop1) && this.pause) {
                    this.pause = false
                    CameraController.play()
                }

                if ((y < this.stop0 || y >= this.stop1) && !this.pause) {
                    this.pause = true
                    CameraController.pause()
                }
                // console.log(y)
            })
        })

    },
    computed: {
        ...mapState({
            active: (state) => state.threeElem.threeElemObj.active,
            content: (state) => state.threeElem.threeElemObj.content,
        }),
        // titleDesc() {
        //     if(this.content.title){
        //         let str = ''
        //         let masWord = this.content.title.split(' ')
        //         let newStr = []
        //         for(let i = 0; i < masWord.length; i++){
        //             str = str +  masWord[i] + ' '
        //             // console.log(str)
        //             // console.log(str.length)
        //             if(str.length >= 24) {
        //                 newStr.push(str)
        //                 str = ''
        //             }
        //         }
        //         newStr.push(str)
        //         return newStr
        //       }
        //     return ''
        // },
        // titleMob() {
        //     if(this.content.title){
        //         let str = ''
        //         let masWord = this.content.title.split(' ')
        //         let newStr = []
        //         for(let i = 0; i < masWord.length; i++){
        //             str = str +  masWord[i] + ' '
        //             // console.log(str)
        //             // console.log(str.length)
        //             if(str.length >= 14) {
        //                 newStr.push(str)
        //                 str = ''
        //             }
        //         }
        //         newStr.push(str)
        //         return newStr
        //       }
        //     return ''
        // }
    },
    methods: {
        openPopup(index) {
            if (!this.active) {
                this.$store.commit("threeElem/changeIdx", index);
                this.$store.commit("threeElem/activate");
            } else {
                this.$store.commit("threeElem/deactivate");
            }
        },
        SetMainPageContainer(container) {
            this.pageContainer = container;

            SetScrollPage(this.pageContainer);
        },
        SetSceneLoaded() {
            // console.log('SetSceneLoaded');
            this.SceneLoaded = true;
            frameRednererStart();
        },
    },
};
</script>

<style lang="scss" scoped>
// @media screen and (min-width: $tablet) {
//   .outer {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     // transform: translate(-50%, -50%) translateY(10%);
//     width: 100%;
//     height: 100%;
//     right: auto;

//     // &:before {
//     //     content: "";
//     //     display: block;
//     //     padding-top: 56.38%;
//     // }

//     // > * {
//     //     width: 100% !important;
//     //     height: 100% !important;
//     // }
//   }

//   #renderModule2 {
//       position: absolute;
//       bottom: 0;
//       left: 0;
//       width: 100vw;
//       height: desktop-vw(800);

//       & ::v-deep(canvas) {
//           width: 100% !important;
//           height: 100% !important;
//       }
//   }
// }

// .mainContainer {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// }

.outer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

#renderModule2 {
    position: absolute;
    bottom: desktop-vw(-110);
    left: 0;
    width: 100vw;
    height: desktop-vw(800);

    & ::v-deep(canvas) {
        width: 100% !important;
        height: 100% !important;
    }
}

.section {
    position: relative;
    min-height: 100vh;
    // height: calc(100vh + desktop-vw(530));
    height: calc(80vh + desktop-vw(530));

    width: 100%;
    padding: desktop-vw(90) desktop-vw(48) desktop-vw(90) desktop-vw(48);
    // background: rgba(255, 255, 255, 0.5);
}

.three-elements {

    &-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    &-items {
        width: desktop-vw(460);
        height: desktop-vw(500);
        position: absolute;
        bottom: desktop-vw(50);
        left: desktop-vw(490);
    }

    &-content-bottom {
        position: absolute;
        bottom: desktop-vw(800);
        left: 0;
        // left: desktop-vw(48);
        // max-width: desktop-vw(557);
        width: 100%;

        &__title {
            font-style: normal;
            font-weight: 700;
            font-size: desktop-vw(48);
            max-width: desktop-vw(743);
            line-height: 120%;
            // overflow: hidden;
            // width: 0;
            // white-space: nowrap;
            // border-right: 0.15em solid white;
            color: #ffffff;
            // padding-right: desktop-vw(20);
            // animation: blink-caret 0.5s step-end infinite;
            position: relative;
            text-align: left;
            z-index: 2;
            text-align: center;
            margin: 0 auto;

            &_mob {
                display: none;
            }

            // &.is-inview {

            //   &:nth-child(1) {
            //     margin-left: desktop-vw(310);
            //     animation: anim-text1 1s steps(50) forwards;
            //     @keyframes anim-text1 {
            //         100%{width: desktop-vw(800)}
            //     }
            //   }

            //   &:nth-child(2) {
            //     margin-left: desktop-vw(366);
            //     animation: anim-text2 1s steps(50) forwards;
            //     animation-delay:1s;
            //     @keyframes anim-text2 {
            //         100%{width: desktop-vw(670)}
            //     }
            //   }

            // }
        }

        &__text {
            margin: desktop-vw(13) 0 0;
            color: #ffffff;
            font-style: normal;
            font-weight: 300;
            font-size: desktop-vw(18);
            line-height: 158%;
        }
    }

    &-item {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        &:nth-child(1) {
            .content-item__title {
                margin-left: auto;
            }
        }

        &__circle {
            width: desktop-vw(9);
            height: desktop-vw(9);
            border-radius: 50%;
        }

        &__line {
            position: relative;
            width: 1px;
            // transition: 1s;
            background-color: rgba(255, 255, 255, 0.3);
        }

        &__content {
            position: absolute;
            text-align: left;
            width: desktop-vw(235);
        }

        .content-item {
            font-family: "SF Mono";
            font-style: normal;
            color: #ffffff;

            &__title {
                font-weight: 700;
                font-size: desktop-vw(26);
                line-height: 120%;
                margin-bottom: desktop-vw(8);
                display: flex;
                grid-gap: desktop-vw(16);
                align-items: flex-end;
                width: max-content;
                cursor: pointer;

                &:after {
                    content: "";
                    background-image: url("~/assets/svg/arrow.svg");
                    background-repeat: no-repeat;
                    display: block;
                    width: desktop-vw(14);
                    height: desktop-vw(14);
                    margin-bottom: desktop-vw(7);
                }
            }

            &__text {
                max-width: desktop-vw(233);
                font-weight: 300;
                font-size: desktop-vw(16);
                line-height: 158%;
                width: max-content;
                max-width: 102%;
            }
        }
    }

    &-item:nth-of-type(1) {
        top: desktop-vw(150);
        left: desktop-vw(30);
        transition: 1s;
        // transition-delay: 1s;

        .three-elements-item__circle {
            transition: 1s;
            // transition-delay: 1s;
            background: #8f63d9;
            transform: scale(1.5);
        }

        .three-elements-item__line {
            transition: 1s;
            // transition-delay: 1s;
            // transition-delay: 0.5s;
            height: 0;
        }

        .three-elements-item__content {
            transition: 1s;
            // transition-delay: 1.5s;
            opacity: 0;
            top: desktop-vw(-12);
            right: desktop-vw(32);
            text-align: right;
        }

        &.is-inview {
            top: desktop-vw(20);

            .three-elements-item__circle {
                transform: scale(1);
            }

            .three-elements-item__line {
                height: desktop-vw(155);
            }

            .three-elements-item__content {
                opacity: 1;
            }
        }
    }

    &-item:nth-of-type(2) {
        top: desktop-vw(100);
        left: desktop-vw(220);
        transition: 1s;
        // transition-delay: 1s;
        // transition-delay: 0.5s;

        .three-elements-item__circle {
            transition: 1s;
            // transition-delay: 1s;
            // transition-delay: 0.5s;
            background: #3beaee;
            transform: scale(1.5);
        }

        .three-elements-item__line {
            transition: 1s;
            // transition-delay: 1s;
            // transition-delay: 1s;
            height: 0;
        }

        .three-elements-item__content {
            transition: 1s;
            // transition-delay: 1.5s;
            opacity: 0;
            top: desktop-vw(-18);
            left: desktop-vw(28);
        }

        &.is-inview {
            top: desktop-vw(-90);

            .three-elements-item__circle {
                transform: scale(1);
            }

            .three-elements-item__line {
                height: desktop-vw(155);
            }

            .three-elements-item__content {
                opacity: 1;
            }
        }
    }

    &-item:nth-of-type(3) {
        top: desktop-vw(330);
        left: desktop-vw(430);
        transition: 1s;
        // transition-delay: 1s;
        // transition-delay: 0.5s;

        .three-elements-item__circle {
            transition: 1s;
            // transition-delay: 0.5s;
            // transition-delay: 1s;
            background: #4ff05f;
            transform: scale(1.5);
        }

        .three-elements-item__line {
            transition: 1s;
            // transition-delay: 1s;
            // transition-delay: 1s;
            height: 0;
        }

        .three-elements-item__content {
            transition: 1s;
            // transition-delay: 1.5s;
            opacity: 0;
            top: desktop-vw(-18);
            left: desktop-vw(28);
        }

        &.is-inview {
            top: desktop-vw(80);

            .three-elements-item__circle {
                transform: scale(1);
            }

            .three-elements-item__line {
                height: desktop-vw(155);
            }

            .three-elements-item__content {
                opacity: 1;
            }
        }
    }
}

@keyframes typing {
    0% {
        width: 0;
    }

    100% {
        width: 100%;
    }
}

@keyframes blink-caret {

    from,
    to {
        border-color: transparent;
    }

    50% {
        border-color: white;
    }
}

@media screen and (max-width: $tablet) {

    #renderModule2 {
        position: absolute;
        bottom: tablet-vw(-100);
        left: 0;
        width: 100vw;
        height: tablet-vw(800);

        & ::v-deep(canvas) {
            width: 100% !important;
            height: 100% !important;
        }
    }

    // .outer {
    //   width: 100%;
    //   height: 100%;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    // }
    // .section {
    //   position: relative;
    //   width: 100%;
    //   padding: tablet-vw(124) tablet-vw(48) tablet-vw(63) tablet-vw(48);
    // }

    .section {
        position: relative;
        min-height: 100vh;
        width: 100%;
        padding: tablet-vw(90) tablet-vw(48) tablet-vw(90) tablet-vw(48);
    }

    .three-elements {

        &-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        &-items {
            width: tablet-vw(360);
            height: tablet-vw(360);
            position: absolute;
            bottom: tablet-vw(170);
            left: tablet-vw(225);
        }

        &-content-bottom {
            // bottom: tablet-vw(45);
            // left: tablet-vw(48);
            bottom: tablet-vw(750);

            &__title {
                font-size: tablet-vw(36);
                max-width: tablet-vw(558);

                // &.is-inview {

                //   &:nth-child(1) {
                //     margin-left: tablet-vw(70);
                //     animation: anim-text1 1s steps(50) forwards;
                //     @keyframes anim-text1 {
                //         100%{width: tablet-vw(800)}
                //     }
                //   }

                //   &:nth-child(2) {
                //     margin-left: tablet-vw(130);
                //     animation: anim-text2 1s steps(50) forwards;
                //     animation-delay:1s;
                //     @keyframes anim-text2 {
                //         100%{width: tablet-vw(670)}
                //     }
                //   }

                // }
            }
        }

        // &-img {
        //   width: tablet-vw(563);
        //   right: auto;
        //   top: auto;
        //   position: relative;
        //   margin-bottom: tablet-vw(-224);
        //   margin-left: tablet-vw(-46);

        //   img {
        //     width: 100%;
        //     height: 100%;
        //   }
        // }

        &-item {
            &__circle {
                width: tablet-vw(9);
                height: tablet-vw(9);
            }

            &__content {
                width: tablet-vw(235);
            }

            .content-item {
                &__title {
                    font-size: tablet-vw(26);
                    margin-bottom: tablet-vw(8);
                    grid-gap: tablet-vw(16);

                    &:after {
                        content: "";
                        width: tablet-vw(14);
                        height: tablet-vw(14);
                        margin-bottom: tablet-vw(7);
                    }
                }

                &__text {
                    max-width: tablet-vw(233);
                    font-size: tablet-vw(16);
                }
            }
        }

        &-item:nth-of-type(1) {
            top: tablet-vw(290);
            left: tablet-vw(27);

            .three-elements-item__content {
                top: tablet-vw(-12);
                right: tablet-vw(32);
            }

            &.is-inview {
                top: tablet-vw(-50);

                .three-elements-item__line {
                    height: tablet-vw(150);
                }
            }
        }

        &-item:nth-of-type(2) {
            top: tablet-vw(131);
            left: tablet-vw(120);

            .three-elements-item__content {
                top: tablet-vw(-18);
                left: tablet-vw(28);
            }

            &.is-inview {
                top: tablet-vw(-125);

                .three-elements-item__line {
                    height: tablet-vw(190);
                }
            }
        }

        &-item:nth-of-type(3) {
            top: tablet-vw(330);
            left: tablet-vw(300);

            .three-elements-item__content {
                top: tablet-vw(-18);
                left: tablet-vw(28);
            }

            &.is-inview {
                top: tablet-vw(-15);

                .three-elements-item__line {
                    height: tablet-vw(155);
                }
            }
        }
    }
}

@media screen and (max-width: $mobile) {
    #renderModule2 {
        position: absolute;
        top: auto;
        bottom: mobile-vw(-60);
        left: mobile-vw(0);
        width: 100vw;
        height: mobile-vw(524);

        & ::v-deep(canvas) {
            width: 100% !important;
            height: 100% !important;
        }
    }

    .section {
        padding: 20vh mobile-vw(24) mobile-vw(163) mobile-vw(24);
        min-height: calc(110vh);
        // margin-bottom: mobile-vw(124);
    }

    .three-elements {

        &-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        &-items {
            width: mobile-vw(320);
            height: mobile-vw(324);
            position: absolute;
            top: auto;
            bottom: mobile-vw(10);
            left: mobile-vw(30);
        }

        &-content-bottom {
            bottom: mobile-vw(690);

            &__title {
                font-size: mobile-vw(32);
                max-width: mobile-vw(366);

                &_mob {
                    // display: block;
                    // &.is-inview {

                    //   &:nth-child(3) {
                    //     margin-left: mobile-vw(15);
                    //     animation: anim-text1 1s steps(50) forwards;
                    //     @keyframes anim-text1 {
                    //         100%{width: mobile-vw(400)}
                    //     }
                    //   }

                    //   &:nth-child(4) {
                    //     margin-left: mobile-vw(15);
                    //     animation: anim-text2 1s steps(50) forwards;
                    //     animation-delay:1s;
                    //     @keyframes anim-text2 {
                    //         100%{width: mobile-vw(400)}
                    //     }
                    //   }

                    //   &:nth-child(5) {
                    //     margin-left: mobile-vw(100);
                    //     animation: anim-text3 1s steps(50) forwards;
                    //     animation-delay:2s;
                    //     @keyframes anim-text3 {
                    //         100%{width: mobile-vw(200)}
                    //     }
                    //   }

                    // }
                }
            }
        }

        // &-img {
        //   width: mobile-vw(350);
        //   right: auto;
        //   top: -20%;
        //   position: relative;
        //   margin-bottom: mobile-vw(-300);
        //   margin-left: 0;

        //   img {
        //     width: 100%;
        //     height: 100%;
        //   }
        // }

        &-item {
            &:nth-child(1) {
                .content-item__title {
                    margin-left: 0;
                }
            }

            &__circle {
                width: mobile-vw(9);
                height: mobile-vw(9);
            }

            &__content {
                width: mobile-vw(235);
            }

            .content-item {
                &__title {
                    font-size: mobile-vw(18);
                    margin-bottom: mobile-vw(8);
                    grid-gap: tablet-vw(12);

                    &:after {
                        content: "";
                        width: mobile-vw(14);
                        height: mobile-vw(14);
                        margin-bottom: mobile-vw(5);

                        svg {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }

                &__text {
                    max-width: mobile-vw(200);
                    font-size: mobile-vw(14);
                }
            }
        }

        &-item:nth-of-type(1) {
            top: mobile-vw(131);
            left: mobile-vw(67);

            .three-elements-item__content {
                top: mobile-vw(-12);
                right: auto;
                left: mobile-vw(26);
                text-align: left;
            }

            .three-elements-item__line {
                height: 0;
            }

            &.is-inview {
                top: mobile-vw(-270);

                .three-elements-item__line {
                    height: mobile-vw(385);
                }
            }
        }

        &-item:nth-of-type(2) {
            top: mobile-vw(131);
            left: mobile-vw(120);

            .three-elements-item__content {
                top: mobile-vw(-7);
                left: mobile-vw(25);
            }

            &.is-inview {
                top: mobile-vw(-173);

                .three-elements-item__line {
                    height: mobile-vw(220);
                }
            }
        }

        &-item:nth-of-type(3) {
            top: mobile-vw(131);
            left: mobile-vw(174);

            .three-elements-item__content {
                top: mobile-vw(-8);
                left: mobile-vw(26);
            }

            &.is-inview {
                top: mobile-vw(-60);

                .three-elements-item__line {
                    height: mobile-vw(90);
                }
            }
        }
    }
}

// @media screen and (max-width: 375px) {
//   .section {
//     padding: 20vh mobile-vw(24) mobile-vw(163) mobile-vw(24);
//     height: calc(125vh);
//     margin-bottom: mobile-vw(124);
//   }
// }
</style>
