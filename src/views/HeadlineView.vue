<template lang="pug">
  div#headline-view.has-text-left
    div.container
      section.section
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

@Component({
  components: { HeadlineContainer }
})
export default class HeadlineView extends Vue {
  get headline() {
    return this.$store.getters.getSelectedHeadline;
  }

  /**
   * Fetch new headline when route is updated.
   * @param route
   */
  @Watch("$route", { immediate: true, deep: true })
  onPropertyChanged(route) {
    this.$store.dispatch("fetchHeadline", { id: route.params.id });
  }
}
</script>
