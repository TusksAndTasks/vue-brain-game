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
  <button @click="gameDataGenerator.logResult">Run</button>
  <keep-alive>
    <div v-for="field in store.state.currentFields" :key="field.id">
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
  </keep-alive>
  <p>{{ store.state.currentAnswer }}</p>
  <input type="checkbox" v-model="isShown" />
  <button @click="fieldsManager.checkSolution">Check</button>
  <p>{{ store.state.isCurrentSolutionCorrect.toString() }}</p>
</template>

<script setup lang="ts">
import store from "@/store";
import { gameDataGenerator } from "@/services/GameDataGenerator";
import { settingsUpdater } from "@/services/SettingsUpdater";
import { flagsEnum } from "@/engiene";
import { ref } from "vue";
import { fieldsManager } from "@/services/FieldManager";

const isShown = ref(false);
</script>
