<template lang="pug">
div#sentiment-selector
  div.container
    p.has-text-centered.has-text-left-desktop
      button.button(
        :class="{positive: isPositive}",
        @click="sentimentSelected(sentiments.POSITIVE)"
      ) Good News!
      button.button(
        :class="{negative: !isPositive}",
        @click="sentimentSelected(sentiments.NEGATIVE)"
      ) Bad News!
</template>

<script>
import { Component, Emit, Vue } from "vue-property-decorator";
import { sentimentValues } from "@/store/headlines";

@Component({})
export default class HeadlineContainer extends Vue {
  get isPositive() {
    return this.$store.getters.getSentiment === sentimentValues.POSITIVE;
  }

  get sentiments() {
    return sentimentValues;
  }

  async sentimentSelected(sentiment) {
    await this.$router.push({
      path: "/headlines",
      query: { sentiment }
    });
  }
}
</script>

<style scoped lang="scss">
.button {
  transition: all 0.5s ease;
  margin-right: 1.25%;
  margin-top: 2.5%;
}
.positive {
  background-color: hsl(171, 100%, 41%);
  color: white;
  &:hover {
    color: white;
    font-weight: bold;
  }
}

.negative {
  background-color: hsl(348, 100%, 61%);
  color: white;
  &:hover {
    color: white;
    font-weight: bold;
  }
}
</style>
