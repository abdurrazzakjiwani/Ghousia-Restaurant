import { Suspense } from "react";
import TrackingClientContent from "@/components/tracking/TrackingClientContent";

function TrackingContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your order number or phone number to check your order status
        </p>
      </div>

      <TrackingClientContent />
    </div>
  );
}

function TrackingLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your order number or phone number to check your order status
        </p>
      </div>
      <div className="text-center py-12 text-gray-500">Loading...</div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<TrackingLoading />}>
      <TrackingContent />
    </Suspense>
  );
}
