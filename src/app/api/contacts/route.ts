import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Name and message are required" } },
        { status: 400 }
      );
    }

    // In production, save to Supabase
    // For now, return success
    return NextResponse.json(
      {
        id: crypto.randomUUID(),
        name,
        phone: phone || null,
        email: email || null,
        message,
        is_read: false,
        created_at: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Internal server error" } },
      { status: 500 }
    );
  }
}
