import { NextRequest, NextResponse } from "next/server";
import { getGroq, buildSystemPrompt } from "@/lib/groq";
import { detectOrderIntent } from "@/lib/order-detection";
import { generateChatOrderUrl } from "@/lib/utils";
import { isAbusive, isRestaurantContext, getOffTopicRefusal, getAbuseRefusal } from "@/lib/guardrails";

const MAX_MESSAGE_LENGTH = 500;

const CLOSING_SALUTATIONS = ["JazakAllah Sir", "Thank you", "Shukriya"];
let lastClosingIndex = -1;

function shouldAddClosing(historyLength: number): boolean {
  return historyLength > 0 && historyLength % 3 === 0;
}

function pickClosing(): string {
  let index: number;
  do {
    index = Math.floor(Math.random() * CLOSING_SALUTATIONS.length);
  } while (index === lastClosingIndex && CLOSING_SALUTATIONS.length > 1);
  lastClosingIndex = index;
  return CLOSING_SALUTATIONS[index];
}

function addClosingIfAppropriate(response: string, historyLength: number): string {
  const trimmed = response.trimEnd();
  const alreadyEndsWithClosing = CLOSING_SALUTATIONS.some(
    (s) => trimmed.endsWith(s)
  );
  if (alreadyEndsWithClosing) return trimmed;
  if (!shouldAddClosing(historyLength)) return trimmed;
  return `${trimmed}\n\n${pickClosing()}`;
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { session_id, message, history } = await request.json();

    if (!session_id || !message) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "session_id and message are required" } },
        { status: 400 }
      );
    }

    if (typeof message === "string" && message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({
        session_id,
        response: `Your message is too long. Please keep your message under ${MAX_MESSAGE_LENGTH} characters. How can I help you with Ghousia Golden Spoon restaurant?`,
      });
    }

    if (isAbusive(message)) {
      return NextResponse.json({
        session_id,
        response: getAbuseRefusal(),
      });
    }

    if (!isRestaurantContext(message)) {
      return NextResponse.json({
        session_id,
        response: getOffTopicRefusal(),
      });
    }

    const orderIntent = detectOrderIntent(message);

    if (orderIntent.is_valid) {
      const orderUrl = generateChatOrderUrl(orderIntent.items);
      const itemList = orderIntent.items
        .map((item) => `${item.quantity}x ${item.name} - Rs. ${item.subtotal.toLocaleString("en-PK")}`)
        .join("\n");
      const closing = shouldAddClosing(history?.length ?? 0) ? `\n\n${pickClosing()}` : "";
      const response = `Great choice! Here's your order:\n\n${itemList}\n\nTotal: Rs. ${orderIntent.total.toLocaleString("en-PK")}\n\nClick the button below to send your order on WhatsApp.${closing}`;

      return NextResponse.json({
        session_id,
        response,
        orderUrl,
        orderItems: orderIntent.items,
        orderTotal: orderIntent.total,
      });
    }

    try {
      const messages: ChatMessage[] = [
        { role: "system", content: buildSystemPrompt() },
      ];

      if (Array.isArray(history)) {
        const recentHistory = history.slice(-10);
        for (const msg of recentHistory) {
          if (msg.role === "user" || msg.role === "assistant") {
            messages.push({ role: msg.role, content: msg.content });
          }
        }
      }

      messages.push({ role: "user", content: message });

      const completion = await getGroq().chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      });

      let response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";
      response = addClosingIfAppropriate(response, history?.length ?? 0);

      return NextResponse.json({
        session_id,
        response,
      });
    } catch (error) {
      console.error("Groq API error:", error);
      return NextResponse.json({
        session_id,
        response: "Thank you for your message! Our AI assistant is temporarily unavailable. Please call us at 0301-3631555 or use the WhatsApp button to place your order directly.",
      });
    }
  } catch {
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Internal server error" } },
      { status: 500 }
    );
  }
}
