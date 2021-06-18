/* eslint-disable no-console */
import Vue from "vue";

// define a mixin object
export class myMixin extends Vue {
  get created(): string {
    this.hello();
    return "";
  }

  hello() {
    console.log("hello from mixin!");
  }
}
