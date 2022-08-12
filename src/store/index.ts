import { createStore } from "vuex";
import declareAvailableOperators from "@/utils/declareAvailableOperators";
import { flagsEnum, operatorsType } from "@/engiene";

export type FlagsType = {
  [key in flagsEnum]: boolean;
};

export interface IGameField {
  id: number;
  value: string;
  inputValue?: string;
}

interface IState {
  flags: FlagsType;
  difficulty: number;
  currentNumbers: Array<number>;
  currentOperators: Array<string>;
  currentAnswer: number;
  currentFields: Array<IGameField>;
  isCurrentSolutionCorrect: boolean;
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
    currentAnswer: 0,
    currentFields: [] as Array<IGameField>,
    isCurrentSolutionCorrect: false,
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
