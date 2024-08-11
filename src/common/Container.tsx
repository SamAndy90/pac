import { twMerge } from "tailwind-merge";

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container(props: ContainerProps) {
  const { children, className } = props;

  return (
    <div
      className={twMerge("container mx-auto max-w-[1920px] px-3", className)}
    >
      {children}
    </div>
  );
}
