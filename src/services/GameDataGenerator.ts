import { engine } from "@/engiene";
import store from "@/store";
import { fieldsManager } from "@/services/FieldManager";
import declareAvailableOperators from "@/utils/declareAvailableOperators";
import settings from "@/store/settings";

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

  logResult() {
    if (
      declareAvailableOperators(store.state.settings.flags).length < 2 &&
      store.state.settings.difficulty > 3
    ) {
      return;
    } else {
      this.#answerUpdater(this.#calcRecurse());
      fieldsManager.fieldsCreator();
    }
  }

  #calcRecurse() {
    let result = this.#calc();
    if (result > 1000000 || result === 1) {
      result = this.#calcRecurse();
    }
    return result;
  }

  #calc() {
    this.#operatorsUpdater();
    this.#numbersUpdater();

    return engine.calculateResult(
      store.state.game.currentNumbers,
      store.state.game.currentOperators
    );
  }
}

export const gameDataGenerator = new GameDataGenerator();
