import store, { IGameField } from "@/store";
import { engine } from "@/engiene";

class FieldManager {
  fieldsCreator() {
    const { currentNumbers, currentOperators } = store.state.game;

    const gameFields = [
      { id: 0, value: currentNumbers[0] ? currentNumbers[0].toString() : "" },
    ] as Array<IGameField>;

    for (let i = 1; i < currentOperators.length + currentNumbers.length; i++) {
      if (i % 2 === 0) {
        gameFields.push({
          id: i,
          value: currentNumbers[i / 2].toString(),
          inputValue: "",
        });
      } else {
        gameFields.push({
          id: i,
          value: currentOperators[(i - 1) / 2],
        });
      }
    }

    this.updateSolutionCorrectness(false);
    store.commit("updateGameState", {
      key: "currentFields",
      value: gameFields,
    });
  }

  fieldUpdater(e: Event) {
    const newFields = store.state.game.currentFields.map((el) =>
      el.id === +(e.target as HTMLInputElement).id
        ? { ...el, inputValue: (e.target as HTMLInputElement).value }
        : el
    );

    store.commit("updateGameState", { key: "currentFields", value: newFields });
  }

  updateSolutionCorrectness(isCorrect: boolean) {
    store.commit("updateGameState", {
      key: "isCurrentSolutionCorrect",
      value: isCorrect,
    });
  }

  checkSolution() {
    let isCorrect = false;

    const firstNumber = store.state.game.currentNumbers[0];
    const inputFields = store.state.game.currentFields.filter(
      (el) => el.inputValue
    );
    const inputNumbers = inputFields.map(
      (field) => +(field.inputValue as string)
    );

    inputNumbers.unshift(firstNumber);

    if (inputNumbers.length < store.state.game.currentNumbers.length) {
      this.updateSolutionCorrectness(isCorrect);
    }

    const inputResult = engine.calculateResult(
      inputNumbers,
      store.state.game.currentOperators
    );

    isCorrect = inputResult === store.state.game.currentAnswer;

    this.updateSolutionCorrectness(isCorrect);
  }
}

export const fieldsManager = new FieldManager();
