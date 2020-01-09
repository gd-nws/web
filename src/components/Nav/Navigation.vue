<template lang="pug">
  div#navigation(
    :class="{positive: isPositive, negative: !isPositive}"
  )
    div.container
      nav.navbar(
        role="navigation"
        aria-label="main navigation"
      )
        div.navbar-brand
          router-link.navbar-item(
            to="/"
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

@Component({})
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

<style scoped lang="scss">
#navigation {
  transition: all 0.5s ease;
  padding: 15px;
}
.navbar {
  background-color: transparent;
  &hover {
    background-color: transparent;
  }
  .navbar-brand {
    background-color: transparent;

    .burger {
      color: white;
    }

    // Navbar brand item.
    .navbar-item {
      /*font-weight: bold;*/
      color: white;

      &.router-link-exact-active {
        color: white;
        font-weight: bold;
      }
    }
  }

  #navbar-content {
    background-color: transparent;
    color: white;
    &.is-active {
      box-shadow: none;
      text-align: left;
      border-bottom: white solid 1px;

      @media only screen and (min-width: 1024px) {
        border-bottom: none;
      }
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
}

.positive {
  background-color: hsl(171, 100%, 41%);
}

.negative {
  background-color: hsl(348, 100%, 61%);
}
</style>
