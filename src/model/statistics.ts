export interface IStatisticsModel {
  lastRoundQuestions: number;
  lastRoundCorrectAnswers: number;
  totalQuestions: number;
  totalCorrectAnswers: number;
  firstGameTimestamp: number;
}

export default {
  state: {
    lastRoundQuestions: 0,
    lastRoundCorrectAnswers: 0,
    totalQuestions: 0,
    totalCorrectAnswers: 0,
    firstGameTimestamp: 0,
  },
  mutations: {
    updateStatisticsState<
      STATE extends IStatisticsModel,
      KEY extends keyof STATE
    >(state: STATE, payload: { key: KEY; value: STATE[KEY] }) {
      state[payload.key] = payload.value;
    },
  },
};
