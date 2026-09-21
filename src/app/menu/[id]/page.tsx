"use client";

import { useState, useCallback } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { menuItems } from "@/lib/menu-data";
import { generateFullOrderMessage } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "motion/react";
import QuantitySelector from "@/components/order/QuantitySelector";
import OrderModeSelector from "@/components/order/OrderModeSelector";
import BranchSelector from "@/components/order/BranchSelector";
import OrderDetailsForm from "@/components/order/OrderDetailsForm";
import MapPicker from "@/components/order/MapPicker";
import OrderConfirmation from "@/components/order/OrderConfirmation";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";

type Step = "details" | "mode" | "info" | "confirm";

export default function ProductPage({ params }: { params: { id: string } }) {
  const item = menuItems.find((i) => i.id === params.id);
  if (!item || !item.is_available) notFound();

  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<Step>("details");
  const [orderMode, setOrderMode] = useState("delivery");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDelivery = orderMode === "delivery";
  const isPickupOrDineIn = orderMode === "pickup" || orderMode === "dine-in";

  const totalAmount = item.price * quantity;

  const validateStep = (): boolean => {
    const errors: Record<string, string> = {};
    if (!customerName.trim()) errors.name = "Name is required";
    if (!customerPhone.trim()) errors.phone = "Phone is required";
    if (isDelivery && !address.trim()) errors.address = "Address is required for delivery";
    if (isPickupOrDineIn && !selectedBranch) errors.branch = "Please select a branch";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === "details" && validateStep()) {
      setStep("mode");
    } else if (step === "mode") {
      setStep("info");
    } else if (step === "info") {
      setStep("confirm");
    }
  };

  const handleBack = () => {
    if (step === "mode") setStep("details");
    else if (step === "info") setStep("mode");
    else if (step === "confirm") setStep("info");
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const items = [{ name: item.name, quantity, price: item.price }];
      const { data, error } = await supabase
        .from("customer_orders")
        .insert({
          customer_name: customerName,
          phone: customerPhone,
          order_mode: orderMode,
          branch: selectedBranch || null,
          address: address || null,
          latitude: latitude,
          longitude: longitude,
          items,
          total_amount: totalAmount,
          notes: notes || null,
        })
        .select()
        .single();

      if (error) throw error;

      const whatsappUrl = `https://wa.me/923013631555?text=${encodeURIComponent(
        generateFullOrderMessage({
          customer_name: customerName,
          phone: customerPhone,
          order_mode: orderMode as "delivery" | "pickup" | "dine-in",
          branch: selectedBranch || undefined,
          address: address || undefined,
          latitude: latitude || undefined,
          longitude: longitude || undefined,
          items,
          total_amount: totalAmount,
          notes: notes || undefined,
        })
      )}`;

      window.open(whatsappUrl, "_blank");
    } catch (err) {
      console.error("Order submission failed:", err);
      alert("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCart = () => {
    addItem({
      menu_item_id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
    });
  };

  const stepLabels = ["Details", "Mode", "Info", "Confirm"];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/menu"
        className="inline-flex items-center text-gradient-start hover:text-gradient-end font-semibold transition-colors mb-6"
      >
        ← Back to Menu
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          {stepLabels.map((label, i) => (
            <motion.div
              key={label}
              animate={{
                backgroundColor:
                  i <=
                  ["details", "mode", "info", "confirm"].indexOf(step)
                    ? "var(--tw-gradient-from)"
                    : "#e5e7eb",
                color: i <= ["details", "mode", "info", "confirm"].indexOf(step) ? "white" : "#6b7280",
              }}
              className={`h-2 rounded-full transition-all ${
                i <= ["details", "mode", "info", "confirm"].indexOf(step)
                  ? "w-12"
                  : "w-2 bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden">
          {item.image_url && (
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>

        <AnimatePresence mode="wait">
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
              {item.description && (
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {item.description}
                </p>
              )}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold bg-linear-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
                  {formatPrice(item.price)}
                </span>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Quantity
                </label>
                <QuantitySelector />
              </div>

              <OrderDetailsForm
                name={customerName}
                setName={setCustomerName}
                phone={customerPhone}
                setPhone={setCustomerPhone}
                email={customerEmail}
                setEmail={setCustomerEmail}
                address={address}
                setAddress={setAddress}
                notes={notes}
                setNotes={setNotes}
                isDelivery={false}
                errors={formErrors}
              />

              <div className="flex flex-col gap-3 mt-6">
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full text-center"
                >
                  Continue →
                </motion.button>
                <button
                  onClick={handleAddToCart}
                  className="btn-secondary w-full text-center"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          )}

          {step === "mode" && (
            <motion.div
              key="mode"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {formatPrice(item.price)} × {quantity} ={" "}
                <span className="font-bold">{formatPrice(totalAmount)}</span>
              </p>
              <OrderModeSelector selected={orderMode} onSelect={setOrderMode} />
              <div className="flex flex-col gap-3 mt-6">
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full text-center"
                >
                  Continue →
                </motion.button>
                <motion.button
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary w-full text-center"
                >
                  ← Back
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Delivery Info</h2>
              <OrderDetailsForm
                name={customerName}
                setName={setCustomerName}
                phone={customerPhone}
                setPhone={setCustomerPhone}
                email={customerEmail}
                setEmail={setCustomerEmail}
                address={address}
                setAddress={setAddress}
                notes={notes}
                setNotes={setNotes}
                isDelivery={isDelivery}
                errors={formErrors}
              />

              {isDelivery ? (
                <div className="mt-4">
                  <MapPicker onLocationSelect={(lat, lng) => { setLatitude(lat); setLongitude(lng); }} />
                </div>
              ) : (
                <div className="mt-4">
                  <BranchSelector selected={selectedBranch} onSelect={setSelectedBranch} />
                  {formErrors.branch && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.branch}</p>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-3 mt-6">
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full text-center"
                >
                  Confirm Order →
                </motion.button>
                <motion.button
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary w-full text-center"
                >
                  ← Back
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Confirm Order</h2>
              <OrderConfirmation
                customerName={customerName}
                customerPhone={customerPhone}
                orderMode={orderMode}
                branch={selectedBranch}
                address={address}
                latitude={latitude}
                longitude={longitude}
                items={[{ name: item.name, quantity, price: item.price }]}
                totalAmount={totalAmount}
                notes={notes}
                onConfirm={handleConfirm}
                isSubmitting={isSubmitting}
              />
              <div className="flex flex-col gap-3 mt-4">
                <motion.button
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary w-full text-center"
                >
                  ← Back
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
