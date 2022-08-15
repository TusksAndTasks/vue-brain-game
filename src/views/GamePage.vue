<template>
  <TimerPrimitive :on-mount="mountTimer" :on-unmount="unmountTimer">{{
    store.state.timer.displayTime
  }}</TimerPrimitive>
  <div v-for="field in store.state.game.currentFields" :key="field.id">
    <TypographyPrimitive
      :color="colors.GRAY"
      elem="p"
      v-if="field.id === 0 || field.id % 2 !== 0 || isNumbersDisplay"
    >
      {{ field.value }}
    </TypographyPrimitive>
    <GameFieldPrimitive
      v-else
      :input-value="field.inputValue"
      :on-input="fieldsManager.changeInputValue"
      :on-focus="fieldsManager.switchFocus"
      :field-id="field.id"
    />
  </div>
  <TypographyPrimitive :color="colors.GRAY" elem="p">{{
    store.state.game.currentAnswer
  }}</TypographyPrimitive>
  <GamePageControlPanel
    :toggle-numbers-display="toggleNumbersDisplay"
    :handle-modal-open="handleModalOpen"
  />
  <ModalPrimitive
    :on-close="gameDataGenerator.setNewRound.bind(gameDataGenerator)"
    @closeModal="isModalOpen = false"
    v-if="isModalOpen"
  >
    <p>{{ store.state.game.isCurrentSolutionCorrect ? "correct" : "wrong" }}</p>
  </ModalPrimitive>
</template>

<script setup lang="ts">
import store from "@/store";
import { gameDataGenerator } from "@/services/GameDataGenerator";
import { onBeforeMount, ref, watchEffect } from "vue";
import { fieldsManager } from "@/services/FieldManager";
import ModalPrimitive from "@/primitives/ModalPrimitive.vue";
import TimerPrimitive from "@/primitives/TimerPrimitive.vue";
import router from "@/router";
import { statisticsController } from "@/services/StatisticsController";
import GameFieldPrimitive from "@/primitives/GameFieldPrimitive.vue";
import { timerManager } from "@/services/TimerManager";
import { timer } from "@/utils/Timer";
import GamePageControlPanel from "@/components/GamePageControlPanel.vue";
import TypographyPrimitive from "@/primitives/TypographyPrimitive.vue";
import { colors } from "@/themes/colors";

const isNumbersDisplay = ref(false);
const isModalOpen = ref(false);
const handleModalOpen = () => (isModalOpen.value = true);
const toggleNumbersDisplay = () =>
  (isNumbersDisplay.value = !isNumbersDisplay.value);

const mountTimer = () => {
  timer.startTimer(store.state.settings.userSetTime, (time: string) => {
    timerManager.updateTime(time);
  });
};
const unmountTimer = () => {
  timer.stopTimer();
  timerManager.updateTime("0");
};

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
