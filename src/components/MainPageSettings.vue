<template>
  <div class="settings">
    <TypographyPrimitive elem="h3" :size="fontSizes.MEDIUM"
      >Настройки</TypographyPrimitive
    >
    <RangePrimitive
      :value="store.state.settings.userSetTime"
      :min="1"
      :max="15"
      keyword="userSetTime"
      :onChange="settingsUpdater.rangesUpdater"
    >
      <TypographyPrimitive elem="p" :size="fontSizes.SMALL"
        >Длительность
        {{ store.state.settings.userSetTime }} минут</TypographyPrimitive
      >
    </RangePrimitive>
    <RangePrimitive
      :value="store.state.settings.difficulty"
      keyword="difficulty"
      :min="1"
      :max="10"
      :onChange="settingsUpdater.rangesUpdater"
    >
      <TypographyPrimitive elem="p" :size="fontSizes.SMALL"
        >Сложность {{ store.state.settings.difficulty }}</TypographyPrimitive
      >
    </RangePrimitive>
    <CheckboxPrimitive
      v-for="flag in flagsEnum"
      :checked="store.state.settings.flags[flag]"
      :onCheck="settingsUpdater.flagsUpdater(flag)"
      :key="flag"
    >
      <TypographyPrimitive elem="span" :size="fontSizes.SMALL">{{
        descriptions[flag]
      }}</TypographyPrimitive>
    </CheckboxPrimitive>
  </div>
</template>

<script lang="ts" setup>
import { settingsUpdater } from "@/services/SettingsUpdater";
import { flagsEnum } from "@/engiene";
import store from "@/store";
import { fontSizes } from "@/themes/sizes";
import CheckboxPrimitive from "@/primitives/CheckboxPrimitive.vue";
import RangePrimitive from "@/primitives/RangePrimitive.vue";
import TypographyPrimitive from "@/primitives/TypographyPrimitive.vue";

const descriptions = {
  [flagsEnum.SUM]: "Суммирование",
  [flagsEnum.SUBSTR]: "Разность",
  [flagsEnum.MUL]: "Умножение",
  [flagsEnum.DIV]: "Деление",
  [flagsEnum.POW]: "Возведение в степень",
};
</script>

<style>
.settings {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
