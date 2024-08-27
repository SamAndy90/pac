import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const { children, className } = props;

    return (
      <div
        ref={ref}
        className={twMerge("container mx-auto max-w-[1920px] px-3", className)}
      >
        {children}
      </div>
    );
  }
);
