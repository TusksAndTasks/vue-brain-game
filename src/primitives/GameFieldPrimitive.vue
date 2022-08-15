<template>
  <input
    type="text"
    :value="inputValue"
    @input="handleInput"
    @focus="handleFocus"
    :id="fieldId"
    :style="
      store.state.game.focusedFieldId === fieldId
        ? { border: '1px red solid' }
        : { border: '1px black solid' }
    "
  />
</template>

//v-else

<script lang="ts" setup>
import { defineProps } from "vue";
import store from "@/store";

const props = defineProps<{
  inputValue: string;
  fieldId: number;
  onFocus: (eventElement: HTMLInputElement) => void;
  onInput: (eventElement: HTMLInputElement) => void;
}>();

const getEventElement =
  (callback: (eventElement: HTMLInputElement) => void) => (e: Event) => {
    console.log(e);
    callback(e.target as HTMLInputElement);
  };

const handleInput = getEventElement(props.onInput);
const handleFocus = getEventElement(props.onFocus);
</script>
