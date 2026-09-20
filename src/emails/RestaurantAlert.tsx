interface RestaurantAlertProps {
  orderNumber: string;
  customerName: string;
  phone: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  address: string | null;
  orderMode: string;
}

export function renderRestaurantAlert({
  orderNumber,
  customerName,
  phone,
  items,
  totalAmount,
  address,
  orderMode,
}: RestaurantAlertProps): string {
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
      <div style="background:#f97316;color:white;padding:20px;border-radius:8px 8px 0 0">
        <h1 style="margin:0;font-size:24px">🍽️ New Order!</h1>
        <p style="margin:8px 0 0;opacity:0.9">#${orderNumber}</p>
      </div>
      <div style="border:1px solid #eee;border-top:none;padding:20px;border-radius:0 0 8px 8px">
        <h2 style="margin:0 0 16px;font-size:18px;color:#333">Customer Details</h2>
        <table style="width:100%;font-size:14px;margin-bottom:16px">
          <tr><td style="color:#666;padding:4px 0">Name</td><td style="font-weight:bold">${customerName}</td></tr>
          <tr><td style="color:#666;padding:4px 0">Phone</td><td style="font-weight:bold">${phone}</td></tr>
          <tr><td style="color:#666;padding:4px 0">Mode</td><td style="font-weight:bold;text-transform:capitalize">${orderMode}</td></tr>
          ${address ? `<tr><td style="color:#666;padding:4px 0">Address</td><td style="font-weight:bold">${address}</td></tr>` : ""}
        </table>
        <h2 style="margin:0 0 16px;font-size:18px;color:#333">Order Items</h2>
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
      </div>
    </body>
    </html>
  `;
}
