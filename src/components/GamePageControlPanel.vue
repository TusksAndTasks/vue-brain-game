<template>
  <div>
    <div>
      <ButtonPrimitive
        v-for="(n, index) in 10"
        :key="n"
        :callback="fieldsManager.fieldUpdater(index.toString())"
        >{{ index }}</ButtonPrimitive
      >
    </div>
    <div>
      <ButtonPrimitive
        :callback="focusOnNeighbor(store.state.game.focusedFieldId - 2)"
      >
        Prev
      </ButtonPrimitive>
      <ButtonPrimitive
        :callback="focusOnNeighbor(store.state.game.focusedFieldId + 2)"
      >
        Next
      </ButtonPrimitive>
      <ButtonPrimitive :callback="toggleNumbersDisplay">Show</ButtonPrimitive>
      <ButtonPrimitive
        :callback="gameDataGenerator.handleCheck(handleModalOpen)"
      >
        Check
      </ButtonPrimitive>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonPrimitive from "@/primitives/ButtonPrimitive.vue";
import { fieldsManager } from "@/services/FieldManager";
import { focusOnNeighbor } from "@/utils/focusChangingUtils";
import store from "@/store";
import { defineProps } from "vue";
import { gameDataGenerator } from "@/services/GameDataGenerator";

defineProps<{
  toggleNumbersDisplay: () => void;
  handleModalOpen: () => void;
}>();
</script>
