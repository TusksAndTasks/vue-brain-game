import model from "@/model";

import { flagsEnum } from "@/services/EquationGenerationController";

class SettingsController {
  flagsUpdater(flag: flagsEnum) {
    return () => {
      model.commit("updateSettingsState", {
        key: "flags",
        value: {
          ...model.state.settings.flags,
          [flag]: !model.state.settings.flags[flag],
        },
      });
    };
  }

  rangesUpdater(newValue?: number, keyword?: string) {
    model.commit("updateSettingsState", {
      key: keyword,
      value: newValue,
    });
  }
}

export const settingsController = new SettingsController();
