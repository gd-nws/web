<template lang="pug">
  div#about.has-text-left
    div.container
      h3.title About
      div.content
        ContentBlock
          template(
            v-slot:title
          ) What is Good News?
          template(
            v-slot:text
          )
            | Good News scrapes the top headlines of the day hourly, it then determines whether these headlines
            | are positive or negative, through a machine learning algorithm. These headlines are then ranked by
            | their positivity, which is the percentage score associated with each headline.
        ContentBlock
          template(
            v-slot:title
          ) The Algorithm
          template(
            v-slot:text
          )
            | Good News uses a support vector machine (SVM), to determine whether the headlines are positive or negative.
            | A basic sentiment analysis is performed over each headline, getting a positive/negative ranking for
            | each word in the headline. These are then fed into the SVM which determines whether it is positive or negative.
        ContentBlock
          template(
            v-slot:title
          ) Upcoming Features
          template(
            v-slot:text
          )
            p
              ol
                li.completed Allowing user headline annotation to improve classifier accuracy.
                li.completed View past headlines.
                li.completed View all headlines for a date.
                li User accounts to store favourite headlines.
                li Sharing headlines to social media.
</template>

<style scoped>
#about {
  margin-top: 2.5%;
  margin-bottom: 2.5%;
}
#about .completed {
  text-decoration: line-through;
}
</style>
<script>
import { Component, Vue } from "vue-property-decorator";
import ContentBlock from "../components/Content/ContentBlock";

@Component({
  components: { ContentBlock }
})
export default class About extends Vue {}
</script>
