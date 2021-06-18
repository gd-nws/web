import { HeadlineAPI } from "@/api/HeadlineAPI";
import { Sentiment } from "../headlines";
import { SearchContext } from "./search";
import { fetchOrCreateSession } from "../session/actions";

export default {
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

    const token = await fetchOrCreateSession(context);

    const api = new HeadlineAPI();
    const { count, headlines } = await api.searchHeadlines(
      term,
      context.state.limit,
      context.state.page,
      sentiment,
      token
    );

    context.commit("setSearchCount", { count });
    context.commit("setSearchHeadlines", { headlines });
    context.commit("setSearchCount", { count });
  },

  fetchNextSearchPage: async (context: SearchContext) => {
    const api = new HeadlineAPI();
    const token = await fetchOrCreateSession(context);

    const response = await api.searchHeadlines(
      context.getters.getSearchTerm,
      context.state.limit,
      context.state.page + 1,
      context.getters.getSearchSentiment,
      token
    );

    const { headlines } = response;
    context.commit("incrementSearchPage");
    context.commit("setSearchHeadlines", {
      headlines: context.getters.getSearchHeadlines.concat(headlines)
    });
  }
};
