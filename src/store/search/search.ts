import { SearchState } from "./searchState";
import { ActionContext } from "vuex";
import { State } from "@/store/state";
import { HeadlineAPI } from "@/api/HeadlineAPI";
import { Headline, Sentiment } from "@/store/headlines";

type SearchContext = ActionContext<SearchState, State>;

export const search: {
  state: SearchState;
  mutations: any;
  getters: any;
  actions: any;
} = {
  state: {
    term: undefined,
    headlines: [],
    page: 1,
    limit: 10,
    count: 0,
    sentiment: Sentiment.POSITIVE,
    isAllSearchHeadlines: false
  },
  getters: {
    getSearchTerm: (state: SearchState) => state.term,
    getSearchHeadlines: (state: SearchState) => state.headlines,
    getSearchSentiment: (state: SearchState) => state.sentiment,
    getIsAllSearchHeadlines: (state: SearchState) =>
      state.count < state.page * state.limit,
    getSearchCount: (state: SearchState) => state.count
  },
  mutations: {
    incrementSearchPage: (state: SearchState) => {
      state.page++;
    },
    setSearchPage: (state: SearchState, { page }: { page: number }) => {
      state.page = page;
    },
    setSearchTerm: (state: SearchState, { term }: { term: string }) => {
      state.term = term;
    },
    setSearchCount: (state: SearchState, { count }: { count: number }) => {
      state.count = count;
    },
    setSearchHeadlines: (
      state: SearchState,
      { headlines }: { headlines: Headline[] }
    ) => {
      state.headlines = headlines;
    },
    setSearchSentiment: (
      state: SearchState,
      { sentiment }: { sentiment: Sentiment }
    ) => {
      state.sentiment = sentiment;
    }
  },
  actions: {
    searchHeadlines: async (
      context: SearchContext,
      { term, sentiment }: { term: string; sentiment: Sentiment }
    ) => {
      context.commit("setSearchTerm", { term });
      if (sentiment !== context.getters.getSearchSentiment) {
        context.commit("setSearchSentiment", { sentiment });
        context.commit("setSearchHeadlines", { headlines: [] });
        context.commit("setSearchPage", { page: 0 });
      }

      if (!term) {
        context.commit("setSearchCount", { count: 0 });
        context.commit("setSearchHeadlines", { headlines: [] });
        return;
      }

      const api = new HeadlineAPI();
      const { count, headlines } = await api.searchHeadlines(
        term,
        context.state.limit,
        context.state.page,
        sentiment
      );

      context.commit("setSearchCount", { count });
      context.commit("setSearchHeadlines", { headlines });
      context.commit("setSearchCount", { count });
    },

    fetchNextSearchPage: async (context: SearchContext) => {
      const api = new HeadlineAPI();
      const response = await api.searchHeadlines(
        context.getters.getSearchTerm,
        context.state.limit,
        context.state.page + 1,
        context.getters.getSearchSentiment
      );

      const { headlines } = response;
      context.commit("incrementSearchPage");
      context.commit("setSearchHeadlines", {
        headlines: context.getters.getSearchHeadlines.concat(headlines)
      });
    }
  }
};
