import { ReactNode } from "react";

export default function ProjectPageTransition({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background py-8 md:py-16 animate-fade-simple">
      {children}
    </div>
  );
}
