<template lang="pug">
.wrap-ball
    .ball
        .ball__img
            img(src="~/assets/img/small-ball.png")
        .ball__text(
            v-if="content"
            v-html="content.text"
        ) {{content.text }}
</template>

<script>
export default {
    props: ["content"],
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
@keyframes rot {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
@keyframes rot2 {
    0% {
        transform: rotate(360deg);
    }
    100% {
        transform: rotate(0deg);
    }
}
.wrap-ball {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
    
    &:nth-of-type(1) {
        animation: 39s linear 0s normal none infinite running rot;
        .ball {
            left: 0;
            top: desktop-vw(190);
            left: desktop-vw(37);
            animation: 39s linear 0s normal none infinite running rot2;

            .ball__text {
                left:  desktop-vw(70);
                top:  desktop-vw(-38);
            }
        }
    }

    &:nth-of-type(2) {
        animation: 40s linear 0s normal none infinite running rot;
        .ball {
            left:  desktop-vw(519);
            top:  desktop-vw(116);
            animation: 40s linear 0s normal none infinite running rot2;

            .ball__text {
                left:  desktop-vw(70);
                top:  desktop-vw(-38);
            }
        }
    }

    &:nth-of-type(3) {
        animation: 41s linear 0s normal none infinite running rot;
        .ball {
            left:  desktop-vw(680);
            top:  desktop-vw(516);
            animation: 41s linear 0s normal none infinite running rot2;

            .ball__text {
                left:  desktop-vw(70);
                top:  desktop-vw(-27);
            }
        }
    }

    &:nth-of-type(4) {
        animation: 38s linear 0s normal none infinite running rot;
        .ball {
            left:  desktop-vw(143);
            top:  desktop-vw(565);
            animation: 38s linear 0s normal none infinite running rot2;

            .ball__text {
                left:  desktop-vw(70);
                top:  desktop-vw(60);
            }
        }
    }
}

.ball {
    position: absolute;
    // top: 0;
    // left: 0;

    &__img {
        width: desktop-vw(72);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        &:before {
            content:'';
            display: block;
            position: absolute;
            box-shadow: desktop-vw(2) 0px desktop-vw(31) desktop-vw(58) #111;
            z-index: 1;
            border-radius: 50%;
        }

        img {
            position: relative;
            width: 100%;
            z-index: 2;
        }
    }

    &__text {
        position: absolute;
        font-style: normal;
        font-weight: 300;
        font-size: desktop-vw(14);
        line-height: 150%;
        color: #ffffff;
        min-width: desktop-vw(180);
        z-index: 2;
        width: max-content;
    }
}

@media screen and (max-width: $tablet) {
    .ball {
        position: absolute;

        &__img {
            width: tablet-vw(72);
            &:before {
                box-shadow: tablet-vw(2) 0px tablet-vw(31) tablet-vw(58) #111;
            }
        }

        &__text {
            font-size: tablet-vw(14);
            min-width: tablet-vw(180);
        }
    }

    .wrap-ball {
        &:nth-of-type(1) {
            animation: none;
            .ball {
                animation: none;
                left: 0;
                top: tablet-vw(190);
                left: tablet-vw(237);

                .ball__text {
                    left:  tablet-vw(70);
                    top:  tablet-vw(-38);
                }
            }
        }

        &:nth-of-type(2) {
            animation: none;
            .ball {
                animation: none;
                left:  tablet-vw(519);
                top:  tablet-vw(45);

                .ball__text {
                    left:  tablet-vw(70);
                    top:  tablet-vw(-38);
                }
            }
        }

        &:nth-of-type(3) {
            animation: none;
            .ball {
                animation: none;
                left:  tablet-vw(550);
                top:  tablet-vw(750);

                .ball__text {
                    left:  tablet-vw(86);
                    top:  tablet-vw(-37);
                }
            }
        }

        &:nth-of-type(4) {
            animation: none;
            .ball {
                animation: none;
                left:  tablet-vw(263);
                top:  tablet-vw(805);

                .ball__text {
                    left:  tablet-vw(70);
                    top:  tablet-vw(60);
                }
            }
        }
    }
}

@media screen and (max-width: $mobile) {
    .ball {
        position: absolute;

        &__img {
            width: mobile-vw(49);
            &:before {
                box-shadow: mobile-vw(2) 0px mobile-vw(31) mobile-vw(38) #111;
            }
        }

        &__text {
            font-size: mobile-vw(14);
            min-width: mobile-vw(180);
        }
    }

    .wrap-ball {

        &:nth-of-type(1) {
            // безопасность и приватность
            animation: none;
            .ball {
                animation: none;
                top: mobile-vw(-29);
                left: mobile-vw(229);

                .ball__text {
                    left:  mobile-vw(45);
                    top:  mobile-vw(-38);
                }
            }
        }

        &:nth-of-type(2) {
            animation: none;
            .ball {
                animation: none;
                left: mobile-vw(85);
                top: mobile-vw(125);

                .ball__text {
                    left: mobile-vw(46);
                    top:  mobile-vw(-48);
                }
            }
        }

        &:nth-of-type(3) {
            animation: none;
            .ball {
                animation: none;
                left: mobile-vw(235);
                top: mobile-vw(400);

                .ball__text {
                    left:  mobile-vw(55);
                    top:  mobile-vw(-47);
                    max-width: 100%;
                }
            }
        }

        &:nth-of-type(4) {
            animation: none;
            .ball {
                animation: none;
                left: mobile-vw(85);
                top: mobile-vw(435);

                .ball__text {
                    left: mobile-vw(48);
                    top: mobile-vw(45);
                }
            }
        }
    }
}
</style>
