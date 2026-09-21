import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "to, subject, and html are required",
          },
        },
        { status: 400 }
      );
    }

    const data = await sendEmail({ to, subject, html });

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          code: "EMAIL_ERROR",
          message:
            error instanceof Error ? error.message : "Failed to send email",
        },
      },
      { status: 500 }
    );
  }
}
