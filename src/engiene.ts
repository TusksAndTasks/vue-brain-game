import { flagsEnum, IFlags } from "@/store";

const operatorsMap = {
  [flagsEnum.SUM]: "+",
  [flagsEnum.SUBSTR]: "-",
  [flagsEnum.MUL]: "*",
  [flagsEnum.DIV]: "/",
  [flagsEnum.POW]: "^",
};

class Engine {
  numbersGenerator(amount: number) {
    const numbersArray = [];
    for (let i = 0; i <= amount; i++) {
      const randomNum = Math.floor(Math.random() * 10);
      numbersArray.push(randomNum);
    }
    console.log(numbersArray);
    return numbersArray;
  }

  operatorsGenerator(flags: IFlags, amount: number) {
    const availableOperators = this.declareAvailableOperators(flags);
    const operatorsArray = [];

    for (let i = 0; i < amount; i++) {
      operatorsArray.push(
        availableOperators[
          Math.floor(Math.random() * availableOperators.length)
        ]
      );
    }
    console.log(operatorsArray);
    return operatorsArray;
  }

  declareAvailableOperators(flags: IFlags) {
    const availableOperators = [] as Array<string>;
    Object.entries(flags).map(([flag, value]) => {
      if (value) {
        availableOperators.push(operatorsMap[flag as keyof IFlags]);
      }
    });
    return availableOperators;
  }

  calculateResult(numbersArray: Array<number>, operatorsArray: Array<string>) {
    return numbersArray.reduce((previousValue, currentValue, currentIndex) => {
      switch (operatorsArray[currentIndex - 1]) {
        case "+":
          return previousValue + currentValue;
        case "-":
          return previousValue - currentValue;
        case "/":
          return previousValue / currentValue;
        case "*":
          return previousValue * currentValue;
        case "^":
          return previousValue ** currentValue;
        default:
          return previousValue;
      }
    });
  }
}

export const test = new Engine();
