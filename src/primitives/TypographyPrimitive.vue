<template>
  <component
    :is="elem"
    :style="CSSProps"
    class="standard-text"
    :class="className"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults } from "vue";
import { colors } from "@/themes/colors";
import { fontSizes } from "@/themes/sizes";

const props = withDefaults(
  defineProps<{
    elem: keyof HTMLElementTagNameMap;
    className?: string;
    color?: colors;
    size?: fontSizes;
  }>(),
  {
    elem: "span",
    color: colors.BLACK,
    size: fontSizes.MEDIUM,
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
  font-family: "Microsoft Sans Serif", sans-serif;
  letter-spacing: 1.5px;
}

.bold-text {
  font-weight: 600;
}

.range-text {
  position: absolute;
  top: 0;
}

.range-min {
  left: 0;
}
.range-max {
  right: 0;
}
</style>
