<template lang="pug">
.section
    .wrap-about-text(
        v-if="itemSize"
        :item-size="itemSize"
        data-scroll
        data-scroll-speed="-4"
    )
        .about-text(
            v-if="content"
            data-scroll
            data-scroll-class="anim-text1"
            v-for="(item, idx) in textAbout"
            :key="idx" 
        ) {{ item }}
    .wrap-about-text.wrap-about-text_mob(
        v-else
        :item-size="itemSize"
        data-scroll
        data-scroll-speed="-4"
    ) 
        .about-text(
            v-if="content"
            data-scroll
            data-scroll-class="anim-text1"
            v-for="(item, idx) in textAboutMob"
            :key="idx" 
        ) {{ item }}
</template>

<script>

export default {
    props: [
        'content'
    ],
    data(){
        return{
            itemSize: null,
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.onResize(window.innerWidth);
        })
        window.addEventListener('resize', this.onResize(window.innerWidth))
    },
    computed: {
        textAbout() {
            if(this.content.text){
                let str = ''
                let masWord = this.content.text.split(' ')
                let newStr = []
                for(let i = 0; i < masWord.length; i++){
                    str = str +  masWord[i] + ' '
                    // console.log(str)
                    // console.log(str.length)
                    if(str.length >= 59) {
                        newStr.push(str)
                        str = ''
                    }
                }
                newStr.push(str)
                return newStr
              }
            return ''
        },
        textAboutMob() {
            if(this.content.text){
                let str = ''
                let masWord = this.content.text.split(' ')
                let newStr = []
                for(let i = 0; i < masWord.length; i++){
                    str = str +  masWord[i] + ' '
                    // console.log(str)
                    // console.log(str.length)
                    if(str.length >= 59) {
                        newStr.push(str)
                        str = ''
                    }
                }
                newStr.push(str)
                return newStr
              }
            return ''
        }
    },
    methods: {
        onResize(e) {
            // console.log(e)
            if (e > 767) {
                this.itemSize = true
            } else {
                this.itemSize = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>

@keyframes curs{
    50%{border-right: 3px solid #fff;}
}

@keyframes anim-text1 {
    100%{width: desktop-vw(1000)}
}

@keyframes anim-text2 {
    100%{width: desktop-vw(720)}
}

@keyframes on{
    0%{background: #fff;}
}

.anim-text1 {
    
    &:nth-child(1) {
        animation: anim-text1 .5s steps(50) forwards;
    }
    &:nth-child(2) {
        animation: anim-text1 .5s steps(50) forwards;
        animation-delay:.5s;
    }
    &:nth-child(3) {
        animation: anim-text1 .5s steps(50) forwards;
        animation-delay:1s;
    }
    &:nth-child(4) {
        animation: anim-text1 .5s steps(50) forwards;
        animation-delay:1.5s;
    }
    &:nth-child(5) {
        animation: anim-text1 .5s steps(50) forwards;
        animation-delay:2s;
    }
    &:nth-child(6) {
        animation: anim-text1 .5s steps(50) forwards;
        animation-delay:2.5s;
    }
    &:nth-child(7) {
        animation: anim-text1 .5s steps(50) forwards;
        animation-delay:3s;
    }
    &:nth-child(8) {
        animation: anim-text1 .5s steps(50) forwards;
        animation-delay:3.5s;
    }
    &:nth-child(9) {
        animation: anim-text1 .5s steps(50) forwards;
        animation-delay:4s;
    }
    &:nth-child(10) {
        animation: anim-text1 .5s steps(50) forwards;
        animation-delay:4.5s;
    }
    &:nth-child(11) {
        animation: anim-text2 .5s steps(50) forwards;
        animation-delay:5s;
    }
    &:nth-child(12) {
        animation: anim-text1 .5s steps(50) forwards;
        animation-delay:5.5s;
    }
    &:nth-child(13) {
        animation: anim-text1 .5s steps(50) forwards;
        animation-delay:6s;
    }
    &:nth-child(14) {
        animation: anim-text1 .5s steps(50) forwards;
        animation-delay:6.5s;
    }
    &:nth-child(15) {
        animation: anim-text1 .5s steps(50) forwards;
        animation-delay:7s;
    }
    &:nth-child(16) {
        animation: curs 1s step-end 1, anim-text1 .5s steps(50) forwards;
        animation-delay:7.5s;
    }
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
    width: 100%;
    padding: desktop-vw(124) desktop-vw(48) desktop-vw(63) desktop-vw(48);
}

.wrap-about-text {
    margin-top: desktop-vw(170);
    position: relative;
    z-index: 2;
}

.about-text {
    overflow:hidden;
    transition: 1s;
    width:0;
    white-space: nowrap;
    max-width: desktop-vw(1018);
    font-family: 'SF Mono';
    font-style: normal;
    font-weight: 500;
    font-size: desktop-vw(24);
    line-height: 120%;
    color: #FFFFFF;
    
}

@media screen and (max-width: $tablet) {
    .section {
        padding: tablet-vw(124) tablet-vw(48) tablet-vw(63) tablet-vw(48);
        min-height: 0;
    }

    @keyframes curs{
        50%{border-right: 3px solid #fff;}
    }

    @keyframes anim-text1 {
        100%{width: tablet-vw(825)}
    }

    @keyframes on{
        0%{background: #fff;}
    }

    .wrap-about-text {
        margin-top: tablet-vw(175);
    }

    .about-text {
        max-width: tablet-vw(625);
        font-size: tablet-vw(18); 
        line-height: tablet-vw(28); 
    }
    
}

@media screen and (max-width: $mobile) {
    .section {
        padding: tablet-vw(124) tablet-vw(24) tablet-vw(63) tablet-vw(24);
        min-height: 0;
    }

    @keyframes anim-text1 {
        100%{width: mobile-vw(310)}
    }

    @keyframes anim-text2 {
        100%{width: mobile-vw(310)}
    }

    @keyframes curs{
        50%{border-right: 3px solid #fff;}
    }

    .anim-text1 {
        animation: anim-text1 .5s steps(50) forwards;
    }

    .anim-text2 {
        animation: anim-text1 .5s steps(46) forwards;
        animation-delay: .5s;
    }

    .anim-text3 {
        animation: anim-text1 .5s steps(56) forwards;
        animation-delay: 1s;
    }

    .anim-text4 {
        animation: anim-text1 .5s steps(56) forwards;
        animation-delay: 1.5s;
    }
    .anim-text5 {
        animation: curs 1s step-end infinite, anim-text2 .5s steps(56) forwards;
        animation-delay: 2s;
    }

    .wrap-about-text {
        margin-top: mobile-vw(75);
    }

    .about-text {
        // max-width: mobile-vw(320);
        max-width:  none;
        font-size: mobile-vw(14); 
        width: 0;
        line-height: mobile-vw(22); 
    }
}

</style>