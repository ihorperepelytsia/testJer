<template lang="pug">
.section
    .wrap-about-text(
        :item-size="itemSize"
        data-scroll
        data-scroll-speed="-5"
    )
        .about-text(
            data-scroll
                v-for="(item, idx) in textAbout"
            :key="idx"
            v-html="item"
        )
    //- .wrap-about-text(
    //-     :item-size="itemSize"
    //-     data-scroll
    //-     data-scroll-speed="-4"
    //- )
    //-     .about-text(
    //-         v-if="content"
    //-         data-scroll
    //-         v-for="(item, idx) in textAbout"
    //-         :key="idx" 
    //-     ) {{ item }}
    //- .wrap-about-text.wrap-about-text_tablet(
    //-     :item-size="itemSize"
    //-     data-scroll
    //-     data-scroll-speed="-4"
    //- ) 
    //-     .about-text(
    //-         v-if="content"
    //-         data-scroll
    //-         v-for="(item, idx) in textAboutTablet"
    //-         :key="idx" 
    //-     ) {{ item }}
    //- .wrap-about-text.wrap-about-text_mobile(
    //-     :item-size="itemSize"
    //-     data-scroll
    //-     data-scroll-speed="-4"
    //- ) 
    //-     .about-text(
    //-         v-if="content"
    //-         data-scroll
    //-         v-for="(item, idx) in textAboutMob"
    //-         :key="idx" 
    //-     ) {{ item }}
</template>

<script>
export default {
    props: [
        'content'
    ],
    data() {
        return {
            itemSize: null,
            about: true,
            about2: true,
            count: 1
        }
    },
    mounted() {
        // document.addEventListener("scroll", (e) => {
        //     let el = document.querySelector("#about2");
        //     let inViewport = this.elementInViewport(el);
        //     if(inViewport && this.about) {
        //         document.body.classList.add("stopScroll");
        //         document.querySelector('#about').classList.add('anim-text1')
        //         this.about = false
        //         setTimeout(function() {
        //             document.body.classList.remove("stopScroll");
        //         }, 4000)
        //     }
        //     if(inViewport && this.about) {
        //         document.body.classList.add("stopScroll");
        //         document.querySelector('#about').classList.add('anim-text1')
        //         this.about = false
        //         setTimeout(function() {
        //             document.body.classList.remove("stopScroll");
        //         }, 4000)
        //     }
        // })

        window.lmS.on('scroll', (args) => {
            if (args.currentElements.threeElem) {
                document.querySelector('#about').classList.add('anim-text1')
            }
        })

        // window.lmS.on('scroll', (args) => {
        //     if(args.currentElements.about2 && this.about) {
        //         document.querySelector('#about').classList.add('anim-text1')
        //         this.about = false
        //         window.lmS.stop()
        //         document.body.classList.add("stopScroll");
        //         setTimeout(function() {
        //             window.lmS.start()
        //             document.body.classList.remove("stopScroll");
        //         }, 4000)
        //     }
        //     if(args.currentElements.threeElem && this.about2) {
        //         document.querySelector('#about2').classList.add('anim-text1')
        //         this.about2 = false
        //         window.lmS.stop()
        //         document.body.classList.add("stopScroll");
        //         setTimeout(function() {
        //             window.lmS.start()
        //             document.body.classList.remove("stopScroll");
        //         }, 4000)
        //     }
        // })
    },
    computed: {
        textAbout() {
            if (this.content) {
                let masWord = this.content.text.split('<br>')
                return masWord
            }
            return ''
        }
        // textAbout() {
        //     if(this.content.text){
        //         let str = ''
        //         let masWord = this.content.text.split(' ')
        //         let newStr = []
        //         for(let i = 0; i < masWord.length; i++){
        //             str = str +  masWord[i] + ' '
        //             // console.log(str)
        //             // console.log(str.length)
        //             if(str.length >= 59) {
        //                 newStr.push(str)
        //                 str = ''
        //             }
        //         }
        //         newStr.push(str)
        //         return newStr
        //       }
        //     return ''
        // },
        // textAboutTablet() {
        //     if(this.content.text){
        //         let str = ''
        //         let masWord = this.content.text.split(' ')
        //         let newStr = []
        //         for(let i = 0; i < masWord.length; i++){
        //             str = str +  masWord[i] + ' '
        //             // console.log(str)
        //             // console.log(str.length)
        //             if(str.length >= 44) {
        //                 newStr.push(str)
        //                 str = ''
        //             }
        //         }
        //         newStr.push(str)
        //         return newStr
        //       }
        //     return ''
        // },
        // textAboutMob() {
        //     if(this.content.text){
        //         let str = ''
        //         let masWord = this.content.text.split(' ')
        //         let newStr = []
        //         for(let i = 0; i < masWord.length; i++){
        //             str = str +  masWord[i] + ' '
        //             // console.log(str)
        //             // console.log(str.length)
        //             if(str.length >= 32) {
        //                 newStr.push(str)
        //                 str = ''
        //             }
        //         }
        //         newStr.push(str)
        //         return newStr
        //       }
        //     return ''
        // }
    },
}
</script>

<style lang="scss" scoped>
@keyframes curs {
    50% {
        border-right: 3px solid #fff;
    }
}

// @keyframes anim-text1 {
//     100%{width: desktop-vw(1000)}
// }

@keyframes anim-text1 {
    100% {
        opacity: 1;
        transform: translate(0px, 0px);
    }
}

// @keyframes anim-text2 {
//     100%{width: desktop-vw(720)}
// }

@keyframes on {
    0% {
        background: #fff;
    }
}

.anim-text1 .about-text {
    // opacity: 1;
    // transform: translate(0px, 0px);

    &:nth-child(1) {
        animation: anim-text1 1s forwards;
    }

    &:nth-child(2) {
        animation: anim-text1 1s forwards;
        animation-delay: .3s;
    }

    &:nth-child(3) {
        animation: anim-text1 1s steps(50) forwards;
        animation-delay: 2s;
    }

    &:nth-child(4) {
        animation: anim-text1 1s steps(50) forwards;
        animation-delay: 3s;
    }

    &:nth-child(5) {
        animation: anim-text1 1s steps(50) forwards;
        animation-delay: 4s;
    }

    &:nth-child(6) {
        animation: anim-text1 1s steps(50) forwards;
        animation-delay: 5s;
    }

    // &:nth-child(7) {
    //     animation: anim-text1 1s steps(50) forwards;
    //     animation-delay:6s;
    // }
    // &:nth-child(8) {
    //     animation: anim-text1 1s steps(50) forwards;
    //     animation-delay:7s;
    // }
    // &:nth-child(9) {
    //     animation: anim-text1 1s steps(50) forwards;
    //     animation-delay:8s;
    // }
    // &:nth-child(10) {
    //     animation: anim-text1 1s steps(50) forwards;
    //     animation-delay:9s;
    // }
    // &:nth-child(11) {
    //     animation: curs 1s infinite, anim-text2 1s steps(50) forwards;
    //     animation-delay:10s;
    // }
    // &:nth-child(12) {
    //     animation: anim-text1 1s steps(50) forwards;
    //     animation-delay:11s;
    // }
    // &:nth-child(13) {
    //     animation: anim-text1 1s steps(50) forwards;
    //     animation-delay:12s;
    // }
    // &:nth-child(14) {
    //     animation: anim-text1 1s steps(50) forwards;
    //     animation-delay:13s;
    // }
    // &:nth-child(15) {
    //     animation: anim-text1 1s steps(50) forwards;
    //     animation-delay:14s;
    // }
    // &:nth-child(16) {
    //     animation: curs 1s step-end 1, anim-text1 1s steps(50) forwards;
    //     animation-delay:15s;
    // }
}

// .anim-text2 {
//     animation: curs 1s step-end 1, anim-text1 1s steps(46) forwards;
//     animation-delay:1s;
// }

// .anim-text3 {
//     animation: curs 1s step-end infinite, anim-text1 1.3s steps(56) forwards;
//     animation-delay:2s;
// }

.section {
    position: relative;
    min-height: 100vh;
    // min-height: 80vh;

    width: 100%;
    padding: desktop-vw(124) desktop-vw(48) desktop-vw(63) desktop-vw(48);
    // background: rgba(255, 255, 255, 0.5);
    // border-bottom: 3px solid red;
}

.wrap-about-text {
    margin-top: desktop-vw(170);
    position: relative;
    z-index: 2;

    // &_tablet {
    //     display: none;
    // }

    // &_mobile {
    //     display: none;
    // }
}

.about-text {
    // overflow:hidden;
    // transition: 1s;
    // width:0;
    // white-space: nowrap;
    max-width: desktop-vw(1018);
    font-family: 'SF Mono', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: desktop-vw(18);
    line-height: 158%;
    color: #FFFFFF;
    opacity: 0;
    transform: translate(0px, 50px);
    margin-bottom: desktop-vw(20);
    max-width: 57%;
}

@media screen and (max-width: $tablet) {
    .section {
        padding: tablet-vw(124) tablet-vw(48) tablet-vw(63) tablet-vw(48);
        min-height: 80vh;
    }

    // @keyframes curs{
    //     50%{border-right: 3px solid #fff;}
    // }

    // @keyframes anim-text1 {
    //     100%{width: tablet-vw(825)}
    // }

    // @keyframes on{
    //     0%{background: #fff;}
    // }

    .wrap-about-text {
        margin-top: tablet-vw(160);
        display: block;

        // &_tablet {
        //     display: block;
        // }

        // &_mobile {
        //     display: none;
        // }
    }

    .about-text {
        max-width: 100%;
        font-size: tablet-vw(18);
        margin-bottom: tablet-vw(24);
        // line-height: tablet-vw(28); 
    }
}

@media screen and (max-width: $mobile) {
    .section {
        padding: mobile-vw(124) mobile-vw(24) mobile-vw(63) mobile-vw(24);
        min-height: 80vh;
    }

    // @keyframes anim-text1 {
    //     100%{width: mobile-vw(370)}
    // }

    // @keyframes anim-text2 {
    //     100%{width: mobile-vw(225)}
    // }

    // @keyframes curs{
    //     50%{border-right: 3px solid #fff;}
    // }

    // .anim-text1 .about-text {
    //     animation: anim-text1 .5s steps(50) forwards;
    // }

    // .anim-text2 {
    //     animation: anim-text1 .5s steps(46) forwards;
    //     animation-delay: .5s;
    // }

    // .anim-text3 {
    //     animation: anim-text1 .5s steps(56) forwards;
    //     animation-delay: 1s;
    // }

    // .anim-text4 {
    //     animation: anim-text1 .5s steps(56) forwards;
    //     animation-delay: 1.5s;
    // }
    // .anim-text5 {
    //     animation: curs 1s step-end infinite, anim-text2 .5s steps(56) forwards;
    //     animation-delay: 2s;
    // }

    .wrap-about-text {
        margin-top: mobile-vw(75);
        display: block;

        // &_tablet {
        //     display: none;
        // }

        // &_mobile {
        //     display: block;
        // }
    }

    .about-text {
        font-size: mobile-vw(16);
        margin-bottom: mobile-vw(24);
        // line-height: mobile-vw(22); 
    }
}
</style>
