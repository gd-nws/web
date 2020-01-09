<template lang="pug">
  div#content-block
    h4.is-size-4
      slot(
        name="title"
      )
    p
      slot(
        name="text"
      )

</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator";

@Component()
export default class ContentBlock extends Vue {}
</script>

<style scoped lang="scss">
#content-block {
  p {
    margin-bottom: 2.5%;
  }
}
</style>
