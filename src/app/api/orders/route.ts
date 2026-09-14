import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get("phone");

  if (!phone) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: "Phone number is required" } },
      { status: 400 }
    );
  }

  // In production, query Supabase
  // For now, return mock data
  return NextResponse.json({
    orders: [
      {
        id: "mock-order-001",
        customer_name: "Customer",
        phone,
        order_status: "preparing",
        total_amount: 1200,
        items: [{ name: "Zinger Burger", quantity: 2, price: 600 }],
        created_at: new Date().toISOString(),
      },
    ],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer_name, phone, items, notes } = body;

    if (!customer_name || !phone || !items?.length) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Name, phone, and items are required" } },
        { status: 400 }
      );
    }

    // In production, save to Supabase
    return NextResponse.json(
      {
        id: crypto.randomUUID(),
        customer_name,
        phone,
        order_status: "pending",
        total_amount: items.reduce((sum: number, i: any) => sum + (i.price || 0) * (i.quantity || 1), 0),
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
