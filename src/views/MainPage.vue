<template>
  <div>
    <CheckboxPrimitive
      v-for="flag in flagsEnum"
      :checked="store.state.settings.flags[flag]"
      :onCheck="settingsUpdater.flagsUpdater(flag)"
      :key="flag"
    />
    <RangePrimitive
      :value="store.state.settings.difficulty"
      keyword="difficulty"
      :onChange="settingsUpdater.rangesUpdater"
    />
    <RangePrimitive
      :value="store.state.settings.userSetTime"
      keyword="userSetTime"
      :onChange="settingsUpdater.rangesUpdater"
    />
  </div>
</template>

<script setup lang="ts">
import { settingsUpdater } from "@/services/SettingsUpdater";
import { flagsEnum } from "@/engiene";
import store from "@/store";
import CheckboxPrimitive from "@/primitives/CheckboxPrimitive.vue";
import RangePrimitive from "@/primitives/RangePrimitive.vue";
</script>
