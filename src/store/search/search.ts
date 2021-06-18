import { SearchState } from "./";
import { ActionContext } from "vuex";
import { State } from "@/store/state";
import actions from "./actions";
import mutations from "./mutations";
import { initialState } from "./searchState";

export type SearchContext = ActionContext<SearchState, State>;

export const search: {
  state: SearchState;
  mutations: any;
  getters: any;
  actions: any;
} = {
  state: initialState,
  getters: {
    getSearchTerm: (state: SearchState) => state.term,
    getSearchHeadlines: (state: SearchState) => state.headlines,
    getSearchSentiment: (state: SearchState) => state.sentiment,
    getIsAllSearchHeadlines: (state: SearchState) =>
      state.count < state.page * state.limit,
    getSearchCount: (state: SearchState) => state.count
  },
  mutations,
  actions
};
