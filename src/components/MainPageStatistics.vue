<template>
  <div class="statistics-text-container">
    <TypographyPrimitive elem="h2" :size="fontSizes.LARGE"
      >Привет!</TypographyPrimitive
    >
    <TypographyPrimitive elem="p" :size="fontSizes.SMALL">
      Добро пожаловать на {{ daysPassedFromFirstGame }} тренировочный день.
    </TypographyPrimitive>
    <TypographyPrimitive elem="p" :size="fontSizes.SMALL">
      Ваш последний результат - решено
      {{ store.state.statistics.lastRoundCorrectAnswers }} из
      {{ store.state.statistics.lastRoundQuestions }}
    </TypographyPrimitive>
    <TypographyPrimitive elem="p" :size="fontSizes.SMALL">
      Общая точность {{ correctRatio }}%
    </TypographyPrimitive>
  </div>
</template>

<script lang="ts" setup>
import { fontSizes } from "@/themes/sizes";

import TypographyPrimitive from "@/primitives/TypographyPrimitive.vue";
import { computed, onMounted } from "vue";
import store from "@/store";

onMounted(() => {
  if (!store.state.statistics.firstGameTimestamp) {
    store.commit("updateStatisticsState", {
      key: "firstGameTimestamp",
      value: Date.now(),
    });
  }
});

const daysPassedFromFirstGame = computed(() => {
  const timePassed =
    (Date.now() - store.state.statistics.firstGameTimestamp) / 86400000 + 1;
  return Math.trunc(timePassed);
});

const correctRatio = computed(() =>
  Math.round(
    (store.state.statistics.totalCorrectAnswers * 100) /
      store.state.statistics.totalQuestions
  )
);
</script>

<style lang="scss">
.statistics-text-container {
  text-align: start;
  width: 440px;
  padding-left: 140px;
}
</style>
