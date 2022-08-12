<template>
  <input type="checkbox" :checked="props.checked" @change="props.onCheck" />
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  checked: boolean;
  onCheck: () => void;
}>();
</script>
