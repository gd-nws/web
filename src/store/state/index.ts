import { HeadlineState } from "@/store/headlines";
import { ContentState } from "@/store/content";
import { SessionState } from "@/store/session";
import { AnnotationsState } from "@/store/annotations";
import { SearchState } from "@/store/search";
import { NotificationState } from "@/store/notification";
import { ThemeState } from "@/store/theme";

export interface State {
  annotations: AnnotationsState;
  headlines: HeadlineState;
  content: ContentState;
  notification: NotificationState;
  search: SearchState;
  session: SessionState;
  theme: ThemeState;
}
