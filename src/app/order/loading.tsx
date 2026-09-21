import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Skeleton className="h-8 w-48 mb-6" />
      <Skeleton className="h-4 w-64 mb-8" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 card">
            <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
}
