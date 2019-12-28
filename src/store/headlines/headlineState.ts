export interface Headline {
  headline: string;
  id: number;
  origin: string;
  displayImagePath: string;
  link: string;
  publishedAt: Date;
  semanticValue: string;
}

export interface HeadlineState {
  headlines: Headline[];
  sentiment: string;
}
