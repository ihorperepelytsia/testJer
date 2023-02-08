<template lang="pug">
.payment-card
    .payment-card__content
        #payment-request-button
        hr(id="hr")
        .payment-card__header
            .payment-card__input(
                :class="{'error': !nameValid}"
            )
                label(for="name-card") Имя
                input(
                    type="text"
                    placeholder="Введите ваше имя"
                    v-model="name"
                    id="name-card"
                )
                .payment-card__error(
                    :class="{'error': !nameValid}"
                ) {{ invalidTextName }}
            .payment-card__info
                include ../../assets/svg/card-payment.svg
        .payment-card__input(
                :class="{'error': !cardNumberValid}"
            )
            label(for="card-number") Номер карты
            input(
                pattern="/[^0-9]/g"
                type="text"
                v-mask="'#### #### #### ####'"
                placeholder="XXXX  XXXX  XXXX  XXXX"
                v-model="cardNumber"
                id="card-number"
            )
            .payment-card__error(
                    :class="{'error': !cardNumberValid}"
                ) Необходимо заполнить номер карты
        .payment-card__bottom
            .payment-card__left
                .payment-card__input(
                    :class="{'error': !validityValid}"
                )
                    label(for="validity") Срок действия
                    input(
                        type="text"
                        placeholder="MM / YY"
                        v-mask="'##/##'"
                        pattern="/[^0-9]/g"
                        v-model="validity"
                        id="validity"
                    )
                    .payment-card__error(
                        :class="{'error': !validityValid}"
                    ) Необходимо заполнить срок действия карты
            .payment-card__right
                .payment-card__input(
                    :class="{'error': !cvvValid}"
                )
                    label(for="cvv") CVV
                    input(
                        type="password"
                        placeholder="123"
                        v-mask="'###'"
                        pattern="/[^0-9]/g"
                        v-model="cvv"
                        id="cvv"
                    )
                    .payment-card__error(
                        :class="{'error': !cvvValid}"
                    ) Заполните CVV
        .payment-card__info-mobile
            include ../../assets/svg/card-payment.svg
        .loading(
          v-if="loading"
        )
          img(
            src="~/assets/svg/spinner-not-background.svg"
          )
    button.payment-card__btn(
        @click="sending()"
    ) Оплатить 79$
    notifications(group="foo" position="bottom right" classes="notifi" :duration="6000" :width="widthNotifi")
</template>
<script src="https://js.stripe.com/v3/"></script>
<script>
import { loadStripe } from "@stripe/stripe-js/pure";
import { mapState } from "vuex";

export default {
  props: ["price"],
  data() {
    return {
      name: "",
      nameValid: true,
      invalidTextName: "",
      cardNumber: "",
      cardNumberValid: true,
      validity: "",
      validityValid: true,
      cvv: "",
      cvvValid: true,
      valid: true,
      loading: false,
      notifiText: "Платеж отменен",
      widthNotifi: "450px",
    };
  },
  computed: {
    ...mapState({
      email: (state) => state.payments.email,
      phone: (state) => state.payments.phone,
    }),
  },
  watch: {
    name(newValue) {
      if (/[^a-zA-Zа-яА-ЯёЁ .]/i.test(newValue)) {
        this.name = "";
        this.invalidTextName = "Вводите только буквы";
        this.nameValid = false;
      } else if (newValue) {
        this.nameValid = true;
      }
    },
    cardNumber() {
      this.cardNumberValid = true;
    },
    validity() {
      this.validityValid = true;
    },
    cvv() {
      this.cvvValid = true;
    },
  },

  methods: {
    isValidation() {
      let isValid = true;

      if (!this.name) {
        isValid = false;
        this.nameValid = false;
        this.invalidTextName = "Необходимо ввести имя";
      }

      if (this.cardNumber.length !== 19) {
        isValid = false;
        this.cardNumberValid = false;
      }

      if (this.validity.length !== 5) {
        isValid = false;
        this.validityValid = false;
      }
      if (this.cvv.length < 2) {
        isValid = false;
        this.cvvValid = false;
      }

      return isValid;
    },

    async sending() {
      if (!this.isValidation()) return;
      const ww = window.innerWidth;
      this.loading = true;

      const data = {
        cardNumber: this.cardNumber.replace(/ /g, ""),
        name: this.name,
        validity: this.validity,
        cvv: this.cvv,
        email: this.email,
        phone: this.phone,
        card: true,
        ref: this.$route.query?.ref,
      };

      if (ww < 500) {
        this.widthNotifi = "90%";
      }
      try {
        const response = await this.$axios.post(
          `https://jerold-signal.space/payment/create`,
          data
        );

        const stripe = await loadStripe(
          "pk_live_51Kad65K2FoJO3pChEGWbT2SZfLZNKYmJJcIrqOpJLacTS9SyUjMKWSkdY8qlzUeG0jTWkrlTpT3TcG9DX80zWDbe00NnOywpms"
        );

        const res = await stripe.confirmCardPayment(
          response.data.client_secret
        );

        if (res.error) {
          this.notifiText = res.error.message;
          this.$notify({
            group: "foo",
            title: this.notifiText,
          });
        } else if (res.paymentIntent.status === "succeeded") {
          this.$emit("changeStep");
          setTimeout(() => {
            window.location.href = `https://t.me/Jeroidtest_bot?start=${response.data.deal}`;
          }, 3000);

          // this.code = this.b64EncodeUnicode(this.form.tel).split("=")[0];
          // this.formComplite = false;
          // const packageName =
          //   this.$store.state.package.package.idx === 0
          //     ? "Essential"
          //     : "Fundamental";
          // let resp = await createNewLead(
          //   this.form.name,
          //   this.form.tel,
          //   this.form.email,
          //   this.form.checked,
          //   packageName,
          //   this.$route.query?.ref
          // );

          // if (resp.success) {
          //   window.location.href = `https://t.me/Jerold_help_bot?start=${this.code}`;
          // }
        }

        this.loading = false;
      } catch (error) {
        this.loading = false;
        if (error.response.data.status === -1) {
          this.notifiText = "Ошибка, попробуйте позже!";
        }
        if (error.response.data.message === "card not valid") {
          this.notifiText = "Невалидная карта!";
        }
        if (error.response.data.message === "phone not valid") {
          this.notifiText = "Некорректный мобильный номер!";
        }

        if (
          error.response.data.message ===
            "Your card's expiration year is invalid." ||
          error.response.data.message ===
            "Your card's expiration month is invalid." ||
          error.response.data.message ===
            "Missing required param: card[exp_year]."
        ) {
          this.notifiText = "Неверный срок действия карты!";
        }
        this.$notify({
          group: "foo",
          title: this.notifiText,
        });
      }
    },
  },
  async mounted() {
    const stripe = await loadStripe(
      "pk_live_51Kad65K2FoJO3pChEGWbT2SZfLZNKYmJJcIrqOpJLacTS9SyUjMKWSkdY8qlzUeG0jTWkrlTpT3TcG9DX80zWDbe00NnOywpms",
      {
        apiVersion: "2022-11-15",
      }
    );

    const paymentRequest = await stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Тариф Essential",
        amount: 79 * 100,
      },
      disableWallets: ["link", "browserCard"],
    });

    const elements = stripe.elements();

    const prButton = elements.create("paymentRequestButton", {
      paymentRequest,
    });

    // Check the availability of the Payment Request API first.
    const result = await paymentRequest.canMakePayment();

    if (result) {
      prButton.mount("#payment-request-button");
    } else {
      document.getElementById("payment-request-button").style.display = "none";
      document.getElementById("hr").style.display = "none";
    }

    paymentRequest.on("paymentmethod", async (ev) => {
      try {
        const data = {
          email: this.email,
          phone: this.phone,
          card: false,
          paymentMethod: ev.paymentMethod,
          ref: this.$route.query?.ref,
        };
        const response = await this.$axios.post(
          `https://jerold-signal.space/payment/create`,
          data
        );

        console.log("res", response.data);
        // if (confirmError) {
        //   // Report to the browser that the payment failed, prompting it to
        //   // re-show the payment interface, or show an error message and close
        //   // the payment interface.
        //   console.log("confirmError", confirmError);
        //   ev.complete("fail");
        // } else {
        //   // Report to the browser that the confirmation was successful, prompting
        //   // it to close the browser payment method collection interface.
        if (response.data.status === -1) {
          this.notifiText = "Ошибка, попробуйте позже!";
          this.$notify({
            group: "foo",
            title: this.notifiText,
          });
        } else if (response.data.status === "requires_action") {
          const confirm = await stripe.confirmCardPayment(
            response.data.client_secret
          );
          console.log(confirm);
          if (confirm.paymentIntent.status === "succeeded") {
            ev.complete("success");
            this.$emit("changeStep");
            setTimeout(() => {
              window.location.href = `https://t.me/Jeroidtest_bot?start=${response.data.deal}`;
            }, 3000);
          }
        } else if (response.data.status === "succeeded") {
          ev.complete("success");
          this.$emit("changeStep");
          setTimeout(() => {
            window.location.href = `https://t.me/Jeroidtest_bot?start=${response.data.deal}`;
          }, 3000);
        } else {
          ev.complete("fail");
          this.notifiText = "Оплата не прошла, попробуйте еще раз!";
          this.$notify({
            group: "foo",
            title: this.notifiText,
          });
        }
        //   // Check if the PaymentIntent requires any actions and if so let Stripe.js
        //   // handle the flow. If using an API version older than "2019-02-11"
        //   // instead check for: `paymentIntent.status === "requires_source_action"`.
        //   if (paymentIntent.status === "requires_action") {
        //     // Let Stripe.js handle the rest of the payment flow.
        //     const { error } = await stripe.confirmCardPayment(
        //       response.data.client_secret
        //     );
        //     if (error) {
        //       console.log("Error1", error);
        //       // The payment failed -- ask your customer for a new payment method.
        //     } else {
        //       console.log("success2");
        //       // The payment has succeeded.
        //     }
        //   } else {
        //     console.log("success3");
        //     // The payment has succeeded.
        //   }
        // }
      } catch {
        this.notifiText = "Ошибка, попробуйте позже!";
        this.$notify({
          group: "foo",
          title: this.notifiText,
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
#payment-request-button {
  width: 100%;
}
#hr {
  border: none;
  background: #fff;
  overflow: visible;
  text-align: center;
  height: 1px;
  margin: 6px 0;
}

.loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgb(17, 17, 17, 0.7);

  & img {
    width: desktop-vw(100);
    height: desktop-vw(100);
    position: absolute;
    top: 37%;
    right: 50%;
    transform: translate(50%, -50%);
  }
}
.payment-card {
  position: relative;
  z-index: 2;
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: desktop-vw(50);
  &__content {
    width: desktop-vw(635);
    height: desktop-vw(394);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: desktop-vw(40);
    background: linear-gradient(
        229.48deg,
        #00f275 -5.77%,
        rgba(0, 216, 171, 0.57) 57.98%,
        rgba(0, 207, 171, 0.38) 98.28%
      ),
      #000000;
    border-radius: desktop-vw(24);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    img {
      width: desktop-vw(190);
      height: desktop-vw(56);
    }
  }

  &__input {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-family: "SF Mono";

    label {
      font-family: "SF Mono";
      font-style: normal;
      font-weight: 500;
      font-size: desktop-vw(18);
      line-height: 120%;
      color: #ffffff;
      margin-bottom: desktop-vw(10);
    }

    input {
      width: 100%;
      height: desktop-vw(46);
      background: transparent;
      border: none;
      border-bottom: desktop-vw(1) solid #ffffff;
      font-style: normal;
      font-weight: 500;
      font-size: desktop-vw(18);
      line-height: 120%;
      color: #ffffff;
      text-transform: uppercase;
      transition: all 0.4s;
      outline: none;
      border-radius: 0;

      &:active,
      &:hover,
      &:focus {
        outline: 0;
        outline-offset: 0;
      }

      &::placeholder {
        font-family: "SF Mono";
        font-style: normal;
        font-weight: 400;
        font-size: desktop-vw(16);
        line-height: desktop-vw(22);
        color: rgba(255, 255, 255, 0.3);
      }

      &:-webkit-autofill {
        background: transparent;
      }
    }

    input:-webkit-autofill {
      transition: all 5000s ease-in-out 0s;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &__info {
    margin-left: desktop-vw(70);
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
  }

  &__left {
    width: desktop-vw(134);
    white-space: nowrap;
  }

  &__right {
    width: desktop-vw(128);
  }

  &__btn {
    cursor: pointer;
    width: max-content;
    margin: desktop-vw(48) auto;
    padding: desktop-vw(14) desktop-vw(50);
    font-family: "SF Mono";
    font-style: normal;
    font-weight: 400;
    font-size: desktop-vw(16);
    line-height: 158%;
    text-transform: uppercase;
    background: #ffffff;
    color: #000000;
    border-radius: desktop-vw(48);
    border: none;
    transition: all 0.3s easy;

    &:hover {
      opacity: 0.8;
    }
  }

  &__info-mobile {
    display: none;
  }

  &__error {
    position: absolute;
    bottom: desktop-vw(-18);
    left: 0;
    opacity: 0;
    color: #f45656;
    transition: all 0.4s;
    white-space: nowrap;
  }
}

@media screen and (max-width: $tablet) {
  .loading {
    & img {
      width: tablet-vw(150);
      height: tablet-vw(150);
    }
  }
  .payment-card {
    margin: 0 auto;
    &__content {
      width: tablet-vw(635);
      height: tablet-vw(394);
      padding: tablet-vw(40);
      border-radius: tablet-vw(24);
    }

    &__header {
      img {
        width: tablet-vw(190);
        height: tablet-vw(56);
      }
    }

    &__input {
      label {
        font-size: tablet-vw(18);
        margin-bottom: tablet-vw(10);
      }

      input {
        height: tablet-vw(46);
        border-bottom: tablet-vw(1) solid #ffffff;
        font-size: tablet-vw(18);

        &::placeholder {
          font-size: tablet-vw(16);
          line-height: tablet-vw(22);
        }
      }
    }

    &__info {
      margin-left: tablet-vw(70);
    }

    &__left {
      width: tablet-vw(134);
    }

    &__right {
      width: tablet-vw(128);
    }

    &__btn {
      margin: tablet-vw(48) auto;
      padding: tablet-vw(14) tablet-vw(50);
      font-size: tablet-vw(16);
      border-radius: tablet-vw(48);
    }

    &__error {
      bottom: tablet-vw(-22);
    }
  }
}

@media screen and (max-width: $mobile) {
  .loading {
    & img {
      width: mobile-vw(100);
      height: mobile-vw(100);
    }
  }
  .payment-card {
    overflow: hidden;
    &__content {
      width: mobile-vw(366);
      height: mobile-vw(531);
      padding: mobile-vw(40) mobile-vw(32);
      border-radius: mobile-vw(24);
    }

    &__header {
      img {
        width: mobile-vw(190);
        height: mobile-vw(56);
      }
    }

    &__input {
      label {
        font-size: mobile-vw(18);
        margin-bottom: mobile-vw(10);
      }

      input {
        height: mobile-vw(46);
        border-bottom: mobile-vw(1) solid #ffffff;
        font-size: mobile-vw(18);

        &::placeholder {
          font-size: mobile-vw(16);
          line-height: mobile-vw(22);
        }
      }
    }

    &__info {
      margin-left: mobile-vw(70);
      display: none;
    }

    &__info-mobile {
      display: block;
    }

    &__left {
      width: mobile-vw(134);
    }

    &__right {
      width: mobile-vw(128);
    }

    &__btn {
      margin: mobile-vw(48) auto;
      padding: mobile-vw(14) mobile-vw(50);
      font-size: mobile-vw(16);
      border-radius: mobile-vw(48);
    }

    &__error {
      color: transparent;
      bottom: mobile-vw(-18);
    }
  }
}

.error {
  transition: all 0.4s;
  opacity: 1;
  input {
    transition: all 0.4s;
    border-color: #f45656;
  }
}
</style>
