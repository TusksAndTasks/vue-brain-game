<template>
  <button @click="callback"><slot></slot></button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{ callback: () => void }>();
</script>
