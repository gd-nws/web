<template lang="pug">
    div#headline-container.has-text-left
        div.container
            SentimentSelector.selector(
                @sentiment-selected="handleSelection($event)"
            )
            HeadlineContainer(
                v-for="headline in headlines",
                :key="headline.id"
                :headline="headline"
            )
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
    }
  },
  mounted() {
    this.$store.dispatch("fetchHeadlines");
  },
  methods: {
    handleSelection: function(event) {
      this.$store.dispatch("updateSentiment", { sentiment: event });
    }
  }
};
</script>

<style scoped>
.selector {
  margin-bottom: 2.5%;
}
</style>
