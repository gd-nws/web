<template lang="pug">
  div#app
    Navigation
    TitleContainer
    router-view
    FooterContainer
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import TitleContainer from "@/components/Title/TitleContainer";
import Navigation from "@/components/Nav/Navigation";
import FooterContainer from "@/components/Footer/FooterContainer";

const metaDataDescription =
  "A machine learning approach to sorting headlines by the positivity or negativity.";

@Component({
  components: { FooterContainer, Navigation, TitleContainer },
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
      },

      // Twitter card
      {
        name: "twitter:card",
        content: "summary"
      },
      {
        name: "twitter:site",
        content: "https://gdnws.co.uk"
      },
      { name: "twitter:title", content: "Good News!" },
      {
        name: "twitter:description",
        content: metaDataDescription
      },
      { name: "twitter:creator", content: "@wel__shy" },

      // Google / Schema.org markup:
      { itemprop: "name", content: "Good News!" },
      {
        itemprop: "description",
        content: metaDataDescription
      }
    ]
  }
})
export default class App extends Vue {
  async mounted() {
    await this.$store.dispatch("fetchSession");
  }
}
</script>
