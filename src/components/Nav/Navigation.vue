<template lang="pug">
  div#navigation(
    :class="{positive: isPositive, negative: !isPositive}"
  )
    div.container
      nav.navbar(
        role="navigation"
        aria-label="main navigation"
      )
        div.navbar-menu
          div.navbar-brand
            router-link.navbar-item(
              to="/"
            ) Good News!
          div.navbar-start
            router-link.navbar-item(
              to="/about"
            ) About
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import { sentimentValues } from "@/store/headlines";

@Component({})
export default class Navigation extends Vue {
  get isPositive() {
    return this.$store.getters.getSentiment === sentimentValues.POSITIVE;
  }
}
</script>

<style scoped lang="scss">
#nav {
  padding: 30px;
}
.navbar {
  background-color: transparent;
  &hover {
    background-color: transparent;
  }
  .navbar-brand {
    background-color: transparent;
    .navbar-item {
      /*font-weight: bold;*/
      color: white;

      &.router-link-exact-active {
        color: white;
        font-weight: bold;
      }
    }
  }
  a.navbar-item:hover {
    background-color: transparent;
    font-weight: bold;
  }
  a.navbar-item:focus {
    background-color: transparent;
    font-weight: bold;
  }
  a.navbar-item:focus-within {
    background-color: transparent;
    font-weight: bold;
  }
  .navbar-start {
    .navbar-item {
      color: white;
      .router-link-active {
        background-color: transparent;
      }
      &.router-link-exact-active {
        color: white;
        background-color: transparent;
        font-weight: bold;
      }
    }
  }
}

.positive {
  background-color: hsl(171, 100%, 41%);
}

.negative {
  background-color: hsl(348, 100%, 61%);
}
</style>
