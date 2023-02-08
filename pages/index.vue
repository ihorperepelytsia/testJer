<template lang="pug">
.page(ref="pageContainer")
    jeroldSphere(ref="jeroldSphere" :style="(shar ? '' : 'display: none' )")
    poster-block#main(:content="poster" data-scroll-section data-scroll data-scroll-id="main" data-block="0")
    about-block#about(:content="about" data-scroll-section data-scroll data-block="1" data-scroll-id="about")
    //- about-block#about2(:content="about2" data-scroll-section data-scroll data-block="2" data-scroll-id="about2")
    three-elements-block#three(:content="threeElements" data-scroll-section data-scroll data-block="2" data-scroll-id="threeElem")
    getting-block#get(:content="getting" data-scroll-section data-scroll data-scroll-id="get" data-block="3")
    how-it-works-block#how(:content="howItWorks" data-scroll-section data-scroll data-scroll-id="how" data-block="4")
    //- statistic-block#digit(:content="statictik" data-scroll-section data-scroll data-scroll-id="statistic")
    //- roadmap-block(:content="roadmap" data-scroll-section data-scroll data-scroll-id="roadmap")
    //- ii-block(:content="iiInfo" data-scroll-section data-scroll data-scroll-id="ii")
    ii-block(:content="iiMobileInfo" data-scroll-section data-scroll data-scroll-id="iiMobile")
    reviewsBlock.reviewsBlock#revievs(:content="reviews" data-scroll-section data-scroll data-scroll-id="revievs")
    tariffs-block#tariffs(:content="tariffs" data-scroll-section data-scroll data-scroll-id="tariffs")
    team-block(:content="team" data-scroll-section data-scroll data-scroll-id="team")

    //- reviewsBlock.reviewsBlock#revievs(:content="reviews" data-scroll-section data-scroll data-scroll-id="revievs")
    //- team-block(:content="team" data-scroll-section data-scroll data-scroll-id="team")
    roadmap-block(:content="roadmap" data-scroll-section data-scroll data-scroll-id="roadmap")
    //- faq-block#faq(:content="faq" data-scroll-section data-scroll data-scroll-id="faq")
    subscription-block(:content="subscription" data-scroll-section data-scroll data-scroll-id="endBlock")

</template>

<script>
import posterBlock from "~/components/poster-block.vue";
import aboutBlock from "~/components/about-block.vue";
import threeElementsBlock from "~/components/three-elements-block.vue";
import gettingBlock from "~/components/getting-block.vue";
import statisticBlock from "~/components/statistic-block.vue";
import roadmapBlock from "~/components/roadmap-block.vue";
import howItWorksBlock from "~/components/how-it-works-block.vue";
import iiBlock from "~/components/ii-block.vue";
//import iiMobileBlock from '~/components/ii-mobile-block.vue'
import teamBlock from "~/components/team-block.vue";
import tariffsBlock from "~/components/tariffs-block.vue";
import faqBlock from "~/components/faq-block.vue";
import subscriptionBlock from "~/components/subscription-block.vue";
import jeroldSphere from "~/components/jerold-sphere";
import reviewsBlock from "~/components/reviews-block.vue";

export default {
  components: {
    posterBlock,
    aboutBlock,
    gettingBlock,
    statisticBlock,
    threeElementsBlock,
    howItWorksBlock,
    roadmapBlock,
    iiBlock,
    //iiMobileBlock,
    teamBlock,
    tariffsBlock,
    faqBlock,
    subscriptionBlock,
    jeroldSphere,
    reviewsBlock,
  },
  data() {
    return {
      shar: true,
      poster: {
        info: {
          title: ["Привет!", "Я Jerold"],
          text: "Персональный ассистент професcиональных трейдеров, созданный на базе ИИ и авторского научного проекта",
        },
        img: require("~/assets/img/shar.png"),
      },
      about: {
        text: "Мои родители - физик, математик и трейдер. Мне уже 14 лет и я самостоятельный взрослый ИИ. Они объединили свои знания и опыт, чтобы сделать уникальный, продвинутый инструмент для трейдеров. Эта разработка заняла 13 лет. Да, это немало, но так бывает, если смотришь не в сторону тренда или хайпа. <br> Меня научили тому, что НЕ нужно предсказывать будущее по прошлому. НЕ нужно искать аналогии настоящего в прошлом. Именно так я пришел к главному выводу: никакое предсказание НЕ заменит объяснение.Чтобы давать трейдеру объективное объяснение ситуации, я смотрю на рынок, отталкиваясь от 3 научных компонентов.",
        // text: 'Мои родители - физик-математик и профессиональный трейдер. Мне уже 14 лет, и поэтому я считаю себя довольно-таки взрослым и самостоятельным интеллектом, хоть и искусственным =)<br>Мои родители объединили все свои знания и опыт, чтобы я родился на свет в виде продвинутого инструмента для профессиональных трейдеров. Родители научили меня тому, что не нужно предсказывать будущее по прошлому и не нужно искать аналогии настоящего в прошлом.<br>Так я пришел к ключевому выводу: никакое предсказание не заменит объяснение.<br>Я состою из 3-х научных компонентов: Физики, Математики и Биологии. Из физики я взял концепцию времени, из математики - теорию множеств, из биологии - теорию эволюции.<br>Изучив множество материалов, я пришел к цели - научился находить самые эффективные для получения прибыли моменты на рынке.<br>Я не использую графические паттерны и классический технический анализ. Строго формулы и доказательства =) ',
      },
      about2: {
        text: "Меня научили тому, что НЕ нужно предсказывать будущее по прошлому. НЕ нужно искать аналогии настоящего в прошлом.  Именно так я пришел к главному выводу:  никакое предсказание НЕ заменит объяснение.Чтобы давать трейдеру объективное объяснение ситуации, я смотрю на рынок, отталкиваясь от 3 научных компонентов.",
      },
      threeElements: {
        title: "Мой мозг включает в себя 3 основных элемента",
        img: require("~/assets/img/three_elements.png"),
        elements: [
          {
            title: "Физика",
            smallText: "Я смотрю на события в каждом моменте",
            text: "Из неё я взял концепцию времени. Я не пытаюсь предсказать, куда пойдет рынок, что будет в будущем. Даже не пытаюсь учесть всё на свете. Я смотрю на события в каждом моменте, анализирую только важные критерии и позволяю трейдеру выйти за рамки того отрезка и фрейма, в котором он привык смотреть. ",
          },
          {
            title: "Математика",
            smallText: "Выдвигаю гипотезы и превращаю их в алгоритмы",
            text: "Из математики я взял теорию множества. Антон и Александр научили меня сначала выдвигать гипотезы, доказывать их в теории, формализовать и только потом превращать в алгоритмы. Пока «роботы» пытаются идти по сценарию, я моделирую десятки сценариев и нахожу оптимальные в текущих отрезках времени. ",
          },
          {
            title: "Биология",
            smallText: "Учитываю теорию эволюции и все ее проблемы",
            text: "Я - ассистент на базе ИИ, и биология здесь кажется лишней. Но так только кажется. Мои создатели взяли теорию эволюции и учли все ёё проблемы, чтобы я научился НЕ повторять ошибки, по которым обучают нейронные сети. Так я не могу попасть в ловушку масштаба, как во время ручного трейдинга, когда ты видишь только свой фрейм, а не всю ситуацию. ",
          },
        ],
      },
      reviews: {
        text: "Что говорят подписчики",
        text2: "о Jerold?",
        list: [
          {
            image: require("~/assets/img/reviews/rev-video-cover1.png"),
            video: "LEPvEZWcyRU",
          },
          {
            image: require("~/assets/img/reviews/rev1.png"),
          },
          {
            image: require("~/assets/img/reviews/rev-video-cover2.png"),
            video: "UM8sqCIocTk",
          },
          {
            image: require("~/assets/img/reviews/rev2.png"),
          },
          {
            image: require("~/assets/img/reviews/rev3.png"),
          },
          {
            image: require("~/assets/img/reviews/rev4.png"),
          },
          {
            image: require("~/assets/img/reviews/rev5.png"),
          },
          {
            image: require("~/assets/img/reviews/rev6.png"),
          },
          {
            image: require("~/assets/img/reviews/rev7.png"),
          },
        ],
      },
      getting: {
        title: "Что вы получаете",
        text: "Jerold - не Грааль, а продвинутый инструмент, который помогает трейдерам",
        listBall: [
          {
            text: "Вы по-честному <br> смотрите на риски",
          },
          {
            text: "Используете опыт и подход <br> Александра Герчика",
          },
          {
            text: "Постоянно видите <br> цельную картину рынка",
          },
          {
            text: "Получаете четкие <br> данные для работы",
          },
        ],
      },
      howItWorks: {
        title: "Как я работаю",
        text: "Ключевые принципы и результат работы за ХХ дней",
        videos: [
          {
            urlVideo: require("~/assets/video/jerold.mp4"),
          },
          {
            urlVideo: require("~/assets/video/tarif_essential.mp4"),
          },
        ],
        // video: require('~/assets/img/how_it_works.jpg'),
        // video2: require('~/assets/img/how_it_works2.png')
      },
      statictik: {
        info: {
          title: ["Цифры и факты"],
          // text: 'Персональный ассистент профессиональных трейдеров, созданный на базе ИИ и авторского научного проекта',
        },
        listStat: [
          {
            img: require("~/assets/img/stat-item1.png"),
            single: "14",
            text: "лет меня обучали, воспитывали и адаптировали к жизни",
          },
          {
            img: require("~/assets/img/stat-item2.png"),
            single: "80-100",
            text: "сделок по каждому инструменту совершается в течение года",
          },
          {
            img: require("~/assets/img/stat-item3.png"),
            //single: '>55%',
            single: "больше 70%",
            text: "реальных сделок прибыльны",
          },
        ],
      },
      roadmap: {
        info: {
          title: ["Роадмап"],
          // text: 'Персональный ассистент профессиональных трейдеров, созданный на базе ИИ',
        },
        columns: [
          {
            text: "Q1.2022",
            cell: {
              title: "eur/usd",
            },
          },
          {
            text: "Q2.2022",
            cell: {
              title: "usd/cad",
            },
          },
          {
            text: "Q3.2022",
            cell: {
              title: "usd/chf",
            },
          },
          {
            text: "Q4.2022",
            cell: {
              title: "GBP/CHF",
            },
          },
          {
            text: "Q1.2023",
            soon: "coming soon...",
            cell: {
              title: "GBP/JPY",
            },
          },
          {
            text: "Q2.2023",
            soon: "coming soon...",
            cell: {
              title: "aud/JPY",
            },
          },
          {
            text: "Q3.2023",
            soon: "coming soon...",
            cell: {
              title: "aud/NZD",
            },
          },
          {
            text: "Q4.2023",
            soon: "coming soon...",
            cell: {
              title: "CHF/JPY",
            },
          },
          {
            text: "",
            cell: {
              title: "",
            },
          },
        ],
      },
      iiInfo: {
        info: {
          title: ["Искусственный интеллект не значит сложности"],
          text: "Я не сложнее привычного мессенджера. Для вас я буду работать именно в простом и знакомом формате - в виде Telegram-бота. ",
          chatAnimate: true,
        },
      },
      iiMobileInfo: {
        info: {
          title: ["Искусственный <br> интеллект не <br> значит сложности"],
          text: "Я не сложнее привычного мессенджера. Для вас я буду работать именно в простом и знакомом формате -  <br> в виде  <span>  <p> </p> Telegram-канала </span>",
          mobile: true,
        },
      },
      team: {
        info: {
          title: ["Мои создатели"],
          // text: 'Персональный ассистент профессиональных трейдеров, созданный на базе ИИ',
        },
        teams: [
          {
            name: "Антон<br>Чумиков",
            about:
              "Ученый со специализацией в механико-математических науках, с 2008 года занимается алгоритмическим трейдингом",
            photo: require("../assets/img/anton.png"),
            id: 1,
          },
          {
            name: "Александр<br>Герчик",
            // about: 'Самый безопасный трейдер по версии <span>Mojo Wall Street Warriors</span> за 2006 год.',
            about:
              "Профессионально занимается торговлей на финансовых <br>рынках с 1998 года,<br> а алготрейдингом - с 2011 года",
            photo: require("../assets/img/gerchik.png"),
            id: 2,
          },
        ],
      },
      tariffs: {
        info: {
          title: ["Тарифы"],

          sale: false,
        },
        prize: {
          icon: require("~/assets/img/gift.png"),
          text: "",
        },
        tariffsList: [
          {
            title: "Essential",
            old: "<span>149</span>",
            single: "<span>79</span>",
            text: "Укажу правильное направление и покажу, когда </br> НУЖНО заходить в рынок",
            info: "Набор доступных инструментов",
            image: require("../assets/img/card_tablev2.png"),
          },
          {
            title: "Fundamental",
            old: "<span>299</span>",
            single: "<span>199</span>",
            text: "Усилю твою стратегию и помогу улучшить показатели. ",
            listAdvantage: [
              "Если ты пересиживаешь убытки или не можешь закрыть  убыточную позицию, тебе помогут мои StopLos",
              "Если твоя прибыль в сделке меньше чем риск , мои TakeProfit помогут тебе научиться удерживать прибыльную позицию",
              "Важно успеть открыть позиции воворемя, поэтому я работаю, пока ты спишь. Ночные торговые сессии не влияют на мою статистику",
            ],
          },
        ],
      },
      faq: {
        title: "Ответы на вопросы",
        listFaq: [
          {
            title:
              "Jerold, ты работаешь по принципу автоматизации ручной торговли Александра Герчика?",
            text: "Нет, я использую глобальные принципы и сам подход, но не автоматизирую любые ручные действия. Алгоритм ручной работы действует по заданным правилам и не может учесть все аспекты, изменения рынка, разные ситуации. Я моделирую сам рынок, нахожу в нем неэффективность и подбираю паттерны, в которых эта неэффективность принесет прибыль. ",
          },
          {
            title: "В каком среднем диапазоне ты работаешь? ",
            text: "Вижу, ты задаешь очень предметные вопросы. Обычно я работаю с позициями от нескольких часов до нескольких дней. ",
          },
          {
            title: "Твой принцип работы связан с математической статистикой? ",
            text: "Нет, это делают квантовые фонды с большими железяками и мощными штуками, ты такие мог видеть в фантастических фильмах Marvel. Они анализируют ряд и прогнозируют его, а я моделирую ситуацию и нахожу в ней оптимальные отрезки для сделки.",
          },
          // {
          //     title: 'Какие есть риски?',
          //     text: '13 лет назад встретились ученый и профисиональный трейдер. Они обьеденили свои усилия и создали уникальный для рынка продукт, которым стал я - Джерольд',
          // }
        ],
      },
      subscription: {
        title: "Начать торговать в плюс",
        textBtn: "оформить подписку",
        img: require("~/assets/img/three_elements.png"),
      },
      package: [
        {
          title: "Тариф Essential Forex",
          text: "Укажу правильное направление и покажу, когда НУЖНО заходить в рынок.",
          price: "<span>79</span>",
        },
        {
          title: "Тариф Fundamental",
          text: "Покажу направления и подскажу, когда не стоит заходить в рынок",
          price: "<span>199</span>",
        },
      ],
      scroll: true,
    };
  },

  mounted() {
    this.$nextTick(() => {
      // window.lmS.update();
      setTimeout(() => {
        window.lmS.update();
      }, 200);
      this.$refs.jeroldSphere.SetMainPageContainer(this.$refs.pageContainer);
    });

    this.$store.commit("threeElem/addContent", this.threeElements);
    this.$store.commit("package/addContent", this.package);

    window.lmS.on("scroll", (args) => {
      window.lmS.on("scroll", (args) => {
        if (args.currentElements.endBlock && this.scroll) {
          this.scroll = false;
          setTimeout(() => {
            window.lmS.update();
          }, 500);
          this.shar = true;
        }
        if (!args.currentElements.endBlock && this.scroll) {
          this.scroll = true;
        }
      });
      // if(args.currentElements.main || args.currentElements.about || args.currentElements.threeElem || args.currentElements.endBlock) {
      //     this.shar = true
      // }
      if (
        args.currentElements.threeElem ||
        args.currentElements.get ||
        args.currentElements.how ||
        args.currentElements.statistic ||
        args.currentElements.tariffs ||
        args.currentElements.roadmap ||
        args.currentElements.ii ||
        args.currentElements.team
      ) {
        this.shar = false;
      } else {
        this.shar = true;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
#revievs {
  z-index: 2;
  position: relative;
}
</style>
