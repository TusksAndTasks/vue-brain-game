export interface ITimeState {
  time: string;
}

export default {
  state: {
    time: "",
  },
  mutations: {
    updateTimerState<STATE extends ITimeState, KEY extends keyof STATE>(
      state: STATE,
      payload: { key: KEY; value: STATE[KEY] }
    ) {
      state[payload.key] = payload.value;
    },
  },
};
