import { createStore } from "vuex";
import declareAvailableOperators from "@/utils/declareAvailableOperators";
import { flagsEnum } from "@/engiene";
import settings, { ISettingsState } from "@/store/settings";
import game, { IGameState } from "@/store/game";

interface IStore {
  settings: ISettingsState;
  game: IGameState;
}

export type FlagsType = {
  [key in flagsEnum]: boolean;
};

export interface IGameField {
  id: number;
  value: string;
  inputValue?: string;
}

export default createStore<IStore>({
  state: {} as IStore,
  getters: {
    getActiveFlagsAmount() {
      return declareAvailableOperators(settings.state.flags).length;
    },
  },
  mutations: {
    updateState<STATE extends IStore, KEY extends keyof STATE>(
      state: STATE,
      payload: { key: KEY; value: STATE[KEY] }
    ) {
      state[payload.key] = payload.value;
    },
  },
  modules: { settings, game },
});
