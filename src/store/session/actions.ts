import { SessionAPI } from "@/api/SessionAPI";
import { HeadlineContext } from "../headlines";
import { SearchContext } from "../search/search";
import { SessionContext } from "./session";

interface SessionPayload {
  sessionToken: string;
  storedDate: Date;
}

export const fetchOrCreateSession = async (
  context: HeadlineContext | SearchContext
): Promise<string> => {
  let token: string = context.getters.getSession;
  if (!token) {
    await context.dispatch("fetchSession");
    token = context.getters.getSession;
  }

  return token;
};

export default {
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
};
