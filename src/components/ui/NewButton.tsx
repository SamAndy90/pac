"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export type NewButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
} & Pick<React.HTMLAttributes<HTMLButtonElement>, "className">;

export const NewButton = forwardRef<HTMLButtonElement, NewButtonProps>(
  ({ children, className, type = "button", variant = "primary" }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "uppercase font-thunder text-lg transition-colors border-4 rounded-lg flex items-center justify-center py-2 min-w-[210px]",
          {
            "text-pka_blue2 font-averia font-bold hover:border-pka_green_light hover:text-white border-white bg-pka_green_light hover:bg-pka_blue2":
              (variant = "secondary"),
            "text-white hover:border-pka_blue hover:text-pka_blue2 border-white bg-pka_blue2 hover:bg-pka_green_light":
              (variant = "primary"),
          },
          className
        )}
      >
        {children}
      </button>
    );
  }
);

NewButton.displayName = "NewButton";
