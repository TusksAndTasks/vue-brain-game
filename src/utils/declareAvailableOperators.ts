import { FlagsType } from "@/store";
import { operatorsMap } from "@/engiene";

export default function declareAvailableOperators(flags: FlagsType) {
  const availableOperators = [] as Array<string>;
  Object.entries(flags).forEach(([flag, value]) => {
    if (value) {
      availableOperators.push(operatorsMap[flag as keyof FlagsType]);
    }
  });
  return availableOperators;
}
