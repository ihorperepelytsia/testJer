<template lang="pug">
.animation(
    ref="anim"
    data-scroll
    data-scroll-call="chat"
)
    .animation__images
        .animation__image(
            v-for="item in 11"
            ref="slides"
        )
            img(:src="require(`~/assets/img/animation/image_${item}.png`)")
</template>

<script>
export default {
    data(){
        return{
            animation_play: false, 
            animation_interval: null,
            animation_slide: 2,
            interval_delay: 1500
        }
    },
    mounted() {
        // if(window.innerWidth >= 1200) {
        window.lmS.on('call', this.onCall)
        // }
    },
    methods: {
        onCall(func, type, el) {
			if (func === 'chat') {
                window.lmS.on('scroll', this.animation)
			}
		},
        animation() {
            if((this.$refs.anim.getBoundingClientRect().y <= (window.innerHeight - 400)) && this.$refs.anim.getBoundingClientRect().y >= 0) {
                this.animation_play = true
            }
            else {
                this.animation_play = false
            }
        }
    },
    watch: {
        animation_play(val) {
            if(val) {
                this.animation_interval = setInterval(() => {
                    if(this.animation_slide === 11) {
                        clearInterval(this.animation_interval)
                        setTimeout(() => {
                            this.animation_slide = 2
                            this.animation_play = false
                            this.$nextTick(() => {
                                this.animation_play = true  
                            })
                            this.$refs.slides.forEach((el, ind) => {
                                if(ind !== 0 && ind !== 1) {
                                    el.style = 'height: 0; margin-bottom: 0; opacity: 0; transform: scale(0);'
                                }
                                else {
                                    el.style = 'opacity: 1;'
                                }
                            });
                        }, 5000);
                    }
                    else {
                        this.animation_slide += 1
                    }
                }, this.interval_delay);
            }
            else {
                clearInterval(this.animation_interval)
            }
        },
        animation_slide(slide) {
            const slides = this.$refs.slides
            const slides_height = [40, 288, 40, 300, 40, 140, 40, 140, 40, 161, 161]
            const slides_height_mobile = [25.5, 185, 25.5, 192.5, 25.5, 90, 25.5, 90, 25.5, 103.1, 103.1]
            const param = window.innerWidth >= 1200 ? 1440 : 768 

            if(window.innerWidth >= 768){
                slides[slide-1].style = `opacity: 1; height: ${(slides_height[slide-1]/param * 100)}vw; transform: scale(1); ${(slide-1) === 10 ? '' : 'margin-bottom:' +  (16/param * 100)+'vw;'}`
                if(slides[slide-5]) {
                    slides[slide-5].style = `opacity: 0;`
                }
            }

            else {
                slides[slide-1].style = `opacity: 1; height: ${(slides_height_mobile[slide-1]/414 * 100)}vw; transform: scale(1); ${(slide-1) === 10 ? '' : 'margin-bottom:' +  (11/414 * 100)+'vw;'}`
                if(slides[slide-6]) {
                    slides[slide-6].style = `opacity: 0;`
                }
            }
        
            clearInterval(this.animation_interval)
            if(slide%2 || slide === 10) {
                this.interval_delay = 1000
            }
            else {
                this.interval_delay = 2500
            }
            this.animation_play = false
            this.$nextTick(() => {
                this.animation_play = true  
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.animation {
    position: relative;
    width: 50%;

    &__images {
        position: absolute;
        // margin-top: desktop-vw(56);
        bottom: desktop-vw(-400);
    }

    &__image {
        // position: absolute;
        top: 0;
        left: 0;
        width: desktop-vw(556);
        height: desktop-vw(0);
        transform: scale(0);
        opacity: 0;
        transition: height .25s ease, opacity .55s ease, transform .45s ease;

        &:nth-child(1) {
            width: desktop-vw(556);
            height: desktop-vw(40);
            margin-bottom: desktop-vw(16);
            transform: scale(1);
            opacity: 1;
        }

        &:nth-child(2) {
            width: desktop-vw(556);
            height: desktop-vw(288);
            margin-bottom: desktop-vw(16);
            transform: scale(1);
            opacity: 1;
        }

        &:nth-child(odd) {
            transform-origin: right;
        }

        &:nth-child(even) {
            transform-origin: left;
        }

        &:nth-child(10) {
            width: desktop-vw(560);
        }

        &:nth-child(11) {
            width: desktop-vw(560);
            transform-origin: left;
        }


        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

@media screen and (max-width: $tablet) {
    .animation {
        width: 100%;

        &__images {
            position: absolute;
            bottom: tablet-vw(-300);
            left: 50%;
            transform: translateX(-50%);
        }

        &__image {
            width: tablet-vw(556);
            height: tablet-vw(0);

            &:nth-child(1) {
                width: tablet-vw(556);
                height: tablet-vw(40);
                margin-bottom: tablet-vw(16);
                transform: scale(1);
                opacity: 1;
            }

            &:nth-child(2) {
                width: tablet-vw(556);
                height: tablet-vw(288);
                margin-bottom: tablet-vw(16);
                transform: scale(1);
                opacity: 1;
            }

            &:nth-child(odd) {
                transform-origin: right;
            }

            &:nth-child(even) {
                transform-origin: left;
            }

            &:nth-child(10) {
                width: tablet-vw(560);
            }

            &:nth-child(11) {
                width: tablet-vw(560);
                transform-origin: left;
            }
        }
    }
}

@media screen and (max-width: $mobile) {
    .animation {
        width: 100%;

        &__images {
            bottom: mobile-vw(-250);
            left: 0;
            transform: translateX(0);
        }

        &__image {
            width: 100%;
            height: mobile-vw(0);

            &:nth-child(1) {
                width: 100%;
                height: mobile-vw(25.5);
                margin-bottom: mobile-vw(11);
                transform: scale(1);
                opacity: 1;
            }

            &:nth-child(2) {
                width: 100%;
                height: mobile-vw(185);
                margin-bottom: mobile-vw(11);
                transform: scale(1);
                opacity: 1;
            }

            &:nth-child(odd) {
                transform-origin: right;
            }

            &:nth-child(even) {
                transform-origin: left;
            }

            &:nth-child(10) {
                width: 100%;
            }

            &:nth-child(11) {
                width: 100%;
                transform-origin: left;
            }
        }
    }
}

</style>