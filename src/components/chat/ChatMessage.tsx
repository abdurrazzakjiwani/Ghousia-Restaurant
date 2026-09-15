import { cn } from "@/lib/utils";
import { OrderIntentItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  orderUrl?: string | null;
  orderItems?: OrderIntentItem[] | null;
  orderTotal?: number | null;
}

export default function ChatMessage({ role, content, orderUrl, orderItems, orderTotal }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
          role === "user"
            ? "bg-gradient-to-r from-gradient-start to-gradient-end text-white rounded-br-sm"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm"
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>

        {orderUrl && orderItems && orderItems.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-1 mb-3">
              {orderItems.map((item, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-medium">{formatPrice(item.subtotal)}</span>
                </div>
              ))}
              {orderTotal && (
                <div className="flex justify-between text-xs font-bold pt-1 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              )}
            </div>
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-colors w-full justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              Order on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
