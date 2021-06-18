import { LightTheme, ThemeState } from "./state";
import getters from "./getters";

export * from "./state";

export const theme: {
  state: ThemeState;
  actions: any;
  mutations: any;
  getters: any;
} = {
  state: {
    theme: LightTheme
  },
  getters,
  actions: {},
  mutations: {}
};
