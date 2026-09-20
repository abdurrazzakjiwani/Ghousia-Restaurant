interface OrderConfirmationProps {
  orderNumber: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
}

export function renderOrderConfirmation({
  orderNumber,
  items,
  totalAmount,
}: OrderConfirmationProps): string {
  const itemsHtml = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px;border-bottom:1px solid #eee">${item.name}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">Rs. ${(item.price * item.quantity).toLocaleString()}</td>
        </tr>`
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
      <div style="background:#f97316;color:white;padding:20px;border-radius:8px 8px 0 0;text-align:center">
        <h1 style="margin:0;font-size:24px">✅ Order Confirmed!</h1>
        <p style="margin:8px 0 0;opacity:0.9">#${orderNumber}</p>
      </div>
      <div style="border:1px solid #eee;border-top:none;padding:20px;border-radius:0 0 8px 8px">
        <p style="font-size:16px;color:#333;margin:0 0 16px">Thank you for your order! We&apos;re preparing your food.</p>
        <h2 style="margin:0 0 16px;font-size:18px;color:#333">Order Summary</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <thead>
            <tr style="background:#f9f9f9">
              <th style="padding:8px;text-align:left">Item</th>
              <th style="padding:8px;text-align:center">Qty</th>
              <th style="padding:8px;text-align:right">Price</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
          <tfoot>
            <tr style="background:#f9f9f9;font-weight:bold">
              <td colspan="2" style="padding:8px">Total</td>
              <td style="padding:8px;text-align:right">Rs. ${totalAmount.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
        <div style="text-align:center;margin-top:24px">
          <a href="${typeof window !== "undefined" ? window.location.origin : "https://ghousiagoldenweb.vercel.app"}/tracking?order=${orderNumber}" style="display:inline-block;padding:12px 24px;background:#f97316;color:white;text-decoration:none;border-radius:8px;font-weight:bold">
            Track Your Order
          </a>
        </div>
        <p style="font-size:13px;color:#666;margin-top:16px;text-align:center">
          Estimated preparation time: 30 minutes
        </p>
      </div>
    </body>
    </html>
  `;
}
