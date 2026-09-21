import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateOrderNumberWithRetry } from "@/lib/orders";

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get("phone");
  const orderNumber = request.nextUrl.searchParams.get("order_number");

  if (!phone && !orderNumber) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Phone number or order number is required",
        },
      },
      { status: 400 }
    );
  }

  let query = supabase.from("customer_orders").select("*");

  if (orderNumber) {
    query = query.eq("order_number", orderNumber);
  } else if (phone) {
    query = query.eq("phone", phone);
  }

  const { data, error } = await query
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: error.message } },
      { status: 500 }
    );
  }

  if (!data || data.length === 0) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Order not found" } },
      { status: 404 }
    );
  }

  return NextResponse.json({ orders: data });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customer_name,
      phone,
      customer_email,
      order_mode,
      branch,
      address,
      latitude,
      longitude,
      items,
      total_amount,
      notes,
    } = body;

    if (!customer_name || !phone || !items?.length || !order_mode) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Name, phone, items, and order mode are required",
          },
        },
        { status: 400 }
      );
    }

    if (!["delivery", "pickup", "dine-in"].includes(order_mode)) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Order mode must be delivery, pickup, or dine-in",
          },
        },
        { status: 400 }
      );
    }

    const order_number = await generateOrderNumberWithRetry();

    const { data, error } = await supabase
      .from("customer_orders")
      .insert({
        order_number,
        customer_name,
        phone,
        customer_email: customer_email || null,
        order_mode,
        branch: branch || null,
        address: address || null,
        latitude: latitude || null,
        longitude: longitude || null,
        items,
        total_amount,
        order_status: "pending",
        payment_method: "cash_on_delivery",
        notes: notes || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: { code: "SERVER_ERROR", message: error.message } },
        { status: 500 }
      );
    }

    try {
      const { sendRestaurantAlert, sendCustomerConfirmation } = await import(
        "@/lib/email/send"
      );
      await sendRestaurantAlert({
        orderNumber: data.order_number,
        customerName: data.customer_name,
        phone: data.phone,
        items: data.items,
        totalAmount: data.total_amount,
        address: data.address,
        orderMode: data.order_mode,
      });
      if (data.customer_email) {
        await sendCustomerConfirmation({
          orderNumber: data.order_number,
          customerEmail: data.customer_email,
          items: data.items,
          totalAmount: data.total_amount,
        });
      }
    } catch (emailError) {
      console.error("Email sending failed (non-blocking):", emailError);
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Internal server error" } },
      { status: 500 }
    );
  }
}
