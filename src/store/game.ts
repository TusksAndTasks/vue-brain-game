import { operatorsType } from "@/engiene";
import { IGameField } from "@/store/index";

export interface IGameState {
  currentNumbers: Array<number>;
  currentOperators: Array<operatorsType>;
  currentAnswer: number;
  currentFields: Array<IGameField>;
  isCurrentSolutionCorrect: boolean;
}

export default {
  state: {
    currentNumbers: [] as Array<number>,
    currentOperators: [] as Array<operatorsType>,
    currentAnswer: 0,
    currentFields: [] as Array<IGameField>,
    isCurrentSolutionCorrect: false,
  },
  mutations: {
    updateGameState<STATE extends IGameState, KEY extends keyof STATE>(
      state: STATE,
      payload: { key: KEY; value: STATE[KEY] }
    ) {
      state[payload.key] = payload.value;
    },
  },
};
