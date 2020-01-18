<template lang="pug">
    div#headlines-view.has-text-left
        div.container
            SentimentSelector.selector
            HeadlineDate(
              :startDate="selectedDate",
              @date-changed="handleDateChange($event)"
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
                h3.is-size-3 No headlines found for {{headlineDate}}!
</template>

<script lang="ts">
import HeadlineContainer from "@/components/Headlines/HeadlineContainer.vue";
import SentimentSelector from "@/components/Sentiment/SentimentSelector.vue";
import HeadlineDate from "@/components/Headlines/HeadlineDate.vue";

import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

@Component({
  components: { HeadlineDate, SentimentSelector, HeadlineContainer }
})
export default class HeadlinesView extends Vue {
  selectedDate: string = new Date().toISOString().split("T")[0];

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
  async onPropertyChanged(route: Route) {
    const { sentiment } = route.query;

    // Format date.
    let { date } = (route.query as unknown) as { date: Date | undefined };
    date = date ? new Date(date) : new Date();
    if (date > new Date()) {
      date = new Date();
    }

    this.selectedDate = date.toISOString().split("T")[0];

    await this.$store.dispatch("updateHeadlineContext", {
      date,
      sentiment
    });
  }

  async handleDateChange(date: string) {
    await this.$router.push({
      path: "/headlines",
      query: {
        date,
        sentiment: this.$store.getters.getSentiment
      }
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
