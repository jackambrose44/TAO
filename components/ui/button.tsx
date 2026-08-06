"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-55",
  {
    variants: {
      variant: {
        default:
          "bg-slate-950 text-white shadow-[0_14px_32px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 hover:bg-slate-800",
        secondary:
          "border border-slate-200 bg-white/80 text-slate-900 shadow-sm hover:-translate-y-0.5 hover:bg-white hover:shadow-md",
        ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl px-6"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
