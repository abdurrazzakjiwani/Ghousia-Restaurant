"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import CheckoutStep1, { CheckoutDetails } from "@/components/order/CheckoutStep1";
import CheckoutStep2 from "@/components/order/CheckoutStep2";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function OrderPage() {
  const { items, total, updateQuantity, removeItem, itemCount } = useCart();
  const [step, setStep] = useState<"details" | "confirm">("details");
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails | null>(null);

  const handleNext = (details: CheckoutDetails) => {
    setCheckoutDetails(details);
    setStep("confirm");
  };

  const handleBack = () => {
    setStep("details");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Order</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {step === "details"
            ? "Review your cart and fill in your details"
            : "Confirm your order and place it via WhatsApp"}
        </p>
        {step === "confirm" && (
          <div className="flex items-center gap-2 mt-3">
            <div className="h-1 flex-1 rounded-full bg-green-500" />
            <div className="h-1 flex-1 rounded-full bg-green-500" />
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add items from our menu to get started</p>
          <Link href="/menu" className="btn-primary inline-flex items-center gap-2">
            Browse Menu
          </Link>
        </div>
      ) : step === "details" ? (
        <CheckoutStep1
          items={items}
          total={total}
          onUpdateQuantity={updateQuantity}
          onRemove={removeItem}
          onNext={handleNext}
          onBackToMenu={() => (window.location.href = "/menu")}
        />
      ) : (
        checkoutDetails && (
          <CheckoutStep2
            items={items}
            total={total}
            details={checkoutDetails}
            onBack={handleBack}
          />
        )
      )}
    </div>
  );
}
