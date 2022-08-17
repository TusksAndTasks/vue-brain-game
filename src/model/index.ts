import { createStore } from "vuex";
import { flagsEnum } from "@/services/EquationGenerationController";
import settings, { ISettingsModel } from "@/model/settings";
import game, { IGameModel } from "@/model/game";
import timer, { ITimeModel } from "@/model/timer";
import statistics, { IStatisticsModel } from "@/model/statistics";

interface IModel {
  settings: ISettingsModel;
  game: IGameModel;
  timer: ITimeModel;
  statistics: IStatisticsModel;
}

export type FlagsType = {
  [key in flagsEnum]: boolean;
};

export interface IGameField {
  id: number;
  value: string;
  inputValue?: string;
}

export default createStore<IModel>({
  state: {} as IModel,
  mutations: {
    retrieveLocalState(state: IModel, key: keyof IModel) {
      if (localStorage.getItem("settings")) {
        state[key] = JSON.parse(localStorage.getItem(key) as string);
      }
    },
  },
  modules: { settings, game, timer, statistics },
});
