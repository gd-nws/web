<template lang="pug">
  button#button(
    :class="buttonClass",
    :disabled="isDisabled"
    @click="buttonClicked"
    :style="theme"
  )
    slot
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { MessageLevel } from "@/store/notification";
import { Theme } from "@/store/theme";
import { myMixin } from "../../mixins/theme";

@Component({ mixins: [myMixin] })
export default class Button extends Vue {
  @Prop() isLoading: boolean | undefined;
  @Prop() messageLevel: MessageLevel | undefined;
  @Prop() isDisabled: boolean | undefined;
  @Prop() isActive: boolean | undefined;

  get buttonClass() {
    const classes: { [key: string]: boolean | undefined } = {
      "is-loading": this.isLoading,
      "is-active": this.isActive,
      "is-disabled": Boolean(this.isDisabled)
    };

    classes["is-default"] =
      !this.isLoading && !this.isActive && !this.isDisabled;

    return classes;
  }

  get theme() {
    const [color, colorLight] = this.mapLevelToColors(this.messageLevel);
    return {
      "--color": color,
      "--color-light": colorLight,
      "--transition": this.$store.getters.getTheme.transition
    };
  }

  @Emit()
  buttonClicked() {
    return;
  }

  mapLevelToColors(messageLevel?: MessageLevel): string[] {
    const { colors } = this.$store.getters.getTheme as Theme;

    switch (messageLevel) {
      case MessageLevel.Error:
        return [colors.negative, colors.negativeLight];
      case MessageLevel.Warning:
        return ["gold", "yellow"];
      case MessageLevel.Primary:
        return [colors.positive, colors.positiveLight];
      case MessageLevel.Info:
        return [colors.info, colors.infoLight];
      default:
        return ["#555", "#eee"];
    }
  }
}
</script>

<style scoped>
.is-active {
  background: var(--color) !important;
  color: white !important;
  cursor: pointer;
}

.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background: var(--color-light);
  color: var(--color);
}

.is-default {
  background: var(--color-light);
  color: var(--color);
  cursor: pointer;
}

.is-default:hover {
  color: white;
  background: var(--color);
}

#button {
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  margin: 0.25em;
  padding: 0.5em;
  border: 1px var(--color) solid;
  transition: var(--transition);
  min-width: 2.5em;
}
</style>
