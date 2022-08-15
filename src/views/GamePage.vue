<template>
  <TimerPrimitive :on-mount="mountTimer" :on-unmount="unmountTimer">{{
    store.state.timer.displayTime
  }}</TimerPrimitive>
  <div v-for="field in store.state.game.currentFields" :key="field.id">
    <p v-if="field.id === 0 || field.id % 2 !== 0 || isShown">
      {{ field.value }}
    </p>
    <input
      v-else
      type="text"
      :value="field.inputValue"
      @change="fieldsManager.fieldUpdater"
      :id="field.id"
    />
  </div>
  <p>{{ store.state.game.currentAnswer }}</p>
  <input type="checkbox" v-model="isShown" />
  <button @click="handleCheck">Check</button>
  <ModalPrimitive
    :on-close="setNewRound"
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
import { timer } from "@/utils/Timer";
import { timerManager } from "@/services/TimerManager";
import TimerPrimitive from "@/primitives/TimerPrimitive.vue";
import router from "@/router";
import { statisticsController } from "@/services/StatisticsController";

const mountTimer = () =>
  timer.startTimer(store.state.settings.userSetTime, (time: string) => {
    timerManager.updateTime(time);
  });

const unmountTimer = () => {
  timer.stopTimer();
  timerManager.updateTime("0");
};

const setNewRound = () => {
  gameDataGenerator.generateGameConditions();
  statisticsController.updateQuestionsCount();
};

function handleCheck() {
  fieldsManager.checkSolution();
  statisticsController.updateCorrectAnswersCount(
    store.state.game.isCurrentSolutionCorrect
  );
  isModalOpen.value = true;
}

const isShown = ref(false);
const isModalOpen = ref(false);

watchEffect(() => {
  if (store.state.timer.displayTime === "00:00") {
    router.push("/");
  }
});

onBeforeMount(() => {
  statisticsController.resetLastRoundStatistics();
  setNewRound();
});
</script>
