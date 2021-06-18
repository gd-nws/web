<template lang="pug">
  div#title-container(
    :style="theme"
  )
    div.hero(
      :class="heroClass"
    )
      
      div.hero-body
        Container
          h1.title {{title}}
          h2.subtitle {{subTitle}}
          p.description
            | A machine learning approach to sorting headlines by the positivity or negativity.
            br
            | Help improve the accuracy of {{title}} by voting on headlines.
          br
          div.info-container
            div.button-with-text
              Button(
                :isLight="true",
                :messageLevel="messageLevels.primary"
              )
                span.icon
                  i.far.fa-thumbs-up
              p.instruction Marks a headline as positive.
            div.button-with-text
              Button(
                :isLight="true",
                :messageLevel="messageLevels.error"
              )
                span.icon
                  i.far.fa-thumbs-down
              p.instruction Marks a headline as negative.
      div.hero-footer
        a.unsplash-link(
          href="https://unsplash.com/@romankraft?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
          target="_blank"
          rel="noopener noreferrer"
          title="Download free do whatever you want high-resolution photos from Roman Kraft"
        ) Image by &nbsp;
          span(
            style="display:inline-block;padding:2px 3px"
          )
            svg(
              xmlns="http://www.w3.org/2000/svg",
              viewBox="0 0 32 32"
            )
              title unsplash-logo
              path(
                d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"
              )
          span(style="display:inline-block;padding:2px 3px") Roman Kraft
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { sentimentValues } from "@/store/headlines";
import Navigation from "@/components/Nav/Navigation.vue";
import Button from "@/components/Button/Button.vue";
import { MessageLevel } from "@/store/notification";
import Container from "@/components/Container/Container.vue";
import { Theme } from "@/store/theme";

@Component({
  components: { Button, Navigation, Container }
})
export default class TitleView extends Vue {
  get title() {
    return this.$store.getters.getTitle;
  }
  get subTitle() {
    return this.$store.getters.getSubtitle;
  }
  get heroClass() {
    const sentiment = this.$store.getters.getSentiment;
    switch (sentiment) {
      case sentimentValues.POSITIVE:
        return sentimentValues.POSITIVE;
      case sentimentValues.NEGATIVE:
        return sentimentValues.NEGATIVE;
      default:
        return sentimentValues.POSITIVE;
    }
  }
  get messageLevels() {
    return {
      error: MessageLevel.Error,
      primary: MessageLevel.Primary
    };
  }

  get theme() {
    const theme = this.$store.getters.getTheme as Theme;
    return {
      "--color-positive": theme.colors.positive,
      "--color-negative": theme.colors.negative
    };
  }
}
</script>

<style scoped>
.hero {
  transition: all 0.5s ease;
  color: white;
  min-height: 100%;
  text-align: left;
  padding: 2.5% 0 0 0;
}

.hero-footer {
  text-align: right;
}

.unsplash-link {
  margin: 2.5%;
  color: white;
  text-decoration: none;
  padding: 4px 6px;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco",
    "Helvetica Neue", Helvetica, Ubuntu, Roboto, Noto, "Segoe UI", Arial,
    sans-serif;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.2;
  display: inline-block;
  border-radius: 3px;
}

.hero.positive {
  background: linear-gradient(
      0deg,
      rgba(0, 209, 178, 0.5),
      var(--color-positive)
    ),
    url(https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1725&q=80);
  background-size: cover;
}

.hero.negative {
  background: linear-gradient(
      0deg,
      rgba(255, 56, 96, 0.5),
      var(--color-negative)
    ),
    url(https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1725&q=80);
  background-size: cover;
}

svg {
  height: 12px;
  width: auto;
  position: relative;
  vertical-align: middle;
  top: -2px;
  fill: white;
}

.title {
  color: white;
}
.subtitle {
  color: #fdfdfd;
}
p {
  font-weight: bold;
}
.info-container {
  margin-top: 5%;
}

.button-with-text {
  display: flex;
  align-items: center;
}

.instruction {
  padding-left: 1em;
}
</style>
