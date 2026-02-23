import { lustriaRegular } from "@/app/layout";
import Image from "next/image";

export default function OasezorgLogo({ className }: { className?: string }) {
  return (
    <div className={`flex justify-center m-4 ${className}`}>
      <Image
        src="/oasezorg_logo.svg"
        alt="Oasezorg Logo"
        width={64}
        height={61}
      />
      <span className={`${lustriaRegular.className} text-[42px] font-bold`}>
        <span className="text-green">Oase</span>
        <span className="text-pink">zorg</span>
      </span>
    </div>
  );
}
