import { Headline, Sentiment } from "@/store/headlines";

export interface SearchState {
  term?: string;
  headlines: Headline[];
  page: number;
  limit: number;
  count: number;
  sentiment: Sentiment;
  isAllSearchHeadlines: boolean;
}
