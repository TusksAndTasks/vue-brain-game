class Timer {
  constructor() {
    this.#endTime = 0;
    this.#isRunning = false;
  }

  #endTime: number;
  #isRunning: boolean;

  startTimer(time: number, updater: (time: string) => void) {
    this.#endTime = Date.now() + 60000 * time;
    this.#isRunning = true;
    setTimeout(() => this.#tick(updater));
  }

  stopTimer() {
    this.#isRunning = false;
  }

  #tick(updater: (time: string) => void) {
    const currentTime = Date.now();
    const remainingTime = this.#endTime - currentTime;

    if (remainingTime > 0 && this.#isRunning) {
      const date = new Date(remainingTime);

      const displayTime =
        date.getMinutes().toString().padStart(2, "0") +
        ":" +
        date.getSeconds().toString().padStart(2, "0");

      updater(displayTime);

      setTimeout(() => this.#tick(updater), 1000);
    }
  }
}

export const timer = new Timer();
