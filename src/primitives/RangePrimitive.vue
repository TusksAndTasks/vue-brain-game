<template>
  <label>
    <TypographyPrimitive
      elem="span"
      :size="fontSizes.SMALL"
      class-name="range-text range-min"
      >{{ min }}</TypographyPrimitive
    >
    <TypographyPrimitive
      elem="span"
      :size="fontSizes.SMALL"
      class-name="range-text range-max"
      >{{ max }}</TypographyPrimitive
    >
    <input
      type="range"
      :value="props.value"
      :style="CSSProps"
      @input="handleBackgroundChange"
      @change="handleChange"
      :min="min"
      :max="max"
    />
  </label>
  <slot></slot>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from "vue";
import TypographyPrimitive from "@/primitives/TypographyPrimitive.vue";
import { fontSizes } from "@/themes/sizes";

const props = withDefaults(
  defineProps<{
    value: number;
    keyword: string;
    min?: number;
    max?: number;
    onChange: (value?: number, keyword?: string) => void;
  }>(),
  { min: 1, max: 10 }
);

const handleBackgroundChange = (e: Event) => {
  let target = e.target as HTMLInputElement;

  const min = +target.min;
  const max = +target.max;
  const val = +target.value;

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
};

const getEventValue =
  (callback: (value?: number, keyword?: string) => void) => (e: Event) => {
    callback(+(e.target as HTMLInputElement).value, props.keyword);
  };

const handleChange = getEventValue(props.onChange);
const CSSProps = computed(() => ({
  "--bg-size":
    ((props.value - props.min) * 100) / (props.max - props.min) + "%",
}));
</script>

<style lang="scss" scoped>
label {
  position: relative;
  display: block;
  height: 25px;
  padding-top: 20px;
  width: 300px;
}

input[type="range"] {
  -webkit-appearance: none;
  background-image: linear-gradient(#929292, #929292);
  background-size: var(--bg-size) 100%;
  border: 1px black solid;
  border-radius: 50px;
  background-repeat: no-repeat;
  height: 2px;
  width: 100%;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-color: #c0c0c0;
    clip-path: polygon(
      20% 0%,
      80% 0%,
      98% 0,
      100% 68%,
      55% 100%,
      44% 100%,
      0 69%,
      0 0
    );
  }

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
}
</style>
