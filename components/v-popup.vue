<template lang="pug">
.popup_wrapper(ref="popup_wrapper" :class="(type ? 'popup_wrapper_'+type : '')")
    .v-popup(
        v-if="type === 'package'"
        class="popup_package"
    )
        .package_left
            .package_left_back(@click="closePopup") Назад
            .package_left_title(v-html="contentPackage[idxPackage].title")
            .package_left_text(v-html="contentPackage[idxPackage].text")
            .package_left_price(v-html="contentPackage[idxPackage].price + '<span>$</span>/мес'")
        ValidationObserver(ref="observer")
            form.package_form(v-if="formComplite" @submit.prevent="onSubmit" autocomplete="off" novalidate)
                .package_form_title Оформить подписку
                ValidationProvider(name="name" :rules="{required: true}" v-slot="validationContext" class="package_form_group")
                    .package_form_errIcon(v-if="validationContext.errors[0]")
                    input.package_form_input(type="text" :class="(validationContext.errors[0] ? 'error' : '')" :state="getValidationState(validationContext)" placeholder="Имя" v-model="form.name")
                    .package_form_error {{ validationContext.errors[0] }}
                ValidationProvider(name="tel" :rules="{required: true, regex: '^([+]?[0-9 ]+)$' }" v-slot="validationContext" class="package_form_group")
                    .package_form_errIcon(v-if="validationContext.errors[0]")
                    input.package_form_input(type="tel" :class="(validationContext.errors[0] ? 'error' : '')" :state="getValidationState(validationContext)" v-model="form.tel"  placeholder="Номер телефона")
                    .package_form_error {{ validationContext.errors[0] }}
                ValidationProvider(name="email" :rules="{required: true, email: true}" v-slot="validationContext" class="package_form_group")
                    .package_form_errIcon(v-if="validationContext.errors[0]")
                    input.package_form_input(type="email" :class="(validationContext.errors[0] ? 'error' : '')" :state="getValidationState(validationContext)" v-model="form.email" placeholder="Электронная почта")
                    .package_form_error {{ validationContext.errors[0] }}
                .check-box(
                    @click="form.checked = !form.checked"
                )
                    .check-box__item(
                        :class="{'check-box__item_checked' : form.checked}"
                    )
                    .check-box__text Сообщить о запуске нового пакета
                customButton.package_form_btn(:type="'tariffs'") Перейти к Оплате
                .politics( v-html="politics")
        .package_happy(v-if="!formComplite")
            .package_happy_title {{ happy.title }}
            .package_happy_text {{ happy.text }}
            customButton.package_form_btn(:type="'tariffs'" @click="closePopup") {{ happy.btn }}
    .package_fon(v-if="type === 'package'")
        img(src="~/assets/img/package_bottom.png")
    .v-popup(
        v-if="type === 'tarifs'"
        class="popup_tarifs"
        )
        .popup_close(@click="closePopup")
            img(src="~/assets/img/close.svg")
        .popup_title {{ popup[indexPopup].title }}
        .popup_content
            .popup_video
                //- <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ZU2LRgUgK9U" title="ТОП 5 ЛУЧШИХ БЮДЖЕТНЫХ СМАРТФОНОВ 2022. КАКОЙ ВЫБРАТЬ?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                img(:src="popup[indexPopup].video.url")
            .popup_right
                div.popup-list(v-if="type != 'tarifs'")
                    div.popup-list__item(
                        v-for="(item, index) in popup[indexPopup].list"
                        :key="index"
                        ) {{ item }}
                div.popup-list(v-else)
                    .popup__video
                        video(
                            id="video"
                            :src="popup[indexPopup].video.urlVideo"
                            controls
                            playsinline
                        )
                        .popup__video_poster
                        .popup__video_btn(@click="play()" id="playBtn")
                            include ../assets/svg/play-video.svg
                    div.popup-list__item(
                        v-for="(item, index) in popup[indexPopup].list"
                        :key="index"
                        )
                            .popup-list__item-title(
                                @click="show = show === index ? null : index"
                                :class="{'active': index == show}"
                            ) {{item.title}}
                            slide-up-down.popup-list__item-content(
                                v-html="item.content"
                                :duration="500"
                                :active="show === index"
                            )
                .popup_bottom
                    customButton(:type="'tariffs'" @click="openModalForm(indexPopup)") {{ popup[indexPopup].btnName }}
                    .popup_price(v-html="popup[indexPopup].price")
    .v-popup(
        v-else-if="type === 'threeElem'"
        class="popup_threeElem"
        )
        .popup_close(@click="closePopup")
            img(src="~/assets/img/close.svg")
        .popup_content
            .popup_coutnPage {{idx + 1}}/3
            .popup_title {{ infoThreeelem.title }}
            .popup_text {{ infoThreeelem.text }}
        .popup_bottomPanel
            .popup_arrLeft(@click="prevPage")
            .popup_arrRight(@click="nextPage")
    .v-popup(
        v-if="type === 'reviews-video'"
        class="reviews-video"
        )
        .loading(
            v-if="loading"
            )
                img(
                    src="~/assets/svg/spinner.svg"
                  )
        .popup_close(@click="closePopup")
            img(src="~/assets/img/close.svg")
        youtube.video-block(
            :video-id="videoId"
            fitParent=true
            resize=true
            ref="youtube"
            @ready="ready"
            )
</template>

<script>
import customButton from "~/components/button.vue";
import { mapState } from "vuex";
import { createNewLead } from "../lib/pipeDriveHelpers";
import SlideUpDown from "vue-slide-up-down";
export default {
  name: "v-popup",
  props: ["popup", "type"],
  data() {
    return {
      show: null,
      loading: true,
      form: {
        name: "",
        email: "",
        tel: "",
        checked: false,
      },
      politics:
        'Нажимая на кнопку "Оставить заявку" я подтверждаю, что я прочел(-ла) и <a href="https://drive.google.com/file/d/1zPgnQqvXHNjAKS9N5fixu0TBkBIYIpYk/view?usp=sharing" target="_blank">Политику конфиденциальности</a>',
      formComplite: true,
      happy: {
        title: "Рад знакомству!",
        text: "Подписка оформлена успешно. Уже пишу тебе в телеграм",
        btn: "На главную",
      },
      code: "",
    };
  },
  components: {
    customButton,
    SlideUpDown,
  },
  computed: {
    ...mapState({
      indexPopup: (state) => state.popup.idxPopupTariff,
      content2: (state) => state.threeElem.threeElemObj.content.elements,
      idx: (state) => state.threeElem.threeElemObj.idx,
      contentPackage: (state) => state.package.package.content.elements,
      idxPackage: (state) => state.package.package.idx,
      videoId: (state) => state.reviewsVideo.videoId,
    }),
    infoThreeelem() {
      return this.content2[this.idx];
    },
  },
  methods: {
    b64EncodeUnicode(str) {
      return btoa(
        encodeURIComponent(str).replace(
          /%([0-9A-F]{2})/g,
          function toSolidBytes(match, p1) {
            return String.fromCharCode("0x" + p1);
          }
        )
      );
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
      } else {
        this.code = this.b64EncodeUnicode(this.form.tel).split("=")[0];
        this.formComplite = false;
        const packageName =
          this.$store.state.package.package.idx === 0
            ? "Essential"
            : "Fundamental";
        let resp = await createNewLead(
          this.form.name,
          this.form.tel,
          this.form.email,
          this.form.checked,
          packageName,
          this.$route.query?.ref
        );

        if (resp.success) {
          window.location.href = `https://t.me/Jerold_help_bot?start=${this.code}`;
        }
        this.form.name = "";
        this.form.email = "";
        this.form.tel = "";
        this.form.checked = false;
      }
    },
    closePopup() {
      this.$emit("closePopup");
    },
    rightBtnAction() {
      this.$emit("rightBtnAction");
    },
    prevPage() {
      if (this.idx !== 0) {
        let index = this.idx - 1;
        this.$store.commit("threeElem/changeIdx", index);
      }
    },
    nextPage() {
      if (this.idx !== 2) {
        let index = this.idx + 1;
        this.$store.commit("threeElem/changeIdx", index);
      }
    },
    play() {
      let video = document.getElementById("video");
      let btn = document.getElementById("playBtn");
      let poster = document.querySelector(".popup__video_poster");
      video.play();
      btn.style.display = "none";
      poster.style.display = "none";
    },
    openModalForm(index) {
        if(!this.activeForm){
            this.$store.commit('package/activate')
            this.$store.commit("package/changeIdx", index);
        }
        else{
            this.$store.commit('package/deactivate')
        }
    },
    ready() {
        this.loading = false
    }
  },
  mounted() {
    // let vm = this
    // document.addEventListener('click', function (item) {
    // 	if(item.target === vm.$refs['popup_wrapper']) {
    // 	vm.closePopup()
    // 	}
    // })
  },

  // watch:{
  // 	formComplite:{
  // 		handler(formComplite){
  // 			if(!formComplite){
  // 				setTimeout(() => {
  // 					window.location.href = `https://t.me/Jerold_help_bot?start=${this.code}`
  // 				}, 1000);
  // 			}
  // 		}
  // 	}
  // }
};
</script>

<style lang="scss" scoped>
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
.layout {
  overflow: hidden;

  .popup-list__item-title {
    cursor: pointer;
    border-top: solid #403f3f desktop-vw(1);
    padding: desktop-vw(10) desktop-vw(30) desktop-vw(10) 0;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      right: desktop-vw(11);
      top: 50%;
      transform: translateY(-50%);
      width: desktop-vw(2);
      height: desktop-vw(11);
      background-color: #ffffff;
      transition: all 0.4s ease-in-out;
    }
    &::after {
      content: "";
      position: absolute;
      right: desktop-vw(6.5);
      top: 50%;
      transform: translateY(-50%);
      width: desktop-vw(11);
      height: desktop-vw(2);
      background-color: #ffffff;
      transition: all 0.4s ease-in-out;
    }
  }

  .popup-list__item-content {
    ::v-deep() span {
      display: block;
      margin-left: desktop-vw(10);
      padding-bottom: desktop-vw(5);
      font-size: desktop-vw(12);
    }
  }

  .popup_wrapper {
    display: flex;
    justify-content: center;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background: #111;
    z-index: 98;
    padding: desktop-vw(130) desktop-vw(112) 0 desktop-vw(114);
    overflow: auto;

    &_package {
      padding: desktop-vw(55) desktop-vw(112) 0 desktop-vw(114);
    }
  }

  .v-popup {
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: desktop-vw(16);
    padding: desktop-vw(48) desktop-vw(56) desktop-vw(56) desktop-vw(56);
    background: rgba(230, 230, 230, 0.03);
    backdrop-filter: blur(12px);
    z-index: 10;
    max-width: desktop-vw(1114);
    height: max-content;
    position: relative;
  }

  .popup_close {
    position: absolute;
    width: desktop-vw(21);
    height: desktop-vw(21);
    top: desktop-vw(54);
    right: desktop-vw(62);
    cursor: pointer;
  }

  .popup__video {
    width: 100%;
    position: relative;
    video {
      width: inherit;
    }
  }

  .popup__video_poster {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #3f3f3fb0;
  }

  .popup__video_btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: desktop-vw(45);
    height: desktop-vw(45);
    border-radius: 50%;
    transform: translate(-50%, 50%);
    background: rgb(50, 47, 47);
    position: absolute;
    z-index: 1;
    left: 50%;
    bottom: 50%;
    transition: all 0.3s ease;
    svg {
      position: relative;
      left: desktop-vw(2);
      width: desktop-vw(20);
      height: desktop-vw(18);
    }

    &:hover {
      transition: all 0.3s ease;
      background: #21292b;
    }
  }

  .popup_tarifs {
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #1b1b1b;
    }
    width: desktop-vw(556);
    padding: desktop-vw(48) desktop-vw(48) desktop-vw(48) desktop-vw(48);
    margin-bottom: desktop-vw(48);

    .popup_title {
      font-weight: 700;
      font-size: desktop-vw(32);
      line-height: 120%;
      color: #ffffff;
    }

    .popup_video {
      width: desktop-vw(510);
      height: desktop-vw(334);
      display: none;
    }

    .popup_content {
      margin-top: desktop-vw(40);
      width: 100%;
      display: flex;
      grid-gap: desktop-vw(54);
    }

    .popup_right {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .popup-list {
      margin-bottom: desktop-vw(16);
    }

    .popup-list__item {
      font-family: "SF Mono";
      font-style: normal;
      font-weight: 300;
      font-size: desktop-vw(14);
      line-height: 150%;
      color: #ffffff;
    }

    .popup_bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      // margin-bottom: desktop-vw(53);
    }

    .popup_price {
      font-weight: 700;
      font-size: desktop-vw(32);
      line-height: 120%;
      color: #ffffff;

      ::v-deep(span) {
        font-style: normal;
        font-weight: 700;
        font-size: desktop-vw(16);
        line-height: 175%;
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }

  .popup_threeElem {
    font-family: "SF Mono";
    color: #fff;
    max-width: desktop-vw(792);

    .popup_coutnPage {
      font-style: normal;
      font-weight: 500;
      font-size: desktop-vw(24);
      line-height: 120%;
    }

    .popup_title {
      font-style: normal;
      font-weight: 700;
      font-size: desktop-vw(36);
      line-height: 125%;
      margin-top: desktop-vw(43);
    }

    .popup_text {
      font-style: normal;
      font-weight: 300;
      font-size: desktop-vw(18);
      line-height: 158%;
      margin-top: desktop-vw(24);
    }

    .popup_bottomPanel {
      display: flex;
      grid-gap: desktop-vw(24);
      margin-top: desktop-vw(48);

      .popup_arrLeft {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: desktop-vw(40);
        width: 100%;
        height: desktop-vw(40);
        border-radius: 50%;
        border: 1px solid #fff;

        &:before {
          content: "";
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg viewBox='0 0 6 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.666991 4.41667L4.33148 0.295394C4.55841 0.0401813 4.94923 0.017191 5.20452 0.244039C5.45991 0.470984 5.48291 0.86202 5.25589 1.11734L2.32225 4.41667L5.25589 7.71599C5.48291 7.97131 5.45991 8.36235 5.20452 8.58929C4.94924 8.81614 4.55841 8.79315 4.33148 8.53794L0.666991 4.41667Z' fill='white'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          display: block;
          height: desktop-vw(11);
          width: desktop-vw(8);
        }
      }

      .popup_arrRight {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: desktop-vw(40);
        width: 100%;
        height: desktop-vw(40);
        border-radius: 50%;
        border: 1px solid #fff;

        &:before {
          content: "";
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg viewBox='0 0 6 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.666991 4.41667L4.33148 0.295394C4.55841 0.0401813 4.94923 0.017191 5.20452 0.244039C5.45991 0.470984 5.48291 0.86202 5.25589 1.11734L2.32225 4.41667L5.25589 7.71599C5.48291 7.97131 5.45991 8.36235 5.20452 8.58929C4.94924 8.81614 4.55841 8.79315 4.33148 8.53794L0.666991 4.41667Z' fill='white'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          display: block;
          height: desktop-vw(11);
          width: desktop-vw(8);
          transform: rotate(180deg);
        }
      }
    }
  }

  .popup_package {
    width: 100%;
    background: transparent;
    border: 0;
    display: flex;
    justify-content: space-between;
    backdrop-filter: none;
  }

  .package {
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

    &_happy {
      background: rgba(230, 230, 230, 0.03);
      -webkit-backdrop-filter: blur(12px);
      backdrop-filter: blur(12px);
      padding: desktop-vw(48) desktop-vw(40);
      display: flex;
      flex-direction: column;
      border-top: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: desktop-vw(16);
      max-width: desktop-vw(430);
      height: max-content;

      &_title {
        font-style: normal;
        font-weight: 700;
        font-size: desktop-vw(32);
        line-height: 120%;
        color: #ffffff;
        margin-bottom: desktop-vw(32);
      }

      &_text {
        font-style: normal;
        font-weight: 300;
        font-size: desktop-vw(16);
        line-height: 158%;
        color: #9b9aa0;
        margin-bottom: desktop-vw(32);
      }
    }

    &_form {
      background: rgba(230, 230, 230, 0.03);
      -webkit-backdrop-filter: blur(12px);
      backdrop-filter: blur(12px);
      padding: desktop-vw(48) desktop-vw(40);
      display: flex;
      flex-direction: column;
      border-top: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: desktop-vw(16);
      max-width: desktop-vw(430);

      &_btn {
        min-height: desktop-vw(57);
        width: 100%;
        background: linear-gradient(96.33deg, #20c6eb 5.54%, #00ddab 96.19%);
        border-radius: 48px;
      }

      .politics {
        margin-top: desktop-vw(32);
        font-style: normal;
        font-weight: 300;
        font-size: desktop-vw(12);
        line-height: 150%;
        text-align: center;
        color: #9b9aa0;

        ::v-deep(a) {
          color: #fff;
        }
      }

      &_title {
        font-weight: 700;
        font-size: desktop-vw(32);
        line-height: 120%;
        color: #ffffff;
        margin-bottom: desktop-vw(56);
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

    &_left {
      max-width: desktop-vw(382);

      &_back {
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
        margin-bottom: desktop-vw(61);

        &:before {
          content: "";
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg viewBox='0 0 7 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6 11L1 6L6 1' stroke='url(%23paint0_linear_916_4912)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3cdefs%3e%3clinearGradient id='paint0_linear_916_4912' x1='1.30769' y1='1' x2='6.32797' y2='1.27861' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2320C6EB'/%3e%3cstop offset='1' stop-color='%2300DDAB'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
          background-repeat: no-repeat;
          display: block;
          width: desktop-vw(5);
          height: desktop-vw(10);
        }
      }

      &_title {
        font-style: normal;
        font-weight: 700;
        font-size: desktop-vw(62);
        line-height: 120%;
        color: #ffffff;
        margin-bottom: desktop-vw(24);
      }

      &_text {
        font-style: normal;
        font-weight: 300;
        font-size: desktop-vw(18);
        line-height: 158%;
        color: #ffffff;
        margin-bottom: desktop-vw(24);
      }

      &_price {
        font-style: normal;
        font-weight: 700;
        font-size: desktop-vw(16);
        line-height: 175%;
        color: rgba(255, 255, 255, 0.4);

        ::v-deep(span:first-child) {
          font-style: normal;
          font-weight: 700;
          font-size: desktop-vw(48);
          line-height: 120%;
          color: #ffffff;
        }

        ::v-deep(span:nth-child(2)) {
          font-style: normal;
          font-weight: 700;
          font-size: desktop-vw(48);
          line-height: 120%;
          color: #ffffff;
          margin-left: desktop-vw(8);
        }
      }
    }
  }

  .check-box {
    display: flex;
    gap: desktop-vw(16);
    align-items: center;
    margin-bottom: desktop-vw(33);
    cursor: pointer;

    &__text {
      font-family: "SF Mono";
      font-style: normal;
      font-weight: 300;
      font-size: desktop-vw(14);
      // line-height: 148%;
      color: #ffffff;
    }

    &__item {
      width: desktop-vw(16);
      min-width: desktop-vw(16);
      height: desktop-vw(16);
      border: desktop-vw(0.5) solid #f2f2f2;
      box-sizing: border-box;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("~/assets/svg/checked.svg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 70%;
        display: none;
      }

      &_checked {
        &::before {
          display: block;
        }
      }
    }
  }

  .reviews-video {
    padding: 0;
    border-top: none;
    width: desktop-vw(1000);

    .popup_close {
      top: desktop-vw(-14);
      right: desktop-vw(-62);
    }
  }
}

@media screen and (max-width: $tablet) {
  .layout {
    .popup-list__item-title {
      cursor: pointer;
      border-top: solid #403f3f tablet-vw(1);
      padding: tablet-vw(10) tablet-vw(30) tablet-vw(10) 0;
      &::before {
        content: "";
        right: tablet-vw(11);
        transform: translateY(-50%);
        width: tablet-vw(2);
        height: tablet-vw(11);
      }
      &::after {
        right: tablet-vw(6.5);
        transform: translateY(-50%);
        width: tablet-vw(11);
        height: tablet-vw(2);
      }
    }

    .popup__video_btn {
      width: tablet-vw(45);
      height: tablet-vw(45);
      svg {
        left: tablet-vw(2);
        width: tablet-vw(20);
        height: tablet-vw(18);
      }
    }

    .popup-list__item-content {
      ::v-deep() span {
        display: block;
        margin-left: tablet-vw(10);
        padding-bottom: tablet-vw(5);
        font-size: tablet-vw(12);
      }
    }
    .popup_package {
      flex-direction: column;
    }

    .package {
      &_happy {
        padding: tablet-vw(48) tablet-vw(40);
        border-radius: tablet-vw(16);
        max-width: tablet-vw(430);
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
        backdrop-filter: blur(12px);
        padding: tablet-vw(48) tablet-vw(40);
        border-radius: tablet-vw(16);
        max-width: tablet-vw(430);

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
        }

        &_btn {
          min-height: tablet-vw(57);
        }

        .politics {
          margin-top: tablet-vw(32);
          font-size: tablet-vw(12);
        }

        &_title {
          font-size: tablet-vw(32);
          margin-bottom: tablet-vw(56);
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

      &_left {
        max-width: 100%;
        margin-bottom: tablet-vw(56);

        &_back {
          font-size: tablet-vw(16);
          grid-gap: tablet-vw(13);
          margin-bottom: tablet-vw(61);

          &:before {
            width: tablet-vw(5);
            height: tablet-vw(10);
          }
        }

        &_title {
          font-size: tablet-vw(62);
          margin-bottom: tablet-vw(24);
        }

        &_text {
          font-size: tablet-vw(18);
          margin-bottom: tablet-vw(24);
        }

        &_price {
          font-size: tablet-vw(16);

          ::v-deep(span:first-child) {
            font-size: tablet-vw(48);
          }

          ::v-deep(span:nth-child(2)) {
            font-size: tablet-vw(48);
            margin-left: tablet-vw(8);
          }
        }
      }
    }

    .popup_close {
      width: tablet-vw(18);
      height: tablet-vw(18);
      top: tablet-vw(54);
      right: tablet-vw(62);
    }

    .popup_wrapper {
      padding: tablet-vw(144) tablet-vw(32) 0 tablet-vw(32);

      &_package {
        padding: tablet-vw(130) tablet-vw(32) 0 tablet-vw(32);
      }
    }

    .v-popup {
      border-radius: tablet-vw(16);
      padding: tablet-vw(48) tablet-vw(56) tablet-vw(66) tablet-vw(56);
      max-width: 100%;
    }

    .popup_tarifs {
      width: tablet-vw(556);
      margin-bottom: tablet-vw(48);
      .popup_title {
        font-size: tablet-vw(48);
      }

      .popup_content {
        margin-top: tablet-vw(40);
        align-items: center;
        flex-direction: column;
        grid-gap: tablet-vw(54);
      }

      // .popup_video {
      // 	width: tablet-vw(592);
      // 	height: tablet-vw(325);
      // 	img {
      // 		width: 100%;
      // 		height: 100%;
      // 		object-fit: cover;
      // 	}
      // }

      .popup-list__item {
        font-size: tablet-vw(14);
        // margin-left: tablet-vw(20);
      }

      .popup_price {
        font-size: tablet-vw(32);

        ::v-deep(span) {
          font-size: tablet-vw(16);
        }
      }

      .popup_price {
        font-size: tablet-vw(32);

        ::v-deep(span) {
          font-size: tablet-vw(16);
        }
      }
    }

    .popup_threeElem {
      max-width: tablet-vw(792);

      .popup_coutnPage {
        font-size: tablet-vw(24);
      }

      .popup_title {
        font-size: tablet-vw(36);
        margin-top: tablet-vw(43);
      }

      .popup_text {
        font-size: tablet-vw(18);
        margin-top: tablet-vw(24);
      }

      .popup_bottomPanel {
        grid-gap: tablet-vw(24);
        margin-top: tablet-vw(48);

        .popup_arrLeft {
          max-width: tablet-vw(40);
          height: tablet-vw(40);

          &:before {
            height: tablet-vw(11);
            width: tablet-vw(8);
          }
        }

        .popup_arrRight {
          max-width: tablet-vw(40);
          height: tablet-vw(40);
          border: 1px solid #fff;

          &:before {
            height: tablet-vw(11);
            width: tablet-vw(8);
          }
        }
      }
    }

    .popup_bottom {
      margin-top: tablet-vw(40);
      margin-bottom: tablet-vw(0);
    }

    .check-box {
      gap: tablet-vw(16);
      margin-bottom: tablet-vw(33);

      &__text {
        font-size: tablet-vw(14);
      }

      &__item {
        width: tablet-vw(16);
        min-width: tablet-vw(16);
        height: tablet-vw(16);
        border: tablet-vw(0.5) solid #f2f2f2;
      }
    }

    .reviews-video {
      padding: 0;
    }
  }
}

@media screen and (max-width: $mobile) {
  .layout {
    .popup-list__item-title {
      cursor: pointer;
      border-top: solid #403f3f mobile-vw(1);
      padding: mobile-vw(10) mobile-vw(30) mobile-vw(10) 0;
      &::before {
        content: "";
        right: mobile-vw(11);
        width: mobile-vw(2);
        height: mobile-vw(11);
      }
      &::after {
        right: mobile-vw(6.5);
        width: mobile-vw(11);
        height: mobile-vw(2);
      }
    }

    .popup__video_btn {
      width: mobile-vw(45);
      height: mobile-vw(45);
      svg {
        left: mobile-vw(2);
        width: mobile-vw(20);
        height: mobile-vw(18);
      }
    }

    .popup-list__item-content {
      ::v-deep() span {
        display: block;
        margin-left: mobile-vw(10);
        padding-bottom: mobile-vw(5);
        font-size: mobile-vw(12);
      }
    }

    .popup_package {
      flex-direction: column;
    }

    .package {
      &_happy {
        padding: mobile-vw(40) mobile-vw(20);
        border-radius: mobile-vw(16);
        max-width: mobile-vw(430);
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
        backdrop-filter: blur(12px);
        padding: mobile-vw(40) mobile-vw(32);
        border-radius: mobile-vw(16);
        max-width: mobile-vw(430);

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
        }

        &_btn {
          min-height: mobile-vw(57);
        }

        .politics {
          margin-top: mobile-vw(32);
          font-size: mobile-vw(12);
        }

        &_title {
          font-size: mobile-vw(32);
          margin-bottom: mobile-vw(56);
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

      &_left {
        max-width: 100%;
        margin-bottom: mobile-vw(56);

        &_back {
          font-size: mobile-vw(16);
          grid-gap: mobile-vw(13);
          margin-bottom: mobile-vw(61);

          &:before {
            width: mobile-vw(5);
            height: mobile-vw(10);
          }
        }

        &_title {
          font-size: mobile-vw(32);
          margin-bottom: mobile-vw(24);
        }

        &_text {
          font-size: mobile-vw(18);
          margin-bottom: mobile-vw(24);
        }

        &_price {
          font-size: mobile-vw(16);

          ::v-deep(span:first-child) {
            font-size: mobile-vw(32);
          }

          ::v-deep(span:nth-child(2)) {
            font-size: mobile-vw(32);
            margin-left: mobile-vw(8);
          }
        }
      }
    }

    .popup_close {
      width: mobile-vw(14);
      height: mobile-vw(14);
      top: mobile-vw(33);
      right: mobile-vw(25);
    }

    .popup_wrapper {
      padding: mobile-vw(93) mobile-vw(24) mobile-vw(32) mobile-vw(24);

      &_package {
        padding: tablet-vw(130) tablet-vw(24) 0 tablet-vw(24);
      }
    }

    .v-popup {
      border-radius: mobile-vw(16);
      padding: mobile-vw(24) mobile-vw(24) mobile-vw(32) mobile-vw(24);
      max-width: 100%;
    }

    .popup_tarifs {
      width: 100%;
      margin-bottom: mobile-vw(28);
      margin-top: mobile-vw(80);

      .popup_title {
        font-size: mobile-vw(32);
        max-width: mobile-vw(200);
      }

      .popup_content {
        margin-top: mobile-vw(32);
        justify-content: center;
        align-items: center;
        grid-gap: mobile-vw(32);
      }

      .popup_video {
        min-height: mobile-vw(188);
        display: none;
      }

      .popup-list__item {
        font-size: mobile-vw(14);
        // margin-left: mobile-vw(20);
      }

      .popup_price {
        font-size: mobile-vw(32);

        ::v-deep(span) {
          font-size: mobile-vw(16);
        }
      }
    }

    .popup_threeElem {
      padding: mobile-vw(37) mobile-vw(32) mobile-vw(32) mobile-vw(32);
      max-width: mobile-vw(792);

      .popup_coutnPage {
        font-size: mobile-vw(18);
      }

      .popup_title {
        font-size: mobile-vw(32);
        margin-top: mobile-vw(43);
      }

      .popup_text {
        font-size: mobile-vw(18);
        margin-top: mobile-vw(24);
      }

      .popup_bottomPanel {
        grid-gap: mobile-vw(24);
        margin-top: mobile-vw(48);

        .popup_arrLeft {
          max-width: mobile-vw(40);
          height: mobile-vw(40);

          &:before {
            height: mobile-vw(11);
            width: mobile-vw(8);
          }
        }

        .popup_arrRight {
          max-width: mobile-vw(40);
          height: mobile-vw(40);
          border: 1px solid #fff;

          &:before {
            height: mobile-vw(11);
            width: mobile-vw(8);
          }
        }
      }
    }

    .check-box {
      gap: mobile-vw(16);
      margin-bottom: mobile-vw(33);

      &__text {
        font-size: mobile-vw(14);
      }

      &__item {
        width: mobile-vw(16);
        min-width: mobile-vw(16);
        height: mobile-vw(16);
        border: mobile-vw(0.5) solid #f2f2f2;
      }
    }
    .reviews-video {
      padding: 0;
      width: mobile-vw(350);
    }
  }
}

.active {
  &::before {
    opacity: 0;
  }
}
</style>
