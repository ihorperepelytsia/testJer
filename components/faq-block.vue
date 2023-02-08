<template lang="pug">
.section
    .faqContent(v-if="content")
        h2.faqContent__title {{ content.title }}
        .faqContent__faqList
            faqItem-subcomponent(
                v-for="(item, idx) in content.listFaq"
                :key="idx"
                :content="item" 
                @click.native="open(idx)"
                :show="index === idx && show ? true : false"
            )
</template>

<script>
import faqItemSubcomponent from '~/components/faqItem-subcomponent.vue'
export default {
    components: {
        faqItemSubcomponent,
    },
    props: [
        'content'
    ],
    data(){
        return{
            show: false,
            index: null,
        }
    },
    methods: {
        open(idx){
            this.show = !this.show
            if(this.index !== idx){
                this.index = idx
                this.show = true
            }
            setTimeout(() => {
                window.lmS.update()
            },500)
        }
    }
}
</script>

<style lang="scss" scoped>
.section {
    position: relative;
    // min-height: 100vh;
    width: 100%;
    padding: desktop-vw(124) desktop-vw(48) desktop-vw(72) desktop-vw(48);
}

.faqContent {
    max-width: desktop-vw(771);
    width: 100%;
    margin: 0 auto 0px auto;

    &__title {
        font-weight: 700;
        font-size: desktop-vw(48);
        line-height: 120%;
        color: #FFFFFF;
        margin-bottom: desktop-vw(24);
        text-align: center;
    }
}

@media screen and (max-width: $tablet) {
    .section {
        padding: tablet-vw(90) tablet-vw(48) tablet-vw(90) tablet-vw(48);
        min-height: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .faqContent {
        max-width: tablet-vw(771);
        margin: 0;

        &__title {
            font-size: tablet-vw(48);
            margin-bottom: tablet-vw(24);
        }
    }
}

@media screen and (max-width: $mobile) {
    .section {
        padding: mobile-vw(48) mobile-vw(24) mobile-vw(48) mobile-vw(24);
    }

    .faqContent {
        max-width: mobile-vw(771);
        margin: 0;

        &__title {
            font-size: mobile-vw(32);
            margin-bottom: mobile-vw(24);
        }
    }
}

</style>