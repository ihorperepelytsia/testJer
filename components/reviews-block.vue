<template lang="pug">
.reviews
    .reviews__title
        .text             
            .reviews__text.anim-content__opacity.anim-content__translateY(
                v-if="content && content.text"
                data-scroll
            ) {{ content.text }}
        .text 
            .reviews__text.anim-content__opacity.anim-content__translateY(
                v-if="content && content.text2"
                data-scroll
            ) {{ content.text2 }}
    .reviews__buttons
        .reviews__button.reviews__button_prev(
            @click="prev"
            :class="{'reviews__button_hidden' : !counter}"
        )
            include ../assets/svg/slickArow.svg
        .reviews__button.reviews__button_next(
            @click="next"
            :class="{'reviews__button_hidden' : counter}"
        )
            include ../assets/svg/slickArow.svg
    .reviews__shadow.reviews__shadow_left
        img(
            src="~/assets/img/reviews/shadowL.png"
        )
    .reviews__shadow.reviews__shadow_right
        img(
            src="~/assets/img/reviews/shadowR.png"
        )
        .reviews__shadow_right
    VueSlickCarousel.reviews__cards(
        v-bind="slickOptions" 
        ref="reviews"
        data-scroll
    )
        .reviews__card.anim-content__opacity(
            v-if="content && content.list"
            v-for="(item, ind) in content.list"
            data-scroll
        )
            .reviews__image(
                v-if="item.image"
                :lazy-background="item.image"
            )
                .reviews__event-block(
                    v-if="item.video"
                    @click="videoPlay(item.video)"
                )

            //- .reviews__video(
            //-     v-if="item.video"
            //- )
            //-     .reviews__name {{ item.video.name }}
            //-     .reviews__time {{ item.video.time }}
            //-     .reviews__video-block               
            //-         youtube.video-embbed(
            //-             video-id="lq4eefCCuVo"
            //-             width="500" height="300"
            //-             ref="youtube"
            //-             src="https://drive.google.com/file/d/1X2OkZOqD11SKw-DbQ7I2XW3cxE58H232/preview?autoplay=0"
            //-             frameborder="0"
            //-             style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"
            //-         )
            //-         .reviews__cover-block
            //-             img.video-cover(src="~/assets/img/reviews/rev-video-cover1.png")
            //-     .reviews__duration {{ item.video.duration }}
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'

export default {
    props:[
        'content',
    ],
    components: {
        VueSlickCarousel
    },
    data() {
        return{
            slickOptions: {
                slidesToShow: 5,
                slidesToScroll: 1,
                dots: false,
                infinite: true,
                arrows: false,
                variableWidth: true,
                speed: 700,
                responsive: [
                    {
                        breakpoint: 1201,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 2,
                            speed: 500
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToScroll: 1,
                            slidesToShow: 1,
                        }
                    }
                ]
            },
            counter: false
        }
    },
    methods:{
        prev() {
            this.$refs.reviews.prev()

        },
        next() {
            this.$refs.reviews.next()
        },
        videoPlay(videoId) {
            if(!this.active){
                this.$store.commit('reviewsVideo/activate', videoId)
            }
            else{
                this.$store.commit('reviewsVideo/deactivate')
            }
        }
    },

}
</script>

<style lang="scss" scoped>
.reviews {
    padding: desktop-vw(90) 0 desktop-vw(100);
    overflow: hidden;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);

    &__title {
        font-style: normal;
        font-family: 'SF Mono';
        font-weight: 500;
        font-size: desktop-vw(48);
        margin: 0 auto;
        margin-bottom: desktop-vw(64);
        line-height: 120%;
        text-align: center;
        color: #FFFFFF;
    }

    &__shadow {
        z-index: 1;
        position: absolute;
        pointer-events: none;
        width: desktop-vw(360);
        height: desktop-vw(553);
        margin-top: desktop-vw(-64);
        user-select: none;
        -moz-user-select: none;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);


        img {
            width: 100%;
            height: 100%;
            pointer-events: none;
            user-select: none;
            -moz-user-select: none;
        }

        &_left {
            left: 0;
            -webkit-user-select: none;
        }

        &_right {
            right: 0;
            -webkit-user-select: none;
        }
    }

    &__cards {
        display: flex;
        width: 100vw;
        overflow: hidden;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);

        ::v-deep() {
            .slick-track {
                display: flex;
            }

            .slick-list {
                width: 100%;
                margin-left: desktop-vw(196);
            }

            .slick-slide {
                flex-shrink: 0;
                width: desktop-vw(328) !important;
                box-sizing: border-box;
                margin-left: desktop-vw(32);

                &:nth-child(1) {
                    margin-left: 0;
                }
            }
        }
    }

    &__image {
        height: desktop-vw(290);
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: desktop-vw(16);
        position: relative;
    }

    &__event-block {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            display: block;
            cursor: pointer;
        }

    &__buttons{
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: desktop-vw(127) desktop-vw(62) desktop-vw(0);
        width: 100%;
        visibility: hidden;
        overflow: hidden;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
        z-index: 2;
    }

    &__button{
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
        transition: opacity .4s ease;


        svg {
            transition: opacity .4s ease;
            width: desktop-vw(7);
            height: desktop-vw(12);
        }

        &:hover {
            
            svg {
                opacity: 0.7;
            }
        }

        &_prev{
            svg{
                transform: rotate(180deg);
            }
        }
    }
}

@media screen and (max-width: $tablet) {

    .reviews {
        padding: tablet-vw(90) 0;

        &__title {
            font-family: 'SF Mono';
            font-style: normal;
            font-weight: 700;
            line-height: 120%;
            font-size: tablet-vw(48);
            margin-bottom: tablet-vw(64);
            width: 100%;
        }

        &__cards {
            ::v-deep() {

                .slick-list {
                    width: 100%;
                    margin-left: tablet-vw(48);
                }

                .slick-slide {
                    width: tablet-vw(328) !important;
                    margin-left: tablet-vw(24);

                    &:nth-child(1) {
                        margin-left: 0;
                    }
                }
            }
        }

        &__image {
            height: tablet-vw(290);
            border-radius: tablet-vw(16);
        }

        &__buttons{
            display: none;
        }

        &__shadow {
            display: none;
        }

    }
}

@media screen and (max-width: $mobile) {
    .reviews {
        padding: mobile-vw(43) 0;

        &__title {
            line-height: 120%;
            text-align: center;
            color: #FFFFFF;
            line-height: 133%;
            font-size: mobile-vw(32);
            margin-bottom: mobile-vw(40);
            width: 60%;
        }

        &__cards {
            ::v-deep() {

                .slick-list {
                    width: 100%;
                    margin-left: mobile-vw(25);
                }

                .slick-slide {
                    width: mobile-vw(328) !important;
                    margin-left: mobile-vw(24);

                    &:nth-child(1) {
                        margin-left: 0;
                    }
                }
            }
        }

        &__image {
            height: mobile-vw(290);
            border-radius: mobile-vw(16);
        }
    }
}

</style>