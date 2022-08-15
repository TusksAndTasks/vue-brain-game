import { engine } from "@/engiene";
import store from "@/store";
import { fieldsManager } from "@/services/FieldManager";
import declareAvailableOperators from "@/utils/declareAvailableOperators";
import { statisticsController } from "@/services/StatisticsController";

class GameDataGenerator {
  #operatorsUpdater() {
    const operators = engine.generateOperators(
      store.state.settings.flags,
      store.state.settings.difficulty
    );
    store.commit("updateGameState", {
      key: "currentOperators",
      value: operators,
    });
  }

  #numbersUpdater() {
    const numbers = engine.generateNumbers(
      store.state.settings.difficulty,
      store.state.game.currentOperators
    );
    store.commit("updateGameState", { key: "currentNumbers", value: numbers });
  }

  #answerUpdater(answer: number) {
    store.commit("updateGameState", { key: "currentAnswer", value: answer });
  }

  #generateGameConditions() {
    if (
      declareAvailableOperators(store.state.settings.flags).length < 2 &&
      store.state.settings.difficulty > 3
    ) {
      return;
    } else {
      this.#answerUpdater(this.#getEquationData());
      fieldsManager.fieldsCreator();
    }
  }

  setNewRound() {
    this.#generateGameConditions();
    statisticsController.updateQuestionsCount();
  }

  handleCheck(handleModal: () => void) {
    return function () {
      fieldsManager.checkSolution();
      statisticsController.updateCorrectAnswersCount(
        store.state.game.isCurrentSolutionCorrect
      );
      handleModal();
    };
  }

  #getEquationData() {
    let result = this.#startEngine();
    if (result > 1000000 || result === 1) {
      result = this.#getEquationData();
    }
    return result;
  }

  #startEngine() {
    this.#operatorsUpdater();
    this.#numbersUpdater();

    return engine.calculateResult(
      store.state.game.currentNumbers,
      store.state.game.currentOperators
    );
  }
}

export const gameDataGenerator = new GameDataGenerator();
