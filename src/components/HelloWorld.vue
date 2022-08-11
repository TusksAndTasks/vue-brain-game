<template>
  <input
    type="checkbox"
    v-for="flag in flagsEnum"
    :checked="store.state.flags[flag]"
    @change="flagsUpdater(flag)"
    :key="flag"
  />
  <input :value="store.state.difficulty" @change="difficultyUpdater" />
  <button @click="logResult">Run</button>
</template>

<script setup lang="ts">
import { test } from "@/engiene";
import store, { flagsEnum } from "@/store";

function flagsUpdater(flag: flagsEnum) {
  store.commit("updateState", {
    key: "flags",
    value: { ...store.state.flags, [flag]: !store.state.flags[flag] },
  });
}

function difficultyUpdater(e: Event) {
  store.commit("updateState", {
    key: "difficulty",
    value: +(e.target as HTMLInputElement).value,
  });
}

function operatorsUpdater() {
  const operators = test.generateOperators(
    store.state.flags,
    store.state.difficulty
  );
  store.commit("updateState", { key: "currentOperators", value: operators });
}

function numberUpdater() {
  const numbers = test.generateNumbers(
    store.state.difficulty,
    store.state.currentOperators
  );
  store.commit("updateState", { key: "currentNumbers", value: numbers });
}

function logResult() {
  if (store.getters.getActiveFlagsAmount < 2 && store.state.difficulty > 3) {
    return;
  } else console.log(calcRecurse().value);
}

function calcRecurse() {
  let result = calc();
  if (result.value > 1000000 || result.value === 1) {
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
