"use client";

import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FloatingFieldProps = {
  id: string;
  label: string;
  error?: string;
  counter?: string;
  children: React.ReactNode;
  className?: string;
};

export function FloatingField({ id, label, error, counter, children, className }: FloatingFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="group relative">
        {children}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-2 text-xs font-medium text-slate-500 transition-all group-focus-within:text-blue-600"
        >
          {label}
        </label>
      </div>
      <div className="flex min-h-5 items-start justify-between gap-3 px-1">
        {error ? (
          <p className="flex items-center gap-1.5 text-xs font-medium text-red-600" role="alert">
            <AlertCircle className="size-3.5" />
            {error}
          </p>
        ) : (
          <span />
        )}
        {counter ? <p className="shrink-0 text-xs text-slate-400">{counter}</p> : null}
      </div>
    </div>
  );
}
