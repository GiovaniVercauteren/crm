import { lustriaRegular } from "@/app/layout";
import Image from "next/image";

export default function OasezorgLogo({
  className,
  width = "auto",
  height = 64,
}: {
  className?: string;
  width?: number | "auto";
  height?: number | "auto";
}) {
  return (
    <div className={`flex justify-center m-4 ${className ?? ""}`}>
      <Image
        src="/oasezorg_logo.svg"
        alt="Oasezorg Logo"
        width={64}
        height={64}
        style={{ width, height }}
      />
      <span
        className={`${lustriaRegular.className} font-bold`}
        style={{
          fontSize:
            typeof height === "number"
              ? `${height * 0.66}px`
              : typeof width === "number"
                ? `${width * 0.66}px`
                : "inherit",
        }}
      >
        <span className="text-green">Oase</span>
        <span className="text-pink">zorg</span>
      </span>
    </div>
  );
}
