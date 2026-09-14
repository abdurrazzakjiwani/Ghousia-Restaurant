import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // In production, query Supabase for approved reviews
  const mockReviews = [
    {
      id: "1",
      customer_name: "Ahmed Khan",
      rating: 5,
      comment: "Best karahi in the area! Highly recommended.",
      is_approved: true,
      created_at: "2026-09-10T10:00:00Z",
    },
    {
      id: "2",
      customer_name: "Fatima Malik",
      rating: 5,
      comment: "Amazing BBQ platter. The seekh kebabs were perfect.",
      is_approved: true,
      created_at: "2026-09-08T14:00:00Z",
    },
    {
      id: "3",
      customer_name: "Usman Ali",
      rating: 4,
      comment: "Great food, fast delivery. Will order again!",
      is_approved: true,
      created_at: "2026-09-05T18:00:00Z",
    },
  ];

  return NextResponse.json({ reviews: mockReviews });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer_name, rating, comment } = body;

    if (!customer_name || !rating) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Name and rating are required" } },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Rating must be between 1 and 5" } },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        id: crypto.randomUUID(),
        customer_name,
        rating,
        comment: comment || null,
        is_approved: false,
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
