import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center align-middle  justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        style1:
          " lg:border-4 border-2  border-[#FFC52E] rounded-[5.3px] text-[#FFC52E] xl:text-[12.8px] 2xl:text-[12.8px] xl:border-[2.67px]  lg:text-[10.67px] 2xl:rounded-[5.3px] font-avenir lg:border-[2.13px] text-[8.53px] bg-[#33455A] hover:bg-[#FFC52E] hover:border-[#33455A] hover:text-[#33455A] !items-center",
        style2:
          "lg:border-4 border-2 border-[#33455A]  rounded-[5.3px]  hover:text-[#33455A]  xl:text-[12.8px] 2xl:text-[12.8px] xl:border-[2.67px]   lg:text-[10.67px] 2xl:rounded-[5.3px] font-avenir  lg:border-[2.13px] text-[8.53px] hover:bg-[#EFF178]  border-[#EFF178] text-[#EFF178] !items-center",
        style3:
          "lg:border-4 border-2 border-[#33455A]  rounded-[5.3px]  text-[#33455A]  xl:text-[12.8px] 2xl:text-[12.8px] xl:border-[2.67px]   lg:text-[10.67px] 2xl:rounded-[5.3px] font-avenir lg:border-[2.13px] text-[8.53px] bg-[#FFFFFF] hover:bg-[#33455A] hover:border-[#FFFFFF] hover:text-[#FFFFFF] !items-center",
        style4:
          "rounded-[5.3px] xl:text-[12.8px] lg:border-4 border-2 border-[#FFFFFF]      2xl:rounded-[5.3px] 2xl:rounded-[6.4px] text-[#FFFFFF] lg:text-[10.67px] lg:rounded-[4.27px] text-[8.53px] lg:border-[2.13px] font-avenirBold xl:text-[10.6px] 2xl:text-[12.8px] xl:border-[2.67px] bg-[#33455A] hover:bg-[#33455A]  hover:border-[#FFFFFF] hover:text-[#FFFFFF] !items-center",
        style5:
          "w-[167.82px] xl:text-[12.8px] !h-[33.03px] rounded-[6.4px] border-[3.2px] border-[#FFC52E] lg:w-[111.88px] lg:!h-[22.02px]   xl:!h-[27.52px]  2xl:w-[167.82px]  lg:rounded-[4.27px] text-[8.53px] 2xl:rounded-[6.4px] !pb-2 lg:!pt-3   2xl:!pt-[10px]  text-[#33455A] font-avenirBold  lg:border-[2.13px]  lg:text-[10.67px] 2xl:text-[12.8px] xl:text-[10.6px] bg-[#FFC52E]   ",
        inactive:
          "lg:border-4 border-2 !pb-2 border-[#33455A]  rounded-[5.3px]   text-[#33455A]  xl:text-[12.8px] 2xl:text-[12.8px] xl:border-[2.67px]  lg:text-[10.67px]  2xl:rounded-[5.3px] font-avenir lg:border-[2.13px] text-[8.53px] bg-[#FFC52E] disabled:opacity-100 items-center justify-center",
      },
      size: {
        default:
          "h-[22.28px] lg:h-[27.5px] xl:[33px] xl:w-[167.82px] lg:w-[139.95px] w-[111.88px]",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        disabled={variant === "inactive" || props.disabled}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
