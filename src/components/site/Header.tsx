import { Link } from "@tanstack/react-router";
import { MessageCircle, ShoppingBag } from "lucide-react";
import logo from "@/assets/bnc-logo.jpeg";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 py-3 sm:flex sm:justify-between lg:px-10">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src={logo} alt="Berry and Curry" width={44} height={44} className="size-11 shrink-0 object-contain" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl tracking-tight text-foreground">
              berry<span className="italic text-primary">n</span>curry
            </span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Fresh fruits &amp; bakery
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium tracking-wide text-foreground/70 md:flex">
          <Link to="/fruits" className="transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>Fresh Fruits</Link>
          <Link to="/bakery" className="transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>Bakery</Link>
          <Link to="/about" className="transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>Our Story</Link>
          <Link to="/contact" className="transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>Contact</Link>
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="View cart"
          >
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <a
            href="https://wa.me/6362428384"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-clay-deep"
          >
            <MessageCircle className="size-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}