<template lang="pug">
  div#cookie-policy
    Container
      h3.title Cookie Policy
      div.content
        div
          p
          | 'Good News!' uses cookies. By using the Service, you consent to the
          | use of cookies. Our Cookies Policy explains what cookies are, how we
          | use cookies, how third-parties we may partner with may use cookies
          | on the Service, your choices regarding cookies and further
          | information about cookies.
          h6 Last updated: 18/02/2017
        ContentBlock
          template(
           v-slot:title
          ) What are cookies
          template(
            v-slot:text
          )
            | Cookies are small pieces of text sent by your web browser by a website
            | you visit. A cookie file is stored in your web browser and allows the
            | Service or a third-party to recognize you and make your next visit
            | easier and the Service more useful to you. Cookies can be "persistent"
            | or "session" cookies.
        ContentBlock
          template(
            v-slot:title
          ) How 'Good News!' uses cookies
          template(
            v-slot:text
          )
            | When you use and access the Service, we may place a number of cookies
            | files in your web browser. We use cookies for the following purposes:
            | to enable certain functions of the Service, to provide analytics, to
            | store your preferences, to enable advertisements delivery, including
            | behavioral advertising. We use both session and persistent cookies on
            | the Service and we use different types of cookies to run the Service:
        ContentBlock
          template(
            v-slot:title
          ) Third-party cookies
          template(
            v-slot:text
          )
            | In addition to our own cookies, we may also use various third-parties
            | cookies to report usage statistics of the Service, deliver
            | advertisements on and through the Service, and so on.
        ContentBlock
          template(
            v-slot:title
          ) What are your choices regarding cookies
          template(
            v-slot:text
          )
            | If you'd like to delete cookies or instruct your web browser to delete
            | or refuse cookies, please visit the help pages of your web browser.
            | Please note, however, that if you delete cookies or refuse to accept
            | them, you might not be able to use all of the features we offer, you
            | may not be able to store your preferences, and some of our pages might
            | not display properly. Where can your find more information about
            | cookies You can learn more about cookies and the following third-party
            | websites:
            ul
              li
                a(
                  href="http://www.allaboutcookies.org/",
                  target="_blank"
                ) AllAboutCookies
              li
               a(
                 href="http://www.networkadvertising.org/",
                 target="_blank"
               ) Network Advertising Initiative
</template>

<script>
import ContentBlock from "../components/Content/ContentBlock";
import Container from "../components/Container/Container.vue";
export default {
  name: "CookiePolicy",
  components: { ContentBlock, Container }
};
</script>

<style scoped>
#cookie-policy {
  margin-top: 2.5%;
  margin-bottom: 2.5%;
}
</style>
