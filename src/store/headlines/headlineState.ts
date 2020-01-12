export interface Headline {
  headline: string;
  id: number;
  origin: string;
  displayImagePath: string;
  link: string;
  publishedAt: Date;
  semanticValue: string;
  predictedClass: number;
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
