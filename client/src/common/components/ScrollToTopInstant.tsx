import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrllToTopInstant() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/lists") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}