export interface NotificationState {
  message: string;
  isVisible: boolean;
  messageLevel: MessageLevel;
  timeout: number;
}

export enum MessageLevel {
  Error,
  Warning,
  Info,
  Primary
}
