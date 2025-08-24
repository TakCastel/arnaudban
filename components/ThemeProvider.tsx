"use client";

import { useTheme } from "@/lib/useTheme";
import { useEffect } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mounted } = useTheme();

  // Éviter le flash de contenu non stylé
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}

