<template lang="pug">
.card
    .tariffCart.anim-content__rotateY(
        :class="{'tariffCart_green' : index === 0, 'tariffCart_lock' : index === 1}"
        data-scroll
    )
        .tariffCart__title {{ content.title }}
        .tariffCart__wrapper
            .tariffCart__single(
                v-html="content.single + '<span>$</span>'"
            )
            .tariffCart__single.tariffCart__single_old(
                v-html="`<span> ${content.old} $</span>` + '/мес'"
            )
        .tariffCart__text(
            v-html="content.text"
        )
        .tariffCart__list(
            v-if="content.listAdvantage"
        )
            .tariffCart__item(
                v-for="(item, index) in content.listAdvantage"
                :key="index" 
            )   
                .tariffCart__itemText {{ item }}
        .tariffCart__info(
            v-if="content.info"
            data-scroll
        ) {{ content.info }} 
        .tariffCart__image(
            v-if="content.image"
            data-scroll
        ) 
            img(:src="content.image")
        .tariffCart_wrap-btn         
            app-button(
                v-if="btn"
                :type="'tariffs'"
                @click="openModalForm(index)"
            ) {{ btn }}
            a.tariffCart_more(@click="openModal(index)") {{ more }}   
    .lock.anim-content__rotateY(
        v-if="index === 1"
        data-scroll
    )
        .lock__title {{ content.title }}
        .lock__text В новом пакете вас ожидает еще больше полезных инструментов
        .lock__tag 
            include ../assets/svg/clock.svg
            .lock__info Coming soon
</template>

<script>
import appButton from '~/components/button.vue'
import { mapState } from 'vuex'
export default {
    components: {
        appButton
    },
    props: [
        'content',
        'index'
    ],
    data(){
        return{
            btn: 'подписаться',
            more: 'подробнее'
        }
    },
    computed: {
        ...mapState({
            active: state => state.popup.active,
            activeForm: state => state.package.active
        })
    },
    methods: {
        openModalForm(index) {
            if(!this.activeForm){
                this.$store.commit('package/activate')
                this.$store.commit("package/changeIdx", index);
            }
            else{
                this.$store.commit('package/deactivate')
            }
        },
        openModal(index) {
            if(!this.active){
                this.$store.commit('popup/activate', index)
            }
            else{
                this.$store.commit('popup/deactivate')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    position: relative;
}
.tariffCart {
   border-radius: desktop-vw(16);
   padding: desktop-vw(28); 
   background: rgba(230, 230, 230, 0.03);
   backdrop-filter: blur(12px);
   border-top: 1px solid rgba(255, 255, 255, 0.5);
   transition: all 1s ease;
   max-width: desktop-vw(480);
   display: flex;
   flex-direction: column;
//    justify-content: space-between;

    &__title {
        font-weight: 500;
        font-size: desktop-vw(32);
        line-height: 120%;
        color: #FFFFFF;
        margin-bottom: desktop-vw(32);
        opacity: 0;
    }

    &__wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: baseline;
    }

    &__single {
        font-weight: 500;
        font-size: desktop-vw(32);
        line-height: 175%;
        color: #fff;
        // color: rgba(255, 255, 255, 0.4);
        margin-bottom: desktop-vw(16);
        opacity: 0;

        &_old {
            margin-left: desktop-vw(16);
            ::v-deep()  {
                font-size: desktop-vw(16);
            }
            ::v-deep(span) {
                text-decoration: line-through;
                color: #fff;
                font-size: desktop-vw(24);

                &:first-child {
                    // color: rgba(255, 255, 255, 0.4);
                    font-size: desktop-vw(24);
                    color: #6EC7AC;
                }
            }
        }

        ::v-deep(span) {
            font-size: desktop-vw(32);
            line-height: 120%;
            color: #fff;


            &:nth-child(2) {
                margin-left: desktop-vw(10);
            }
        }
        
    }

    &__text {
        font-weight: 300;
        font-size: desktop-vw(14);
        line-height: 150%;
        color: #FFFFFF;
        margin-bottom: desktop-vw(24);
        max-width: 98%;
        opacity: 0;
    }

    &__list {
        margin-bottom: desktop-vw(64);
    }

    &__item {
        border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);
        padding: desktop-vw(16) 0;
        min-height: desktop-vw(100);
        // white-space: nowrap;
        opacity: 0;
        overflow: hidden;

        .tariffCart__itemText {
            display: flex;
            font-weight: 300;
            font-size: desktop-vw(14);
            line-height: 150%;
            color: #FFFFFF;
            opacity: 0; 

            &:before {
                content: '';
                display: block;
                background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7.99336 16.4926C12.399 16.4926 15.9867 12.9049 15.9867 8.49922C15.9866 4.09358 12.399 0.505859 7.99336 0.505859C3.58772 0.505859 0 4.09358 0 8.49922C0 12.9049 3.58772 16.4926 7.99336 16.4926ZM3.90373 8.1832C4.20119 7.88575 4.66593 7.88575 4.96339 8.1832L6.71081 9.93062L10.6517 5.98971C10.9492 5.69225 11.4139 5.69225 11.7114 5.98971C12.0088 6.28717 12.0088 6.7519 11.7114 7.04936L7.24996 11.5108C7.10123 11.6595 6.91542 11.7338 6.72946 11.7338C6.54352 11.7338 6.35771 11.6595 6.20896 11.5108L3.90373 9.24275C3.62495 8.94543 3.62495 8.4807 3.90373 8.18324V8.1832Z' fill='white'/%3e%3c/svg%3e");
                background-repeat: no-repeat;
                min-width: desktop-vw(16);
                max-width: desktop-vw(16);
                height: desktop-vw(17);
                margin-right: desktop-vw(16);
                margin-top: desktop-vw(3);
            }
        }

        &:first-child {
            border-top: 0.5px solid rgba(255, 255, 255, 0.3);
        }
    }

    &_wrap-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
    }

    &_more {
        font-weight: 400;
        font-size: desktop-vw(16);
        line-height: 158%;
        text-transform: uppercase;
        color: #FFFFFF;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            color: #E6E6E6;
        }
    }

    &__info {
        font-family: 'SF Mono';
        font-style: normal;
        font-weight: 700;
        font-size: desktop-vw(18);
        line-height: 130%;
        color: #FFFFFF;
        margin-top: calc(desktop-vw(40) - desktop-vw(24));
        margin-bottom: desktop-vw(24);
        opacity: 0;
    }

    &__image {
        position: relative;
        width: 100%;
        height: 100%;
        margin-bottom: desktop-vw(91);
        opacity: 0;
        pointer-events: none;
        user-select: none;

        img {
            
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &.is-inview {

        .tariffCart__item {
            animation: opacityUp 1s forwards;
            animation-delay: 1s;

            .tariffCart__itemText {
            animation: opacityUp 1s forwards;
            animation-delay: 1s;
            }
        }

        .tariffCart__title,
        .tariffCart__info,
        .tariffCart__image,
        .tariffCart__text,
        .tariffCart__single {
            animation: opacityUp 1s forwards;
            animation-delay: 1s;
        }
    }
}


.tariffCart_green {
    background: linear-gradient(224.89deg, #00F275 -40.75%, rgba(0, 207, 171, 0.38) 91.44%);
    border-top: 1px solid rgba(255, 255, 255, 0.5);

    .customBtn {
        background: #FFF;
    }
}

.tariffCart_lock {
    background: rgba(230, 230, 230, 0.03);
    -webkit-backdrop-filter: blur(12px);
    filter: blur(12px);
}

.lock {
    position: absolute;
    top: desktop-vw(-1);
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: desktop-vw(80);
    // background: url('~/assets/img/lock.png');
    // background-position: center;
    // background-size: cover;
    // background-repeat: no-repeat;
    border-radius: desktop-vw(16);
    opacity: 0;

    &__title {
        font-family: 'SF Mono';
        font-style: normal;
        font-weight: 700;
        font-size: desktop-vw(32);
        line-height: 120%;
        color: #FFFFFF;
        margin-bottom: desktop-vw(24);
    }

    &__text {
        font-family: 'SF Mono';
        font-style: normal;
        font-weight: 300;
        font-size: desktop-vw(14);
        line-height: 150%;
        color: #FFFFFF;
        text-align: center;
        margin-bottom: desktop-vw(24);
    }

    &__tag {
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

    &__info {
        font-style: normal;
        font-weight: 600;
        font-size: desktop-vw(14);
        line-height: 100%;
        background: linear-gradient(96.33deg, #20C6EB 5.54%, #00DDAB 96.19%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }
}

.lock {
    animation: opacityUp 1s forwards;
    animation-delay: 1s;
}

@media screen and (max-width: $tablet) {
    .tariffCart {
        border-radius: tablet-vw(16);
        padding: tablet-vw(32) tablet-vw(32); 
        max-width: tablet-vw(480);
        width: 100%;

        &_more {
            font-size: tablet-vw(16);
        }

        &__title {
            font-size: tablet-vw(32);
            margin-bottom: tablet-vw(32);
        }

        &__single {
            font-size: tablet-vw(16);
            margin-bottom: tablet-vw(16);

            &_old {
                margin-left: tablet-vw(16);

                ::v-deep()  {
                    font-size: tablet-vw(16);
                }

                ::v-deep(span) {
                    text-decoration: line-through;
                    font-size: tablet-vw(24);

                    &:first-child {
                        font-size: tablet-vw(24);
                    }
                }
            }

            ::v-deep(span) {
                font-size: tablet-vw(32);
            }
        }

        &__text {
            font-size: tablet-vw(14);
            margin-bottom: tablet-vw(24);
        }

        &__list {
            margin-bottom: tablet-vw(64);
        }

        &__item {
            padding: tablet-vw(16) 0;
            min-height: tablet-vw(100);

            .tariffCart__itemText {
                font-size: tablet-vw(14);
                &:before {
                    min-width: tablet-vw(16);
                    max-width: tablet-vw(16);
                    height: tablet-vw(17);
                    margin-right: tablet-vw(16);
                    margin-top: tablet-vw(3);
                }
            }
        }

        &__info {
            font-size: tablet-vw(18);
            margin-top: calc(tablet-vw(40) - tablet-vw(24));
            margin-bottom: tablet-vw(24);
        }

        &__image {
            margin-bottom: tablet-vw(91);
        }
    }

    .tariffCart_green {
    background: linear-gradient(224.89deg, #00F275 -40.75%, rgba(0, 207, 171, 0.38) 91.44%);
    border-top: 1px solid rgba(255, 255, 255, 0.5);

    .customBtn {
        background: #FFF;
    }
}
    .lock {
        top: tablet-vw(-1);
        padding: tablet-vw(80);
        border-radius: tablet-vw(16);

        &__title {
            font-size: tablet-vw(32);
            margin-bottom: tablet-vw(24);
        }

        &__text {
            font-size: tablet-vw(14);
            margin-bottom: tablet-vw(24);
        }

        &__tag {
            padding: tablet-vw(7) tablet-vw(16);
            gap: tablet-vw(10);

            &::after {
                border-radius: tablet-vw(60); 
                padding: tablet-vw(1.18); 
            }
        }

        &__info {
            font-size: tablet-vw(14);
        }
    }
}

@media screen and (max-width: $mobile) {
    .tariffCart {
        border-radius: mobile-vw(16);
        padding: mobile-vw(32) mobile-vw(34); 
        max-width: mobile-vw(370);

        &_more {
            font-size: mobile-vw(16);
        }

        &__title {
            font-size: mobile-vw(32);
            margin-bottom: mobile-vw(32);
        }

        &__single {
            font-size: mobile-vw(16);
            margin-bottom: mobile-vw(16);

            &_old {
                margin-left: mobile-vw(16);

                ::v-deep()  {
                    font-size: mobile-vw(16);
                }
                
                ::v-deep(span) {
                    font-size: mobile-vw(24);

                    &:first-child {
                        font-size: mobile-vw(24);
                    }
                }
            }

            ::v-deep(span) {
                font-size: mobile-vw(32);
            }
        }

        &__text {
            font-size: mobile-vw(14);
            margin-bottom: mobile-vw(24);
        }

        &__list {
            margin-bottom: mobile-vw(64);
        }

        &__item {
            padding: mobile-vw(16) 0;

            .tariffCart__itemText {
                font-size: mobile-vw(14);
                &:before {
                    min-width: mobile-vw(16);
                    max-width: mobile-vw(16);
                    height: mobile-vw(17);
                    margin-right: mobile-vw(16);
                    margin-top: mobile-vw(3);
                }
            }
        }

        &__info {
            font-size: mobile-vw(18);
            margin-top: calc(mobile-vw(40) - mobile-vw(24));
            margin-bottom: mobile-vw(24);
            font-size: mobile-vw(16);
        }

        &__image {
            margin-bottom: mobile-vw(91);
        }
    }

    .lock {
        top: mobile-vw(-1);
        padding: mobile-vw(40);
        border-radius: mobile-vw(16);
        background: none;
        // background: rgba(230, 230, 230, 0.03);
        // -webkit-backdrop-filter: blur(12px);
        // backdrop-filter: blur(12px);

        &__title {
            font-size: mobile-vw(32);
            margin-bottom: mobile-vw(24);
        }

        &__text {
            font-size: mobile-vw(14);
            margin-bottom: mobile-vw(24);
        }

        &__tag {
            padding: mobile-vw(7) mobile-vw(16);
            gap: mobile-vw(10);

            &::after {
                border-radius: mobile-vw(60); 
                padding: mobile-vw(1.18); 
            }
        }

        &__info {
            font-size: mobile-vw(14);
        }
    }
}

</style>