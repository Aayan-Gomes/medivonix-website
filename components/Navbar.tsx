import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const links = [
    { href: "/#home", label: "Home" },
    { href: "/#products", label: "Products" },
    { href: "/#research", label: "Research" },
    { href: "/#company", label: "Company" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/#home" className="flex items-center gap-3">
          <Image
            src="/logo/logo.jpeg"
            alt="Medivonix"
            width={128}
            height={85}
            priority
            className="h-14 w-auto"
          />
          <span className="hidden text-sm font-bold uppercase tracking-[0.18em] text-slate-800 sm:block">
            Medivonix
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-teal-600">
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/#contact"
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Talk to us
        </Link>
      </div>
    </nav>
  );
}
