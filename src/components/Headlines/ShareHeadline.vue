<template lang="pug">
  div#share-headline
    input#hidden-link(
      type="hidden"
      name="hidden-link"
      :value="hyperlink"
    )
    Button(
      @button-clicked="copyLink"
    )
      span.icon
        i.fas.fa-link
    Button.twitter-share(
      :messageLevel="messageLevels.info"
      @button-clicked="shareToTwitter"
    )
      span.icon
        i.fab.fa-twitter
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { MessageLevel } from "@/store/notification";
import Button from "@/components/Button/Button.vue";
@Component({
  components: { Button }
})
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

  get hyperlink() {
    return `https://gdnws.co.uk/#/headlines/${this.id}`;
  }

  get messageLevels() {
    return {
      info: MessageLevel.Info
    };
  }

  shareToTwitter() {
    (this as any).$gtag.event("share", { method: "twitter" });
    const win = window.open(this.twitterLink, "_blank");
    if (win) {
      win.focus();
    }
  }

  copyLink() {
    const el = document.createElement("input");
    el.type = "text";
    el.value = this.hyperlink;
    el.id = "hidden-link";
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute("readonly", "");
    document.body.appendChild(el);
    /* Select the text field */
    el.select();
    el.setSelectionRange(0, 99999); /*For mobile devices*/
    /* Copy the text inside the text field */
    document.execCommand("copy");
    document.body.removeChild(el);
    this.$store.dispatch("displayNotification", {
      message: "Copied link to clipboard!",
      messageLevel: MessageLevel.Info,
      timeout: 2000
    });

    (this as any).$gtag.event("share", { method: "url" });
  }
}
</script>

<style scoped>
/* #share-headline {
  margin-top: 1%;
} */

.twitter-share {
  background-color: #00aced;
  color: white;
}

#hidden-link {
  display: none;
  position: absolute;
  left: -9999px;
}
</style>
