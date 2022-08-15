<template>
  <div class="timer">
    <TypographyPrimitive elem="h1" :size="sizes.LARGE">
      <slot></slot>
    </TypographyPrimitive>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onBeforeUnmount, onMounted } from "vue";
import TypographyPrimitive from "@/primitives/TypographyPrimitive.vue";
import { sizes } from "@/themes/sizes";

const props = defineProps<{ onMount: () => void; onUnmount: () => void }>();

onMounted(props.onMount);
onBeforeUnmount(props.onUnmount);
</script>

<style lang="scss">
.timer {
  border: 1px solid black;
  background-color: gray;
}
</style>
