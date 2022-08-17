import { FlagsType } from "@/model/index";
import { flagsEnum } from "@/services/EquationGenerationController";

export interface ISettingsModel {
  flags: FlagsType;
  difficulty: number;
  userSetTime: number;
}

export default {
  state: {
    flags: {
      [flagsEnum.SUM]: true,
      [flagsEnum.SUBSTR]: true,
      [flagsEnum.MUL]: true,
      [flagsEnum.DIV]: true,
      [flagsEnum.POW]: true,
    },
    difficulty: 10,
    userSetTime: 10,
  },
  mutations: {
    updateSettingsState<STATE extends ISettingsModel, KEY extends keyof STATE>(
      state: STATE,
      payload: { key: KEY; value: STATE[KEY] }
    ) {
      state[payload.key] = payload.value;
    },
  },
};
