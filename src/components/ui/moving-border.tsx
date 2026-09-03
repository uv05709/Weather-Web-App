"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface MovingBorderProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
}

export function MovingBorder({
  children,
  className,
  containerClassName,
  borderClassName,
  duration = 4000,
}: MovingBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-2xl p-[1px]", containerClassName)}
    >
      <motion.div
        className={cn(
          "absolute inset-0 rounded-2xl",
          borderClassName
        )}
        style={{
          background:
            "conic-gradient(from var(--angle, 0deg), transparent 60%, rgba(59, 130, 246, 0.5) 80%, rgba(147, 51, 234, 0.5) 90%, transparent 100%)",
        }}
        animate={{
          "--angle": ["0deg", "360deg"],
        } as Record<string, string[]>}
        transition={{
          duration: duration / 1000,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative z-10 rounded-2xl bg-white dark:bg-slate-900",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
