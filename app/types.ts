import { Message } from "ai";

export type ChatMessageRoles = Message["role"];

export enum Models {
  claudeOpus4 = "claude-opus-4-20250514",
  claudeSonnet4 = "claude-sonnet-4-20250514",
}

export type Attachment = {
  contentType?: string;
  url: string;
  name?: string;
};
