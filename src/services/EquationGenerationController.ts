import declareAvailableOperators from "@/utils/declareAvailableOperators";
import checkIsPrimeNumber from "@/utils/checkIsPrimeNumber";

import { FlagsType } from "@/model";

export enum flagsEnum {
  SUM = "SUM",
  SUBSTR = "SUBSTR",
  MUL = "MUL",
  DIV = "DIV",
  POW = "POW",
}

interface ICaps {
  upperCap: number;
  lowerCap: number;
}

export type operatorsType = "+" | "-" | "/" | "*" | "^";

export const operatorsMap: Record<flagsEnum, operatorsType> = {
  [flagsEnum.SUM]: "+",
  [flagsEnum.SUBSTR]: "-",
  [flagsEnum.MUL]: "*",
  [flagsEnum.DIV]: "/",
  [flagsEnum.POW]: "^",
};

const functionsMap = {
  [operatorsMap[flagsEnum.SUM]]: (firstNum: number, secondNum: number) =>
    firstNum + secondNum,
  [operatorsMap[flagsEnum.SUBSTR]]: (firstNum: number, secondNum: number) =>
    firstNum - secondNum,
  [operatorsMap[flagsEnum.MUL]]: (firstNum: number, secondNum: number) =>
    firstNum * secondNum,
  [operatorsMap[flagsEnum.DIV]]: (firstNum: number, secondNum: number) =>
    firstNum / secondNum,
  [operatorsMap[flagsEnum.POW]]: (firstNum: number, secondNum: number) =>
    firstNum ** secondNum,
};

class EquationGenerationController {
  constructor() {
    this.currentResult = 0;
    this.numbersCreatorsMap = {
      [operatorsMap[flagsEnum.SUM]]: ({ upperCap, lowerCap }: ICaps) =>
        this.#generateRandomNumber(upperCap, lowerCap),
      [operatorsMap[flagsEnum.SUBSTR]]: ({ upperCap, lowerCap }: ICaps) =>
        this.#generateRandomNumber(upperCap, lowerCap),
      [operatorsMap[flagsEnum.MUL]]: ({ upperCap, lowerCap }: ICaps) =>
        this.#generateRandomNumber(upperCap, lowerCap),
      [operatorsMap[flagsEnum.DIV]]: ({ upperCap, lowerCap }: ICaps) =>
        this.#generateDividableNumber(upperCap, lowerCap, this.currentResult),
      [operatorsMap[flagsEnum.POW]]: ({ upperCap, lowerCap }: ICaps) => {
        return this.currentResult < 1000000000
          ? this.#generateRandomNumber(upperCap, lowerCap)
          : 0;
      },
    };
    this.numbersCapsMap = {
      [operatorsMap[flagsEnum.SUM]]: { upperCap: 10, lowerCap: 0 },
      [operatorsMap[flagsEnum.SUBSTR]]: { upperCap: 10, lowerCap: 0 },
      [operatorsMap[flagsEnum.MUL]]: { upperCap: 10, lowerCap: 1 },
      [operatorsMap[flagsEnum.DIV]]: { upperCap: 11, lowerCap: 3 },
      [operatorsMap[flagsEnum.POW]]: { upperCap: 4, lowerCap: 1 },
    };
  }

  currentResult: number;
  numbersCreatorsMap: Record<string, (args: ICaps) => number>;
  numbersCapsMap: Record<string, ICaps>;

  #generateNotAPrimeNumber(upperCap: number, lowerCap: number) {
    const number = this.#generateRandomNumber(upperCap, lowerCap);

    return checkIsPrimeNumber(number) ? number + 1 : number;
  }

  #generateRandomNumber(upperCap: number, lowerCap = 0) {
    return Math.floor(Math.random() * (upperCap - lowerCap) + lowerCap);
  }

  #generateDividableNumber(
    upperCap: number,
    lowerFloatingCap: number,
    currentResult: number
  ): number {
    const lowerCap = this.#generateRandomNumber(lowerFloatingCap, 1);
    const number = this.#generateRandomNumber(upperCap, lowerCap);

    if (currentResult % number === 0) {
      return number;
    }
    return this.#generateDividableNumber(
      upperCap,
      lowerFloatingCap,
      currentResult
    );
  }

  generateNumbers(amount: number, operators: Array<operatorsType>) {
    const startNumber =
      operators[0] === operatorsMap[flagsEnum.DIV]
        ? this.#generateNotAPrimeNumber(100, 10)
        : this.#generateRandomNumber(20, 1);
    const numbersArray = [startNumber];

    this.currentResult = startNumber;

    for (let i = 1; i <= amount; i++) {
      const currentOperator = operators[i - 1];
      const createNewNumber = (operator: operatorsType) => {
        return this.numbersCreatorsMap[operator](this.numbersCapsMap[operator]);
      };
      const newNumber = createNewNumber(currentOperator);

      this.currentResult = functionsMap[currentOperator](
        this.currentResult,
        newNumber
      );

      numbersArray.push(newNumber);
    }

    return numbersArray;
  }

  generateOperators(flags: FlagsType, amount: number) {
    const availableOperators = declareAvailableOperators(flags);
    const operatorsArray = [];

    for (let i = 0; i < amount; i++) {
      const randomOperatorIndex = this.#generateRandomNumber(
        availableOperators.length
      );
      operatorsArray.push(availableOperators[randomOperatorIndex]);
    }

    return operatorsArray;
  }

  calculateResult(numbersArray: Array<number>, operatorsArray: Array<string>) {
    return numbersArray.reduce((previousValue, currentValue, currentIndex) => {
      const currentOperator = operatorsArray[currentIndex - 1];
      const currentOperation = functionsMap[currentOperator];
      return currentOperation(previousValue, currentValue);
    });
  }
}

export const equationGenerationController = new EquationGenerationController();
