"use client";

import { animatePageOut } from "@/lib/animation";
import { usePathname, useRouter } from "next/navigation";

export type TransitionLinkProps = {
  href: string;
  children: React.ReactNode;
} & Pick<React.HTMLAttributes<HTMLButtonElement>, "className">;

export default function TransitionLink({
  children,
  href,
  className,
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
