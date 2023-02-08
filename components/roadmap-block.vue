<template lang="pug">
.section
    .roadmap
        .roadmap_title Роадмап
        .roadmap_img
            img(src="~/assets/img/roadmapv2.png")

</template>
<script>
export default {
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
    // min-height: 100vh;
    width: 100%;
    z-index: 1;
    padding: desktop-vw(90) desktop-vw(48) desktop-vw(90) desktop-vw(48);

    // &::before {
    //     content: "";
    //     display: block;
    //     position: absolute;
    //     background: linear-gradient(180deg, #111111 60%, rgba(17, 17, 17, 0) 100%), linear-gradient(180deg, #111111 20%, rgba(17, 17, 17, 0) 100%), linear-gradient(180deg, #111111 10%, rgba(17, 17, 17, 0) 100%);
    //     top: calc(100% - desktop-vw(96));
    //     left: 0;
    //     width: 100%;
    //     height: 17vw;
    //     // z-index: -1;
    // }
}

.roadmap {
    max-width: desktop-vw(1200);
    width: 100%;
    margin: 0 auto;

    &_title {
        text-align: center;
        font-style: normal;
        font-weight: 700;
        font-size: desktop-vw(48);
        line-height: 120%;
        color: #FFFFFF;
        margin-bottom: desktop-vw(64);
    }

    &_img {
        max-width: desktop-vw(1200);
        width: 100%;
        overflow: auto;
        img {
            width: desktop-vw(1200);
            height: auto;
            backdrop-filter: opacity(0);
        }
        
    }
}


@media screen and (max-width: $tablet) {

    .section {
        position: relative;
        // min-height: 100vh;
        width: 100%;
        padding: tablet-vw(90) 0 tablet-vw(90) 0;

        &::before {
            top: calc(100% - tablet-vw(96));
        }
    }

    .roadmap {
        max-width: tablet-vw(1200);
        

        &_title {
            font-size: tablet-vw(48);
            margin-bottom: tablet-vw(64);
            text-align: center;
        }

        &_img {
            max-width: tablet-vw(1200);
            // padding-left: tablet-vw(48);
            padding-left: 0;

            img {
                width: tablet-vw(1200);
                margin-left: tablet-vw(-55);
            }
            
        }
    }

}

@media screen and (max-width: $mobile) {
    .section {
        &::before {
            top: calc(100% - mobile-vw(53));
        }
    }

    .roadmap {
        max-width: mobile-vw(1200);

        &_title {
            font-size: mobile-vw(48);
            margin-bottom: mobile-vw(64);
        }

        &_img {
            max-width: mobile-vw(1200);
            // padding-left: mobile-vw(24);
            padding-left: 0;

            img {
                width: mobile-vw(1200);
                margin-left: mobile-vw(-55);
            }
            
        }
    }
}

</style>