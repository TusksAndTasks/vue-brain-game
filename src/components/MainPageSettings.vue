<template>
  <div class="settings">
    <TypographyPrimitive elem="h3" :size="fontSizes.MEDIUM"
      >Настройки</TypographyPrimitive
    >
    <RangePrimitive
      :value="model.state.settings.userSetTime"
      :min="1"
      :max="15"
      keyword="userSetTime"
      :onChange="settingsController.rangesUpdater"
    >
      <TypographyPrimitive elem="p" :size="fontSizes.SMALL"
        >Длительность
        {{ model.state.settings.userSetTime }} минут</TypographyPrimitive
      >
    </RangePrimitive>
    <RangePrimitive
      :value="model.state.settings.difficulty"
      keyword="difficulty"
      :min="1"
      :max="10"
      :onChange="settingsController.rangesUpdater"
    >
      <TypographyPrimitive elem="p" :size="fontSizes.SMALL"
        >Сложность {{ model.state.settings.difficulty }}</TypographyPrimitive
      >
    </RangePrimitive>
    <CheckboxPrimitive
      v-for="flag in flagsEnum"
      :checked="model.state.settings.flags[flag]"
      :onCheck="settingsController.flagsUpdater(flag)"
      :key="flag"
    >
      <TypographyPrimitive elem="span" :size="fontSizes.SMALL">{{
        descriptions[flag]
      }}</TypographyPrimitive>
    </CheckboxPrimitive>
  </div>
</template>

<script lang="ts" setup>
import { settingsController } from "@/services/SettingsController";
import { flagsEnum } from "@/services/EquationGenerationController";
import model from "@/model";
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
