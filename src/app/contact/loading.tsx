import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Skeleton className="h-8 w-48 mb-6" />
      <Skeleton className="h-4 w-64 mb-8" />
      <div className="max-w-lg space-y-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  );
}
