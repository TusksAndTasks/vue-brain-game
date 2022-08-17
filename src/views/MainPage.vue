<template>
  <div class="main-page-container">
    <MainPageStatistics />
    <MainPageSettings />
    <ButtonPrimitive
      :callback="sendToGamePage"
      class-name="rectangle-button"
      :color="{ primary: colors.WHITE, hover: colors.GRAY }"
      >Play!</ButtonPrimitive
    >
    <TypographyPrimitive elem="p" :size="fontSizes.SMALL" :color="colors.RED"
      >NB!: На уровне сложности выше 3, необходимо выбрать минимум 2 вида
      операций.</TypographyPrimitive
    >
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

import ButtonPrimitive from "@/primitives/ButtonPrimitive.vue";
import TypographyPrimitive from "@/primitives/TypographyPrimitive.vue";

import MainPageSettings from "@/components/MainPageSettings.vue";
import MainPageStatistics from "@/components/MainPageStatistics.vue";

import { colors } from "@/themes/colors";
import { fontSizes } from "@/themes/sizes";

const sendToGamePage = () => {
  router.push("/game");
};
</script>

<style lang="scss" scoped>
.main-page-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

button {
  margin-left: 500px;
  margin-top: 100px;
}

p {
  margin-left: 500px;
  width: 300px;
}
</style>
