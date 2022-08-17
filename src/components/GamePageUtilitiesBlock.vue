<template>
  <div class="utilities-block">
    <ButtonPrimitive
      class-name="rectangle-button close-button"
      :callback="returnToMainPage"
      :color="{ primary: colors.WHITE, hover: colors.GRAY }"
      :font-size="fontSizes.MEDIUM"
      >ОТМЕНА</ButtonPrimitive
    >
    <TimerPrimitive>{{ model.state.timer.displayTime }}</TimerPrimitive>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from "vue";

import ButtonPrimitive from "@/primitives/ButtonPrimitive.vue";
import TimerPrimitive from "@/primitives/TimerPrimitive.vue";

import model from "@/model";
import router from "@/router";
import { timer } from "@/utils/Timer";
import { timerController } from "@/services/TimerController";
import { colors } from "@/themes/colors";
import { fontSizes } from "@/themes/sizes";

const mountTimer = () => {
  timer.startTimer(model.state.settings.userSetTime, (time: string) => {
    timerController.updateTime(time);
  });
};
const unmountTimer = () => {
  timer.stopTimer();
  timerController.updateTime("0");
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
