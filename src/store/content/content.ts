import { ContentState } from "@/store/content/contentState";
import { sentimentValues } from "@/store/headlines";

const titleValues = {
  positive: {
    title: "Good News!",
    subtitle: "Ignorance is bliss."
  },
  negative: {
    title: "Bad News!",
    subtitle: "Everything is awful."
  }
};

export const content = {
  state: {
    ...titleValues.positive
  },

  mutations: {
    setTitle: (state: ContentState, { sentiment }: { sentiment: string }) => {
      switch (sentiment) {
        case sentimentValues.POSITIVE:
          state.title = titleValues.positive.title;
          state.subtitle = titleValues.positive.subtitle;
          break;
        case sentimentValues.NEGATIVE:
          state.title = titleValues.negative.title;
          state.subtitle = titleValues.negative.subtitle;
      }
    }
  },

  getters: {
    getTitle: (state: ContentState) => state.title,
    getSubtitle: (state: ContentState) => state.subtitle
  }
};
