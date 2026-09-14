import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Address is required" } },
        { status: 400 }
      );
    }

    // Simple check: all Karachi addresses are deliverable
    const isKarachi = address.toLowerCase().includes("karachi");

    return NextResponse.json({
      deliverable: true,
      message: "Great news! We deliver to your area.",
      estimated_time: "45-60 minutes",
    });
  } catch {
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Internal server error" } },
      { status: 500 }
    );
  }
}
