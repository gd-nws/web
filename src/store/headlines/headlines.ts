import { HeadlineAPI } from "@/api/HeadlineAPI";
import { State } from "@/store/state";
import { ActionContext } from "vuex";
import { Headline, HeadlineState } from "@/store/headlines/headlineState";

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
    sentiment: sentimentValues.POSITIVE,
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

    updateSentiment: async (
      context: HeadlineContext,
      { sentiment }: { sentiment: string }
    ) => {
      context.commit("setSentiment", sentiment);
      context.commit("setTitle", { sentiment });
      context.commit("resetHeadlinePage");
      context.commit("clearHeadlines");
      context.commit("setIsAllHeadlines", { isAllHeadlines: false });
      await context.dispatch("fetchHeadlines");
    },

    updateHeadlineDate: async (
      context: HeadlineContext,
      { incrementValue }: { incrementValue: number }
    ) => {
      let newDate: Date;
      const oldDate: Date = context.getters.getLastHeadlineDate;
      if (incrementValue > 0) {
        newDate = new Date(oldDate.setDate(oldDate.getDate() + 1));
      } else {
        newDate = new Date(oldDate.setDate(oldDate.getDate() - 1));
      }

      context.commit("resetHeadlinePage");
      context.commit("clearHeadlines");
      context.commit("setIsAllHeadlines", { isAllHeadlines: false });
      context.commit("setDate", { date: newDate });
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
    setSentiment: (state: HeadlineState, sentiment: string): void => {
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
