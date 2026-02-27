import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function MainFooter() {
  return (
    <footer className="w-full flex flex-col text-center text-muted text-sm">
      <span>© {new Date().getFullYear()} Oasezorg - All rights reserved.</span>
      <section className="flex justify-center gap-2">
        <Link href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
        —
        <Link
          href="https://github.com/GiovaniVercauteren/crm"
          className="flex items-center gap-1 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
          <ExternalLink size={14} />
        </Link>
      </section>
    </footer>
  );
}
