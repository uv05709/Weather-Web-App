"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function LoadingWeather() {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-8">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200/50 bg-white/60 p-6 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/60 sm:p-8">
        <div className="flex items-start justify-between">
          <div><Skeleton className="h-8 w-40" /><Skeleton className="mt-2 h-4 w-24" /></div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div><Skeleton className="h-20 w-32" /><Skeleton className="mt-2 h-4 w-48" /></div>
          <Skeleton className="h-20 w-20 rounded-full" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl p-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2"><Skeleton className="h-3 w-16" /><Skeleton className="h-5 w-12" /></div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-4xl">
        <Skeleton className="mb-4 h-6 w-36" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200/50 bg-white/60 p-4 dark:border-slate-700/50 dark:bg-slate-800/60">
              <Skeleton className="h-5 w-5 rounded" /><Skeleton className="mt-2 h-3 w-16" /><Skeleton className="mt-1 h-6 w-20" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-4xl">
        <Skeleton className="mb-4 h-6 w-36" />
        <div className="flex gap-3 overflow-hidden sm:grid sm:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="min-w-[140px] rounded-xl border border-gray-200/50 bg-white/60 p-4 dark:border-slate-700/50 dark:bg-slate-800/60">
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-4 w-12" /><Skeleton className="h-3 w-16" /><Skeleton className="my-1 h-10 w-10 rounded-full" />
                <Skeleton className="h-3 w-20" /><Skeleton className="h-6 w-16" /><Skeleton className="h-3 w-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
