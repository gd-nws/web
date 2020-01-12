<template lang="pug">
  div#notification(
    v-show="isVisible"
  )
    div.notification.box.is-outlined(
      :class="displayClass"
    )
      button.delete(
        @click="close"
      )
      p {{message}}
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import { MessageLevel } from "@/store/notification";
@Component({})
export default class Notification extends Vue {
  get isVisible() {
    return this.$store.getters.getNotificationVisibility;
  }
  get message() {
    return this.$store.getters.getNotificationMessage;
  }
  close() {
    this.$store.dispatch("closeNotification");
  }
  get displayClass() {
    const level = this.$store.getters.getNotificationLevel;
    switch (level) {
      case MessageLevel.Error:
        return "is-danger";
      case MessageLevel.Warning:
        return "is-warn";
      case MessageLevel.Info:
      default:
        return "is-info";
    }
  }
}
</script>

<style lang="scss" scoped>
#notification {
  text-align: left;
  position: fixed;
  left: 50%;
  top: 5%;
  transform: translate(-50%, -50%);
}
@media only screen and (max-width: 769px) {
  #notification {
    width: 50%;
  }
}
@media only screen and (max-width: 700px) {
  #notification {
    width: 75%;
  }
}
</style>
