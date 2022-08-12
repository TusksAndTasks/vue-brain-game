import store, { IGameField } from "@/store";
import { engine } from "@/engiene";

class FieldManager {
  fieldsCreator() {
    const { currentNumbers, currentOperators } = store.state;

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
    store.commit("updateState", { key: "currentFields", value: gameFields });
  }

  fieldUpdater(e: Event) {
    console.log(123);
    const newFields = store.state.currentFields.map((el) =>
      el.id === +(e.target as HTMLInputElement).id
        ? { ...el, inputValue: (e.target as HTMLInputElement).value }
        : el
    );

    store.commit("updateState", { key: "currentFields", value: newFields });
  }

  updateSolutionCorrectness(isCorrect: boolean) {
    store.commit("updateState", {
      key: "isCurrentSolutionCorrect",
      value: isCorrect,
    });
  }

  checkSolution() {
    let isCorrect = false;

    const firstNumber = store.state.currentNumbers[0];
    const inputFields = store.state.currentFields.filter((el) => el.inputValue);
    const inputNumbers = inputFields.map(
      (field) => +(field.inputValue as string)
    );

    inputNumbers.unshift(firstNumber);

    if (inputNumbers.length < store.state.currentNumbers.length) {
      this.updateSolutionCorrectness(isCorrect);
    }

    const inputResult = engine.calculateResult(
      inputNumbers,
      store.state.currentOperators
    );

    isCorrect = inputResult === store.state.currentAnswer;

    this.updateSolutionCorrectness(isCorrect);
  }
}

export const fieldsManager = new FieldManager();
