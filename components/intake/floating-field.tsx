"use client";

import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FloatingFieldProps = {
  id: string;
  label: string;
  error?: string;
  counter?: string;
  index?: number;
  children: React.ReactNode;
  className?: string;
};

export function FloatingField({ id, label, error, counter, index, children, className }: FloatingFieldProps) {
  return (
    <div className={cn("space-y-3 rounded-lg border border-slate-200/80 bg-white/58 p-4 shadow-sm backdrop-blur", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {typeof index === "number" ? (
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-[11px] font-semibold text-slate-400 shadow-sm">
              {String(index).padStart(2, "0")}
            </span>
          ) : null}
          <label htmlFor={id} className="text-left text-sm font-semibold leading-6 text-slate-950">
            {label}
          </label>
        </div>
        {counter ? (
          <span className="hidden shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-400 sm:inline-flex">
            {counter}
          </span>
        ) : null}
      </div>
      {children}
      <div className="flex min-h-5 items-start justify-between gap-3">
        {error ? (
          <p className="flex items-center gap-1.5 text-xs font-medium text-red-600" role="alert">
            <AlertCircle className="size-3.5" />
            {error}
          </p>
        ) : (
          <span />
        )}
        {counter ? <p className="shrink-0 text-xs text-slate-400 sm:hidden">{counter}</p> : null}
      </div>
    </div>
  );
}
