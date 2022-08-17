import { equationGenerationController } from "@/services/EquationGenerationController";
import model from "@/model";
import { gameFieldsController } from "@/services/GameFieldsController";
import { statisticsController } from "@/services/StatisticsController";

class EquationController {
  #updateOperators() {
    const operators = equationGenerationController.generateOperators(
      model.state.settings.flags,
      model.state.settings.difficulty
    );
    model.commit("updateGameState", {
      key: "currentOperators",
      value: operators,
    });
  }

  #updateNumbers() {
    const numbers = equationGenerationController.generateNumbers(
      model.state.settings.difficulty,
      model.state.game.currentOperators
    );
    model.commit("updateGameState", { key: "currentNumbers", value: numbers });
  }

  #updateAnswer(answer: number) {
    model.commit("updateGameState", { key: "currentAnswer", value: answer });
  }

  #startEquationGeneration() {
    this.#updateOperators();
    this.#updateNumbers();

    return equationGenerationController.calculateResult(
      model.state.game.currentNumbers,
      model.state.game.currentOperators
    );
  }

  #getEquationData() {
    let result = this.#startEquationGeneration();
    if (result > 1000000 || result === 1) {
      result = this.#getEquationData();
    }
    return result;
  }

  #generateGameConditions() {
    this.#updateAnswer(this.#getEquationData());
    gameFieldsController.createFields();
  }

  setNewRound() {
    this.#generateGameConditions();
    statisticsController.updateQuestionsCount();
  }

  #checkSolution() {
    let isCorrect = false;

    const firstNumber = model.state.game.currentNumbers[0];
    const inputFields = model.state.game.currentFields.filter(
      (el) => el.inputValue
    );
    const inputNumbers = inputFields.map(
      (field) => +(field.inputValue as string)
    );

    inputNumbers.unshift(firstNumber);

    if (inputNumbers.length < model.state.game.currentNumbers.length) {
      this.updateSolutionCorrectness(isCorrect);
    }

    const inputResult = equationGenerationController.calculateResult(
      inputNumbers,
      model.state.game.currentOperators
    );

    isCorrect = inputResult === model.state.game.currentAnswer;

    this.updateSolutionCorrectness(isCorrect);
  }

  updateSolutionCorrectness(isCorrect: boolean) {
    model.commit("updateGameState", {
      key: "isCurrentSolutionCorrect",
      value: isCorrect,
    });
  }

  handleUserAnswerCheck(handleModal: () => void) {
    return () => {
      this.#checkSolution();
      statisticsController.updateCorrectAnswersCount(
        model.state.game.isCurrentSolutionCorrect
      );
      handleModal();
    };
  }
}

export const equationController = new EquationController();
