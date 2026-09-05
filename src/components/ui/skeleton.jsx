import { cn } from "@/lib/utils";

export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-gray-200 dark:bg-slate-700",
        className
      )}
      aria-label="Loading"
      role="status"
    />
  );
}
