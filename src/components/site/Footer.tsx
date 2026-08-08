import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import logo from "@/assets/bnc-logo.jpeg";

type FooterLink = { to: string; label: string; hash?: string };

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="Berry and Curry" width={40} height={40} className="size-10 shrink-0 object-contain" />
              <p className="font-display text-3xl leading-none">
                berry<span className="italic text-accent">n</span>curry
              </p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-secondary-foreground/70">
              A small organic market and bakery — hand-picked, tree-ripened
              fruit and soft, freshly-baked breads, buns and crunchy bites.
            </p>
            <a href="tel:8310490087" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
              <Phone className="size-4" /> 8310490087
            </a>
          </div>
          <FooterCol title="Fresh Fruits" links={[
            { to: "/fruits", label: "Fruit home" },
            { to: "/fruits/shop", label: "All produce" },
            { to: "/fruits/shop", label: "Mangoes", hash: "mangoes" },
            { to: "/fruits/shop", label: "Exotic", hash: "exotic" },
          ]} />
          <FooterCol title="Bakery" links={[
            { to: "/bakery", label: "Bakery home" },
            { to: "/bakery/shop", label: "All bakes" },
            { to: "/bakery/shop", label: "Fresh Breads", hash: "breads" },
            { to: "/bakery/shop", label: "Crunchy Bites", hash: "crunch" },
          ]} />
          <FooterCol title="Company" links={[
            { to: "/about", label: "Our story" },
            { to: "/contact", label: "Contact" },
            { to: "/contact", label: "FAQ" },
          ]} />
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-secondary-foreground/15 pt-6 text-xs text-secondary-foreground/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} BerryNCurry Organic Market &amp; Bakery.</p>
          <p>Bengaluru, India · Made with care.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/80">
        {links.map((l, i) => (
          <li key={`${l.label}-${i}`}>
            <Link to={l.to as "/"} hash={l.hash} className="transition-colors hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}