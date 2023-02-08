<template lang="pug">
.success-block
    .title {{ content.title }}
    .subtitle {{ content.subtitle }}
    .button-block
        customButton.btn(
            @click="$emit('close')"
        ) {{ content.buttonText}}
</template>

<script>
import customButton from "~/components/button.vue";
export default {
  name: "success-block",
  props: ["content"],
  components: {
    customButton,
  },
};
</script>

<style lang="scss" scoped>
.success-block {
  background: rgba(230, 230, 230, 0.03);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  margin: desktop-vw(0) desktop-vw(0) 0 desktop-vw(100);
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: desktop-vw(20);
  max-width: desktop-vw(560);
  padding: desktop-vw(48) desktop-vw(40);

  & .title {
    font-family: "SF Mono";
    font-style: normal;
    font-weight: 700;
    font-size: desktop-vw(32);
    line-height: 120%;
    text-align: center;
    color: #ffffff;
    margin-bottom: desktop-vw(14);
  }
  & .subtitle {
    font-family: "SF Mono";
    font-style: normal;
    font-weight: 300;
    font-size: desktop-vw(14);
    line-height: 150%;
    text-align: center;
    color: #9b9aa0;
    margin-bottom: desktop-vw(50);
  }
  & .button-block {
    min-width: 100%;
    & .btn {
      min-width: 100%;
    }
  }
}

@media screen and (max-width: $tablet) {
  .success-block {
    margin: tablet-vw(0) tablet-vw(0) 0 tablet-vw(100);
    border-radius: tablet-vw(20);
    max-width: tablet-vw(560);
    padding: tablet-vw(48) tablet-vw(40);
    margin-bottom: tablet-vw(50);

    & .title {
      font-size: tablet-vw(32);
      margin-bottom: tablet-vw(14);
    }
    & .subtitle {
      font-size: tablet-vw(14);
      margin-bottom: tablet-vw(50);
    }
  }
}

@media screen and (max-width: $mobile) {
  .success-block {
    margin: mobile-vw(0) mobile-vw(24) 0 mobile-vw(24);
    border-radius: mobile-vw(20);
    max-width: mobile-vw(560);
    padding: mobile-vw(48) mobile-vw(32);
    margin-bottom: mobile-vw(50);

    & .title {
      font-size: mobile-vw(32);
      margin-bottom: mobile-vw(14);
    }
    & .subtitle {
      font-size: mobile-vw(14);
      margin-bottom: mobile-vw(50);
    }
  }
}
</style>
