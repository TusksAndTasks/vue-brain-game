import store from "@/store";
import { timer } from "@/utils/Timer";

class TimerManager {
  updateTime(time: string) {
    store.commit("updateTimerState", { key: "displayTime", value: time });
  }
}

export const timerManager = new TimerManager();
