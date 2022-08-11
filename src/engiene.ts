import { flagsEnum, FlagsType } from "@/store";

export interface INumberField {
  id: number;
  value: number;
}

const operatorsMap = {
  [flagsEnum.SUM]: "+",
  [flagsEnum.SUBSTR]: "-",
  [flagsEnum.MUL]: "*",
  [flagsEnum.DIV]: "/",
  [flagsEnum.POW]: "^",
};

const functionsMap = {
  [operatorsMap[flagsEnum.SUM]]: (firstNum: number, secondNum: number) => ({
    id: -100,
    value: firstNum + secondNum,
  }),
  [operatorsMap[flagsEnum.SUBSTR]]: (firstNum: number, secondNum: number) => ({
    id: -100,
    value: firstNum - secondNum,
  }),
  [operatorsMap[flagsEnum.MUL]]: (firstNum: number, secondNum: number) => ({
    id: -100,
    value: firstNum * secondNum,
  }),
  [operatorsMap[flagsEnum.DIV]]: (firstNum: number, secondNum: number) => ({
    id: -100,
    value: firstNum / secondNum,
  }),
  [operatorsMap[flagsEnum.POW]]: (firstNum: number, secondNum: number) => ({
    id: -100,
    value: firstNum ** secondNum,
  }),
};

class Engine {
  generateNumbers(amount: number, operators: Array<string>) {
    const startField = {
      id: 1,
      value:
        operators[0] === operatorsMap[flagsEnum.DIV]
          ? Engine.#generateNotAPrimeNumber(100, 10)
          : Engine.#generateRandomNumber(20, 1),
    };
    const numbersArray = [startField] as Array<INumberField>;

    let currentResult = startField.value;

    for (let i = 1; i <= amount; i++) {
      let number: number;

      if (operators[i - 1] === operatorsMap[flagsEnum.DIV]) {
        number = this.#generateDividableNumber(currentResult);
      } else if (operators[i - 1] === operatorsMap[flagsEnum.POW]) {
        number =
          currentResult < 1000000000 ? Engine.#generateRandomNumber(4, 1) : 0;
      } else if (operators[i - 1] === operatorsMap[flagsEnum.MUL]) {
        number = Engine.#generateRandomNumber(10, 1);
      } else {
        number = Engine.#generateRandomNumber(10, 0);
      }

      currentResult = functionsMap[operators[i - 1]](
        currentResult,
        number
      ).value;

      numbersArray.push({
        id: i + 1,
        value: number,
      });
    }
    console.log(numbersArray);
    return numbersArray;
  }

  static #generateNotAPrimeNumber(upperCap: number, lowerCap: number) {
    const number = Engine.#generateRandomNumber(upperCap, lowerCap);

    return Engine.#isPrime(number) ? number + 1 : number;
  }

  static #isPrime(num: number) {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
      if (num % i === 0) return false;
    return num > 1;
  }

  #generateDividableNumber(currentResult: number): number {
    const number = Engine.#generateRandomNumber(
      11,
      Engine.#generateRandomNumber(3, 1)
    );
    if (currentResult % number === 0) {
      return number;
    } else {
      return this.#generateDividableNumber(currentResult);
    }
  }

  static #generateRandomNumber(upperCap: number, lowerCap = 0) {
    return Math.floor(Math.random() * (upperCap - lowerCap) + lowerCap);
  }

  generateOperators(flags: FlagsType, amount: number) {
    const availableOperators = this.declareAvailableOperators(flags);

    if (availableOperators.length <= 1 && amount > 3) {
      return;
    }

    const operatorsArray = [];

    for (let i = 0; i < amount; i++) {
      operatorsArray.push(
        availableOperators[
          Engine.#generateRandomNumber(availableOperators.length)
        ]
      );
    }
    console.log(operatorsArray);
    return operatorsArray;
  }

  declareAvailableOperators(flags: FlagsType) {
    const availableOperators = [] as Array<string>;
    Object.entries(flags).forEach(([flag, value]) => {
      if (value) {
        availableOperators.push(operatorsMap[flag as keyof FlagsType]);
      }
    });
    return availableOperators;
  }

  calculateResult(
    numbersArray: Array<INumberField>,
    operatorsArray: Array<string>
  ) {
    return numbersArray.reduce((previousValue, currentValue, currentIndex) => {
      const currentOperator = operatorsArray[currentIndex - 1];
      const currentOperation = functionsMap[currentOperator];
      return currentOperation(previousValue.value, currentValue.value);
    });
  }
}

export const test = new Engine();
