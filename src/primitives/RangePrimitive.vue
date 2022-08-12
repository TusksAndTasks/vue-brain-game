<template>
  <input
    type="range"
    :value="props.value"
    @change="handleChange"
    min="1"
    max="10"
  />
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  value: number;
  keyword: string;
  onChange: (value?: number, keyword?: string) => void;
}>();

const getEventValue =
  (callback: (value?: number, keyword?: string) => void) => (e: Event) => {
    callback(+(e.target as HTMLInputElement).value, props.keyword);
  };

const handleChange = getEventValue(props.onChange);
</script>
