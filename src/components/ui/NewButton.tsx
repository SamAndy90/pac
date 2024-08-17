import { cn } from "@/lib/utils";
import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

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
        className={twMerge(
          clsx(
            "uppercase font-thunder text-lg transition-colors border-4 rounded-lg flex items-center justify-center py-2 min-w-[210px]",
            {
              "text-white hover:border-pka_blue hover:text-pka_blue2 border-white bg-pka_blue2 hover:bg-pka_green_light":
                (variant = "primary"),
              "text-pka_blue2 font-averia font-bold hover:border-pka_green_light hover:text-white border-white bg-pka_green_light hover:bg-pka_blue2":
                (variant = "secondary"),
            },
            className
          )
        )}
      >
        {children}
      </button>
    );
  }
);

NewButton.displayName = "NewButton";
