import axios from "axios";
import { Headline } from "@/store/headlines";

export class HeadlineAPI {
  baseUrl = "http://api.gdnws.co.uk/headlines";
  async getHeadlines(sentiment: string): Promise<Headline[]> {
    const url = `${this.baseUrl}/sentiment/${sentiment}`;
    const response = await axios.get(url);

    if (response.status > 299) {
      throw new Error("Could not fetch headlines");
    }

    return response.data.data.headlines.map(
      (headline: {
        headline: string;
        link: string;
        origin: string;
        display_image: string;
        published_at: string;
        semantic_value: string;
      }) => {
        return {
          headline: headline.headline,
          link: headline.link,
          origin: headline.origin,
          displayImage: headline.display_image,
          publishedAt: new Date(headline.published_at),
          semanticValue: headline.semantic_value
        };
      }
    );
  }
}
