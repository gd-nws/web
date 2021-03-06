<template lang="pug">
  div#headline-filters
    div.date-picker-wrapper(
      v-if="isDatePickerActive"
    )
      input.date-picker(
        type="date",
        :value="startDate",
        :max="today",
        @input="handleChange($event.target.value)"
      )
    div
      Button(
        @button-clicked="handleCalendar"
        :isActive="isDatePickerActive"
      )
        span.icon
          i.far.fa-calendar-alt
    div
      Button(
        :messageLevel="messageLevel.Primary",
        :is-outlined="!isPositive",
        @button-clicked="sentimentSelected(sentiments.POSITIVE)"
      )
        span.icon
          i.fas.fa-sort-amount-down
    div
      Button(
        :messageLevel="messageLevel.Error",
        :is-outlined="isPositive",
        @button-clicked="sentimentSelected(sentiments.NEGATIVE)"
      )
        span.icon
          i.fas.fa-sort-amount-up
    div
      Button(
        :messageLevel="messageLevel.Info",
        @button-clicked="handleSearch"
      )
        span.icon
          i.fas.fa-search(
            v-if=""
          )
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Button from "@/components/Button/Button.vue";
import { MessageLevel } from "@/store/notification";
import { Sentiment, sentimentValues } from "@/store/headlines";

@Component({ components: { Button } })
export default class HeadlineFilters extends Vue {
  @Prop() startDate?: string;
  private isDatePickerActive: boolean = false;

  today = new Date().toISOString().split("T")[0];
  selectedDate = this.startDate || this.today;
  windowWidth: number = 0;
  mobileWidth: number = 768;

  get date() {
    return this.$store.getters.getLastHeadlineDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  get messageLevel() {
    return MessageLevel;
  }

  get isPositive() {
    return this.$store.getters.getSentiment === sentimentValues.POSITIVE;
  }

  get sentiments() {
    return Sentiment;
  }

  async sentimentSelected(sentiment: string) {
    await this.$router.push({
      path: "/headlines",
      query: {
        date: this.$store.getters.getLastHeadlineDate
          .toISOString()
          .split("T")[0],
        sentiment
      }
    });
  }

  handleChange(date: string) {
    this.$emit("date-changed", date);
  }

  handleCalendar() {
    this.isDatePickerActive = !this.isDatePickerActive;
  }

  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.windowWidth = window.innerWidth;
  }

  handleSearch() {
    this.$router.push({ path: "/search" });
  }
}
</script>

<style scoped>
#headline-date {
  padding: 2.5%;
  margin-bottom: 2.5%;
}

#headline-date #date-selector {
  transition: all 0.5s ease;
}

#headline-filters {
  display: flex;
}

.date-picker-wrapper {
  display: flex;
  align-items: center;
}
</style>
