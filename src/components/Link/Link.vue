<template>
  <a>
    <slot />
  </a>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Link extends Vue {}
</script>

<style scoped>
a {
  color: red;
}
</style>
