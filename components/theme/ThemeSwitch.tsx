"use client";

import { useEffect, useState } from "react";
import { DarkThemeToggle } from "flowbite-react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);

  // Prevents hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <DarkThemeToggle />
    </div>
  );
}
