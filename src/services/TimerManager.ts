import store from "@/store";

class TimerManager {
  updateTime(time: string) {
    store.commit("updateTimerState", { key: "displayTime", value: time });
  }
}

export const timerManager = new TimerManager();
