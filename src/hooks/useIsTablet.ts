import { useState, useEffect } from "react";

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(
    typeof window !== "undefined"
      ? window.innerWidth >= 768 && window.innerWidth < 1024
      : false
  );

  useEffect(() => {
    const check = () =>
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return isTablet;
}
