import { cn } from "@/lib/utils";

export type NewButtonProps = {
  children: React.ReactNode;
} & Pick<React.HTMLAttributes<HTMLButtonElement>, "className">;

export const NewButton = ({ children, className }: NewButtonProps) => {
  return (
    <button
      className={cn(
        "uppercase font-thunder text-lg text-white hover:text-pka_blue2 bg-pka_blue2 hover:bg-pka_green_light transition-colors hover:border-pka_blue border-4 rounded-lg border-white flex items-center justify-center py-2 min-w-[210px]",
        className
      )}
    >
      {children}
    </button>
  );
};

NewButton.displayName = "NewButton";
