import type { ReactNode } from "react";
import ScrollReveal from "@/components/ScrollReveal";

type FooterRevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/** 复用首页 Footer 的滞回渐入逻辑，不包含反色或羽化效果。 */
export default function FooterReveal({ children, className, id }: FooterRevealProps) {
  return (
    <ScrollReveal id={id} className={className}>
      {children}
    </ScrollReveal>
  );
}
