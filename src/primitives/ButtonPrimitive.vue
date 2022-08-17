<template>
  <button
    @click="callback"
    :style="CSSProps"
    class="standard-button"
    :class="className"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults } from "vue";

import { colors } from "@/themes/colors";
import { fontSizes } from "@/themes/sizes";

const props = withDefaults(
  defineProps<{
    callback?: () => void;
    color?: {
      primary: colors;
      hover: colors;
    };
    className?: string;
    fontSize?: fontSizes;
  }>(),
  {
    color: () => ({ primary: colors.DARKGRAY, hover: colors.GRAY }),
    className: "standard-button",
    fontSize: fontSizes.MEDIUM,
  }
);

const CSSProps = computed(() => {
  return {
    "--primary-color-prop": props.color.primary,
    "--hover-color-prop": props.color.hover,
    "--font-size-prop": props.fontSize,
  };
});
</script>

<style lang="scss">
.standard-button {
  background-color: var(--primary-color-prop);
  font-size: var(--font-size-prop);
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--hover-color-prop);
    cursor: pointer;
  }
}

.round-button {
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  font-weight: 600;
  padding: 0;
}

.rectangle-button {
  border: none;
  width: 200px;
  height: 50px;
  box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.4);
  font-weight: 600;
  position: relative;
}

.close-button {
  text-align: start;
  padding-left: 50px;
  &:before {
    display: block;
    content: "\2573";
    position: absolute;
    font-size: 20px;
    left: 20px;
    top: 7.5px;
    transition: 0.5s;
  }

  &:hover {
    &:before {
      transform: rotate(180deg);
    }
  }
}
</style>
