import { Headline, Sentiment } from "../headlines/headlineState";
import { SearchState } from "./searchState";

export default {
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
};
