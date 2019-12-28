import { HeadlineState } from "@/store/headlines";
import { ContentState } from "@/store/content";

export interface State {
  headlines: HeadlineState;
  content: ContentState;
}
