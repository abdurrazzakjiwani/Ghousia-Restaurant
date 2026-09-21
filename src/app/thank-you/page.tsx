import { Suspense } from "react";
import ThankYouClientContent from "@/components/order/ThankYouClientContent";

function ThankYouContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <ThankYouClientContent />
    </div>
  );
}

function ThankYouLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-600 dark:text-gray-400">Loading your order...</p>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<ThankYouLoading />}>
      <ThankYouContent />
    </Suspense>
  );
}
