import axios from "axios";
import { Headline } from "@/store/headlines";

export class HeadlineAPI {
  baseUrl = `${process.env.VUE_APP_GOOD_NEWS_API_URL}/headlines`;

  async getHeadlines(sentiment: string): Promise<Headline[]> {
    const url = `${this.baseUrl}/sentiment/${sentiment}`;
    const response = await axios.get(url);

    if (response.status > 299) {
      throw new Error("Could not fetch headlines");
    }

    const headlines: {
      headline: string;
      link: string;
      origin: string;
      displayImage: string;
      publishedAt: string;
      semanticValue: number;
      id: number;
    }[] = response.data.headlines;

    return headlines.map(
      ({ displayImage, publishedAt, semanticValue, ...rest }) => {
        return {
          displayImagePath: displayImage,
          publishedAt: new Date(publishedAt),
          semanticValue: `${Math.round(semanticValue * 100)}%`,
          ...rest
        };
      }
    );
  }
}
