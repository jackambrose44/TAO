"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number;
  className?: string;
};

export function Progress({ value, className }: ProgressProps) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-200/70", className)}>
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-slate-950 via-blue-600 to-emerald-500"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 24 }}
      />
    </div>
  );
}
