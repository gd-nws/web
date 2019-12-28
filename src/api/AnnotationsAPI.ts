import axios, { AxiosResponse } from "axios";
import { Annotation } from "@/store/annotations";

interface AnnotationPayload {
  annotations: { headline_id: number; vote: number }[];
}

export class AnnotationsAPI {
  baseUrl = "https://api.gdnws.co.uk/annotations";
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

    const { annotations }: AnnotationPayload = response.data;
    return annotations.map(({ headline_id, vote }) => {
      return {
        headlineId: headline_id,
        vote
      };
    });
  }

  async annotateHeadline(
    sentiment: string,
    headlineId: number,
    sessionToken: string
  ) {
    const url = `${this.baseUrl}/${headlineId}`;

    try {
      await axios.post(
        url,
        {
          annotation: sentiment
        },
        { headers: { "x-session-token": sessionToken } }
      );
    } catch (e) {
      // TODO: Handle this properly.
      // eslint-disable-next-line no-console
      console.error(e);
      throw e;
    }
  }
}
