<template lang="pug">
  div#headline-container
    div.card
      div.card-content
        div.content
          a(
            :href="headline.link",
            target="_blank"
          )
            div.columns.is-vcentered(
              v-if="headline.displayImagePath"
            )
              div.column.is-one-third
                figure.image.container
                  img(
                    :src="headline.displayImagePath",
                    alt="Placeholder images"
                  )
              div.column
                p.is-size-5 {{headline.headline}}
            div(
              v-else
            )
              p.is-size-5.no-image {{headline.headline}}
            div.columns.is-vcentered.is-mobile
              div.column.is-two-thirds
                p.origin {{origin}}
                  |
                  br
                  | {{publishedAt}}
              div.column.has-text-right
                p.is-size-5 {{headline.semanticValue}}
          div.columns.is-mobile
            div.column
              HeadlineAnnotation(
                :headlineId="headline.id",
              )
            div.column.has-text-right
              ShareHeadline(
                :id="headline.id",
                :title="headline.headline",
                :predictedClass="predictedClass"
              )
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Headline, Sentiment } from "@/store/headlines";
import HeadlineAnnotation from "./HeadlineAnnotation.vue";
import ShareHeadline from "./ShareHeadline.vue";

@Component({
  components: { ShareHeadline, HeadlineAnnotation }
})
export default class HeadlineContainer extends Vue {
  @Prop() headline?: Headline;

  get origin() {
    if (!this.headline) return undefined;
    return this.headline.origin.split("-").join(" ");
  }

  get publishedAt() {
    if (!this.headline) return undefined;
    return this.headline.publishedAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  get predictedClass() {
    if (!this.headline) return undefined;
    return this.headline.predictedClass > 0
      ? Sentiment.POSITIVE
      : Sentiment.NEGATIVE;
  }
}
</script>

<style scoped lang="scss">
a {
  color: black;
  &hover {
    color: black;
  }
}
.card {
  .image {
    margin: 0;
  }

  img {
    object-fit: cover;
    max-width: 100%;
    max-height: 50%;
  }
  margin-bottom: 2.5%;
  .origin {
    text-transform: capitalize;
  }
  .no-image {
    margin-bottom: 2.5%;
  }
}
</style>
