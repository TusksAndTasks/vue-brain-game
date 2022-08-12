<template>
  <!--Game-->
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
  <button @click="fieldsManager.checkSolution">Check</button>
  <!--Model-->
  <button @click="gameDataGenerator.logResult">Run</button>
  <p>{{ store.state.game.isCurrentSolutionCorrect.toString() }}</p>
</template>

<script setup lang="ts">
import store from "@/store";
import { gameDataGenerator } from "@/services/GameDataGenerator";
import { ref } from "vue";
import { fieldsManager } from "@/services/FieldManager";

const isShown = ref(false);
</script>
