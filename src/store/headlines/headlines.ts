import { HeadlineAPI } from "@/api/HeadlineAPI";
import { State } from "@/store/state";
import { ActionContext } from "vuex";
import {
  Headline,
  HeadlineState,
  Sentiment
} from "@/store/headlines/headlineState";

type HeadlineContext = ActionContext<HeadlineState, State>;

export const sentimentValues = {
  POSITIVE: "positive",
  NEGATIVE: "negative"
};

export const headlines: {
  state: HeadlineState;
  actions: any;
  mutations: any;
  getters: any;
} = {
  state: {
    headlines: [],
    sentiment: Sentiment.POSITIVE,
    lastDate: new Date(),
    limit: 10,
    page: 1,
    isAllHeadlines: false,
    selectedHeadline: undefined
  },

  actions: {
    fetchHeadlines: async (context: HeadlineContext) => {
      const headlineAPI = new HeadlineAPI();
      const limit = context.getters.getHeadlineLimit;
      const page = context.getters.getHeadlinePage;
      const { count, headlines } = await headlineAPI.getHeadlines(
        context.getters.getSentiment,
        limit,
        page,
        context.getters.getLastHeadlineDate
      );

      if (count < page * limit) {
        context.commit("setIsAllHeadlines", { isAllHeadlines: true });
      }

      context.commit("updateHeadlines", headlines);
      context.commit("incrementHeadlinePage");
    },

    updateHeadlineContext: async (
      context: HeadlineContext,
      {
        sentiment,
        date
      }: {
        sentiment: Sentiment;
        date?: Date;
      }
    ): Promise<void> => {
      const s = Object.values(Sentiment).includes(sentiment);
      if (!s) {
        return;
      }

      if (!date) {
        date = new Date();
      }

      context.commit("setSentiment", sentiment);
      context.commit("setTitle", { sentiment });
      context.commit("resetHeadlinePage");
      context.commit("clearHeadlines");
      context.commit("setIsAllHeadlines", { isAllHeadlines: false });
      context.commit("setDate", { date });

      await context.dispatch("fetchHeadlines");
    },

    fetchHeadline: async (context: HeadlineContext, { id }: { id: number }) => {
      let headline;
      try {
        headline = await new HeadlineAPI().getHeadline(id);
      } catch (error) {
        // TODO: Handle error.
      }

      context.commit("setSelectedHeadline", { headline });
    }
  },

  mutations: {
    updateHeadlines: (state: HeadlineState, headlines: Headline[]): void => {
      state.headlines = state.headlines.concat(headlines);
    },
    clearHeadlines: (state: HeadlineState): void => {
      state.headlines = [];
    },
    setSentiment: (state: HeadlineState, sentiment: Sentiment): void => {
      state.sentiment = sentiment;
    },
    setDate: (state: HeadlineState, { date }: { date: Date }): void => {
      state.lastDate = date;
    },
    incrementHeadlinePage: (state: HeadlineState) => {
      state.page = state.page + 1;
    },
    resetHeadlinePage: (state: HeadlineState): void => {
      state.page = 1;
    },
    setIsAllHeadlines: (
      state: HeadlineState,
      { isAllHeadlines }: { isAllHeadlines: boolean }
    ): void => {
      state.isAllHeadlines = isAllHeadlines;
    },
    setSelectedHeadline: (
      state: HeadlineState,
      { headline }: { headline: Headline }
    ) => {
      state.selectedHeadline = headline;
    }
  },

  getters: {
    getHeadlines: (state: HeadlineState): Headline[] => state.headlines,
    getSentiment: (state: HeadlineState): string => state.sentiment,
    getHeadlineLimit: (state: HeadlineState): number => state.limit,
    getHeadlinePage: (state: HeadlineState): number => state.page,
    getLastHeadlineDate: (state: HeadlineState): Date => state.lastDate,
    getIsAllHeadlines: (state: HeadlineState): boolean => state.isAllHeadlines,
    getSelectedHeadline: (state: HeadlineState): Headline | undefined =>
      state.selectedHeadline
  }
};
