<template lang="pug">
    div#headlines-view.has-text-left
        div.container
            SentimentSelector.selector
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

import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  components: { HeadlineDate, SentimentSelector, HeadlineContainer }
})
export default class HeadlinesView extends Vue {
  get headlines() {
    return this.$store.getters.getHeadlines;
  }

  get isAllHeadlines() {
    return this.$store.getters.getIsAllHeadlines;
  }

  get headlineDate() {
    return this.$store.getters.getLastHeadlineDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  @Watch("$route", { immediate: true, deep: true })
  async onPropertyChanged(route) {
    const { sentiment } = route.query;

    // Format date.
    let { date } = route.query;
    date = date ? new Date(date) : new Date();
    if (date > new Date()) {
      date = new Date();
    }

    await this.$store.dispatch("updateHeadlineContext", {
      date,
      sentiment
    });
  }

  async handleLoadMore() {
    await this.$store.dispatch("fetchHeadlines");
  }
}
</script>

<style scoped lang="scss">
.selector {
  margin-bottom: 2.5%;
}

.load-more {
  margin-bottom: 2.5%;
}
</style>
