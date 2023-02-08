<template lang="pug">
.section
    .how-it-works
        .how-it-works__button(
            @click="changeVideo(indexSlide === 0 ? 1 : 0)"
        )
            include ../assets/svg/slickArow.svg
        .how-it-works__info.anim-content__opacity.anim-content__translateY(v-if="content" data-scroll )
            .how-it-works__title(v-if="content.title") {{ content.title }}
            .how-it-works__text(v-if="content.text") {{ content.text }}
        .how-it-works__video.anim-content__opacity#video(data-scroll)
            .how-it-works__slide(
                v-for="(item, ind) in content.videos"
                :key="ind"
                @click="changeVideo(ind)"
                :class="{'how-it-works__slide_hide': ind === 1}"
                )
                .how-it-works__vid
                    video(
                        :src="item.urlVideo" 
                        noControls
                        playsinline
                    )
                    img.how-it-works__video-play(
                        src="~/assets/img/play.svg" 
                        @click="playVideo(ind)"
                        :class="{'how-it-works__video-play_hidden': video}"
                        )
            //- client-only
            //-     TwentyTwenty(:before="content.video" :after="content.video2")
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import ballSubcomponent from "~/components/ball-subcomponent.vue";
// import 'vue-twentytwenty/dist/vue-twentytwenty.css';

export default {
    components: {
        ballSubcomponent,
        VueSlickCarousel,
    },
    props: ["content"],
    data() {
        return {
            indexSlide: 0,
            video: false,
            ind: 0,
            slickOptions: {
                slidesToShow: 1,
                dots: false,
                infinite: true,
                arrows: false,
                centerMode: true,
                speed: 700,
            },
        };
    },
    mounted() {
        var element = document.getElementById("video");

        element.addEventListener("touchstart", (event) => {
            document.body.classList.add("stopScroll");
        });
        element.addEventListener("touchmove", (event) => {
            document.body.classList.add("stopScroll");
        });

        element.addEventListener("touchend", (event) => {
            document.body.classList.remove("stopScroll");
        });
    },
    methods: {
        playVideo(index) {
            this.video = !this.video;
            let v = document.querySelectorAll("video");
            setTimeout(() => {
                document.querySelector(".how-it-works__video").classList.add("is-inview");
                document.querySelector(".how-it-works__info").classList.add("is-inview");
            }, 10);
            if (this.video) {
                window.lmS.scrollTo(document.querySelector("#video"), { offset: -90 });
                v[index].play();
                // document.querySelector('.how-it-works__video-play').textContent = "||"
                // window.lmS.stop()
            } else {
                v[index].pause();
                // document.querySelector('.how-it-works__video-play').textContent = ">"
                // window.lmS.start()
                // window.lmS.update()
            }
        },
        changeVideo(index) {
            this.indexSlide = index;
            const slides = document.querySelectorAll(".how-it-works__slide");
            const v = document.querySelectorAll("video");

            if (index === 1 && this.ind == 0) {
                slides[0].classList.add("slide-out-left");
                slides[1].classList.add("slide-in-left");
                setTimeout(() => {
                    slides[1].classList.remove("slide-in-left");
                    slides[0].classList.remove("slide-out-left");
                    slides[0].classList.add("how-it-works__slide_hide");
                }, 500);
                slides[1].classList.remove("how-it-works__slide_hide");
                this.ind = 1;
                this.video = false;
                setTimeout(() => {
                    document.querySelector(".how-it-works__video").classList.add("is-inview");
                    document.querySelector(".how-it-works__info").classList.add("is-inview");
                }, 10);
                v[0].pause();
            }
            if (index === 0 && this.ind == 1) {
                slides[1].classList.add("slide-out-left");
                slides[0].classList.add("slide-in-left");
                setTimeout(() => {
                    slides[0].classList.remove("slide-in-left");
                    slides[1].classList.remove("slide-out-left");
                    slides[1].classList.add("how-it-works__slide_hide");
                }, 500);
                slides[0].classList.remove("how-it-works__slide_hide");
                this.ind = 0;
                this.video = false;
                setTimeout(() => {
                    document.querySelector(".how-it-works__video").classList.add("is-inview");
                    document.querySelector(".how-it-works__info").classList.add("is-inview");
                }, 10);
                v[1].pause();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@keyframes slide-in-left {
    0% {
        -webkit-transform: translateX(-1000px);
        transform: translateX(-1000px);
        opacity: 0;
    }
    100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slide-out-left {
    0% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        -webkit-transform: translateX(-1000px);
        transform: translateX(-1000px);
        opacity: 0;
    }
}
@keyframes slide-out-right {
    0% {
        right: 0;
    }
    100% {
        right: desktop-vw(-150);
    }
}
.slide-in-left {
    position: absolute;
    -webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.slide-out-left {
    -webkit-animation: slide-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
    animation: slide-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

.section {
    position: relative;
    min-height: 100vh;
    width: 100%;
    padding: desktop-vw(90) desktop-vw(48) desktop-vw(90) desktop-vw(48);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.how-it-works {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    z-index: 0;
    min-height: 100vh;

    &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-style: normal;
        color: #ffffff;
        text-align: center;
        margin-bottom: desktop-vw(90);
    }

    &__title {
        font-weight: 700;
        font-size: desktop-vw(48);
        line-height: 120%;
        margin-bottom: desktop-vw(18);
    }

    &__text {
        font-style: normal;
        font-weight: 300;
        font-size: desktop-vw(18);
        line-height: 158%;
        max-width: desktop-vw(601);
    }

    &__video {
        display: flex;
        position: relative;
        max-width: desktop-vw(1018);
        width: 100%;
        // margin: 0 auto;
        height: desktop-vw(620);
        z-index: 0;

        video {
            width: 100%;
            -webkit-border-radius: desktop-vw(16);
            -moz-border-radius: desktop-vw(16);
            border-radius: desktop-vw(16);
            pointer-events: none;
            height: desktop-vw(540);
        }

        // img {
        //     width: 100%;
        // }

        &-play {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            width: desktop-vw(64);
            height: desktop-vw(64);
            font-size: desktop-vw(50);
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: #111;
            border-radius: 50%;
            z-index: 100;
            &_hidden {
                opacity: 0;
                visibility: hidden;
            }
        }
    }

    &__slide {
        position: absolute;
        top: 0;
        left: 0;
        height: desktop-vw(540);

        &_hide {
            opacity: 0.7;
            position: absolute;
            left: auto;
            right: desktop-vw(-150);
            z-index: -1;
            top: 50%;
            transform: translate(0, -50%);
            -webkit-animation: slide-out-right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
            animation: slide-out-right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

            &::after {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                width: desktop-vw(220);
                height: 100%;
                background: linear-gradient(90deg, #111111 -31.81%, rgba(17, 17, 17, 0) 75.18%);
            }

            video {
                height: desktop-vw(459);
            }
        }
    }

    &__button {
        position: absolute;
        top: 50%;
        right: desktop-vw(70);
        transform: translateY(50%);
        letter-spacing: 0.01em;
        visibility: visible;
        background: white;
        width: desktop-vw(48);
        height: desktop-vw(48);
        z-index: 2;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.4s ease;

        svg {
            transition: opacity 0.4s ease;
            width: desktop-vw(7);
            height: desktop-vw(12);
        }

        &:hover {
            svg {
                opacity: 0.7;
            }
        }
    }
}

@media screen and (max-width: $tablet) {
    .section {
        padding: tablet-vw(90) tablet-vw(48) tablet-vw(90) tablet-vw(48);
        min-height: 0;
    }

    .how-it-works {
        min-height: 75vh;

        &__info {
            margin-bottom: tablet-vw(88);
        }

        &__title {
            font-size: tablet-vw(48);
            margin-bottom: tablet-vw(18);
        }

        &__text {
            font-size: tablet-vw(18);
            max-width: tablet-vw(601);
        }

        &__video {
            position: relative;
            max-width: tablet-vw(560);
            height: tablet-vw(390);
            // max-height: tablet-vw(660);
            video {
                -webkit-border-radius: tablet-vw(16);
                -moz-border-radius: tablet-vw(16);
                border-radius: tablet-vw(16);
                height: tablet-vw(310);
            }

            &-play {
                width: tablet-vw(64);
                height: tablet-vw(64);
                font-size: tablet-vw(50);
            }
        }

        &__slide {
            height: tablet-vw(310);

            &_hide {
                right: tablet-vw(-150);
                opacity: 0.7;

                &::after {
                    width: tablet-vw(200);
                }

                video {
                    height: tablet-vw(224);
                }
            }
        }

        &__button {
            right: 0;
            width: tablet-vw(48);
            height: tablet-vw(48);
            svg {
                width: tablet-vw(7);
                height: tablet-vw(12);
            }
        }
    }
}

@media screen and (max-width: $mobile) {
    .section {
        padding: mobile-vw(45) mobile-vw(24) mobile-vw(45) mobile-vw(24);
        min-height: 0;
    }

    .how-it-works {
        &__info {
            margin-bottom: mobile-vw(48);
        }

        &__title {
            font-size: mobile-vw(32);
            margin-bottom: mobile-vw(18);
        }

        &__text {
            font-size: mobile-vw(16);
            max-width: mobile-vw(601);
        }

        &__video {
            position: relative;
            max-width: mobile-vw(300);
            height: mobile-vw(210);
            // max-width: mobile-vw(1020);
            // max-height: mobile-vw(660);
            video {
                -webkit-border-radius: mobile-vw(8);
                -moz-border-radius: mobile-vw(8);
                border-radius: mobile-vw(8);
                max-width: mobile-vw(301);
                height: mobile-vw(177);
            }

            &-play {
                width: tablet-vw(64);
                height: tablet-vw(64);
                font-size: tablet-vw(50);
            }
        }
        &__slide {
            &_hide {
                right: mobile-vw(-150);

                &::after {
                    width: mobile-vw(200);
                }

                video {
                    height: mobile-vw(134);
                }
            }
        }

        &__button {
            top: 54%;
            right: 0;
            width: mobile-vw(32);
            height: mobile-vw(32);
            svg {
                width: mobile-vw(7);
                height: mobile-vw(12);
            }
        }
    }
}
</style>
