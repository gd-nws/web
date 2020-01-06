import axios from "axios";

export class SessionAPI {
  baseUrl = `${process.env.VUE_APP_GOOD_NEWS_API_URL}/sessions`;

  async fetchSession() {
    let response;
    try {
      response = await axios.get(this.baseUrl);
    } catch (e) {
      // TODO: Display this with an error component.
      // eslint-disable-next-line no-console
      console.error(e);
      throw e;
    }

    if (response.status > 299) {
      throw new Error("Could not fetch session");
    }

    return response.data.sessionToken;
  }
}
