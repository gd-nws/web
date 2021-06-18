<template>
  <div id="headline-container">
    <div class="card">
      <div class="image-and-headline">
        <div class="image-container" v-show="headline.displayImagePath">
          <img :src="headline.displayImagePath" alt="Placeholder images" />
        </div>
        <div class="flex">
          <a :href="headline.link" target="_blank" class="headline">{{
            headline.headline
          }}</a>
        </div>
      </div>
      <div class="origin-sentiment-wrapper">
        <p class="origin">
          {{ origin }}
          <br />
          {{ publishedAt }}
        </p>
        <p class="sentiment-value">
          {{ headline.semanticValue }}
        </p>
      </div>
      <div class="headline-actions">
        <headline-annotation class="annotate-actions" :headline="headline" />
        <share-headline
          :id="headline.id"
          :title="headline.headline"
          :predictedClass="predictedClass"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Headline, Sentiment } from "@/store/headlines";
import HeadlineAnnotation from "./HeadlineAnnotation.vue";
import ShareHeadline from "./ShareHeadline.vue";

@Component({
  components: {
    "share-headline": ShareHeadline,
    "headline-annotation": HeadlineAnnotation
  }
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

<style scoped>
.card {
  border: 1px #ccc solid;
  border-radius: 5px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%),
    0 0 0 1px rgb(10 10 10 / 2%);
  padding: 2.5%;
  margin-bottom: 2.5%;
}

.flex {
  display: flex;
}

a {
  color: black;
  text-decoration: none;
}

a:hover {
  color: black;
}

@media only screen and (max-width: 1000px) {
  .image-and-headline {
    flex-direction: column;
  }

  .image-container {
    min-width: 100%;
  }
}

.image-and-headline {
  align-items: center;
  display: flex;
  width: 100%;
}

.image-container {
  max-width: 40%;
}

img {
  width: 100%;
}

.headline {
  padding: 1em;
}

.origin-sentiment-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

.origin {
  flex: 1;
  text-align: left;
  text-transform: capitalize;
}

.sentiment-value {
  text-align: right;
}

.headline-actions {
  display: flex;
}

.annotate-actions {
  flex: 1;
  text-align: left;
}
</style>
