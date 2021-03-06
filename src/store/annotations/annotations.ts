import {
  Annotation,
  AnnotationsState
} from "@/store/annotations/annotationsState";
import { ActionContext } from "vuex";
import { State } from "@/store/state";
import { AnnotationsAPI } from "@/api/AnnotationsAPI";
import { sentimentValues } from "@/store/headlines";
import { MessageLevel } from "@/store/notification";

type AnnotationsContext = ActionContext<AnnotationsState, State>;

export const annotations = {
  state: {
    annotations: []
  },

  mutations: {
    setAnnotations: (
      state: AnnotationsState,
      { annotations }: { annotations: Annotation[] }
    ) => {
      state.annotations = annotations;
    },
    addAnnotation: (
      state: AnnotationsState,
      payload: { headlineId: number; annotation: string }
    ) => {
      let vote;
      switch (payload.annotation) {
        case sentimentValues.POSITIVE:
          vote = 1;
          break;
        case sentimentValues.NEGATIVE:
          vote = -1;
          break;
        default:
          throw new Error("Invalid sentiment type");
      }

      state.annotations.push({ headlineId: payload.headlineId, vote });
    }
  },

  getters: {
    getAnnotations: (state: AnnotationsState) => state.annotations
  },

  actions: {
    annotateHeadline: async (
      context: AnnotationsContext,
      payload: { annotation: string; headlineId: number }
    ) => {
      const sessionToken = context.getters.getSession;
      if (!sessionToken) {
        return;
      }

      const annotationsAPI = new AnnotationsAPI();
      let notificationMessage: string | undefined = undefined;
      let messageLevel = MessageLevel.Info;
      try {
        await annotationsAPI.annotateHeadline(
          payload.annotation,
          payload.headlineId,
          sessionToken
        );
      } catch (e) {
        notificationMessage = "Could not annotate headline.";
        messageLevel = MessageLevel.Error;
      }

      if (!notificationMessage) {
        notificationMessage = "Annotated headline";
      }

      await context.dispatch("displayNotification", {
        message: notificationMessage,
        messageLevel,
        timeout: 3000
      });

      context.commit("addAnnotation", {
        annotation: payload.annotation,
        headlineId: payload.headlineId
      });
    }
  }
};
