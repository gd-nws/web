<template lang="pug">
  div#notification(
    v-show="isVisible"
    :style="theme"
  )
    div
      p {{message}}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { MessageLevel } from "@/store/notification";
import { Theme } from "@/store/theme";

@Component({})
export default class Notification extends Vue {
  get theme() {
    return {
      "--background": this.getNotificationColor()
    };
  }
  get isVisible() {
    return this.$store.getters.getNotificationVisibility;
  }

  get message() {
    return this.$store.getters.getNotificationMessage;
  }

  close() {
    this.$store.dispatch("closeNotification");
  }

  getNotificationColor(): string {
    const level = this.$store.getters.getNotificationLevel as MessageLevel;
    const theme = this.$store.getters.getTheme as Theme;

    switch (level) {
      case MessageLevel.Error:
        return theme.colors.negative;
      case MessageLevel.Warning:
        return "yellow";
      case MessageLevel.Info:
      default:
        return theme.colors.info;
    }
  }
}
</script>

<style scoped>
#notification {
  background: var(--background);
  border-radius: 15px;
  color: white;
  padding: 0.25em 1em;

  text-align: left;
  position: fixed;
  right: 2.5%;
  top: 5%;
}
</style>
