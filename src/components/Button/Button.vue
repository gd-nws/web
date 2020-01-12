<template lang="pug">
  button#button.button.is-rounded(
    :class="buttonClass",
    :disabled="isDisabled"
    @click="buttonClicked"
  )
    slot
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { MessageLevel } from "@/store/notification";
@Component({})
export default class Button extends Vue {
  @Prop() isLoading: boolean | undefined;
  @Prop() messageLevel: MessageLevel | undefined;
  @Prop() isDisabled: boolean | undefined;
  @Prop() isLight: boolean | undefined;

  get buttonClass() {
    const className = this.messageLevelClass();
    const c: any = {
      "is-loading": this.isLoading,
      "is-light": this.isLight
    };
    c[className] = true;
    return c;
  }

  @Emit()
  buttonClicked() {
    return;
  }

  messageLevelClass() {
    let className: string = "";
    switch (this.messageLevel) {
      case MessageLevel.Error:
        className = "is-danger";
        break;
      case MessageLevel.Warning:
        className = "is-warn";
        break;
      case MessageLevel.Primary:
        className = "is-primary";
        break;
      case MessageLevel.Info:
        className = "is-info";
        break;
      default:
        break;
    }
    return className;
  }
}
</script>
