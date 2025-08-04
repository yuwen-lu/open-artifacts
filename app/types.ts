import { Database } from "@/app/supabase.types";
import { Message } from "ai";

export type ChatMessageRoles = Message["role"];

export enum Models {
  claudeOpus4 = "claude-opus-4-20250514",
  claudeSonnet4 = "claude-sonnet-4-20250514",
}

export type Chat = Database["public"]["Tables"]["chats"]["Row"];

export type Attachment = {
  contentType?: string;
  url: string;
  name?: string;
};

export enum OAuthProviders {
  google = "google",
  github = "github",
}
