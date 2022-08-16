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

  fieldUpdater(newValue: string) {
    return function () {
      const newFields = store.state.game.currentFields.map((el) => {
        if (el.id == store.state.game.focusedFieldId) {
          const newFieldContent =
            newValue.length > 1 ||
            newValue.length < (el.inputValue as string).length
              ? newValue
              : el.inputValue + newValue.slice(-1);
          return {
            ...el,
            inputValue: newFieldContent,
          };
        }
        return el;
      });

      store.commit("updateGameState", {
        key: "currentFields",
        value: newFields,
      });
    };
  }

  updateSolutionCorrectness(isCorrect: boolean) {
    store.commit("updateGameState", {
      key: "isCurrentSolutionCorrect",
      value: isCorrect,
    });
  }

  changeFocusedField(focusId: number) {
    store.commit("updateGameState", { key: "focusedFieldId", value: focusId });
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

  switchFocus(newFocusedElement: HTMLInputElement) {
    fieldsManager.changeFocusedField(+newFocusedElement.id);
  }

  changeInputValue(focusedInput: HTMLInputElement) {
    fieldsManager.fieldUpdater(focusedInput.value)();
  }
}

export const fieldsManager = new FieldManager();
