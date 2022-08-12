import { flagsEnum } from "@/engiene";
import store from "@/store";

class SettingsUpdater {
  flagsUpdater(flag: flagsEnum) {
    return () => {
      store.commit("updateSettingsState", {
        key: "flags",
        value: {
          ...store.state.settings.flags,
          [flag]: !store.state.settings.flags[flag],
        },
      });
    };
  }

  rangesUpdater(newValue?: number, keyword?: string) {
    store.commit("updateSettingsState", {
      key: keyword,
      value: newValue,
    });
  }
}

export const settingsUpdater = new SettingsUpdater();
