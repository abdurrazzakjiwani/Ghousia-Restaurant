import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Skeleton className="h-8 w-64 mb-6" />
      <Skeleton className="h-4 w-96 mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="bg-linear-to-br from-gradient-start to-gradient-end rounded-2xl p-8">
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 text-center">
                <Skeleton className="h-8 w-20 mx-auto mb-2 bg-white/20" />
                <Skeleton className="h-4 w-24 mx-auto bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
