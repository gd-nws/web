<template lang="pug">
  div#share-headline
    a.button.button.is-info(
      :href="twitterLink"
    )
      span.icon
        i.fab.fa-twitter
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class ShareHeadline extends Vue {
  @Prop() id?: string;
  @Prop() title?: string;
  @Prop() predictedClass?: string;

  get twitterLink() {
    const {
      VUE_APP_TWITTER_HASHTAGS: hashtags,
      VUE_APP_TWITTER_ACCOUNT: account
    } = process.env;
    return `http://twitter.com/intent/tweet?url=${encodeURIComponent(
      `https://gdnws.co.uk/#/headlines/${this.id}`
    )}&text=${encodeURIComponent(
      `Check out this ${this.predictedClass} headline from Good News!\n${this.title}`
    )}&hashtags=${hashtags}&twitterdev=${account}&related=${account}`;
  }
}
</script>

<style scoped lang="scss">
#share-headline {
  .button {
    background-color: #00aced;
  }
}
</style>
