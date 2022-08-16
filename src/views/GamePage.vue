<template>
  <GamePageUtilitiesBlock />
  <GamePageEquation :is-number-display="isNumbersDisplay" />
  <GamePageControlPanel
    :toggle-numbers-display="toggleNumbersDisplay"
    :handle-modal-open="handleModalOpen"
  />
  <ModalPrimitive
    :on-close="gameDataGenerator.setNewRound.bind(gameDataGenerator)"
    @closeModal="isModalOpen = false"
    v-if="isModalOpen"
  >
    <TypographyPrimitive elem="h2" :size="fontSizes.LARGE">{{
      resultMessage
    }}</TypographyPrimitive>
    <ButtonPrimitive
      class-name="rectangle-button"
      :color="{ primary: colors.WHITE, hover: colors.GRAY }"
      id="close"
      >Продолжить</ButtonPrimitive
    >
  </ModalPrimitive>
</template>

<script setup lang="ts">
import store from "@/store";
import { gameDataGenerator } from "@/services/GameDataGenerator";
import { computed, onBeforeMount, ref, watchEffect } from "vue";
import ModalPrimitive from "@/primitives/ModalPrimitive.vue";
import router from "@/router";
import { statisticsController } from "@/services/StatisticsController";
import GamePageControlPanel from "@/components/GamePageControlPanel.vue";
import GamePageEquation from "@/components/GamePageEquation.vue";
import GamePageUtilitiesBlock from "@/components/GamePageUtilitiesBlock.vue";
import ButtonPrimitive from "@/primitives/ButtonPrimitive.vue";
import { colors } from "@/themes/colors";
import TypographyPrimitive from "@/primitives/TypographyPrimitive.vue";
import { fontSizes } from "@/themes/sizes";

const isNumbersDisplay = ref(false);
const isModalOpen = ref(false);
const handleModalOpen = () => (isModalOpen.value = true);
const toggleNumbersDisplay = () =>
  (isNumbersDisplay.value = !isNumbersDisplay.value);
const resultMessage = computed(() =>
  store.state.game.isCurrentSolutionCorrect
    ? "Правильный ответ!"
    : "Вы ошиблись!"
);

watchEffect(() => {
  if (store.state.timer.displayTime === "00:00") {
    router.push("/");
  }
});

onBeforeMount(() => {
  statisticsController.resetLastRoundStatistics();
  gameDataGenerator.setNewRound();
});
</script>
