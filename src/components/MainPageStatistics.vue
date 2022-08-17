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
      {{ model.state.statistics.lastRoundCorrectAnswers }} из
      {{ model.state.statistics.lastRoundQuestions }}
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
import model from "@/model";

onMounted(() => {
  if (!model.state.statistics.firstGameTimestamp) {
    model.commit("updateStatisticsState", {
      key: "firstGameTimestamp",
      value: Date.now(),
    });
  }
});

const daysPassedFromFirstGame = computed(() => {
  const timePassed =
    (Date.now() - model.state.statistics.firstGameTimestamp) / 86400000 + 1;
  return Math.trunc(timePassed);
});

const correctRatio = computed(() =>
  Math.round(
    (model.state.statistics.totalCorrectAnswers * 100) /
      model.state.statistics.totalQuestions
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
