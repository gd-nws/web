export interface Headline {
  headline: string;
  id: string;
  origin: string;
  displayImagePath: string;
  link: string;
  publishedAt: Date;
  semanticValue: string;
  predictedClass: number;
  annotations: { vote: number; createdAt: Date }[];
}

export interface HeadlineState {
  headlines: Headline[];
  sentiment: Sentiment;
  lastDate: Date;
  limit: number;
  page: number;
  isAllHeadlines: boolean;
  selectedHeadline?: Headline;
}

export enum Sentiment {
  POSITIVE = "positive",
  NEGATIVE = "negative"
}

export const initialState: HeadlineState = {
  headlines: [],
  sentiment: Sentiment.POSITIVE,
  lastDate: new Date(),
  limit: 10,
  page: 1,
  isAllHeadlines: false,
  selectedHeadline: undefined
};
