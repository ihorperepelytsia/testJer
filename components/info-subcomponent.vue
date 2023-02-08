<template lang="pug">
.info(
    v-if="content" 
    :class="[`info__${type}`]"
)
    .info__title.info__title_1(
        v-if="content.title[0]"
        :class="(type ? 'info__title_'+type : '')"
        v-html="content.title[0]"
    ) {{ content.title[0] }}
    .info__title.info__title_2(
        v-if="content.title[1]"
        :class="(type ? 'info__title_'+type : '')"
        v-html="content.title[1]"
    ) {{ content.title[1] }}
    .info__text(
        :class="(type ? 'info__text_'+type : '')"
        v-html="content.text"
    ) {{ content.text }}
    .info__sale(v-if="content.sale") {{ content.sale }}
    .info__btn(v-if="btn")
        app-button(
            v-if="btn"
            @click="click"
        ) {{ btn }}
    .gift(
        v-if="prize && prize.text"
    )
        .gift__icon
            img(
                :src="prize.icon"
                alt="Gift"
            )
        .gift__text {{ prize.text }}
</template>

<script>
import appButton from '~/components/button.vue'
export default {
    components: {
        appButton
    },
    props: [
        'content',
        'type',
        'btn',
        'speedScroll',
        'prize',
    ],
    data(){
        return{
        }
    },
    methods: {
        click () {
            window.lmS.scrollTo('#tariffs')
        }
    }
}
</script>

<style lang="scss" scoped>
@keyframes curs{
    50%{border-right: 3px solid #fff;}
}
@keyframes txt_st1{
    100%{width: desktop-vw(295)}
}
@keyframes txt_st2{
    100%{width: desktop-vw(429)}
}
@keyframes txt_st3{
    100%{opacity: 1;}
}
@keyframes on{
    0%{background: #fff;}
}

@keyframes opacity {
    0%{opacity: 1;}
}

.info__iiBlock {
    transition: all 1s ease;
    .info__title,
    .info__text {
        
        opacity: 0;
    }

    ::v-deep() {

        .info__text span {
            display: inline-block;
            padding: desktop-vw(2.5) desktop-vw(8) desktop-vw(2.5) desktop-vw(4);
            background: rgba(51, 144, 236, 0.3);
            border-radius: desktop-vw(20);
            width: fit-content;
        }
        .info__text p{
            display: inline-block;
            background-image: url("~/assets/svg/telegram.svg");
            background-repeat: round;
            // background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='10' cy='10.5' r='10' fill='white'/%3e%3cpath d='M4.59261 9.98071C4.59261 9.98071 8.86765 8.22623 10.3503 7.60843C10.9187 7.36133 12.8462 6.57055 12.8462 6.57055C12.8462 6.57055 13.7358 6.22462 13.6616 7.06478C13.6369 7.41075 13.4392 8.62158 13.2415 9.93129C12.945 11.7846 12.6237 13.8109 12.6237 13.8109C12.6237 13.8109 12.5743 14.3793 12.1542 14.4782C11.7342 14.577 11.0422 14.1322 10.9187 14.0334C10.8198 13.9592 9.06533 12.8472 8.42284 12.3036C8.24986 12.1553 8.05218 11.8588 8.44754 11.5128C9.33716 10.6973 10.3997 9.68419 11.0422 9.0417C11.3388 8.74515 11.6353 8.05324 10.3997 8.89341C8.64525 10.1043 6.91546 11.241 6.91546 11.241C6.91546 11.241 6.52007 11.4881 5.77874 11.2657C5.03738 11.0433 4.17249 10.7468 4.17249 10.7468C4.17249 10.7468 3.57945 10.3761 4.59261 9.98071Z' fill='black'/%3e%3c/svg%3e");
            // background-repeat: no-repeat;
            width: desktop-vw(20);
            height: desktop-vw(20);
            // vertical-align: middle;
            vertical-align: text-bottom;
        }
    }

    .info__btn {
        transform: rotateX(90deg);
    }

    &.is-inview {
        .info__title,
        .info__text {
            animation: opacityUp 1s forwards;
            animation-delay: 0.5s;
        }

        .info__btn {
            animation: rotateX 1s forwards;
            animation-delay: 0.5s;
        }
    }
}

.info__main {
    .info__title {

        &_1 {
            overflow:hidden;
            transition: 1s;
            width:0;
            animation: curs 0.8s step-end 1, txt_st1 1s steps(8) forwards;
            animation-delay: 1s;
        }

        &_2 {
            white-space: nowrap;
            overflow:hidden;
            transition: 1s;
            width:0;
            animation: curs 0.8s step-end infinite, txt_st2 1s steps(11) forwards;
			animation-delay: 2s;
        }
    }

    .info__text {
        opacity: 0;
        animation: txt_st3 2s forwards;
		animation-delay:3s;
    }
}

.info {
    &__title {
        font-style: normal;
        font-weight: 700;
        font-size: desktop-vw(48);
        line-height: 120%;
        /* or 74px */
        color: #FFFFFF; 
        margin-bottom: desktop-vw(19);

        &_main {
            font-size: desktop-vw(64);
            margin-bottom: 0;
            padding: 0 0 desktop-vw(9) 0;
            max-width: 75%;
        }
    }

    &__text {
        margin: desktop-vw(13) 0 0;
        color: #FFFFFF;
        font-style: normal;
        font-weight: 300;
        font-size: desktop-vw(18);
        line-height: 158%;

        &_iiBlock {
            font-size: desktop-vw(16);
        }
    }

    &__sale {
        display: flex;
        align-items: center;
        padding: desktop-vw(7) desktop-vw(16);
        gap: desktop-vw(10);
        // border-radius: desktop-vw(60);
        position: relative;
        background: linear-gradient(96.33deg, #20C6EB 5.54%, #00DDAB 96.19%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        font-style: normal;
        font-weight: 600;
        font-size: desktop-vw(14);
        line-height: 100%;
        background: linear-gradient(96.33deg, #20C6EB 5.54%, #00DDAB 96.19%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        width: max-content;
        margin: 0 auto;

        &::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: desktop-vw(60); 
            padding: desktop-vw(1.18); 
            background: linear-gradient(96.33deg, #20C6EB 5.54%, #00DDAB 96.19%); 
            -webkit-mask: 
                linear-gradient(#fff 0 0) content-box, 
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
                    mask-composite: exclude; 
        }
    }

    .info__btn {
        margin-top: desktop-vw(45);
        width: max-content;
    }
}

.gift {
    margin: desktop-vw(34) auto;
    display: flex;
    width: fit-content;
    align-items: center;
    display: flex;
    align-items: center;
    padding: desktop-vw(7) desktop-vw(16);
    // gap: desktop-vw(10);
    position: relative;
    background: linear-gradient(96.33deg, #20C6EB 5.54%, #00DDAB 96.19%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: desktop-vw(60); 
        padding: desktop-vw(1.18); 
        background: linear-gradient(96.33deg, #20C6EB 5.54%, #00DDAB 96.19%); 
        -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude; 
    }

    &__icon {
        width: desktop-vw(16);
        height: desktop-vw(16);
        margin-right: desktop-vw(8);

        img {
            width: 100%;
            height: 100%;
        }
    }

    &__text {
        font-family: 'Gilroy';
        font-style: normal;
        font-weight: 600;
        font-size: desktop-vw(14);
        line-height: 200%;
        background: linear-gradient(96.33deg, #20C6EB 5.54%, #00DDAB 96.19%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }
}

@media screen and (max-width: $tablet) {
    @keyframes txt_st1{
        100%{width: tablet-vw(295)}
    }
    @keyframes txt_st2{
        100%{width: tablet-vw(429)}
    }

    .info {
        &__title {
            font-size: tablet-vw(48);
            margin-bottom: 0;

            &_main {
                font-size: tablet-vw(62);
                padding: 0 0 tablet-vw(9) 0;
            }
        }

        &__text {
            margin: tablet-vw(24) 0 0;
            font-size: tablet-vw(16);
        }

        &__sale {
            padding: tablet-vw(7) tablet-vw(16);
            gap: tablet-vw(10);
            font-size: tablet-vw(14);

            &::after {
                border-radius: tablet-vw(60); 
                padding: tablet-vw(1.18); 
            }
        }
    }

    .info__btn {
        margin-top: tablet-vw(40);
        width: max-content;
    }

    .info__iiBlock {

        ::v-deep() {

            .info__text span {
                padding: tablet-vw(2.5) tablet-vw(8) tablet-vw(2.5) tablet-vw(4);
                border-radius: tablet-vw(20);
            }

            .info__text p{
                width: tablet-vw(20);
                height: tablet-vw(20);
            }
        }
    }

    .gift {
        margin: tablet-vw(34) auto;
        padding: tablet-vw(7) tablet-vw(16);

        &::after {
            border-radius: tablet-vw(60); 
            padding: tablet-vw(1.18); 
        }

        &__icon {
            width: tablet-vw(16);
            height: tablet-vw(16);
            margin-right: tablet-vw(8);
        }

        &__text {
            font-size: tablet-vw(14);
        }
    }

}

@media screen and (max-width: $mobile) {
    @keyframes txt_st1{
        100%{width: mobile-vw(315)}
    }
    @keyframes txt_st2{
        100%{width: mobile-vw(270)}
    }

    .info {
        &__title {
            font-size: mobile-vw(32);
            margin-bottom: 0;

            &_iiBlock {
                margin-bottom: mobile-vw(24);
            }

            &_main {
                font-size: mobile-vw(40);
                padding: 0 0 mobile-vw(9) 0;
                max-width: 63%;
            }
        }

        &__text {
            margin-top: mobile-vw(24);
            line-height: 148%;
            margin: mobile-vw(13) 0 0;
            font-size: mobile-vw(16);

            &_iiBlock {
                margin-bottom: mobile-vw(32);
            }
        }

        &__sale {
            padding: mobile-vw(7) mobile-vw(16);
            gap: mobile-vw(10);
            font-size: mobile-vw(14);

            &::after {
                border-radius: mobile-vw(60); 
                padding: mobile-vw(1.18); 
            }
        }

    }

    .info__btn {
        margin-top: mobile-vw(32);
        width: max-content;
    }

    .info__iiBlock {

        ::v-deep() {

            .info__text span {
                padding: mobile-vw(2.5) mobile-vw(8) mobile-vw(2.5) mobile-vw(4);
                border-radius: mobile-vw(20);
            }

            .info__text p{
                width: mobile-vw(20);
                height: mobile-vw(20);
                vertical-align: middle;
            }
        }

    }

    .gift {
        margin: mobile-vw(34) auto;
        padding: mobile-vw(7) mobile-vw(16);

        &::after {
            border-radius: mobile-vw(60); 
            padding: mobile-vw(1.18); 
        }

        &__icon {
            width: mobile-vw(16);
            height: mobile-vw(16);
            margin-right: mobile-vw(8);
        }

        &__text {
            font-size: mobile-vw(14);
        }
    }
}

</style>