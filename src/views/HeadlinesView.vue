<template lang="pug">
    div#headlines-view.has-text-left
        div.container
            SentimentSelector.selector(
                @sentiment-selected="handleSelection($event)"
            )
            HeadlineDate
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
                h3.is-size-3 No headlines found for {{headlineDate}}!
</template>

<script>
import HeadlineContainer from "@/components/Headlines/HeadlineContainer.vue";
import SentimentSelector from "@/components/Sentiment/SentimentSelector";
import HeadlineDate from "@/components/Headlines/HeadlineDate";

export default {
  name: "HeadlinesView",
  components: { HeadlineDate, SentimentSelector, HeadlineContainer },
  computed: {
    headlines() {
      return this.$store.getters.getHeadlines;
    },
    isAllHeadlines() {
      return this.$store.getters.getIsAllHeadlines;
    },
    headlineDate() {
      return this.$store.getters.getLastHeadlineDate.toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      );
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
