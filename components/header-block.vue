<template lang="pug">
.header(:class="{'false-opacity' : !classOpacity}")
    a.header__logo(
        href="/"
    ) {{ logoName }}
    button.header__btn-subscribe(
        @click="moveTo"
    ) {{ btnName }}

</template>

<script>

export default {
    data(){
        return{
            logoName: 'JEROLD',
            btnName: 'Подписаться',
            classOpacity: false
        }
    },
    methods: {
        moveTo() {
            window.lmS.scrollTo('#tariffs')
        },
    },
    mounted() {
        let thisOpacity = this
        setTimeout(thisOpacity.classOpacity = true, 1)
    }
}
</script>

<style lang="scss" scoped>

.header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //background: #111;
    width: 100%;
    padding: desktop-vw(25) desktop-vw(40) desktop-vw(25) desktop-vw(40);
    // height: desktop-vw(124);
    transition: all 5s ease;
    

    &:before {
        content:'';
        display: block;
        position: absolute;
        background: linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0) 100%), linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0) 100%), linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0) 100%);
        top: 0;
        left: 0;
        width: 100%;
        height: desktop-vw(110);
        //box-shadow: 0px -21px 31px 58px #111;
        z-index: -1;
    }

    &__logo {
        font-style: normal;
        font-weight: 700;
        font-size: desktop-vw(24);
        line-height: 158%;
        color: #FFFFFF;
        text-decoration: none;
    }

    &__btn-subscribe {
        position: relative;
        display: flex;
        justify-content: center;
        height: desktop-vw(41);
        padding: 0 desktop-vw(20);
        border: none;
        align-items: center;
        background: transparent;
        font-style: normal;
        font-weight: 400;
        font-size: desktop-vw(16);
        line-height: 158%;
        /* or 25px */
        cursor: pointer;
        text-transform: uppercase;

        background: linear-gradient(96.33deg, #20C6EB 5.54%, #00DDAB 96.19%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        transition: all 0.3s ease;

        &:hover {
            background: linear-gradient(96.33deg, #00DDAB 5.54%, #00DDAB 96.19%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;

            &::after {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: desktop-vw(24); 
                padding: 1px; 
                background: linear-gradient(96.33deg, #00DDAB 5.54%, #00DDAB 96.19%); 
                -webkit-mask: 
                    linear-gradient(#fff 0 0) content-box, 
                    linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                        mask-composite: exclude; 
            }
        }
        &::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: desktop-vw(24); 
            padding: 1px; 
            background: linear-gradient(96.33deg, #20C6EB 5.54%, #00DDAB 96.19%); 
            -webkit-mask: 
                linear-gradient(#fff 0 0) content-box, 
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
                    mask-composite: exclude; 
        }
    }
}

@media screen and (max-width: $tablet) {
    .header {
        padding: tablet-vw(25) tablet-vw(32) tablet-vw(25) tablet-vw(32);

        &__logo {
            font-size: tablet-vw(24);
        }

        &:before {
            height: tablet-vw(121);
        }

        &__btn-subscribe {
            height: tablet-vw(41);
            padding: 0 tablet-vw(20);
            border-radius: tablet-vw(24);
            font-size: tablet-vw(16);

            &:hover {

                &::after {
                    border-radius: tablet-vw(24); 
                }
            }

            &::after {
                border-radius: tablet-vw(24); 
            }
        }
    }
}

@media screen and (max-width: $mobile) {
    .header {
        padding: mobile-vw(20) mobile-vw(24) mobile-vw(20) mobile-vw(24);

        &:before {
            height: mobile-vw(90);
        }

        &__logo {
            font-size: mobile-vw(24);
        }

        &__btn-subscribe {
            height: mobile-vw(41);
            padding: 0 mobile-vw(20);
            border-radius: mobile-vw(24);
            font-size: mobile-vw(16);

            &:hover {
                &::after {
                    border-radius: mobile-vw(24); 
                }
            }

            &::after {
                border-radius: mobile-vw(24); 
            }
        }
    }
}

</style>