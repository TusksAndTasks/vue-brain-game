import store from "@/store";

class StatisticsController {
  updateQuestionsCount() {
    store.commit("updateStatisticsState", {
      key: "lastRoundQuestions",
      value: store.state.statistics.lastRoundQuestions + 1,
    });
    store.commit("updateStatisticsState", {
      key: "totalQuestions",
      value: store.state.statistics.totalQuestions + 1,
    });
  }

  updateCorrectAnswersCount(isCorrect: boolean) {
    if (isCorrect) {
      store.commit("updateStatisticsState", {
        key: "lastRoundCorrectAnswers",
        value: store.state.statistics.lastRoundCorrectAnswers + 1,
      });
      store.commit("updateStatisticsState", {
        key: "totalCorrectAnswers",
        value: store.state.statistics.totalCorrectAnswers + 1,
      });
    }
  }

  resetLastRoundStatistics() {
    store.commit("updateStatisticsState", {
      key: "lastRoundQuestions",
      value: 0,
    });
    store.commit("updateStatisticsState", {
      key: "lastRoundCorrectAnswers",
      value: 0,
    });
  }
}

export const statisticsController = new StatisticsController();
