import { SessionState } from "@/store/session/sessionState";
import { SessionAPI } from "@/api/SessionAPI";
import { ActionContext } from "vuex";
import { HeadlineState } from "@/store/headlines";
import { State } from "@/store/state";

type SessionContext = ActionContext<HeadlineState, State>;
interface SessionPayload {
  sessionToken: string;
  storedDate: Date;
}

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

  actions: {
    fetchSession: async (context: SessionContext) => {
      const rawStoredSession = localStorage.getItem("sessionToken");

      if (rawStoredSession) {
        const sessionPayload: SessionPayload = JSON.parse(rawStoredSession);
        if (
          new Date(sessionPayload.storedDate).getTime() >
          new Date().setDate(new Date().getDate() - 7)
        ) {
          context.commit("setSession", {
            sessionToken: sessionPayload.sessionToken
          });
          return;
        }
      }

      const sessionAPI = new SessionAPI();
      const sessionToken = await sessionAPI.fetchSession();

      context.commit("setSession", { sessionToken });

      localStorage.setItem(
        "sessionToken",
        JSON.stringify({ sessionToken, storedDate: new Date() })
      );
    }
  }
};
