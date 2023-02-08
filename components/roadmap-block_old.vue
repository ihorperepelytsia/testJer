<template lang="pug">
.section.roadmap
    .roadmap-content-bottom(v-if="content")
        info-subcomponent.anim-content__opacity.anim-content__translateY(
            :content="content.info"
            data-scroll 
        )
    .roadmap-graph-wrap
        .roadmap-graph
            .roadmap-graph__column(
                    v-for="(item, index) in content.columns"
                    :key="index" 
                    )
                .roadmap-graph__cell.cell-graph.anim-content__width(data-scroll)
                    .roadmap-graph__cell-left
                        .cell-graph__circle
                        .cell-graph__text.anim-content__opacity(data-scroll) {{ item.cell.title }}
                    .roadmap-graph__cell-right.anim-content__opacity(v-if="item.soon" data-scroll) {{ item.soon }}
                .roadmap-graph__circle
                .roadmap-graph__line
                .roadmap-graph__bottom
                    .roadmap-graph__double-circle 
                    .roadmap-graph__text {{ item.text }}
            
    

</template>

<script>
import infoSubcomponent from '~/components/info-subcomponent.vue'
export default {
    components: {
        infoSubcomponent
    },
    props: [
        'content'
    ],
    data(){
        return{
        }
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

.roadmap {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    &-content-bottom {
        bottom: desktop-vw(96);
        left: desktop-vw(48);
        min-width: desktop-vw(302);
    }

    &-graph {
        position: relative;
        display: flex;
        justify-content: flex-start;
        margin-bottom: desktop-vw(10);
        // margin-top: desktop-vw(55);
        margin-left: desktop-vw(-15);
        min-width: desktop-vw(1060);

        &__column {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: desktop-vw(117);
        }

        &__circle {
            width: desktop-vw(4);
            height: desktop-vw(4);
            background: #0488A5;
            border-radius: 50%;
            margin-bottom: desktop-vw(6);
        }

        &__line {
            width: 1px;
            min-height: desktop-vw(512);
            background-color: rgba(255, 255, 255, 0.3);
        }

        &__bottom {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: desktop-vw(12);
        }

        &__double-circle {
            position: relative;
            width: desktop-vw(6);
            height: desktop-vw(6);
            background: #0488A5;
            border-radius: 50%;

            &::after {
                content: "";
                position: absolute;
                top: desktop-vw(-6);
                left: desktop-vw(-6);
                width: desktop-vw(17);
                height: desktop-vw(17);
                border: 0.5px solid #0488A5;
                border-radius: 50%;
                background: radial-gradient(75% 75% at 50% 50%, rgba(9, 99, 118, 0) 0%, rgba(4, 136, 165, 0.8) 100%);
                opacity: 0.6;
            }
        }

        &__text {
            position: absolute;
            left: desktop-vw(28);
            font-style: normal;
            font-weight: 400;
            font-size: desktop-vw(16);
            line-height: 120%;
            color: #C7CBD2;
        }
        .anim-content__opacity {
            transition-duration: 2s;
            transition-delay: 0.5s;
        }

        &__column:last-child {
            .roadmap-graph__text, .roadmap-graph__cell {
                display: none;
            }    
        }

        &__cell{
            position: absolute;
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-height: desktop-vw(41);
            border-radius: 24px;
            padding: desktop-vw(12) desktop-vw(18);
            transition-delay: 0.5s;

            .roadmap-graph__cell-left {
                display: flex;
                align-items: center;
            }

            .roadmap-graph__cell-right {
                white-space: nowrap;
                overflow: hidden;
            }
        }

        &__column:nth-child(1) {
            .roadmap-graph__cell {
                top: desktop-vw(41);
                left: desktop-vw(60);
                max-width: desktop-vw(935);
                background: linear-gradient(104.03deg, #20C6EB 72.25%, #00DDAB 518.28%);
                transition-duration: 1.75s;
            }    
        }

        &__column:nth-child(2) {
            .roadmap-graph__cell {
                top: desktop-vw(98);
                left: desktop-vw(155);
                max-width: desktop-vw(840);
                background: linear-gradient(102.93deg, #20C6EB 11.22%, #00DDAB 532.38%);
            }    
        }

        &__column:nth-child(3) {
            .roadmap-graph__cell {
                top: desktop-vw(152);
                left: desktop-vw(175);
                max-width: desktop-vw(820);
                background: linear-gradient(105.62deg, #20C6EB -49.29%, #00DDAB 325.32%);
                transition-duration: 1.9s;
            }    
        }

        &__column:nth-child(4) {
            .roadmap-graph__cell {
                top: desktop-vw(208);
                left: desktop-vw(290);
                max-width: desktop-vw(705);
                background: linear-gradient(104.94deg, #20C6EB -117.46%, #00DDAB 281.91%);
            }    
        }

        &__column:nth-child(5) {
            .roadmap-graph__cell {
                top: desktop-vw(266);
                left: desktop-vw(445);
                max-width: desktop-vw(551);
                background: rgba(230, 230, 230, 0.03);
                border-top: 1.5px solid rgba(255, 255, 255, 0.5);
                -webkit-backdrop-filter: blur(12px);
                backdrop-filter: blur(12px);
                color: rgba(255, 255, 255, 0.5);

                .cell-graph {
                    &__circle {
                        background: #ECECEC;

                        &::after {
                            background: rgba(255, 255, 255, 0.5);
                        }
                    }
                }
            }    
        }

        &__column:nth-child(6) {
            .roadmap-graph__cell {
                top: desktop-vw(324);
                left: desktop-vw(524);
                max-width: desktop-vw(473);
                background: rgba(230, 230, 230, 0.03);
                border-top: 1.5px solid rgba(255, 255, 255, 0.5);
                -webkit-backdrop-filter: blur(12px);
                backdrop-filter: blur(12px);
                color: rgba(255, 255, 255, 0.5);

                .cell-graph {
                    &__circle {
                        background: #ECECEC;

                        &::after {
                            background: rgba(255, 255, 255, 0.5);
                        }
                    }
                }
            }    
        }

        &__column:nth-child(7) {
            .roadmap-graph__cell {
                top: desktop-vw(383);
                left: desktop-vw(638);
                max-width: desktop-vw(359);
                background: rgba(230, 230, 230, 0.03);
                border-top: 1.5px solid rgba(255, 255, 255, 0.5);
                -webkit-backdrop-filter: blur(12px);
                backdrop-filter: blur(12px);
                color: rgba(255, 255, 255, 0.5);

                .cell-graph {
                    &__circle {
                        background: #ECECEC;

                        &::after {
                            background: rgba(255, 255, 255, 0.5);
                        }
                    }
                }
            }    
        }

        &__column:nth-child(8) {
            .roadmap-graph__cell {
                top: desktop-vw(442);
                left: desktop-vw(706);
                max-width: desktop-vw(290);
                background: rgba(230, 230, 230, 0.03);
                border-top: 1.5px solid rgba(255, 255, 255, 0.5);
                -webkit-backdrop-filter: blur(12px);
                backdrop-filter: blur(12px);
                color: rgba(255, 255, 255, 0.5);

                .cell-graph {
                    &__circle {
                        background: #ECECEC;

                        &::after {
                            background: rgba(255, 255, 255, 0.5);
                        }
                    }
                }
            }    
        }
        
    }
}

.cell-graph {
    &__circle {
        position: relative;
        width: desktop-vw(5);
        height: desktop-vw(5);
        background: #000000;
        border-radius: 50%;

        &::after {
            content: "";
            position: absolute;
            top: desktop-vw(-5);
            left: desktop-vw(-5);
            width: desktop-vw(15);
            height: desktop-vw(15);
            border-radius: 50%;
            background: #111111;
            opacity: 0.2;
        }
    }

    &__text {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 120%;
        text-align: center;
        text-transform: uppercase;
        margin-left: desktop-vw(15);
    }
}


@media screen and (max-width: $tablet) {
    .section {
        padding: tablet-vw(124) 0 tablet-vw(63) 0;
        display: block;
    }

    .roadmap-graph-wrap {
        overflow-x: auto;
        overflow-y: hidden;
        padding-bottom: tablet-vw(40);
        margin-left:  tablet-vw(-6);
    }

    .roadmap {
        &-content-bottom {
            position: relative;
            bottom: auto;
            left: auto;
            max-width: tablet-vw(302);
            margin-bottom: tablet-vw(50);
            padding-left: tablet-vw(63);
        }

        &-graph-wrap {
            padding-left: tablet-vw(63);
        }

        &-graph {
            margin-top: 0;
            margin-left: tablet-vw(-50);
            min-width: tablet-vw(1054);

            &__column {
                width: tablet-vw(200);
            }

            &__circle {
                width: tablet-vw(4);
                height: tablet-vw(4);
                margin-bottom: tablet-vw(6);
            }

            &__line {
                min-height: tablet-vw(512);
            }

            &__bottom {
                margin-top: tablet-vw(12);
            }

            &__double-circle {
                width: tablet-vw(6);
                height: tablet-vw(6);

                &::after {
                    top: tablet-vw(-6);
                    left: tablet-vw(-6);
                    width: tablet-vw(17);
                    height: tablet-vw(17);
                }
            }

            &__text {
                left: tablet-vw(28);
                font-size: tablet-vw(16);
            }

            &__cell{
                max-height: tablet-vw(41);
                border-radius: tablet-vw(24);
                padding: tablet-vw(12) tablet-vw(18);
            }

            &__column:nth-child(1) {
                .roadmap-graph__cell {
                    top: tablet-vw(41);
                    left: tablet-vw(60);
                    max-width: tablet-vw(935);
                }    
            }

            &__column:nth-child(2) {
                .roadmap-graph__cell {
                    top: tablet-vw(98);
                    left: tablet-vw(155);
                    max-width: tablet-vw(840);
                }    
            }

            &__column:nth-child(3) {
                .roadmap-graph__cell {
                    top: tablet-vw(152);
                    left: tablet-vw(175);
                    max-width: tablet-vw(820);
                }    
            }

            &__column:nth-child(4) {
                .roadmap-graph__cell {
                    top: tablet-vw(208);
                    left: tablet-vw(290);
                    max-width: tablet-vw(705);
                }    
            }

            &__column:nth-child(5) {
                .roadmap-graph__cell {
                    top: tablet-vw(266);
                    left: tablet-vw(445);
                    max-width: tablet-vw(551);
                }    
            }

            &__column:nth-child(6) {
                .roadmap-graph__cell {
                    top: tablet-vw(324);
                    left: tablet-vw(524);
                    max-width: tablet-vw(473);
                }    
            }

            &__column:nth-child(7) {
                .roadmap-graph__cell {
                    top: tablet-vw(383);
                    left: tablet-vw(638);
                    max-width: tablet-vw(359);
                }    
            }

            &__column:nth-child(8) {
                .roadmap-graph__cell {
                    top: tablet-vw(442);
                    left: tablet-vw(706);
                    max-width: tablet-vw(290);
                }    
            }
            
        }
    }

    .cell-graph {
        &__circle {
            width: tablet-vw(5);
            height: tablet-vw(5);

            &::after {
                top: tablet-vw(-5);
                left: tablet-vw(-5);
                width: tablet-vw(15);
                height: tablet-vw(15);
            }
        }

        &__text {
            font-size: tablet-vw(14);
            margin-left: tablet-vw(15);
        }
    }
}

@media screen and (max-width: $mobile) {
     .section {
        padding: mobile-vw(48) 0 mobile-vw(48) 0;
    }

    .roadmap-graph-wrap {
        padding-bottom: mobile-vw(40);
        margin-left:  mobile-vw(-6);
    }

    .roadmap {
        &-content-bottom {
            position: relative;
            bottom: auto;
            left: auto;
            max-width: mobile-vw(302);
            margin-bottom: mobile-vw(40);
            padding-left: mobile-vw(24);
        }

        &-graph-wrap {
            padding-left: mobile-vw(24);
        }

        &-graph {
            margin-top: 0;
            margin-left: mobile-vw(-50);
            min-width: mobile-vw(1054);

            &__column {
                width: mobile-vw(200);
            }

            &__circle {
                width: mobile-vw(4);
                height: mobile-vw(4);
                margin-bottom: mobile-vw(6);
            }

            &__line {
                min-height: mobile-vw(512);
            }

            &__bottom {
                margin-top: mobile-vw(12);
            }

            &__double-circle {
                width: mobile-vw(6);
                height: mobile-vw(6);

                &::after {
                    top: mobile-vw(-6);
                    left: mobile-vw(-6);
                    width: mobile-vw(17);
                    height: mobile-vw(17);
                }
            }

            &__text {
                left: mobile-vw(28);
                font-size: mobile-vw(16);
            }

            &__cell{
                max-height: mobile-vw(41);
                border-radius: mobile-vw(24);
                padding: mobile-vw(12) mobile-vw(18);
            }

           &__column:nth-child(1) {
                .roadmap-graph__cell {
                    top: mobile-vw(41);
                    left: mobile-vw(60);
                    max-width: mobile-vw(935);
                }    
            }

            &__column:nth-child(2) {
                .roadmap-graph__cell {
                    top: mobile-vw(98);
                    left: mobile-vw(155);
                    max-width: mobile-vw(840);
                }    
            }

            &__column:nth-child(3) {
                .roadmap-graph__cell {
                    top: mobile-vw(152);
                    left: mobile-vw(175);
                    max-width: mobile-vw(820);
                }    
            }

            &__column:nth-child(4) {
                .roadmap-graph__cell {
                    top: mobile-vw(208);
                    left: mobile-vw(290);
                    max-width: mobile-vw(705);
                }    
            }

            &__column:nth-child(5) {
                .roadmap-graph__cell {
                    top: mobile-vw(266);
                    left: mobile-vw(445);
                    max-width: mobile-vw(551);
                }    
            }

            &__column:nth-child(6) {
                .roadmap-graph__cell {
                    top: mobile-vw(324);
                    left: mobile-vw(524);
                    max-width: mobile-vw(473);
                }    
            }

            &__column:nth-child(7) {
                .roadmap-graph__cell {
                    top: mobile-vw(383);
                    left: mobile-vw(638);
                    max-width: mobile-vw(359);
                }    
            }

            &__column:nth-child(8) {
                .roadmap-graph__cell {
                    top: mobile-vw(442);
                    left: mobile-vw(706);
                    max-width: mobile-vw(290);
                }    
            }
            
        }
    }

    .cell-graph {
        &__circle {
            width: mobile-vw(5);
            height: mobile-vw(5);

            &::after {
                top: mobile-vw(-5);
                left: mobile-vw(-5);
                width: mobile-vw(15);
                height: mobile-vw(15);
            }
        }

        &__text {
            font-size: mobile-vw(14);
            margin-left: mobile-vw(15);
        }
    }
}

</style>