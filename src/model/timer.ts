export interface ITimeModel {
  displayTime: string;
}

export default {
  state: {
    displayTime: "",
  },
  mutations: {
    updateTimerState<STATE extends ITimeModel, KEY extends keyof STATE>(
      state: STATE,
      payload: { key: KEY; value: STATE[KEY] }
    ) {
      state[payload.key] = payload.value;
    },
  },
};
