"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getCurrentLanguage, setLanguage } from "./language-selector.actions";

export default function LanguageSelector({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCurrentLanguage() {
      const language = await getCurrentLanguage();
      setCurrentLanguage(language);
    }
    fetchCurrentLanguage();
  }, []);

  const handleLanguageChange = async (language: string) => {
    await setLanguage(language);
    setCurrentLanguage(language);
  };

  return (
    <div {...props}>
      <Select
        value={currentLanguage ?? ""}
        onValueChange={handleLanguageChange}
      >
        <SelectTrigger className="w-full px-2 py-1 border rounded">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="dutch">Dutch</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
