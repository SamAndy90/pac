"use client";

import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { forwardRef } from "react";

export type ButtonStyles = "primary" | "secondary" | "danger" | "black";

export type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  fullWidth?: boolean;
  colorVariant?: ButtonStyles;
  size?: "small" | "normal";
  loading?: boolean;
  disabled?: boolean;
} & Pick<React.HTMLAttributes<HTMLButtonElement>, "className" | "onClick">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      onClick,
      fullWidth = false,
      type = "button",
      colorVariant = "primary",
      size = "normal",
      loading = false,
      disabled = false,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={loading || disabled}
        onClick={onClick}
        className={cn(
          "uppercase tracking-wider font-thunder text-lg transition-colors border-4 rounded-lg flex items-center justify-center py-2 min-w-[210px]",
          {
            "opacity-80 cursor-wait": loading,
          },
          {
            // Primary
            "text-white border-white bg-pka_blue2": colorVariant === "primary",
            "hover:border-pka_blue hover:text-pka_blue2 hover:bg-pka_green_light":
              colorVariant === "primary" && !loading,
            // Secondary
            "text-pka_blue2 font-averia font-bold border-white":
              colorVariant === "secondary",
            "hover:border-pka_green_light hover:text-white bg-pka_green_light hover:bg-pka_blue2":
              colorVariant === "secondary" && !loading,
            // Danger
            "text-white font-avenirThin bg-red-500": colorVariant === "danger",
            "hover:bg-red-400 border-none":
              colorVariant === "danger" && !loading,
            // Black
            "text-white font-avenirThin bg-pka_black": colorVariant === "black",
            " hover:bg-pka_blue border-none":
              colorVariant === "black" && !loading,
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
        {loading ? (
          <LoaderCircle className={cn("size-7 animate-spin")} />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
