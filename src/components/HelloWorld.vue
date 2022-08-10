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
  operatorsUpdater();

  const numbers = test.generateNumbers(
    store.state.difficulty,
    store.state.currentOperators
  );
  store.commit("updateState", { key: "currentNumbers", value: numbers });
}

function logResult() {
  console.log(calcRecurse().value);
}

function calcRecurse() {
  let result = calc();
  if (result.value.toString().includes(".") || result.value > 100000) {
    result = calcRecurse();
  }
  return result;
}

function calc() {
  numberUpdater();

  return test.calculateResult(
    store.state.currentNumbers,
    store.state.currentOperators
  );
}
</script>
