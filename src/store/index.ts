import { createStore } from "vuex";
import { INumberField, test } from "@/engiene";

export enum flagsEnum {
  SUM = "SUM",
  SUBSTR = "SUBSTR",
  MUL = "MUL",
  DIV = "DIV",
  POW = "POW",
}

export type FlagsType = {
  [key in flagsEnum]: boolean;
};

interface IState {
  flags: FlagsType;
  difficulty: number;
  currentNumbers: Array<INumberField>;
  currentOperators: Array<string>;
  currentAnswer: Array<number>;
}

export default createStore({
  state: {
    flags: {
      [flagsEnum.SUM]: true,
      [flagsEnum.SUBSTR]: true,
      [flagsEnum.MUL]: true,
      [flagsEnum.DIV]: true,
      [flagsEnum.POW]: true,
    },
    difficulty: 10,
    currentNumbers: [] as Array<INumberField>,
    currentOperators: [] as Array<string>,
    currentAnswer: [] as Array<number>,
  },
  getters: {
    getActiveFlagsAmount(state) {
      return test.declareAvailableOperators(state.flags).length;
    },
  },
  mutations: {
    updateState<STATE extends IState, KEY extends keyof STATE>(
      state: STATE,
      payload: { key: KEY; value: STATE[KEY] }
    ) {
      state[payload.key] = payload.value;
    },
  },
  actions: {},
  modules: {},
});
