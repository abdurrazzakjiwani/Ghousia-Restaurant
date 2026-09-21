import { supabase } from "@/lib/supabase";

function getPakistaniDate(): string {
  const now = new Date();
  const pkt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  return pkt.replace(/-/g, "");
}

export async function generateOrderNumber(): Promise<string> {
  const today = getPakistaniDate();
  const prefix = `GGS-${today}`;

  const { count } = await supabase
    .from("customer_orders")
    .select("*", { count: "exact", head: true })
    .like("order_number", `${prefix}-%`);

  const seq = (count || 0) + 1;
  return `${prefix}-${String(seq).padStart(4, "0")}`;
}

export async function generateOrderNumberWithRetry(
  maxAttempts: number = 3
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const orderNumber = await generateOrderNumber();

      const { data: existing } = await supabase
        .from("customer_orders")
        .select("order_number")
        .eq("order_number", orderNumber)
        .single();

      if (!existing) {
        return orderNumber;
      }
    } catch {
      // Continue to next attempt
    }
  }

  throw new Error("Failed to generate unique order number after max attempts");
}
