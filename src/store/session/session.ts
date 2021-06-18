import { SessionState } from "@/store/session/sessionState";
import { ActionContext } from "vuex";
import { State } from "@/store/state";
import actions from "./actions";

export type SessionContext = ActionContext<SessionState, State>;

export const session = {
  state: {
    sessionToken: undefined
  },

  getters: {
    getSession: (state: SessionState): string => state.sessionToken
  },

  mutations: {
    setSession: (
      state: SessionState,
      { sessionToken }: { sessionToken: string }
    ) => {
      state.sessionToken = sessionToken;
    }
  },

  actions
};
