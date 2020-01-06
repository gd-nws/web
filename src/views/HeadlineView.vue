<template lang="pug">
    div#headline-container.has-text-left
        div.container
            SentimentSelector.selector(
                @sentiment-selected="handleSelection($event)"
            )
            div(
              v-if="headlines.length > 0"
            )
              HeadlineContainer(
                  v-for="headline in headlines",
                  :key="headline.id"
                  :headline="headline"
              )
              div.has-text-centered.load-more(
                v-if="!isAllHeadlines"
              )
                button.button.is-info(
                  @click="handleLoadMore"
                ) Load more

            div.content(
              v-else
            )
              section.section
                h3.is-size-3 No headlines yet for today!
</template>

<script>
import HeadlineContainer from "@/components/Headlines/HeadlineContainer.vue";
import SentimentSelector from "@/components/Sentiment/SentimentSelector";

export default {
  name: "HeadlineView",
  components: { SentimentSelector, HeadlineContainer },
  computed: {
    headlines() {
      return this.$store.getters.getHeadlines;
    },
    isAllHeadlines() {
      return this.$store.getters.getIsAllHeadlines;
    }
  },
  async mounted() {
    await this.$store.dispatch("fetchHeadlines");
    await this.$store.dispatch("fetchSessionAnnotations");
  },
  methods: {
    handleSelection: async function(event) {
      await this.$store.dispatch("updateSentiment", { sentiment: event });
    },
    handleLoadMore: async function() {
      await this.$store.dispatch("fetchHeadlines");
    }
  }
};
</script>

<style scoped lang="scss">
.selector {
  margin-bottom: 2.5%;
}

.load-more {
  margin-bottom: 2.5%;
}
</style>
