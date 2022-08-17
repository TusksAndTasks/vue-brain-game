import model from "@/model";

class StatisticsController {
  updateQuestionsCount() {
    model.commit("updateStatisticsState", {
      key: "lastRoundQuestions",
      value: model.state.statistics.lastRoundQuestions + 1,
    });
    model.commit("updateStatisticsState", {
      key: "totalQuestions",
      value: model.state.statistics.totalQuestions + 1,
    });
  }

  updateCorrectAnswersCount(isCorrect: boolean) {
    if (isCorrect) {
      model.commit("updateStatisticsState", {
        key: "lastRoundCorrectAnswers",
        value: model.state.statistics.lastRoundCorrectAnswers + 1,
      });
      model.commit("updateStatisticsState", {
        key: "totalCorrectAnswers",
        value: model.state.statistics.totalCorrectAnswers + 1,
      });
    }
  }

  resetLastRoundStatistics() {
    model.commit("updateStatisticsState", {
      key: "lastRoundQuestions",
      value: 0,
    });
    model.commit("updateStatisticsState", {
      key: "lastRoundCorrectAnswers",
      value: 0,
    });
  }
}

export const statisticsController = new StatisticsController();
