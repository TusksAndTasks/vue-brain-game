import { createStore } from "vuex";
import { INumberField } from "@/engiene";

export default createStore({
  state: {
    difficulty: 5,
    currentNumbers: [] as Array<INumberField>,
    currentOperators: [] as Array<string>,
    currentAnswer: [] as Array<number>,
  },
  getters: {},
  mutations: {
    updateDifficulty(state, difficulty: number) {
      state.difficulty = difficulty;
    },
    updateNumbers(state, numArr: Array<INumberField>) {
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
