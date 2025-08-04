import { ArtifactoSystemPrompt } from "@/app/api/chat/systemPrompt";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, convertToCoreMessages, Message, ImagePart } from "ai";
import { Models } from "@/app/types";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  let llm;
  let options: Record<string, any> = {};

  if (model === Models.claudeOpus4 || model === Models.claudeSonnet4) {
    const anthropic = createAnthropic({
      apiKey,
    });

    llm = anthropic(model);

    options = {
      ...options,
      maxTokens: 8192,
    };
  }

  if (!llm) throw new Error(`Unsupported model: ${model}`);

  const initialMessages = messages.slice(0, -1);
  const currentMessage: Message = messages[messages.length - 1];
  const attachments = currentMessage.experimental_attachments || [];
  const imageParts: ImagePart[] = attachments.map((file) => ({
    type: "image",
    image: new URL(file.url),
  }));

  const result = await streamText({
    model: llm,
    messages: [
      ...convertToCoreMessages(initialMessages),
      {
        role: "user",
        content: [
          {
            type: "text",
            text: currentMessage.content,
          },
          ...imageParts,
        ],
      },
    ],
    system: ArtifactoSystemPrompt,
    ...options,
  });

  return result.toAIStreamResponse();
}
