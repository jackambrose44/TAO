"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "focus-ring h-14 w-full rounded-xl border border-slate-200 bg-white/80 px-4 pt-5 text-[15px] text-slate-950 shadow-sm transition placeholder:text-transparent hover:border-slate-300 focus:border-blue-500",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
