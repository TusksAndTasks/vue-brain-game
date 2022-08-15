import { createStore } from "vuex";
import { flagsEnum } from "@/engiene";
import settings, { ISettingsState } from "@/store/settings";
import game, { IGameState } from "@/store/game";
import timer, { ITimeState } from "@/store/timer";
import statistics, { IStatisticsState } from "@/store/statistics";

interface IStore {
  settings: ISettingsState;
  game: IGameState;
  timer: ITimeState;
  statistics: IStatisticsState;
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
  mutations: {
    retrieveSettings(state: IStore) {
      if (localStorage.getItem("settings")) {
        state.settings = JSON.parse(localStorage.getItem("settings") as string);
      }
    },
  },
  modules: { settings, game, timer, statistics },
});
