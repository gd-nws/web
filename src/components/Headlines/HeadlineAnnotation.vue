<template lang="pug">
  div#headline-annotation
    Button(
      :isDisabled="vote !== undefined",
      @button-clicked="handleAnnotation(sentiments.POSITIVE)",
      :isLight="!isPositive",
      :messageLevel="messageLevels.primary",
    )
      span.icon
        i.far.fa-thumbs-up
    Button(
      :isDisabled="vote !== undefined",
      @button-clicked="handleAnnotation(sentiments.NEGATIVE)",
      :messageLevel="messageLevels.error",
      :isLight="!isNegative"
    )
      span.icon
        i.far.fa-thumbs-down
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator";
import { sentimentValues } from "@/store/headlines";
import { MessageLevel } from "@/store/notification";
import Button from "@/components/Button/Button";

@Component({
  components: { Button }
})
export default class HeadlineAnnotation extends Vue {
  @Prop(Number) headlineId;

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
    const annotation = this.$store.getters.getAnnotations.find(
      annotation => annotation.headlineId === this.headlineId
    );

    if (!annotation) {
      return undefined;
    }
    return annotation.vote;
  }

  get messageLevels() {
    return {
      error: MessageLevel.Error,
      primary: MessageLevel.Primary
    };
  }

  async handleAnnotation(annotation) {
    await this.$store.dispatch("annotateHeadline", {
      annotation,
      headlineId: this.headlineId
    });

    const eventPayload = {};
    eventPayload[annotation] = this.headlineId;
    this.$gtag.event("annotate", eventPayload);
  }
}
</script>

<style scoped lang="scss">
#headline-annotation {
  .button {
    margin-top: 1%;
    &:first-child {
      margin-right: 1%;
    }
  }
}
</style>
