<template lang="pug">
  div#navigation(
    :class="{positive: isPositive, negative: !isPositive}"
  )
    Container
      nav.navbar(
        role="navigation"
        aria-label="main navigation"
      )
        div.navbar-brand
          router-link.navbar-item(
            to="/headlines?sentiment=positive"
          ) Good News!

          a.navbar-burger.burger(
            role="button",
            aria-label="menu",
            :aria-expanded="isExpanded",
            data-target="navbar-content",
            :class="{'is-active': isExpanded}",
            @click="toggleNav"
          )
            span(
              aria-hidden="true"
            )
            span(
              aria-hidden="true"
            )
            span(
              aria-hidden="true"
            )
        div#navbar-content.navbar-menu(
          :class="{'is-active': isExpanded}"
        )
          div.navbar-start
            router-link.navbar-item(
              to="/about"
            ) About
            router-link.navbar-item(
              to="/cookie-policy"
            ) Cookie Policy
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { sentimentValues } from "@/store/headlines";
import Container from "@/components/Container/Container.vue";

@Component({ components: { Container } })
export default class Navigation extends Vue {
  private isExpanded: boolean = false;
  get isPositive() {
    return this.$store.getters.getSentiment === sentimentValues.POSITIVE;
  }
  toggleNav() {
    this.isExpanded = !this.isExpanded;
  }
}
</script>

<style scoped>
#navigation {
  padding: 1.5% 0;
}

.navbar {
  display: flex;
}

.navbar-start {
  text-align: left;
}

#navbar-content {
  flex: 1;
  background-color: transparent;
  color: white;
}

.navbar-item {
  color: white;
  margin: 1em;
  text-decoration: none;
}

.router-link-exact-active {
  color: white;
  background-color: transparent;
  font-weight: bold;
}

.router-link-active {
  background-color: transparent;
}

#navbar-content.is-active {
  box-shadow: none;
  text-align: left;
  border-bottom: white solid 1px;

  @media only screen and (min-width: 1024px) {
    border-bottom: none;
  }
}

.navbar:hover {
  background-color: transparent;
}

.burger {
  color: white;
}

.navbar-item:hover {
  background-color: transparent;
  font-weight: bold;
}

.navbar-item:focus {
  background-color: transparent;
  font-weight: bold;
}

.navbar-item:focus-within {
  background-color: transparent;
  font-weight: bold;
}

.positive {
  background-color: hsl(171, 100%, 41%);
}
.negative {
  background-color: hsl(348, 100%, 61%);
}
</style>
