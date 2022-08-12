import { engine } from "@/engiene";
import store from "@/store";
import { fieldsManager } from "@/services/FieldManager";

class GameDataGenerator {
  #operatorsUpdater() {
    const operators = engine.generateOperators(
      store.state.flags,
      store.state.difficulty
    );
    store.commit("updateState", { key: "currentOperators", value: operators });
  }

  #numbersUpdater() {
    const numbers = engine.generateNumbers(
      store.state.difficulty,
      store.state.currentOperators
    );
    store.commit("updateState", { key: "currentNumbers", value: numbers });
  }

  #answerUpdater(answer: number) {
    store.commit("updateState", { key: "currentAnswer", value: answer });
  }

  logResult() {
    if (store.getters.getActiveFlagsAmount < 2 && store.state.difficulty > 3) {
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
      store.state.currentNumbers,
      store.state.currentOperators
    );
  }
}

export const gameDataGenerator = new GameDataGenerator();
