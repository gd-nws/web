<template lang="pug">
    div#headlines-view
        Container
            div.headline-filter-wrapper
              div.date
                h3.is-size-3 {{headlineDate}}
              div
                HeadlineFilters(
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
              section
                h3.is-size-3 No headlines found for {{headlineDate}}!
</template>

<script lang="ts">
import HeadlineContainer from "@/components/Headlines/HeadlineContainer.vue";
import HeadlineFilters from "@/components/Headlines/HeadlineFilters.vue";
import Container from "@/components/Container/Container.vue";

import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

@Component({
  components: { HeadlineFilters, HeadlineContainer, Container }
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

  mounted() {
    window.onscroll = async () => {
      if (
        window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight - 2 &&
        !this.isAllHeadlines
      ) {
        await this.$store.dispatch("fetchHeadlines");
      }
    };
  }
}
</script>

<style scoped>
.headline-filter-wrapper {
  align-items: center;
  display: flex;
}

#headlines-view {
  padding: 2.5% 0;
}

.date {
  flex: 1;
}

.selector {
  margin-bottom: 2.5%;
}

.load-more {
  margin-bottom: 2.5%;
}

.info {
  padding: 2.5%;
}
</style>
