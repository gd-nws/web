<template lang="pug">
  div#app(
    :style="theme"
  )
    Navigation
    TitleContainer
    router-view
    FooterContainer
    Notification
</template>

<style>
#app {
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  transition: var(--transition);
}

a {
  color: var(--colors-info);
  font-weight: 700;
  text-decoration: none;
}

a:hover {
  color: var(--colors-info-dark);
}

body {
  margin: 0;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import TitleContainer from "@/components/Title/TitleContainer.vue";
import Navigation from "@/components/Nav/Navigation.vue";
import FooterContainer from "@/components/Footer/FooterContainer.vue";
import { Sentiment } from "@/store/headlines";
import Notification from "@/components/Notification/Notification.vue";
import { Theme } from "./store/theme";

const metaDataDescription =
  "A machine learning approach to sorting headlines by the positivity or negativity.";

@Component({
  components: { Notification, FooterContainer, Navigation, TitleContainer },
  metaInfo: {
    meta: [
      // OpenGraph data (Most widely used)
      { property: "og:title", content: "Good News!" },
      { property: "og:site_name", content: "Good News!" },
      { property: "og:type", content: "website" },
      // Should the the same as your canonical link, see below.
      {
        property: "og:url",
        content: "https://gdnws.co.uk"
      },
      // Often the same as your meta description, but not always.
      {
        property: "og:description",
        content: metaDataDescription
      }
    ]
  }
})
export default class App extends Vue {
  async mounted() {
    await this.$store.dispatch("fetchSession");
    const path = this.$route.path;

    if (path === "/") {
      await this.$router.push({
        path: "/headlines",
        query: {
          date: new Date().toISOString().split("T")[0],
          sentiment: Sentiment.POSITIVE
        }
      });
    }
  }

  get theme() {
    const theme = this.$store.getters.getTheme as Theme;
    return {
      "--colors-info": theme.colors.info,
      "--colors-info-dark": theme.colors.infoDark,
      "--transition": theme.transition,
      "--font": theme.font
    };
  }
}
</script>
