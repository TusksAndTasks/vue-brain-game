<template>
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
    :on-close="() => gameDataGenerator.generateGameConditions()"
    @closeModal="isModalOpen = false"
    v-if="isModalOpen"
  >
    <p>{{ store.state.game.isCurrentSolutionCorrect ? "correct" : "wrong" }}</p>
  </ModalPrimitive>
</template>

<script setup lang="ts">
import store from "@/store";
import { gameDataGenerator } from "@/services/GameDataGenerator";
import { ref } from "vue";
import { fieldsManager } from "@/services/FieldManager";
import ModalPrimitive from "@/primitives/ModalPrimitive.vue";

gameDataGenerator.generateGameConditions();
function handleCheck() {
  fieldsManager.checkSolution();
  isModalOpen.value = true;
}
const isShown = ref(false);
const isModalOpen = ref(false);
</script>
