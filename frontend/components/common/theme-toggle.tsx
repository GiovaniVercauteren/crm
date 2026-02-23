"use client";

import { CircleQuestionMark, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function ColorSchemeToggle() {
  const { setTheme, theme } = useTheme();
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      onClick={() =>
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
      }
    >
      {isMounted === false ? (
        <CircleQuestionMark />
      ) : theme === "dark" ? (
        <Sun />
      ) : (
        <Moon />
      )}
    </Button>
  );
}
