<template lang="pug">
.section.subscription
    .subscription__banner.banner.anim-content__rotateY(data-scroll)
        h4.banner__title {{ content.title }}
        button.banner__btn(@click="moveTo") {{ content.textBtn }}
    footer-block(:content="footer")
</template>

<script>
import footerBlock from '~/components/footer-block.vue'

export default {
    components: {
        footerBlock
    },
    props: [
        'content'
    ],
    data(){
        return {
            scroll: true,
            footer: {
                privacy: '© 2022 Jerold',
                socials: [
                    {
                        link: '#',
                        icon: require('~/assets/img/fb.svg')
                    },
                    {
                        link: '#',
                        icon: require('~/assets/img/tg.svg')
                    },
                    {
                        link: '#',
                        icon: require('~/assets/img/reddit.svg')
                    },
                    {
                        link: '#',
                        icon: require('~/assets/img/twitter.svg')
                    }
                ],
                links: [
                    {
                        link: '#',
                        text: 'Terms of use'
                    },
                    {
                        link: '#',
                        text: 'Privacy Policy'
                    }
                ]
            }
        }
    },
    mounted() {
    },
    methods: {
        moveTo() {
            window.lmS.scrollTo('#tariffs')
        },
    }
}
</script>

<style lang="scss" scoped>
.section {
    position: relative;
    min-height: 100vh;
    width: 100%;
    padding: desktop-vw(124) desktop-vw(48) desktop-vw(63) desktop-vw(48);
}

.subscription {

    &__banner {
        position: absolute;
        top: 0; 
        left: 0; 
        bottom: 0; 
        right: desktop-vw(50);
        margin: auto;
    }
}

.banner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: desktop-vw(40);
    width: desktop-vw(713);
    // min-height: desktop-vw(207);
    height: max-content;
    padding: desktop-vw(40) desktop-vw(129);
    background: rgba(230, 230, 230, 0.03);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: desktop-vw(16);

    &__title {
        font-family: 'SF Mono';
        font-style: normal;
        font-weight: 700;
        font-size: desktop-vw(32);
        line-height: 120%;
        color: #FFFFFF;
        text-align: center;
    }

    &__btn {
        max-width: desktop-vw(225);
        width: 100%;
        font-family: 'SF Mono';
        font-style: normal;
        font-weight: 400;
        font-size: desktop-vw(16);
        line-height: 158%;
        text-transform: uppercase;
        color: #000000;
        cursor: pointer;
        padding: desktop-vw(12) desktop-vw(5);
        background: #FFFFFF;
        border: 1px solid #FFFFFF;
        border-radius: desktop-vw(24);
        transition: all 0.3s ease;

        &:hover {
            background: #E6E6E6;
            border: 1px solid #E6E6E6;
        }
    }
}

@media screen and (max-width: $tablet) {
    .section {
        padding: tablet-vw(124) tablet-vw(48) tablet-vw(63) tablet-vw(48);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .banner {
        gap: tablet-vw(40);
        max-width: tablet-vw(556);
        width: 100%;
        right: 0;
        // min-height: tablet-vw(207);
        padding: tablet-vw(40) desktop-vw(55);
        border-radius: tablet-vw(16);

        &__title {
            font-size: tablet-vw(32);
        }

        &__btn {
            max-width: tablet-vw(225);
            font-size: tablet-vw(16);
            padding: tablet-vw(12) tablet-vw(5);
            border-radius: tablet-vw(24);
        }
    }
}

@media screen and (max-width: $mobile) {
    .section {
        padding: mobile-vw(124) mobile-vw(24) mobile-vw(63) mobile-vw(24);
    }

    .banner {
        gap: mobile-vw(40);
        max-width: mobile-vw(366);
        // min-height: mobile-vw(179);
        padding: mobile-vw(40) mobile-vw(15);
        border-radius: mobile-vw(16);

        &__title {
            font-size: mobile-vw(22);
        }

        &__btn {
            max-width: mobile-vw(225);
            font-size: mobile-vw(16);
            padding: mobile-vw(12) mobile-vw(5);
            border-radius: mobile-vw(24);
        }
    }
}

</style>