<template lang="pug">
  div#app
    Navigation
    TitleContainer
    router-view
    FooterContainer
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import TitleContainer from "@/components/Title/TitleContainer";
import Navigation from "@/components/Nav/Navigation";
import FooterContainer from "@/components/Footer/FooterContainer";
@Component({
  components: { FooterContainer, Navigation, TitleContainer }
})
export default class App extends Vue {}
</script>
