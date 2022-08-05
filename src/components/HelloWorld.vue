<template>
  <input
    type="checkbox"
    v-for="flag in flagsEnum"
    :checked="store.state.flags[flag]"
    @change="flagsUpdater(flag)"
    :key="flag"
  />
  <button @click="testFunc"></button>
</template>

<script setup lang="ts">
import { test } from "@/engiene";
import store, { flagsEnum } from "@/store";

function flagsUpdater(flag: flagsEnum) {
  store.commit("updateFlags", flag);
}

function difficultyUpdater(e: Event) {
  store.commit("updateDifficulty", +(e.target as HTMLInputElement).value);
}

function operatorsUpdater() {
  const operators = test.operatorsGenerator(
    store.state.flags,
    store.state.difficulty
  );
  store.commit("updateOperators", operators);
}

function numberUpdater() {
  const numbers = test.numbersGenerator(store.state.difficulty);
  store.commit("updateNumbers", numbers);
}

// function answerUpdater() {
//
// }

function testFunc() {
  console.log(calcRecurse());
}

function calcRecurse() {
  let result = calc();
  if (result < 0 || result.toString().includes(".") || !isFinite(result)) {
    result = calcRecurse();
  }
  return result;
}

function calc() {
  operatorsUpdater();
  numberUpdater();

  return test.calculateResult(
    store.state.currentNumbers,
    store.state.currentOperators
  );
}
</script>
