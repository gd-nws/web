import { GetterTree } from "vuex";
import { Theme, ThemeState } from "./state";

export interface ThemeGetters {
  getTheme(State: ThemeState): Theme;
}

export const getters: GetterTree<ThemeState, ThemeState> & ThemeGetters = {
  getTheme: (state: ThemeState): Theme => state.theme
};

export default getters;
