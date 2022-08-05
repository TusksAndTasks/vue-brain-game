import { createStore } from "vuex";

export enum flagsEnum {
  SUM = "sum",
  SUBSTR = "substr",
  MUL = "mul",
  DIV = "div",
  POW = "pow",
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
    difficulty: 5,
    currentNumbers: [] as Array<number>,
    currentOperators: [] as Array<string>,
    currentAnswer: [] as Array<number>,
  },
  getters: {},
  mutations: {
    updateFlags(state, flag: flagsEnum) {
      state.flags[flag] = !state.flags[flag];
    },
    updateDifficulty(state, difficulty: number) {
      state.difficulty = difficulty;
    },
    updateNumbers(state, numArr: Array<number>) {
      state.currentNumbers = numArr;
    },
    updateOperators(state, numOpr: Array<string>) {
      state.currentOperators = numOpr;
    },
    updateAnswer(state, answer: Array<number>) {
      state.currentAnswer = answer;
    },
  },
  actions: {},
  modules: {},
});

export interface IFlags {
  [flagsEnum.SUM]: boolean;
  [flagsEnum.SUBSTR]: boolean;
  [flagsEnum.DIV]: boolean;
}
