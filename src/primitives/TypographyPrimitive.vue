<template>
  <component :is="elem" :style="CSSProps" :class="className">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults } from "vue";
import { colors } from "@/themes/colors";
import { sizes } from "@/themes/sizes";

const props = withDefaults(
  defineProps<{
    elem: keyof HTMLElementTagNameMap;
    className?: string;
    color?: colors;
    size?: sizes;
  }>(),
  {
    elem: "span",
    className: "standard-text",
    color: colors.BLACK,
    size: sizes.MEDIUM,
  }
);

const CSSProps = computed(() => {
  return {
    "--size-prop": props.size,
    "--color-prop": props.color,
  };
});
</script>

<style lang="scss">
.standard-text {
  font-size: var(--size-prop);
  color: var(--color-prop);
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
