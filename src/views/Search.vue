import {Sentiment} from "@/store/headlines";
<template lang="pug">
  div#search
    div.container.has-text-left
      div.info
        div.columns.is-mobile
          div.column.is-narrow
            h3.is-size-3 Search Headlines
          div.column.has-text-right
            Button(
              @button-clicked="closeSearch"
            )
              span.icon
                i.fas.fa-times
        div.field.has-addons
          div.control.is-expanded
            input.input(
              type="text",
              placeholder="Search",
              v-model="term",
              @keyup.enter="handleSearch"
            )
          div.control
            Button(
              @button-clicked="handleSearch",
              :messageLevel="messageLevel.Info"
            )
              span.icon
                i.fas.fa-search
          div.control
            Button(
              :is-outlined="!isPositive",
              :messageLevel="messageLevel.Primary",
              @button-clicked="handleSentimentChange(sentiment.POSITIVE)"
            )
              span.icon
                i.fas.fa-sort-amount-down
          div.control
            Button(
              :is-outlined="isPositive",
              :messageLevel="messageLevel.Error",
              @button-clicked="handleSentimentChange(sentiment.NEGATIVE)"
            )
              span.icon
                i.fas.fa-sort-amount-up
        h5.is-size-5 Showing {{count}} results for "{{searchTerm}}"
      HeadlineContainer(
        v-for="headline in headlines",
        :key="headline.id",
        :headline="headline"
      )
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Button from "@/components/Button/Button.vue";
import { Sentiment } from "@/store/headlines";
import HeadlineContainer from "@/components/Headlines/HeadlineContainer.vue";
import { Route } from "vue-router";
import { MessageLevel } from "@/store/notification";

@Component({
  components: { HeadlineContainer, Button }
})
export default class Search extends Vue {
  term: string | undefined = "";

  get searchTerm() {
    return this.$store.getters.getSearchTerm;
  }

  get isPositive() {
    return this.$store.getters.getSearchSentiment === Sentiment.POSITIVE;
  }

  get headlines() {
    return this.$store.getters.getSearchHeadlines;
  }

  get messageLevel() {
    return MessageLevel;
  }

  get sentiment() {
    return Sentiment;
  }

  get isAllHeadlines() {
    return this.$store.getters.getIsAllSearchHeadlines;
  }

  get count() {
    return this.$store.getters.getSearchCount;
  }

  @Watch("$route", { immediate: true, deep: true })
  handleNewTerm(route: Route) {
    const { term, sentiment = Sentiment.POSITIVE } = route.query;
    const payload: { sentiment: Sentiment; term?: string } = {
      sentiment: (sentiment as Sentiment) || Sentiment.POSITIVE
    };

    if (term) {
      payload.term = term as string;
      this.term = term as string;
    }
    this.$store.dispatch("searchHeadlines", {
      term,
      sentiment
    });
  }

  handleSearch() {
    if (this.term && this.term.length > 0) {
      (this as any).$gtag.event("search", { search_term: this.term });
      this.$router.push({
        path: "/search",
        query: {
          term: this.term,
          sentiment: this.$store.getters.getSearchSentiment
        }
      });
      return;
    }
    this.$router.push({ path: "/search" });
  }

  handleSentimentChange(sentiment: Sentiment) {
    this.$router.push({
      path: "/search",
      query: {
        term: this.term,
        sentiment
      }
    });
  }

  closeSearch() {
    this.$router.push({
      path: "/headlines",
      query: {
        date: new Date().toISOString().split("T")[0],
        sentiment: Sentiment.POSITIVE
      }
    });
  }

  mounted() {
    window.onscroll = async () => {
      if (
        window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight - 2 &&
        !this.isAllHeadlines
      ) {
        await this.$store.dispatch("fetchNextSearchPage");
      }
    };
  }
}
</script>

<style scoped lang="scss">
#search {
  padding-top: 2.5%;
  padding-bottom: 2.5%;
  .info {
    padding-left: 2.5%;
    padding-right: 2.5%;
    margin-bottom: 2.5%;
  }
}
</style>
