<template lang="pug">
    div#title-container.has-text-left-desktop
      div.hero.is-medium(
          :class="heroClass"
      )
        div.hero-body
            div.container
                h1.title {{title}}
                h2.subtitle {{subTitle}}
                p
                | A machine learning approach to sorting headlines by the positivity or negativity.
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
  color: white;
  .title {
    color: white;
  }
  .subtitle {
    color: #fdfdfd;
  }
}

.positive {
  background-color: hsl(171, 100%, 41%);
}

.negative {
  background-color: hsl(348, 100%, 61%);
}
</style>
