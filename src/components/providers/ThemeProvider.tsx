"use client";

import { ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const { mounted } = useTheme();
  return <>{children}</>;
}
