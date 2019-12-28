import Vue from "vue";
import Vuex from "vuex";
import { headlines } from "@/store/headlines";
import { content } from "@/store/content";
import { session } from "@/store/session";
import { annotations } from "@/store/annotations";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { annotations, content, headlines, session }
});
