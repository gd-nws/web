import axios from "axios";

export class AnnotationsAPI {
  baseUrl = `${process.env.VUE_APP_GOOD_NEWS_API_URL}/headlines`;

  async annotateHeadline(
    sentiment: string,
    headlineId: number,
    sessionToken: string
  ) {
    await axios.post(`${this.baseUrl}/${headlineId}/annotations`, {
      annotation: sentiment,
      sessionToken
    });
  }
}
