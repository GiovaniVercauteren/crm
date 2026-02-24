"use client";

import { lustriaRegular } from "@/app/fonts";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function OasezorgLogo({ className }: { className?: string }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const fontSize = `${dimensions.height * 0.66}px`;
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageContainerRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setDimensions({ width, height });
        }
      });
      observer.observe(imageContainerRef.current);

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className={`flex items-center m-4 ${className ?? ""}`}>
      <div ref={imageContainerRef} className="relative h-full shrink-0">
        <Image
          src="/oasezorg_logo.svg"
          alt="Oasezorg Logo"
          width={64}
          height={64}
          style={{ height: "100%", width: "auto" }}
        />
      </div>
      <span
        className={`${lustriaRegular.className} font-bold`}
        style={{ fontSize }}
      >
        <span className="text-green">Oase</span>
        <span className="text-pink">zorg</span>
      </span>
    </div>
  );
}
