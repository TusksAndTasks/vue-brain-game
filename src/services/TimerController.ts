import model from "@/model";

class TimerController {
  updateTime(time: string) {
    model.commit("updateTimerState", { key: "displayTime", value: time });
  }
}

export const timerController = new TimerController();
