"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: readonly SelectOption[];
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, children, ...props }, ref) => (
    <div className="relative">
      <select
        className={cn(
          "focus-ring h-14 w-full appearance-none rounded-xl border border-slate-200 bg-white/80 px-4 pt-5 pr-11 text-[15px] text-slate-950 shadow-sm transition hover:border-slate-300 focus:border-blue-500",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
    </div>
  )
);
Select.displayName = "Select";

export { Select };
