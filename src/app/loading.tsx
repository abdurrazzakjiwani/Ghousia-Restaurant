import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <Skeleton className="h-96 w-full rounded-2xl mb-12" />
      <Skeleton className="h-8 w-64 mx-auto mb-4" />
      <Skeleton className="h-4 w-96 mx-auto mb-12" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card p-4">
            <Skeleton className="aspect-square w-full rounded-lg mb-4" />
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
