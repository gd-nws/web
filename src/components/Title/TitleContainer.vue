<template lang="pug">
  div#title-container.has-text-left
    div.hero.is-medium(
      :class="heroClass"
    )
      div.hero-body
        div.container
          h1.title {{title}}
          h2.subtitle {{subTitle}}
          p
          | A machine learning approach to sorting headlines by the positivity or negativity.
          br
          | Help improve the accuracy of {{title}} by voting on headlines.
          br
          div.info-container
            div.columns.is-mobile.is-vcentered.info
              div.column.is-narrow
                button.button.is-primary.is-light
                  span.icon
                    i.far.fa-thumbs-up
              div.column.is-narrow
                p Marks a headline as positive.
            div.columns.is-mobile.is-vcentered.info
              div.column.is-narrow
                button.button.is-danger.is-light
                  span.icon
                    i.far.fa-thumbs-down
              div.column.is-narrow
                p Marks a headline as negative.
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import { sentimentValues } from "@/store/headlines";

@Component({})
export default class TitleView extends Vue {
  get title() {
    return this.$store.getters.getTitle;
  }

  get subTitle() {
    return this.$store.getters.getSubtitle;
  }

  get heroClass() {
    const sentiment = this.$store.getters.getSentiment;
    switch (sentiment) {
      case sentimentValues.POSITIVE:
        return sentimentValues.POSITIVE;
      case sentimentValues.NEGATIVE:
        return sentimentValues.NEGATIVE;
      default:
        return sentimentValues.POSITIVE;
    }
  }
}
</script>

<style scoped lang="scss">
.hero {
  transition: all 0.5s ease;
  color: white;
  .title {
    color: white;
  }
  .subtitle {
    color: #fdfdfd;
  }
  .info-container {
    margin-top: 5%;
  }
}

.positive {
  background-color: hsl(171, 100%, 41%);
}

.negative {
  background-color: hsl(348, 100%, 61%);
}
</style>
