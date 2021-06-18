<template lang="pug">
  div#headline-annotation
    Button(
      :isDisabled="vote !== undefined",
      @button-clicked="handleAnnotation(sentiments.POSITIVE)",
      :isActive="isPositive",
      :messageLevel="messageLevels.primary",
    )
      span.icon
        i.far.fa-thumbs-up
    Button(
      :isDisabled="vote !== undefined",
      @button-clicked="handleAnnotation(sentiments.NEGATIVE)",
      :messageLevel="messageLevels.error",
      :isActive="isNegative"
    )
      span.icon
        i.far.fa-thumbs-down
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Headline, sentimentValues } from "@/store/headlines";
import { MessageLevel } from "@/store/notification";
import Button from "@/components/Button/Button.vue";

@Component({
  components: { Button }
})
export default class HeadlineAnnotation extends Vue {
  @Prop(Object) headline: Headline | undefined = undefined;

  get isPositive() {
    return this.vote === 1;
  }

  get isNegative() {
    return this.vote === -1;
  }

  get sentiments() {
    return sentimentValues;
  }

  get vote() {
    if (!this.headline) {
      return undefined;
    }

    const { annotations } = this.headline;
    if (annotations.length) {
      const [{ vote }] = annotations;
      return vote;
    }

    return undefined;
  }

  get messageLevels() {
    return {
      error: MessageLevel.Error,
      primary: MessageLevel.Primary
    };
  }

  async handleAnnotation(annotation: string) {
    if (!this.headline) {
      return;
    }

    await this.$store.dispatch("annotateHeadline", {
      annotation,
      headlineId: this.headline.id
    });

    const eventPayload: { [k: string]: string | undefined } = {};
    eventPayload[annotation] = this.headline.id;
    this.$gtag.event("annotate", { method: annotation });
  }
}
</script>

<style scoped>
#headline-annotation.button {
  margin-top: 1%;
}

#headline-annotation.button:first-child {
  margin-right: 1%;
}
</style>
