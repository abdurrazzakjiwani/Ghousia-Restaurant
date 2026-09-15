import { NextRequest, NextResponse } from "next/server";
import { getGroq, CHAT_SYSTEM_PROMPT } from "@/lib/groq";
import { detectOrderIntent } from "@/lib/order-detection";
import { generateChatOrderUrl } from "@/lib/utils";

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

    const orderIntent = detectOrderIntent(message);

    if (orderIntent.is_valid) {
      const orderUrl = generateChatOrderUrl(orderIntent.items);
      const itemList = orderIntent.items
        .map((item) => `${item.quantity}x ${item.name} - Rs. ${item.subtotal.toLocaleString("en-PK")}`)
        .join("\n");
      const response = `Great choice! Here's your order:\n\n${itemList}\n\nTotal: Rs. ${orderIntent.total.toLocaleString("en-PK")}\n\nClick the button below to send your order on WhatsApp.`;

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
        { role: "system", content: CHAT_SYSTEM_PROMPT },
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
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      });

      const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";

      return NextResponse.json({
        session_id,
        response,
      });
    } catch {
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
