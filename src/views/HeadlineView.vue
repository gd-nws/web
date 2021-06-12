<template lang="pug">
  div#headline-view.has-text-left
    div.container
      section.section
        div.actions.has-text-right
          Button(
            @button-clicked="handleAllHeadlinesClick",
            :messageLevel="messageLevels.Primary"
          ) All Headlines
        div.headline-info(
          v-if="headline"
        )
          HeadlineContainer(
            :headline="headline"
          )
        div.not-found(
          v-else
        )
          h3.is-size-3 Headline not found.
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";
import HeadlineContainer from "@/components/Headlines/HeadlineContainer";
import Button from "@/components/Button/Button";
import { Sentiment } from "@/store/headlines";
import { MessageLevel } from "@/store/notification";

@Component({
  components: { Button, HeadlineContainer }
})
export default class HeadlineView extends Vue {
  get headline() {
    return this.$store.getters.getSelectedHeadline;
  }

  get messageLevels() {
    return MessageLevel;
  }

  /**
   * Fetch new headline when route is updated.
   * @param route
   */
  @Watch("$route", { immediate: true, deep: true })
  onPropertyChanged(route) {
    this.$store.dispatch("fetchHeadline", { id: route.params.id });
  }

  handleAllHeadlinesClick() {
    this.$router.push({
      path: "/headlines",
      query: {
        date: new Date().toISOString().split("T")[0],
        sentiment: Sentiment.POSITIVE
      }
    });
  }
}
</script>

<style scoped>
.actions {
  margin-bottom: 2.5%;
}
</style>
