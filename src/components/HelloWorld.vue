<template>
  <input
    type="checkbox"
    v-for="flag in flagsEnum"
    :checked="store.state.flags[flag]"
    @change="settingsUpdater.flagsUpdater(flag)"
    :key="flag"
  />
  <input
    :value="store.state.difficulty"
    @change="settingsUpdater.difficultyUpdater"
  />
  <button @click="gameDataGenerator.logResult()">Run</button>
  <p>{{ store.state.currentNumbers.toString() }}</p>
  <p>{{ store.state.currentOperators.toString() }}</p>
  <p>{{ store.state.currentAnswer }}</p>
</template>

<script setup lang="ts">
import store from "@/store";
import { gameDataGenerator } from "@/services/GameDataGenerator";
import { settingsUpdater } from "@/services/SettingsUpdater";
import { flagsEnum } from "@/engiene";
</script>
