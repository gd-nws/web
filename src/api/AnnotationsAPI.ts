import axios, { AxiosResponse } from "axios";
import { Annotation } from "@/store/annotations";

export class AnnotationsAPI {
  baseUrl = `${process.env.VUE_APP_GOOD_NEWS_API_URL}/annotations`;
  async getAnnotationsForSessions(sessionToken: string): Promise<Annotation[]> {
    let response: AxiosResponse;
    try {
      response = await axios.get(`${this.baseUrl}/sessions/${sessionToken}`);
    } catch (e) {
      // TODO: Handle this properly.
      // eslint-disable-next-line no-console
      console.error(e);
      throw e;
    }

    const { annotations } = response.data;
    return annotations;
  }

  async annotateHeadline(
    sentiment: string,
    headlineId: number,
    sessionToken: string
  ) {
    await axios.post(`${this.baseUrl}/${headlineId}`, {
      annotation: sentiment,
      sessionToken
    });
  }
}
