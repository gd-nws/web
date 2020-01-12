import {
  MessageLevel,
  NotificationState
} from "@/store/notification/notificationState";
import { ActionContext } from "vuex";
import { State } from "@/store/state";

type NotificationContext = ActionContext<NotificationState, State>;

export const notification: {
  state: NotificationState;
  actions: any;
  mutations: any;
  getters: any;
} = {
  state: {
    message: "",
    isVisible: false,
    messageLevel: MessageLevel.Info,
    timeout: 0
  },
  actions: {
    displayNotification: (
      context: NotificationContext,
      {
        message,
        messageLevel,
        timeout
      }: { message: string; messageLevel: MessageLevel; timeout?: number }
    ) => {
      if (context.state.timeout) {
        clearTimeout(context.state.timeout);
      }

      context.commit("setNotificationMessage", { message });
      context.commit("setMessageLevel", { messageLevel });
      context.commit("setVisibility", { isVisible: true });

      if (timeout) {
        context.state.timeout = setTimeout(() => {
          context.commit("setVisibility", { isVisible: false });
        }, timeout);
      }
    },
    closeNotification: (context: NotificationContext) => {
      context.commit("setVisibility", { isVisible: false });
      if (context.state.timeout) {
        clearTimeout(context.state.timeout);
      }
    }
  },
  mutations: {
    setNotificationMessage: (
      state: NotificationState,
      { message }: { message: string }
    ) => (state.message = message),
    setVisibility: (
      state: NotificationState,
      { isVisible }: { isVisible: boolean }
    ) => (state.isVisible = isVisible),
    setMessageLevel: (
      state: NotificationState,
      { messageLevel }: { messageLevel: MessageLevel }
    ) => (state.messageLevel = messageLevel)
  },
  getters: {
    getNotificationMessage: (state: NotificationState) => state.message,
    getNotificationVisibility: (state: NotificationState) => state.isVisible,
    getNotificationLevel: (state: NotificationState) => state.messageLevel
  }
};
