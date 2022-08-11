import { engine } from "@/engiene";
import store from "@/store";

class GameDataGenerator {
  static #operatorsUpdater() {
    const operators = engine.generateOperators(
      store.state.flags,
      store.state.difficulty
    );
    store.commit("updateState", { key: "currentOperators", value: operators });
  }

  static #numbersUpdater() {
    const numbers = engine.generateNumbers(
      store.state.difficulty,
      store.state.currentOperators
    );
    store.commit("updateState", { key: "currentNumbers", value: numbers });
  }

  static #answerUpdater(answer: number) {
    store.commit("updateState", { key: "currentAnswer", value: answer });
  }

  logResult() {
    if (store.getters.getActiveFlagsAmount < 2 && store.state.difficulty > 3) {
      return;
    } else GameDataGenerator.#answerUpdater(this.#calcRecurse());
  }

  #calcRecurse() {
    let result = GameDataGenerator.#calc();
    if (result > 1000000 || result === 1) {
      result = this.#calcRecurse();
    }
    return result;
  }

  static #calc() {
    GameDataGenerator.#operatorsUpdater();
    GameDataGenerator.#numbersUpdater();

    return engine.calculateResult(
      store.state.currentNumbers,
      store.state.currentOperators
    );
  }
}

export const gameDataGenerator = new GameDataGenerator();
