<template>
  <div class="timer" :style="CSSProps">
    <TypographyPrimitive elem="h1" :size="fontSizes.MEDIUM">
      <slot></slot>
    </TypographyPrimitive>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults } from "vue";

import TypographyPrimitive from "@/primitives/TypographyPrimitive.vue";

import { fontSizes } from "@/themes/sizes";
import { colors } from "@/themes/colors";

const props = withDefaults(defineProps<{ color?: colors }>(), {
  color: colors.BLUE,
});

const CSSProps = computed(() => ({ "--color-prop": props.color }));
</script>

<style lang="scss">
.timer {
  background-color: #e3e2e2;
  width: 150px;
  height: 50px;
  border: 2px solid var(--color-prop);
  border-right: var(--color-prop) 30px solid;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
}
</style>
