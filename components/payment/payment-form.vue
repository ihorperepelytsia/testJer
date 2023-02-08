<template lang="pug">
.layout
    ValidationObserver.package(ref="observer")
        .package__backdrop
        form.package_form(v-if="formComplite" autocomplete="off" novalidate)
            .package_form_title {{ content.title }}
            .politics {{ content.subtitle }}
            .label {{ content.phoneLabel }}
            ValidationProvider(name="tel" :rules="{required: true, regex: '^([+]?[0-9 ]+)$' }" v-slot="validationContext" class="package_form_group")
                .package_form_errIcon(v-if="invalidPhoneText")
                input.package_form_input(type="tel" :class="(validationContext.errors[0] ? 'error' : '')" :state="getValidationState(validationContext)" v-model="tel"  :placeholder="content.phonePlaceHolder" pattern="/[^0-9]/g")
                .package_form_error {{ invalidPhoneText }}
            .label {{ content.mailLabel }}
            ValidationProvider(name="email" :rules="{required: true, email: true}" v-slot="validationContext" class="package_form_group")
                .package_form_errIcon(v-if="validationContext.errors[0]")
                input.package_form_input(type="email" :class="(validationContext.errors[0] ? 'error' : '')" :state="getValidationState(validationContext)" v-model="email" :placeholder="content.mailphonePlaceHolder")
                .package_form_error {{ validationContext.errors[0] }}
            .package_form_btn(
              :type="'tariffs'"
              @click="changeStep"
            ) {{ content.buttonText }}
</template>

<script>
import customButton from "~/components/button.vue";
import countryList from "countries-list";
export default {
  name: "payment-form",
  props: ["content"],
  data() {
    return {
      email: "",
      tel: "",

      invalidPhoneText: "",
      formComplite: true,
    };
  },
  components: {
    customButton,
  },
  watch: {
    tel(newValue) {
      if (newValue) {
        const lastSymbolStr = newValue[newValue.length - 1];
        if (/[a-zа-яё]/i.test(lastSymbolStr)) {
          this.tel = newValue.slice(0, newValue.length - 1);
        }
      }

      this.invalidPhoneText = "";
    },
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    async changeStep() {
      const isValid = await this.$refs.observer.validate();
      const checkPhone = await this.$axios.post(
        `https://jerold-signal.space/payment/validate`,
        { phone: this.tel }
      );

      if (checkPhone.data.status === 0) {
        this.invalidPhoneText =
          "Невалидный номер телефона! Валидный формат +## ### ### ## ##";
        return;
      }

      if (!isValid) {
        this.invalidPhoneText = this.validationContext.errors[0];
        return;
      } else {
        this.$store.commit("payments/setEmailPayments", this.email);
        this.$store.commit("payments/setPhonePayments", this.tel);
        this.$emit("changeStep");
      }
    },
    async getIpInfo() {
      try {
        const { data } = await this.$axios.get(
          "https://get.geojs.io/v1/ip/country.json"
        );
        let countryCodePhone = countryList.countries[data.country].phone;

        if (data) {
          this.tel = `+${countryCodePhone}`;
        } else {
          this.tel = `+`;
        }
      } catch (eror) {
        this.tel = `+`;
      }
    },
  },
  async mounted() {
    await this.getIpInfo();
  },
};
</script>

<style lang="scss" scoped>
.layout {
  padding: desktop-vw(29) desktop-vw(10) 0 desktop-vw(80);
  .popup_wrapper {
    &_package {
      padding: desktop-vw(55) desktop-vw(112) 0 desktop-vw(114);
    }
  }

  .popup_package {
    width: 100%;
    background: transparent;
    border: 0;
    display: flex;
    justify-content: space-between;
  }

  .package {
    position: relative;

    &__backdrop {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      -webkit-backdrop-filter: blur(12px);
      backdrop-filter: blur(12px);
      border-radius: desktop-vw(16);
    }

    &_form {
      position: relative;
      z-index: 2;
      background: rgba(230, 230, 230, 0.03);
      padding: desktop-vw(48) desktop-vw(47);
      display: flex;
      flex-direction: column;
      border-top: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: desktop-vw(16);

      &_btn {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #000000;
        min-height: desktop-vw(57);
        width: 100%;
        background: linear-gradient(96.33deg, #20c6eb 5.54%, #00ddab 96.19%);
        border-radius: desktop-vw(48);
        margin-top: desktop-vw(12);
        text-transform: uppercase;
        font-size: desktop-vw(16);
        transition: all 0.3s easy;

        &:hover {
          opacity: 0.8;
        }
      }
      .label {
        font-family: "SF Mono";
        font-style: normal;
        font-weight: 500;
        font-size: desktop-vw(18);
        line-height: 120%;
        display: flex;
        align-items: center;
        color: #ffffff;
        margin-bottom: desktop-vw(16);
      }
      .politics {
        margin-top: desktop-vw(16);
        margin-bottom: desktop-vw(33);
        font-family: "SF Mono";
        font-style: normal;
        font-weight: 300;
        font-size: desktop-vw(14);
        line-height: 150%;
        text-align: center;
        color: #9b9aa0;

        ::v-deep(a) {
          color: #fff;
        }
      }

      &_title {
        text-align: center;
        font-weight: 700;
        font-size: desktop-vw(32);
        line-height: 120%;
        color: #ffffff;
      }

      &_group {
        width: 100%;
        margin-bottom: desktop-vw(35);
        position: relative;
      }

      &_errIcon {
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_1136_3997)'%3e%3cpath d='M15.1579 8.07895C15.1579 12.2647 11.7647 15.6579 7.57895 15.6579C3.39321 15.6579 0 12.2647 0 8.07895C0 3.89321 3.39321 0.5 7.57895 0.5C11.7647 0.5 15.1579 3.89321 15.1579 8.07895Z' fill='%23F45555'/%3e%3cpath d='M7.5791 4.71094V8.92146' stroke='%23181721' stroke-width='1.77431' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M7.5791 12.0117H7.58788' stroke='%23181721' stroke-width='1.77431' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_1136_3997'%3e%3crect width='16' height='16' fill='white' transform='translate(0 0.5)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
        background-repeat: no-repeat;
        width: desktop-vw(16);
        height: desktop-vw(16);
        position: absolute;
        right: 0;
        top: desktop-vw(5);
      }

      &_error {
        margin-top: desktop-vw(4);
        color: #f45656;
        font-size: desktop-vw(12);
        height: desktop-vw(18);
      }

      &_input {
        font-family: "SF Mono";
        border: 0;
        background: transparent;
        border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);
        height: desktop-vw(35);

        font-weight: 300;
        font-size: desktop-vw(16);
        line-height: 158%;
        padding-bottom: desktop-vw(8);
        width: 100%;
        /* or 25px */
        /* Surface / onSurface */
        color: #ffffff;

        &.error {
          border-bottom: 0.5px solid #f45656;
        }

        &:focus {
          outline: none;
        }

        &:last-child {
          margin-bottom: desktop-vw(56);
        }

        &::placeholder {
          font-family: "SF Mono";
          font-style: normal;
          font-weight: 300;
          font-size: desktop-vw(16);
          line-height: 158%;
          /* or 25px */
          /* Surface / onSurface */
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
}

@media screen and (max-width: $tablet) {
  .layout {
    padding: 0;
    margin-bottom: tablet-vw(48);

    .popup_package {
      flex-direction: column;
    }

    .package {
      &__backdrop {
        width: tablet-vw(572);
        height: 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border-radius: tablet-vw(16);
      }
      &_happy {
        padding: tablet-vw(48) tablet-vw(40);
        border-radius: tablet-vw(16);
        max-width: tablet-vw(572);
        margin: 0 auto;

        &_title {
          font-size: tablet-vw(32);
          margin-bottom: tablet-vw(32);
        }

        &_text {
          font-size: tablet-vw(16);
          margin-bottom: tablet-vw(32);
        }
      }

      &_form {
        margin: 0 auto;
        padding: tablet-vw(48) tablet-vw(40);
        border-radius: tablet-vw(16);
        max-width: tablet-vw(572);

        &_group {
          margin-bottom: tablet-vw(35);
        }

        &_errIcon {
          width: tablet-vw(16);
          height: tablet-vw(16);
          top: tablet-vw(5);
        }

        &_error {
          margin-top: tablet-vw(4);
          font-size: tablet-vw(12);
          height: tablet-vw(18);
        }

        &_btn {
          min-height: tablet-vw(57);
          font-size: tablet-vw(16);
        }

        .label {
          font-size: tablet-vw(18);
          line-height: 120%;
          margin-bottom: tablet-vw(18);
        }

        .politics {
          margin-top: 0;
          margin-bottom: tablet-vw(32);
          font-size: tablet-vw(14);
        }

        &_title {
          font-size: tablet-vw(32);
          margin-bottom: tablet-vw(16);
        }

        &_input {
          height: tablet-vw(35);
          font-size: tablet-vw(16);
          padding-bottom: tablet-vw(8);
          border-radius: 0;

          &:last-child {
            margin-bottom: tablet-vw(56);
          }

          &::placeholder {
            font-size: tablet-vw(16);
          }
        }
      }
    }

    .popup_wrapper {
      &_package {
        padding: tablet-vw(130) tablet-vw(32) 0 tablet-vw(32);
      }
    }
  }
}

@media screen and (max-width: $mobile) {
  .layout {
    padding: 0;
    margin-bottom: mobile-vw(48);

    .popup_package {
      flex-direction: column;
    }

    .package {
      &__backdrop {
        width: mobile-vw(366);
        height: 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border-radius: mobile-vw(16);
      }
      &_happy {
        padding: mobile-vw(48) mobile-vw(40);
        border-radius: mobile-vw(16);
        max-width: mobile-vw(366);
        margin: 0 auto;

        &_title {
          font-size: mobile-vw(32);
          margin-bottom: mobile-vw(32);
        }

        &_text {
          font-size: mobile-vw(16);
          margin-bottom: mobile-vw(32);
        }
      }

      &_form {
        margin: 0 auto;
        padding: mobile-vw(48) mobile-vw(40);
        border-radius: mobile-vw(16);
        max-width: mobile-vw(366);

        &_group {
          margin-bottom: mobile-vw(35);
        }

        &_errIcon {
          width: mobile-vw(16);
          height: mobile-vw(16);
          top: mobile-vw(5);
        }

        &_error {
          margin-top: mobile-vw(4);
          font-size: mobile-vw(12);
          height: mobile-vw(18);
        }

        &_btn {
          min-height: mobile-vw(57);
          font-size: mobile-vw(16);
        }

        .label {
          font-size: mobile-vw(18);
          line-height: 120%;
          margin-bottom: mobile-vw(18);
        }

        .politics {
          margin-top: 0;
          margin-bottom: mobile-vw(32);
          font-size: mobile-vw(14);
        }

        &_title {
          font-size: mobile-vw(32);
          margin-bottom: mobile-vw(16);
        }

        &_input {
          height: mobile-vw(35);
          font-size: mobile-vw(16);
          padding-bottom: mobile-vw(8);
          border-radius: 0;

          &:last-child {
            margin-bottom: mobile-vw(56);
          }

          &::placeholder {
            font-size: mobile-vw(16);
          }
        }
      }
    }

    .popup_wrapper {
      &_package {
        padding: mobile-vw(130) mobile-vw(32) 0 mobile-vw(32);
      }
    }
  }
}
</style>
