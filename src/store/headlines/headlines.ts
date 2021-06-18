import { State } from "@/store/state";
import { ActionContext } from "vuex";
import {
  Headline,
  HeadlineState,
  Sentiment
} from "@/store/headlines/headlineState";
import actions from "./actions";
import { initialState } from "./headlineState";

export type HeadlineContext = ActionContext<HeadlineState, State>;

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
  state: initialState,
  actions,
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
    getHeadline: (state: HeadlineState) => (
      headlineId: string
    ): Headline | undefined =>
      (state.headlines || []).find(({ id }) => id === headlineId),
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
