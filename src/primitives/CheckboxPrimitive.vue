<template>
  <div class="checkbox-container">
    <input type="checkbox" :checked="props.checked" @change="props.onCheck" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  checked: boolean;
  onCheck: () => void;
}>();
</script>

<style lang="scss">
.checkbox-container {
  display: flex;
  gap: 10px;
  padding-bottom: 10px;

  & input {
    width: 20px;
  }
}
</style>
