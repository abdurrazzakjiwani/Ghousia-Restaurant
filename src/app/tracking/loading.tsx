import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Skeleton className="h-8 w-48 mb-6" />
      <Skeleton className="h-4 w-80 mb-8" />
      <div className="max-w-lg space-y-4 mb-8">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full shrink-0" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-1 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
