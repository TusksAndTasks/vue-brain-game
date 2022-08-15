import store from "@/store";
import { fieldsManager } from "@/services/FieldManager";

export function focusOnNeighbor(focusFieldId: number) {
  return function () {
    if (checkFocusFieldId(focusFieldId)) {
      fieldsManager.changeFocusedField(focusFieldId);
    }
  };
}

function checkFocusFieldId(focusFieldId: number) {
  return (
    focusFieldId < store.state.game.currentFields.length && focusFieldId > 1
  );
}
