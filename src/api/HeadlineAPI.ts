import axios from "axios";
import { Headline } from "@/store/headlines";

interface RawHeadline {
  headline: string;
  link: string;
  origin: string;
  displayImage: string;
  publishedAt: string;
  semanticValue: number;
  id: number;
  predictedClass: number;
}

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
    }/?limit=${limit}&page=${page}&date=${date.toISOString()}&sentiment=${sentiment}`;
    const response = await axios.get(url);

    if (response.status > 299) {
      throw new Error("Could not fetch headlines");
    }

    const headlines: RawHeadline[] = response.data.headlines;
    const count: number = response.data.count;

    return {
      count,
      headlines: headlines.map(headline => this.formatHeadline(headline))
    };
  }

  async getHeadline(id: number) {
    const url = `${this.baseUrl}/${id}`;
    const response = await axios.get(url);

    if (response.status === 404) {
      return undefined;
    }

    if (response.status > 499) {
      throw new Error("Could not fetch headline");
    }

    return this.formatHeadline(response.data.headline);
  }

  async searchHeadlines(
    term: string,
    limit: number,
    page: number,
    sentiment: string
  ) {
    const url = `${this.baseUrl}/search?term=${term}&limit=${limit}&page=${page}&sentiment=${sentiment}`;
    const response = await axios.get(url);

    const headlines: RawHeadline[] = response.data.headlines;
    const count: number = response.data.count;

    return {
      count,
      headlines: headlines.map(headline => this.formatHeadline(headline))
    };
  }

  private formatHeadline(headline: RawHeadline): Headline {
    const { displayImage, publishedAt, semanticValue, ...rest } = headline;
    return {
      displayImagePath: displayImage,
      publishedAt: new Date(publishedAt),
      semanticValue: `${Math.round(semanticValue * 100)}%`,
      ...rest
    };
  }
}
