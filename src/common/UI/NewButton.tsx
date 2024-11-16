"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export type NewButtonStyles = "primary" | "secondary" | "danger" | "black";

export type NewButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  fullWidth?: boolean;
  colorVariant?: NewButtonStyles;
  size?: "small" | "normal";
} & Pick<React.HTMLAttributes<HTMLButtonElement>, "className" | "onClick">;

export const NewButton = forwardRef<HTMLButtonElement, NewButtonProps>(
  (
    {
      children,
      className,
      onClick,
      fullWidth = false,
      type = "button",
      colorVariant = "primary",
      size = "normal",
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        className={cn(
          "uppercase tracking-wider font-thunder text-lg transition-colors border-4 rounded-lg flex items-center justify-center py-2 min-w-[210px]",
          {
            "text-white hover:border-pka_blue hover:text-pka_blue2 border-white bg-pka_blue2 hover:bg-pka_green_light":
              colorVariant === "primary",
            "text-pka_blue2 font-averia font-bold hover:border-pka_green_light hover:text-white border-white bg-pka_green_light hover:bg-pka_blue2":
              colorVariant === "secondary",
            "text-white font-avenirThin bg-red-500 hover:bg-red-400 border-none":
              colorVariant === "danger",
            "text-white font-avenirThin bg-pka_black hover:bg-pka_blue border-none":
              colorVariant === "black",
          },
          {
            "py-2 min-w-[160px]": size === "small",
            "py-2 min-w-[210px]": size === "normal",
          },
          {
            "w-full": fullWidth,
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
