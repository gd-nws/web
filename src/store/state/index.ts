import { HeadlineState } from "@/store/headlines";
import { ContentState } from "@/store/content";
import { SessionState } from "@/store/session";
import { AnnotationsState } from "@/store/annotations";

export interface State {
  annotations: AnnotationsState;
  headlines: HeadlineState;
  content: ContentState;
  session: SessionState;
}
