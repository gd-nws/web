import { HeadlineAPI } from "@/api/HeadlineAPI";
import { State } from "@/store/state";
import { ActionContext } from "vuex";
import { Headline, HeadlineState } from "@/store/headlines/headlineState";

type HeadlineContext = ActionContext<HeadlineState, State>;

export const sentimentValues = {
  POSITIVE: "positive",
  NEGATIVE: "negative"
};

export const headlines = {
  state: {
    headlines: [],
    sentiment: sentimentValues.POSITIVE
  },

  actions: {
    fetchHeadlines: async (context: HeadlineContext) => {
      const headlineAPI = new HeadlineAPI();
      const headlines = await headlineAPI.getHeadlines(
        context.getters.getSentiment
      );

      context.commit("setHeadlines", headlines);
    },

    updateSentiment: async (
      context: HeadlineContext,
      { sentiment }: { sentiment: string }
    ) => {
      context.commit("setSentiment", sentiment);
      context.commit("setTitle", { sentiment });
      await context.dispatch("fetchHeadlines");
    }
  },

  mutations: {
    setHeadlines: (state: HeadlineState, headlines: Headline[]): void => {
      state.headlines = headlines;
    },
    setSentiment: (state: HeadlineState, sentiment: string): void => {
      state.sentiment = sentiment;
    }
  },

  getters: {
    getHeadlines: (state: HeadlineState): Headline[] => state.headlines,
    getSentiment: (state: HeadlineState): string => state.sentiment
  }
};
