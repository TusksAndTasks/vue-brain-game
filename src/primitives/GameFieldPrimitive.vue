<template>
  <input
    type="text"
    maxlength="2"
    :value="inputValue"
    @input="handleInput"
    @focus="handleFocus"
    :id="fieldId"
    :style="{ border: 'none', borderBottom: `${CSSProps} 2px solid` }"
  />
</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults } from "vue";
import { colors } from "@/themes/colors";

const props = withDefaults(
  defineProps<{
    inputValue: string;
    fieldId: number;
    focusedId: number;
    colors?: { primary: colors; focus: colors };
    maxlength?: number;
    onFocus: (eventElement: HTMLInputElement) => void;
    onInput: (eventElement: HTMLInputElement) => void;
  }>(),
  { colors: () => ({ primary: colors.GRAY, focus: colors.BLUE }), maxlength: 2 }
);

const getEventElement =
  (callback: (eventElement: HTMLInputElement) => void) => (e: Event) => {
    callback(e.target as HTMLInputElement);
  };

const handleInput = getEventElement(props.onInput);
const handleFocus = getEventElement(props.onFocus);

const CSSProps = computed(() =>
  props.focusedId === props.fieldId ? props.colors.focus : props.colors.primary
);
</script>

<style scoped lang="scss">
input {
  width: 40px;
  font-size: 30px;
  font-family: "Microsoft Sans Serif", sans-serif;
  font-weight: 700;

  &:focus {
    outline: none;
  }
}
</style>
