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

export const initialState: SearchState = {
  term: undefined,
  headlines: [],
  page: 1,
  limit: 10,
  count: 0,
  sentiment: Sentiment.POSITIVE,
  isAllSearchHeadlines: false
};
