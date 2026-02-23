import { lustriaRegular } from "@/app/layout";
import Image from "next/image";
import styles from "./oasezorg-logo.module.css";

export default function OasezorgLogo() {
  return (
    <div className="flex justify-center m-4">
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
