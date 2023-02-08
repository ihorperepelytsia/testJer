<template lang="pug">
.itemFaq(:class="{'open' : show}")
    .itemFaq__title {{ content.title }}
    slide-up-down(
        :duration="500"
        :active="show"
    )
        .itemFaq__mt
        .itemFaq__text {{ content.text }}   
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'
export default {
    components: {
        SlideUpDown,
    },
    props: [
        'content',
        'show',
    ],
    data(){
        return{
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.itemFaq {
    padding: desktop-vw(32) 0;
    cursor: pointer;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);

    &__mt {
        height: desktop-vw(25);
        width: 100%;
    }

    &__title {
        font-weight: 700;
        font-size: desktop-vw(24);
        line-height: 120%;
        color: #FFFFFF;
        padding: 0 desktop-vw(40) 0 0;
        width: 100%;
        position: relative;
        // margin-bottom: desktop-vw(24);

        &:after {
            content: '';
            position: absolute;
            right: desktop-vw(14);
            top:  desktop-vw(6);
            display: block;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M10 0V20' stroke='white' stroke-width='2'/%3e%3cpath d='M20 10L-5.66244e-07 10' stroke='white' stroke-width='2'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            width: desktop-vw(20);
            height: desktop-vw(20);
        }
    }

    &__text {
        font-style: normal;
        font-weight: 300;
        font-size: desktop-vw(16);
        line-height: 158%;
        max-width: 90%;
        color: #9B9AA0;
    }

    &.open {
        .itemFaq__title:after {
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg viewBox='0 0 20 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M20 1L-5.66244e-07 0.999999' stroke='white' stroke-width='2'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            top:  desktop-vw(15);
            height: desktop-vw(2);
        }
    }
}

@media screen and (max-width: $tablet) {
    .itemFaq {
        padding: tablet-vw(32) 0;

        &__mt {
            height: tablet-vw(25);
            width: 100%;
        }

        &__title {
            font-size: tablet-vw(24);
            padding: 0 tablet-vw(40) 0 0;

            &:after {
                right: tablet-vw(14);
                top:  tablet-vw(6);
                width: tablet-vw(20);
                height: tablet-vw(20);
            }
        }

        &__text {
            font-size: tablet-vw(16);
        }

        &.open {
            .itemFaq__title:after {
                top:  tablet-vw(15);
                height: tablet-vw(2);
            }
        }
    }
}

@media screen and (max-width: $mobile) {
    .itemFaq {
        padding: mobile-vw(32) 0;

        &__mt {
            height: mobile-vw(25);
            width: 100%;
        }

        &__title {
            font-size: mobile-vw(22);
            padding: 0 mobile-vw(40) 0 0;

            &:after {
                right: mobile-vw(14);
                top:  calc(50% - mobile-vw(10));
                width: mobile-vw(20);
                height: mobile-vw(20);
            }
        }

        &__text {
            font-size: mobile-vw(16);
        }

        &.open {
            .itemFaq__title:after {
                top:  mobile-vw(15);
                height: mobile-vw(2);
            }
        }
    }
}

</style>