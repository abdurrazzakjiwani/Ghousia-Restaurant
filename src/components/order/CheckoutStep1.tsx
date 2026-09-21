"use client";

import { useState, useEffect } from "react";
import { CartItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import OrderSummary from "@/components/order/OrderSummary";
import OrderModeSelector from "@/components/order/OrderModeSelector";
import OrderDetailsForm from "@/components/order/OrderDetailsForm";
import BranchSelector from "@/components/order/BranchSelector";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface CheckoutDetails {
  customer_name: string;
  phone: string;
  email: string;
  order_mode: "delivery" | "pickup" | "dine-in";
  address: string;
  branch: string;
  notes: string;
}

interface CheckoutStep1Props {
  items: CartItem[];
  total: number;
  onUpdateQuantity: (menuItemId: string, qty: number) => void;
  onRemove: (menuItemId: string) => void;
  onNext: (details: CheckoutDetails) => void;
  onBackToMenu: () => void;
}

export default function CheckoutStep1({
  items,
  total,
  onUpdateQuantity,
  onRemove,
  onNext,
  onBackToMenu,
}: CheckoutStep1Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [orderMode, setOrderMode] = useState("delivery");
  const [address, setAddress] = useState("");
  const [branch, setBranch] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem("ghousia-delivery-address");
    if (stored) setAddress(stored);
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name || name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!phone || !/^(03\d{2}-?\d{7}|\+92\d{10})$/.test(phone.replace(/\s/g, ""))) {
      newErrors.phone = "Enter a valid Pakistani phone number (03XX-XXXXXXX)";
    }
    if (orderMode === "delivery" && !address) {
      newErrors.address = "Delivery address is required";
    }
    if ((orderMode === "pickup" || orderMode === "dine-in") && !branch) {
      newErrors.branch = "Please select a branch";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      onNext({
        customer_name: name,
        phone,
        email,
        order_mode: orderMode as "delivery" | "pickup" | "dine-in",
        address,
        branch,
        notes,
      });
    }
  };

  return (
    <div className="space-y-6">
      <OrderSummary
        items={items}
        total={total}
        onUpdateQuantity={onUpdateQuantity}
        onRemove={onRemove}
      />

      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <OrderModeSelector selected={orderMode} onSelect={setOrderMode} />
      </div>

      {(orderMode === "pickup" || orderMode === "dine-in") && (
      <div className="border-t border-gray-200 pt-6">
          <BranchSelector selected={branch} onSelect={setBranch} />
          {errors.branch && (
            <p className="text-red-500 text-xs mt-1">{errors.branch}</p>
          )}
        </div>
      )}

      <div className="border-t border-gray-200 pt-6">
        <OrderDetailsForm
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          address={address}
          setAddress={setAddress}
          notes={notes}
          setNotes={setNotes}
          isDelivery={orderMode === "delivery"}
          errors={errors}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 font-semibold hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Menu
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-gradient-start to-gradient-end text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Continue to Confirm
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
