import { createStore } from "vuex";
import declareAvailableOperators from "@/utils/declareAvailableOperators";
import { flagsEnum, operatorsType } from "@/engiene";

export type FlagsType = {
  [key in flagsEnum]: boolean;
};

interface IState {
  flags: FlagsType;
  difficulty: number;
  currentNumbers: Array<number>;
  currentOperators: Array<string>;
  currentAnswer: number | null;
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
    currentNumbers: [] as Array<number>,
    currentOperators: [] as Array<operatorsType>,
    currentAnswer: null,
  },
  getters: {
    getActiveFlagsAmount(state) {
      return declareAvailableOperators(state.flags).length;
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
