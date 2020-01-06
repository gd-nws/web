import axios from "axios";
import { Headline } from "@/store/headlines";

export class HeadlineAPI {
  baseUrl = `${process.env.VUE_APP_GOOD_NEWS_API_URL}/headlines`;

  async getHeadlines(
    sentiment: string,
    limit: number,
    page: number,
    date: Date
  ): Promise<{ count: number; headlines: Headline[] }> {
    const url = `${
      this.baseUrl
    }/sentiment/${sentiment}?limit=${limit}&page=${page}&date=${date.toISOString()}`;
    const response = await axios.get(url);

    if (response.status > 299) {
      throw new Error("Could not fetch headlines");
    }

    type headlineResponse = {
      headline: string;
      link: string;
      origin: string;
      displayImage: string;
      publishedAt: string;
      semanticValue: number;
      id: number;
    }[];
    const headlines: headlineResponse = response.data.headlines;
    const count: number = response.data.count;

    return {
      count,
      headlines: headlines.map(
        ({ displayImage, publishedAt, semanticValue, ...rest }) => {
          return {
            displayImagePath: displayImage,
            publishedAt: new Date(publishedAt),
            semanticValue: `${Math.round(semanticValue * 100)}%`,
            ...rest
          };
        }
      )
    };
  }
}
