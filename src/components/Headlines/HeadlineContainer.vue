<template lang="pug">
  div#headline-container
    a(
      :href="headline.link",
      target="_blank"
    )
      div.card
        div.card-content
          div.content
            div.columns.is-vcentered(
              v-if="headline.displayImage"
            )
              div.column.is-one-third
                figure.image.container
                  img(
                    :src="headline.displayImage",
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
                p {{headline.semanticValue}}

</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import { Headline } from "@/store/headlines";

@Component({})
export default class HeadlineContainer extends Vue {
  @Prop(Headline) headline;

  get origin() {
    return this.headline.origin.split("-").join(" ");
  }

  get publishedAt() {
    return this.headline.publishedAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
}
</script>

<style scoped lang="scss">
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
