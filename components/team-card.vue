<template lang="pug">
  .card.anim-content__rotateY(data-scroll)
    .card__image
      .card__image-img(
        v-if="!trader.photo" )
      img(
        v-else
        :src="trader.photo"
        :alt="trader.name")
    h3.card__title(v-html="trader.name")
    p.card__description(v-html="trader.about")
</template>

<script>
export default {
  name: "team-card",
  props: ['trader'],
}
</script>

<style scoped lang="scss">
.card {
    font-family: 'SF Mono';
    padding: desktop-vw(24) desktop-vw(32);
    font-weight: 700;
    background: rgba(230, 230, 230, 0.03);
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: desktop-vw(16);
    max-width: desktop-vw(370);
    // width: desktop-vw(369);
    // height: desktop-vw(514);
    
    transition-delay: 0.5s;


    &__image {
        height: desktop-vw(299);
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__title {
        font-family: 'SF Mono';
        font-weight: 700;
        font-size: desktop-vw(32);
        color: #E3E3E3;
        line-height: 120%;
        margin: desktop-vw(8) 0 desktop-vw(16) 0;
        opacity: 0; 
    }

    &__description {
        font-size: desktop-vw(14);
        line-height: 150%;
        color: #9290A4;
        font-weight: 300;
        max-width: desktop-vw(290);
        opacity: 0; 
        
        ::v-deep(span) {
            color: #fff;
        }
    }
    &.is-inview {
        // .card {
        //     animation: widthUp 1s forwards;
        //     animation-delay: 1s;
        // }

        .card__title,
        .card__description {
            animation: opacityUp 1s forwards;
            animation-delay: 1s;
        }
    }
}

@media screen and (max-width: $tablet) {
    .card {
        padding: tablet-vw(32);
        border-radius: tablet-vw(16);
        // width: tablet-vw(400);
        width: 100%;
        max-width: tablet-vw(328);

    &__image {
        height: tablet-vw(299);
        width: 100%;
        overflow: hidden;

        img {
            width: 100%;
            height: auto;
            object-fit: cover;
        }
    }

    &__title {
        font-size: tablet-vw(42);
        line-height: tablet-vw(50);
        margin: 0 0 tablet-vw(16) 0;
    }

    &__description {
        font-size: tablet-vw(14);
        line-height: tablet-vw(24);
        max-width: none;
    }

    &__image {
            img {
                object-fit: contain;
            }
        }
    }
}

@media screen and (max-width: $mobile) {
    .card {
        max-width: mobile-vw(328);
        padding: mobile-vw(32);
        border-radius: mobile-vw(16);
        // width: mobile-vw(308);

        &.is-inview {

            .card__title,
            .card__description {
                animation: none;
            }
        }

        &__image {
            height: mobile-vw(299);
            img {
                height: 100%;
            }
        }
        &__title {
            opacity: 1;

            font-size: mobile-vw(32);
            line-height: mobile-vw(38);
            margin: 0 0 mobile-vw(16) 0;
        }

        &__description {
            opacity: 1;
            font-size: mobile-vw(14);
            line-height: mobile-vw(24);
        }
    }
}
</style>
