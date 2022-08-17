import { operatorsType } from "@/services/EquationGenerationController";
import { IGameField } from "@/model/index";

export interface IGameModel {
  currentNumbers: Array<number>;
  currentOperators: Array<operatorsType>;
  currentAnswer: number;
  currentFields: Array<IGameField>;
  isCurrentSolutionCorrect: boolean;
  focusedFieldId: number;
}

export default {
  state: {
    currentNumbers: [] as Array<number>,
    currentOperators: [] as Array<operatorsType>,
    currentAnswer: 0,
    currentFields: [] as Array<IGameField>,
    isCurrentSolutionCorrect: false,
    focusedFieldId: 2,
  },
  mutations: {
    updateGameState<STATE extends IGameModel, KEY extends keyof STATE>(
      state: STATE,
      payload: { key: KEY; value: STATE[KEY] }
    ) {
      state[payload.key] = payload.value;
    },
  },
};
