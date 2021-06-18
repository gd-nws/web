<template lang="pug">
  div#container
    slot
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Container extends Vue {}
</script>

<style scoped>
#container {
  margin: auto;
  max-width: 1000px;
  width: 95%;
}
</style>
