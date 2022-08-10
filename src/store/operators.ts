import { createStore } from "vuex";
import { flagsEnum } from "@/store/index";

export default createStore({
  state: {
    [flagsEnum.SUM]: true,
    [flagsEnum.SUBSTR]: true,
    [flagsEnum.MUL]: true,
    [flagsEnum.DIV]: true,
    [flagsEnum.POW]: true,
  },
  getters: {},
  mutations: {
    updateFlags(state, flag: flagsEnum) {
      state[flag] = !state[flag];
    },
  },
  actions: {},
});
