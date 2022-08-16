<template>
  <div class="equation">
    <div class="left-part-equation">
      <div
        v-for="field in store.state.game.currentFields"
        :key="field.id"
        class="equation-operand"
      >
        <TypographyPrimitive
          :color="colors.GRAY"
          :size="fontSizes.LARGE"
          class-name="bold-text"
          elem="p"
          v-if="field.id === 0 || field.id % 2 !== 0 || isNumberDisplay"
        >
          {{ field.value }}
        </TypographyPrimitive>
        <GameFieldPrimitive
          v-else
          :input-value="field.inputValue"
          :on-input="fieldsManager.changeInputValue"
          :on-focus="fieldsManager.switchFocus"
          :field-id="field.id"
        />
      </div>
    </div>
    <TypographyPrimitive :color="colors.GRAY" elem="p" :size="fontSizes.LARGE"
      >={{ store.state.game.currentAnswer }}?</TypographyPrimitive
    >
  </div>
</template>

<script lang="ts" setup>
import { colors } from "@/themes/colors";
import TypographyPrimitive from "@/primitives/TypographyPrimitive.vue";
import GameFieldPrimitive from "@/primitives/GameFieldPrimitive.vue";
import { fieldsManager } from "@/services/FieldManager";
import store from "@/store";
import { defineProps } from "vue";
import { fontSizes } from "@/themes/sizes";

defineProps<{ isNumberDisplay: boolean }>();
</script>

<style lang="scss">
.equation {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 0;
}

.equation-operand {
  width: 40px;
}

.left-part-equation {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 5px;

  & div:nth-of-type(1) p {
    color: black;
  }
}
</style>
