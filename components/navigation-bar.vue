<template lang="pug">
.navigation(v-if="itemSize")
    .menu
        a(href="#main" @click.prevent="moveTo('#main')" :class="{'menu__item_active': active === 'main'}").menu__item
            .menu__text(:class="{'menu__text_hide': hide}") как я устроен                
            .menu__circle   
            .menu__line
        a(href="#get" @click.prevent="moveTo('#get')" :class="{'menu__item_active': active === 'get'}").menu__item
            .menu__text(:class="{'menu__text_hide': hide}") что вы получите                
            .menu__circle   
            .menu__line
        a(href="#how" @click.prevent="moveTo('#how')" :class="{'menu__item_active': active === 'how'}").menu__item
            .menu__text(:class="{'menu__text_hide': hide}") как это работает           
            .menu__circle   
            .menu__line
        a(href="#digit" @click.prevent="moveTo('#digit')" :class="{'menu__item_active': active === 'digit'}").menu__item
            .menu__text(:class="{'menu__text_hide': hide}") цифры и факты                
            .menu__circle   
            .menu__line
        a(href="#tariffs" @click.prevent="moveTo('#tariffs')" :class="{'menu__item_active': active === 'tariffs'}").menu__item
            .menu__text(:class="{'menu__text_hide': hide}") тарифы                
            .menu__circle   
            .menu__line
        a(href="#faq" @click.prevent="moveTo('#faq')" :class="{'menu__item_active': active === 'faq'}").menu__item
            .menu__text(:class="{'menu__text_hide': hide}") faq                
            .menu__circle   
            .menu__line    
</template>

<script>
export default {
    props: ['hide'],
    data() {
        return {
            active: 'main',
            itemSize: null
        }
    },
    methods: {
        moveTo(target) {
            window.lmS.scrollTo(document.querySelector(target))
        },
        onResize(e) {
            console.log(e)
            if (e > 767) {
                this.itemSize = true
            } else {
                this.itemSize = false
            }
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.onResize(window.innerWidth);
        })
        window.addEventListener('resize', this.onResize(window.innerWidth))

        window.lmS.on('scroll', (args) => {
            if (args.currentElements.main){
                this.active = 'main';
            }
            if (args.currentElements.get){
                this.active = 'get';
            }
            if (args.currentElements.how){
                this.active = 'how';
            }
            if (args.currentElements.statistic){
                this.active = 'digit';
            }
            if (args.currentElements.tariffs){
                this.active = 'tariffs';
            }
            if (args.currentElements.faq){
                this.active = 'faq';
            }
        });
            
    }
}
</script>

<style lang="scss" scoped>
.navigation{
    position:fixed;
    right: desktop-vw(46);
    top: desktop-vw(294);
    z-index:99;
}
.menu {
    &__item {
        position: relative;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        &:hover {
            .menu__text {
                display: inline-block;
                background: linear-gradient(90deg, rgba(17,17,17,0.9) 66%, rgba(38,38,38,0) 100%);
            }
        }

        &_active {
            .menu__circle {
                background: linear-gradient(180deg, #0488A5 0%, #00DDAB 100%), #D9D9D9;
                border-radius: 50%;
                animation: bgc 0.75s;

                &::after {
                    content: "";
                    position: absolute;
                    top: desktop-vw(-5);
                    left: desktop-vw(-5);
                    width: desktop-vw(17);
                    height: desktop-vw(17);
                    border: 0.5px solid #0488A5;
                    border-radius: 50%;
                    background: radial-gradient(75% 75% at 50% 50%, rgba(9, 99, 118, 0) 0%, rgba(4, 136, 165, 0.8) 100%);
                    opacity: 0.6;
                    animation: opacity1 2s;
                }
                &::before {
                    content: "";
                    position: absolute;
                    top: desktop-vw(-13);
                    left: desktop-vw(-13);
                    width: desktop-vw(33);
                    height: desktop-vw(33);
                    border-radius: 50%;
                    border: 0.5px solid #00DDAB;
                    background: radial-gradient(75% 75% at 50% 50%, #111111 44.33%, #0488A5 100%);
                    opacity: 0.25;
                    animation: opacity2 2s;
                }
            }
            .menu__text {
                color: #FFFFFF;
            }
        }
    }
    &__circle {
        width: desktop-vw(9);
        height: desktop-vw(9);
        background: #353535;
        border-radius: 50%;
    }

    &__text {
        position: absolute;
        top: desktop-vw(-5);
        right: desktop-vw(5);
        max-width: desktop-vw(200);
        white-space: nowrap;
        font-family: 'SF Mono';
        font-style: normal;
        font-weight: 500;
        font-size: desktop-vw(12);
        line-height: 158%;
        text-align: right;
        text-transform: uppercase;
        color: #353535;
        padding-right: desktop-vw(24);

        &_hide {
            display: none;
        }

    }
    &__line {
        position: relative;
        width: 1px;
        min-height: desktop-vw(34);
        background-color: #353535;
    }

    &__item:last-of-type {
        .menu__line {
            display: none;
        }
    }
}

@media screen and (max-width: $tablet) {
    .navigation{
        display: none;
    }
}

@keyframes bgc {
    0% {
        background: #353535;
    }

    25% {
        opacity: 0.25;
    }

    50% {
        background: linear-gradient(180deg, #00DDAB 0%, #0488A5 100%);
        opacity: 0.5;
    }

    75% {
        opacity: 0.75;
    }

    100% {
        background: linear-gradient(180deg, #0488A5 0%, #00DDAB 100%);
        opacity: 1;
    }
}
@keyframes opacity1 {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 0.6;
    }
}
@keyframes opacity2 {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 0.25;
    }
}
</style>
