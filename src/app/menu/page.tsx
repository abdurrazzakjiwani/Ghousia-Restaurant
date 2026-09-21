import { Suspense } from "react";
import MenuClientContent from "@/components/menu/MenuClientContent";

function MenuContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore our wide selection of Pakistani and Chinese dishes
        </p>
      </div>

      <MenuClientContent />
    </div>
  );
}

function MenuLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore our wide selection of Pakistani and Chinese dishes
        </p>
      </div>
      <div className="text-center py-12 text-gray-500">Loading menu...</div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<MenuLoading />}>
      <MenuContent />
    </Suspense>
  );
}
