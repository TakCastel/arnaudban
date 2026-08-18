import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  return <div className="w-full animate-page-in">{children}</div>;
}
