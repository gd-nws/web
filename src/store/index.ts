import Vue from "vue";
import Vuex from "vuex";
import { headlines } from "@/store/headlines";
import { content } from "@/store/content";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { content, headlines }
});
