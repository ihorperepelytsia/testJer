<template lang="pug">
.v-popup(
        v-if="type === 'package'"
    )
    .payment
        .payment_fon(v-if="type === 'package'")
            img(src="~/assets/img/package_bottom.png")
        .payment__content
            .payment__left
                .payment__left-button(@click="closePopup") {{ content.leftBlock.backButton }}
                .payment__left-title {{ content.leftBlock.title }}
                .payment__left-subtitle {{ content.leftBlock.subtitle }}
                .payment__left-price(
                    v-html="content.leftBlock.price"
                )

            .payment__right(
                :class="{'animate': animate}"
            )
                payment-form(
                    v-if="activeBlock === 1"
                    :content="content.formPayment"
                    @changeStep="changeStep(2)"
                )
                payment-card(
                    v-if="activeBlock === 2"
                    @changeStep="changeStep(3)"
                )
                payment-success(
                    v-if="activeBlock === 3"
                    :content="content.successBlock"
                    @close="closePopup()"
                )
            .payment__number
              .numbers-wrapper
                .numbers(
                  v-for="(number, i) in 3"
                  :key="i"
                )
                  .number(
                    :class="{'current-step': i + 1 == activeBlock, 'border':  i + 1 != activeBlock, 'finish-step':  i + 1 < activeBlock || activeBlock == 3}"
                  )
                    span(
                      v-if="i + 1 >= activeBlock && activeBlock != 3"
                    ) {{ number }}
                    img(
                      v-else
                      src="~/assets/svg/check.svg"
                    )
    .loading(
      v-if="loading"
    )
      img(
        src="~/assets/svg/spinner.svg"
      )
</template>

<script>
import paymentForm from "~/components/payment/payment-form.vue";
import paymentCard from "~/components/payment/payment-card.vue";
import paymentSuccess from "~/components/payment/payment-success.vue";
export default {
  props: ["type", "content"],
  data() {
    return {
      activeBlock: 1,
      loading: false,
      animate: false,
    };
  },
  components: {
    paymentForm,
    paymentCard,
    paymentSuccess,
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },

    changeStep(el) {
      this.animate = true;
      this.loading = true;
      setTimeout(() => {
        this.activeBlock = el;
        this.animate = false;
        this.loading = false;
      }, 400);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  overflow: hidden;
}
.v-popup {
  display: flex;
  justify-content: center;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background: #111;
  z-index: 98;
  padding: desktop-vw(130) desktop-vw(0) 0 desktop-vw(114);
  overflow: auto;
}
.payment {
  color: #fff;
  width: 100%;
  &_fon {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    img {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
  &__content {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    & .payment__left {
      padding: desktop-vw(32) desktop-vw(32) desktop-vw(32) desktop-vw(46);
      width: 35%;
      z-index: 3;
      &-button {
        background: linear-gradient(96.33deg, #20c6eb 5.54%, #00ddab 96.19%),
          linear-gradient(
            229.48deg,
            #00f275 -5.77%,
            rgba(0, 216, 171, 0.72) 57.98%,
            rgba(0, 207, 171, 0.38) 98.28%
          );
        font-weight: 400;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: desktop-vw(16);
        line-height: 158%;
        text-transform: uppercase;
        cursor: pointer;
        display: flex;
        align-items: center;
        grid-gap: desktop-vw(13);
        margin-bottom: desktop-vw(55);

        &:before {
          content: "";
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg viewBox='0 0 7 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6 11L1 6L6 1' stroke='url(%23paint0_linear_916_4912)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cdefs%3e%3clinearGradient id='paint0_linear_916_4912' x1='1.30769' y1='1' x2='6.32797' y2='1.27861' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2320C6EB'/%3e%3cstop offset='1' stop-color='%2300DDAB'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
          background-repeat: no-repeat;
          display: block;
          width: desktop-vw(5);
          height: desktop-vw(10);
        }
      }
      &-title {
        font-family: "SF Mono";
        font-style: normal;
        font-weight: 700;
        font-size: desktop-vw(62);
        line-height: 120%;
        color: #ffffff;
        margin-bottom: desktop-vw(22);
      }
      &-subtitle {
        font-family: "SF Mono";
        font-style: normal;
        font-weight: 300;
        font-size: desktop-vw(18);
        line-height: 158%;
        color: #ffffff;
        opacity: 0.8;
        margin-bottom: desktop-vw(27);
      }
      &-price {
        font-family: "SF Mono";
        font-style: normal;
        font-weight: 700;
        font-size: desktop-vw(16);
        line-height: 175%;
        color: rgba(255, 255, 255, 0.4);

        & ::v-deep(span) {
          font-family: "SF Mono";
          font-style: normal;
          font-weight: 700;
          font-size: desktop-vw(48);
          line-height: 120%;
          color: #ffffff;
        }
      }
    }
    & .payment__right {
      transition: all 0.4s ease-in-out;
      width: 50%;
    }
    & .payment__number {
      position: relative;
      width: 8%;
      & .numbers-wrapper {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(50%, -50%);
        & .numbers {
          position: relative;
          display: flex;
          margin: auto;
          align-items: center;
          justify-content: center;
          width: desktop-vw(40);
          height: desktop-vw(40);
          border-radius: desktop-vw(40);
          margin-bottom: desktop-vw(30);
          .border {
            position: relative;
            display: flex;
            margin: auto;
            align-items: center;
            justify-content: center;
            width: desktop-vw(40);
            height: desktop-vw(40);
            border-radius: desktop-vw(40);
            margin-bottom: desktop-vw(30);
            border: desktop-vw(1.25) solid #434343;
          }
          .current-step {
            transition: all 0.4s ease-in-out;
            display: flex;
            margin: auto;
            align-items: center;
            justify-content: center;
            width: desktop-vw(40);
            height: desktop-vw(40);
            background: linear-gradient(#111111, #111111) padding-box,
              linear-gradient(to right, #20c6eb, #00ddab) border-box;
            border-radius: 50%;
            border: desktop-vw(1.25) solid transparent;
          }
          .finish-step {
            transition: all 0.4s ease-in-out;
            border: none;
            background: linear-gradient(to right, #20c6eb, #00ddab);
          }
        }
        & .numbers:not(:last-child):after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: desktop-vw(-25);
          height: desktop-vw(20);
          width: desktop-vw(1);
          background-color: #434343;
        }
      }
    }
  }
}
.loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background-color: #111111;
  & img {
    width: desktop-vw(100);
    height: desktop-vw(100);
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
  }
}

@media screen and (max-width: $tablet) {
  .v-popup {
    padding: tablet-vw(130) tablet-vw(0) 0 0;
    overflow: scroll;
  }
  .payment {
    &__content {
      flex-direction: column;
      & .payment__right {
        order: 1;
        width: 100%;
      }
      & .payment__left {
        width: 100%;
        padding: tablet-vw(32) tablet-vw(32) tablet-vw(32) tablet-vw(46);
        &-button {
          font-size: tablet-vw(16);
          grid-gap: tablet-vw(13);
          margin-bottom: tablet-vw(55);
          &:before {
            content: "";
            width: tablet-vw(5);
            height: tablet-vw(10);
          }
        }
        &-title {
          font-size: tablet-vw(62);
          margin-bottom: tablet-vw(22);
        }
        &-subtitle {
          width: 60%;
          font-size: tablet-vw(18);
          margin-bottom: tablet-vw(27);
        }
        &-price {
          font-size: tablet-vw(16);

          & ::v-deep(span) {
            font-size: tablet-vw(48);
          }
        }
      }

      & .payment__number {
        width: 100%;
        display: flex;
        justify-content: center;
        height: tablet-vw(40);
        margin-bottom: tablet-vw(30);
        & .numbers-wrapper {
          position: relative;
          top: 0;
          left: 0;
          display: flex;
          width: tablet-vw(200);
          transform: translate(0);
          & .numbers {
            width: tablet-vw(40);
            height: tablet-vw(40);
            border-radius: tablet-vw(40);
            margin-bottom: tablet-vw(30);
            .border {
              width: tablet-vw(40);
              height: tablet-vw(40);
              border-radius: tablet-vw(40);
              margin-bottom: tablet-vw(30);
              border: tablet-vw(1.25) solid #434343;
            }
            .current-step {
              width: tablet-vw(40);
              height: tablet-vw(40);
              border: tablet-vw(1.25) solid transparent;
            }
          }
          & .numbers:not(:last-child):after {
            content: "";
            left: tablet-vw(53);
            bottom: tablet-vw(10);
            height: tablet-vw(20);
            width: tablet-vw(1);
            transform: rotate(-272deg);
          }
        }
      }
    }
  }
  .loading {
    & img {
      width: desktop-vw(150);
      height: desktop-vw(150);
    }
  }
}

@media screen and (max-width: $mobile) {
  .v-popup {
    padding: mobile-vw(100) mobile-vw(0) 0 0;
    overflow: scroll;
  }
  .payment {
    &__content {
      flex-direction: column;
      & .payment__right {
        order: 1;
        width: 100%;
      }
      & .payment__left {
        width: 100%;
        padding: mobile-vw(36) mobile-vw(24);
        &-button {
          font-size: mobile-vw(16);
          grid-gap: mobile-vw(13);
          margin-bottom: mobile-vw(55);
          &:before {
            content: "";
            width: mobile-vw(5);
            height: mobile-vw(10);
          }
        }
        &-title {
          font-size: mobile-vw(32);
          margin-bottom: mobile-vw(22);
        }
        &-subtitle {
          width: 100%;
          font-size: mobile-vw(18);
          margin-bottom: mobile-vw(27);
        }
        &-price {
          font-size: mobile-vw(16);

          & ::v-deep(span) {
            font-size: mobile-vw(32);
          }
        }
      }

      & .payment__number {
        width: 100%;
        display: flex;
        justify-content: center;
        height: mobile-vw(40);
        margin-bottom: mobile-vw(30);
        & .numbers-wrapper {
          position: relative;
          top: 0;
          left: 0;
          display: flex;
          width: mobile-vw(200);
          transform: translate(0);
          & .numbers {
            width: mobile-vw(40);
            height: mobile-vw(40);
            border-radius: mobile-vw(40);
            margin-bottom: mobile-vw(30);
            .border {
              width: mobile-vw(40);
              height: mobile-vw(40);
              border-radius: mobile-vw(40);
              margin-bottom: mobile-vw(30);
              border: mobile-vw(1.25) solid #434343;
            }
            .current-step {
              width: mobile-vw(40);
              height: mobile-vw(40);
              border: mobile-vw(1.25) solid transparent;
            }
          }
          & .numbers:not(:last-child):after {
            content: "";
            left: mobile-vw(53);
            bottom: mobile-vw(10);
            height: mobile-vw(20);
            width: mobile-vw(1);
            transform: rotate(-272deg);
          }
        }
      }
    }
  }
  .loading {
    & img {
      width: mobile-vw(100);
      height: mobile-vw(100);
    }
  }
}

.animate {
  transition: all 0.4s ease-in-out;
  opacity: 0;
}
</style>
