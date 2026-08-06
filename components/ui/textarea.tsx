"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "focus-ring min-h-36 w-full resize-none rounded-xl border border-slate-200 bg-white/80 px-4 pt-6 text-[15px] leading-6 text-slate-950 shadow-sm transition placeholder:text-transparent hover:border-slate-300 focus:border-blue-500",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
