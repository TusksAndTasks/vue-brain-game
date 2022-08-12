import { FlagsType } from "@/store/index";
import { flagsEnum } from "@/engiene";

export interface ISettingsState {
  flags: FlagsType;
  difficulty: number;
  timer: number;
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
    timer: 10,
  },
  mutations: {
    updateSettingsState<STATE extends ISettingsState, KEY extends keyof STATE>(
      state: STATE,
      payload: { key: KEY; value: STATE[KEY] }
    ) {
      state[payload.key] = payload.value;
    },
  },
};
