import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export type TitleProps = {
  children: React.ReactNode;
  component?: React.ElementType;
} & Pick<HTMLAttributes<HTMLElement>, "className">;

export function Title(props: TitleProps) {
  const { children, component: Component = "h2", className } = props;

  return (
    <Component
      className={cn(
        "uppercase font-thunder font-bold xl:text-7xl text-6xl text-pka_blue tracking-wider",
        className
      )}
    >
      {children}
    </Component>
  );
}
