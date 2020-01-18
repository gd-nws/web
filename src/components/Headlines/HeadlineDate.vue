<template lang="pug">
  div#headline-date
    div.columns
      div.column.is-narrow
        h4.is-size-4 {{date}}
      div.column.auto.has-text-right
        div.field.has-addons(
          :class="{'has-addons-right': windowWidth > mobileWidth}"
        )
          div.control(
            v-if="isDatePickerActive"
          )
            input.input(
              type="date",
              :value="startDate",
              :max="today",
              @input="handleChange($event.target.value)"

            )
          div.control
            Button.date-selector-container(
              @button-clicked="handleCalendar"
            )
              span.icon
                i.far.fa-calendar-alt
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Button from "@/components/Button/Button.vue";

@Component({ components: { Button } })
export default class HeadlineDate extends Vue {
  today = new Date().toISOString().split("T")[0];
  @Prop() startDate?: string;
  selectedDate = this.startDate || this.today;
  windowWidth: number = 0;
  private isDatePickerActive: boolean = false;
  mobileWidth: number = 768;

  get date() {
    return this.$store.getters.getLastHeadlineDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
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
}
</script>

<style scoped lang="scss">
#headline-date {
  padding: 2.5%;

  #date-selector {
    transition: all 0.5s ease;
  }

  margin-bottom: 2.5%;
}
</style>
