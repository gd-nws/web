import { HeadlineAPI } from "@/api/HeadlineAPI";
import { fetchOrCreateSession } from "../session/actions";
import { HeadlineContext } from "./headlines";
import { Sentiment, Headline } from "./headlineState";

export default {
  fetchHeadlines: async (context: HeadlineContext) => {
    const headlineAPI = new HeadlineAPI();
    const limit = context.getters.getHeadlineLimit;
    const page = context.getters.getHeadlinePage;
    const token = await fetchOrCreateSession(context);

    const { count, headlines } = await headlineAPI.getHeadlines(
      context.getters.getSentiment,
      limit,
      page,
      context.getters.getLastHeadlineDate,
      token
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
    let headline: Headline | undefined;
    const token = await fetchOrCreateSession(context);

    try {
      headline = await new HeadlineAPI().getHeadline(id, token);
    } catch (error) {
      // TODO: Handle error.
    }

    context.commit("setSelectedHeadline", { headline });
  }
};
