<template lang="pug">
  div#about.has-text-left
    div.container
      h3.title About
      div.content
        h4.is-size-4 What is Good News?
        p
          | Good News scrapes the top headlines of the day hourly, it then determines whether these headlines
          | are positive or negative, through a machine learning algorithm. These headlines are then ranked by
          | their positivity, which is the percentage score associated with each headline.
        h4.is-size-4 The Algorithm
        P
          | Good News uses a support vector machine (SVM), to determine whether the headlines are positive or negative.
          | A basic sentiment analysis is performed over each headline, getting a positive/negative ranking for
          | each word in the headline. These are then fed into the SVM which determines whether it is positive or negative.
        h4.is-size-4 Upcoming Features
        p
          ol
            li Allowing user headline annotation to improve classifier accuracy.
            li User accounts to store favourite headlines.
            li Sharing headlines to social media.
</template>

<style scoped lang="scss">
#about {
  margin-top: 2.5%;
  margin-bottom: 2.5%;
}
</style>
