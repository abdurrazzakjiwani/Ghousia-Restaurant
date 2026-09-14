import { NextRequest, NextResponse } from "next/server";
import { groq, CHAT_SYSTEM_PROMPT } from "@/lib/groq";

export async function POST(request: NextRequest) {
  try {
    const { session_id, message } = await request.json();

    if (!session_id || !message) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "session_id and message are required" } },
        { status: 400 }
      );
    }

    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: CHAT_SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      });

      const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";

      return NextResponse.json({
        session_id,
        response,
      });
    } catch (aiError) {
      // Fallback when Groq API is unavailable
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
