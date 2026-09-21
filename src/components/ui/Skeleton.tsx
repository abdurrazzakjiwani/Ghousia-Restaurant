import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
}

export default function Skeleton({
  className,
  width,
  height,
  rounded = "md",
}: SkeletonProps) {
  const roundedMap = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  return (
    <div
      className={cn(
        "bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-shimmer",
        roundedMap[rounded],
        className
      )}
      style={{ width, height }}
    />
  );
}
