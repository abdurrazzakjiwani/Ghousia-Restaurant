import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer_name, phone, date, time, guests, notes } = body;

    if (!customer_name || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "All fields are required" } },
        { status: 400 }
      );
    }

    if (guests < 1 || guests > 20) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Guests must be between 1 and 20" } },
        { status: 400 }
      );
    }

    // Validate date is not in the past
    const reservationDate = new Date(date);
    if (reservationDate < new Date(new Date().toDateString())) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Date must be today or in the future" } },
        { status: 400 }
      );
    }

    // In production, save to Supabase
    return NextResponse.json(
      {
        id: crypto.randomUUID(),
        customer_name,
        phone,
        date,
        time,
        guests,
        status: "pending",
        notes: notes || null,
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
