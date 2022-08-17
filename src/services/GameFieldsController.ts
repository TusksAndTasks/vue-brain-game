import model, { IGameField } from "@/model";
import { equationController } from "@/services/EquationController";

class GameFieldsController {
  createFields() {
    const { currentNumbers, currentOperators } = model.state.game;

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

    equationController.updateSolutionCorrectness(false);
    model.commit("updateGameState", {
      key: "currentFields",
      value: gameFields,
    });
  }

  updateField(newValue: string) {
    return function () {
      const newFields = model.state.game.currentFields.map((el) => {
        if (el.id == model.state.game.focusedFieldId) {
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

      model.commit("updateGameState", {
        key: "currentFields",
        value: newFields,
      });
    };
  }

  changeFieldOnInput() {
    return (focusedInput: HTMLInputElement) => {
      this.updateField(focusedInput.value)();
    };
  }

  #changeFocusedField(focusId: number) {
    model.commit("updateGameState", { key: "focusedFieldId", value: focusId });
  }

  #checkFocusFieldId(focusFieldId: number) {
    return (
      focusFieldId < model.state.game.currentFields.length && focusFieldId > 1
    );
  }

  focusOnNeighbor(focusFieldId: number) {
    return () => {
      if (this.#checkFocusFieldId(focusFieldId)) {
        this.#changeFocusedField(focusFieldId);
      }
    };
  }

  focusOnClickedField() {
    return (newFocusedElement: HTMLInputElement) => {
      this.#changeFocusedField(+newFocusedElement.id);
    };
  }
}

export const gameFieldsController = new GameFieldsController();
