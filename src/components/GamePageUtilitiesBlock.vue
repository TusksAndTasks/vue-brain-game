<template>
  <div class="utilities-block">
    <ButtonPrimitive
      class-name="rectangle-button close-button"
      :callback="returnToMainPage"
      :color="{ primary: colors.WHITE, hover: colors.GRAY }"
      :font-size="fontSizes.MEDIUM"
      >ОТМЕНА</ButtonPrimitive
    >
    <TimerPrimitive>{{ store.state.timer.displayTime }}</TimerPrimitive>
  </div>
</template>

<script lang="ts" setup>
import { timer } from "@/utils/Timer";
import store from "@/store";
import { timerManager } from "@/services/TimerManager";
import router from "@/router";
import { onBeforeUnmount, onMounted } from "vue";
import ButtonPrimitive from "@/primitives/ButtonPrimitive.vue";
import TimerPrimitive from "@/primitives/TimerPrimitive.vue";
import { colors } from "@/themes/colors";
import { fontSizes } from "@/themes/sizes";

const mountTimer = () => {
  timer.startTimer(store.state.settings.userSetTime, (time: string) => {
    timerManager.updateTime(time);
  });
};
const unmountTimer = () => {
  timer.stopTimer();
  timerManager.updateTime("0");
};
const returnToMainPage = () => router.push("/");

onMounted(mountTimer);
onBeforeUnmount(unmountTimer);
</script>

<style lang="scss">
.utilities-block {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 200px;
  margin-top: 20px;
}
</style>
