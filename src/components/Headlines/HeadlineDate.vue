<template lang="pug">
  div#headline-date
    div.columns.is-mobile
      div.column.is-narrow
        h4.is-size-4 {{date}}
      div.column.auto.has-text-right
        button.button(
          :disabled="isToday"
          @click="handleDateChange(1)"
        )
          span.icon
            i.fas.fa-arrow-left
        button.button(
          @click="handleDateChange(-1)"
        )
          span.icon
            i.fas.fa-arrow-right
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class HeadlineContainer extends Vue {
  get date() {
    return this.$store.getters.getLastHeadlineDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  get isToday() {
    return (
      this.$store.getters.getLastHeadlineDate.toDateString() ===
      new Date().toDateString()
    );
  }

  async handleDateChange(incrementValue: number) {
    const date = this.$store.getters.getLastHeadlineDate;
    date.setDate(date.getDate() + incrementValue);

    await this.$router.push({
      path: "/headlines",
      query: {
        date: date.toISOString().split("T")[0],
        sentiment: this.$store.getters.getSentiment
      }
    });
  }
}
</script>

<style scoped lang="scss">
#headline-date {
  padding: 2.5%;
}
</style>
