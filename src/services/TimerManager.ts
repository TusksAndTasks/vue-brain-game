import store from "@/store";

class TimerManager {
  updateTime(time: string) {
    store.commit("updateTimerState", { key: "time", value: time });
  }
}

export const timerManager = new TimerManager();
