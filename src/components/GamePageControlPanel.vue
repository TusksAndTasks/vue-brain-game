<template>
  <div class="control-panel">
    <div class="number-buttons-container">
      <ButtonPrimitive
        v-for="(n, index) in 10"
        :key="n"
        :callback="gameFieldsController.updateField(index.toString())"
        :color="{ primary: colors.RED, hover: colors.LIGHTRED }"
        :font-size="fontSizes.LARGE"
        class-name="round-button"
        >{{ index }}</ButtonPrimitive
      >
    </div>
    <div class="symbols-buttons-container">
      <ButtonPrimitive
        :color="{ primary: colors.DARKGRAY, hover: colors.GRAY }"
        :font-size="fontSizes.LARGE"
        class-name="round-button"
        :callback="
          gameFieldsController.focusOnNeighbor(
            model.state.game.focusedFieldId - 2
          )
        "
      >
        &#60;
      </ButtonPrimitive>
      <ButtonPrimitive
        :color="{ primary: colors.DARKGRAY, hover: colors.GRAY }"
        :font-size="fontSizes.LARGE"
        class-name="round-button"
        :callback="
          gameFieldsController.focusOnNeighbor(
            model.state.game.focusedFieldId + 2
          )
        "
      >
        &#62;
      </ButtonPrimitive>
      <ButtonPrimitive
        :color="{ primary: colors.DARKGRAY, hover: colors.GRAY }"
        :font-size="fontSizes.LARGE"
        class-name="round-button"
        :callback="toggleNumbersDisplay"
        >?</ButtonPrimitive
      >
      <ButtonPrimitive
        :color="{ primary: colors.DARKGRAY, hover: colors.GRAY }"
        :font-size="fontSizes.LARGE"
        class-name="round-button"
        :callback="equationController.handleUserAnswerCheck(handleModalOpen)"
      >
        =
      </ButtonPrimitive>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonPrimitive from "@/primitives/ButtonPrimitive.vue";
import model from "@/model";
import { defineProps } from "vue";
import { equationController } from "@/services/EquationController";
import { colors } from "@/themes/colors";
import { fontSizes } from "@/themes/sizes";
import { gameFieldsController } from "@/services/GameFieldsController";

defineProps<{
  toggleNumbersDisplay: () => void;
  handleModalOpen: () => void;
}>();
</script>

<style lang="scss">
.control-panel {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 50px;
}

.number-buttons-container {
  display: flex;
  width: 300px;
  flex-flow: row wrap;
  justify-content: center;
  gap: 50px 50px;
  align-content: center;

  & button:nth-child(1) {
    order: 2;
  }
}

.symbols-buttons-container {
  display: flex;
  flex-flow: column;
  gap: 50px;
  align-content: center;
}
</style>
