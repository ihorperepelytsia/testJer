<template lang="pug">
.layout
    popup(v-if="popupActive" :popup="popup" :type="'tarifs'" @closePopup="closePopup")
    popup(v-if="threeElem" :popup="popup" :type="'threeElem'" @closePopup="closeThreeElem")
    //- popup(v-if="package" :type="'package'" @closePopup="closePackage")
    payment(
        v-if="package"
        :type="'package'"
        @closePopup="closePackage"
        :content="payment"
    )
    popup(v-if="reviewsVideo" :type="'reviews-video'" @closePopup="closeVideo")
    header-block
    //- navigation-bar(:hide="true")
    .scroller(:class="{'scroller_fixed': isFixed}")
        nuxt
</template>

<script>
import headerBlock from "~/components/header-block.vue";
import navigationBar from "~/components/navigation-bar.vue";
import popup from "~/components/v-popup.vue";
import payment from "~/components/payment-block.vue";
import { mapState } from "vuex";

export default {
  components: {
    headerBlock,
    navigationBar,
    popup,
    payment,
  },
  data() {
    return {
      isFixed: true,
      payment: {
        leftBlock: {
          backButton: "Назад",
          title: "Тариф Essential",
          subtitle:
            "Покажу направления и подскажу, когда не стоит заходить в рынок",
          price: "<span>79</span> <span>$</span>/мес",
        },
        formPayment: {
          title: "Личная информация",
          subtitle: "Чтобы оформить подписку, введите свои данные",
          phoneLabel: "Номер телефона",
          phonePlaceHolder: "+## (###) ### ## ##",
          mailLabel: "Электронная почта",
          mailphonePlaceHolder: "e-mail@gmail.com",
          buttonText: "перейти к оплате",
        },
        successBlock: {
          title: "Рад знакомству!",
          subtitle: "Подписка оформлена успешно. Уже пишу тебе в телеграм.",
          buttonText: "на главную",
        },
      },
      popup: [
        {
          title: "Тариф Essential Forex",
          video: {
            url: require("~/assets/img/tarif_video.jpg"),
            urlVideo: require("~/assets/video/tarif_essential.mp4"),
          },
          list: [
            {
              title: "Как использовать сигналы Jerolda?",
              content:
                "В рекомендациях Jerolda есть 3 параметра:<br><br> <span>1. <strong>Время</strong> — указывает момент формирования актуального ценового уровня.</span><span>2. <strong>Цена </strong> — указывает котировку, при которой возможен импульс.</span><span>3. <strong>Направление</strong> — позволяет выбрать приоритетный стиль торговли.</span>",
            },
            {
              title: "Какой стиль торговли можно применять к сигналам Jerolda?",
              content:
                "От ценовых уровней можно применять следующие стили торговли: <br><br> <span>● Ложный пробой.</span><span>● Пробой уровня.</span><span>● Отбой от уровня.</span>",
            },
            {
              title: "Сколько времени действует сигнал Jerolda?",
              content:
                "<span>Если от ценового уровня рекомендации уже произошел импульс, то сигнал считается исполненным.</span>",
            },
            {
              title: "Когда НЕЛЬЗЯ входить в сделку по сигналу Jerolda? ",
              content:
                "<span>Если рыночная цена инструмента сильно отклонилась от цены в сигнале, то такой ценовый уровень больше НЕ АКТУАЛЕН.</span>",
            },
            {
              title: "Какой принцип формирования сигналов Jerolda? ",
              content:
                "<span>Уровни Jerolda – это глобальные дневные уровни. При помощи сложных алгоритмов Jerold выбирает ближайший к цене уровень, на котором он определяет дисбаланс покупателей и продавцов, формируя соответствующий сигнал.</span>",
            },
            {
              title:
                "Какой тип ордеров можно использовать в торговле по сигналам Jerolda?",
              content:
                "<span>В торговле по сигналам допускается открытие лимитных или маркет- (рыночных) ордеров. Цена, указанная в сигналах, формируется по актуальной, рыночной цене.</span>",
            },
            {
              title:
                "Можно ли в торговле использовать предыдущие уровни Jerolda, если поступил новый сигнал? ",
              content:
                "<span>Нет. Новый актуальный уровень сигнализирует об изменении состояния на рынке, поэтому предыдущие сигналы считаются не актуальными. </span>",
            },
            {
              title:
                "Как понять, когда нужно входить в сделку по сигналу Jerolda? ",
              content:
                "<span>Алгоритмы Jerolda позволяют определить наиболее точную цену и направление для входа в сделку. Время входа зависит от стиля торговли, однако предпочтительнее открывать ордер по цене, максимально приближенной к цене, указанной в сигнале.</span>",
            },
            {
              title:
                "Какие TakeProfit использовать при торговле по сигналам Jerolda?",
              content:
                "<span>Потенциал хода от уровней Jerolda может быть продолжительностью от часа до несколько дней. Оптимальный вариант заключается в том, чтобы фиксировать часть прибыли, а другую часть оставить на более продолжительный срок. </span>",
            },

            // 'Помогу вашему алгоритму определить направление движения цены.',
            // 'Покажу, на каких ценовых уровнях сосредоточен открытый интерес участников рынка.',
            // 'При высокой неопределенности подскажу, в какие периоды лучше в рынок НЕ заходить.'
          ],

          btnName: "Подписаться",
          price: "79$<span> /мес</span>",
        },
        {
          title: "Тариф Fundamental",
          video: {
            url: require("~/assets/img/tarif_video.jpg"),
          },
          list: [
            "Дам StopLoss, если ты пересиживаешь убытки или не можешь закрыть убыточную позицию.",
            "Буду работать, когда вы спите. Продолжу работать во время ночных сессий, чтобы вы получали актуальную и цельную картину по времени открытия позиций. ",
            "Дам TakeProfit, чтобы вы научились удерживать прибыльную позицию.",
          ],
          btnName: "Подписаться",
          price: "199$<span> /мес</span>",
        },
      ],
    };
  },
  methods: {
    closePopup() {
      this.$store.commit("popup/deactivate");
    },
    closeThreeElem() {
      this.$store.commit("threeElem/deactivate");
    },
    closePackage() {
      this.$store.commit("package/deactivate");
    },
    closeVideo() {
      this.$store.commit("reviewsVideo/deactivate");
    },
    updateLmS() {
      this.$nextTick(() => {
        document.querySelector(".scroller").style.transform = "none";
        window.lmS.scrollTo("top", {
          duration: 0,
          disableLerp: true,
        });
        window.lmS.update();
        window.scrollTo(0, 0);
      });
    },
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.updateLmS();
      });
    },
  },
  mounted() {
    this.isFixed = window.matchMedia("(hover: hover)").matches ? true : false;
    setTimeout(() => {
      this.updateLmS();
    }, 500);
    // this.updateLmS();
    // window.addEventListener("resize", () => {
    //     setTimeout(() => {
    //         this.updateLmS();
    //     }, 500)
    // });
  },
  computed: {
    ...mapState({
      popupActive: (state) => state.popup.active,
      threeElem: (state) => state.threeElem.threeElemObj.active,
      package: (state) => state.package.package.active,
      reviewsVideo: (state) => state.reviewsVideo.active,
    }),
  },
};
</script>

<style lang="scss" scoped>
.layout {
  overflow: hidden;
}

@media screen and (min-width: $tablet) {
  .scroller {
    width: 100vw;

    &_fixed {
      position: fixed;
    }
  }
}

@media screen and (max-width: $mobile) {
}
</style>
