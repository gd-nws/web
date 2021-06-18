<template lang="pug">
  div#footer-container
    footer.footer
      Container
        div.content
          p
            strong Good News! &nbsp;
            | by &nbsp;
            a(
              href="https://dwelsh.uk"
            ) Daniel Welsh
            | .
            br
            br
            | The source code is licensed under the &nbsp;
            a(
              href="https://opensource.org/licenses/BSD-3-Clause"
            ) 3-Clause BSD License
            |. &nbsp;
            br
            | Check out the code for the &nbsp;
            a(
              href="https://github.com/wel-shy/good-news-api"
            ) API,&nbsp;
            a(
              href="https://github.com/wel-shy/good-news-web"
            ) website
            | , and&nbsp;
            a(
              href="https://github.com/wel-shy/good-news-classifer"
            ) classifier
            |!
            br
            br
            | Headlines from &nbsp;
            a(href="http://newsapi.org") newsapi.org
            |.
        cookie-law(
          theme="blood-orange"
        )
          div(
            slot="message"
          )
            p
            | Good News uses cookies to improve your experience, to read more see the&nbsp;
            router-link.cookie-link(to="cookie-policy") cookie policy.
</template>

<script>
import CookieLaw from "vue-cookie-law";
import Container from "@/components/Container/Container.vue";
export default {
  name: "FooterContainer",
  components: { CookieLaw, Container }
};
</script>

<style scoped>
.cookie-link {
  color: #e76a68;
}

.cookie-link:hover {
  color: white;
}

.content {
  text-align: center;
}
</style>
