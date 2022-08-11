import { flagsEnum } from "@/engiene";
import store from "@/store";

class SettingsUpdater {
  flagsUpdater(flag: flagsEnum) {
    store.commit("updateState", {
      key: "flags",
      value: { ...store.state.flags, [flag]: !store.state.flags[flag] },
    });
  }

  difficultyUpdater(e: Event) {
    store.commit("updateState", {
      key: "difficulty",
      value: +(e.target as HTMLInputElement).value,
    });
  }
}

export const settingsUpdater = new SettingsUpdater();
