<template lang="pug">
  div#headline-annotation
    button.button.is-primary(
      :class="{'is-light': !isPositive}",
      @click="handleAnnotation(sentiments.POSITIVE)",
      :disabled="vote !== undefined"
    )
      span.icon
        i.far.fa-thumbs-up
    button.button.is-danger(
      :class="{'is-light': !isNegative}",
      @click="handleAnnotation(sentiments.NEGATIVE)",
      :disabled="vote !== undefined"
    )
      span.icon
        i.far.fa-thumbs-down
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator";
import { sentimentValues } from "@/store/headlines";

@Component({})
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

  async handleAnnotation(annotation) {
    await this.$store.dispatch("annotateHeadline", {
      annotation,
      headlineId: this.headlineId
    });
  }
}
</script>

<style scoped></style>
