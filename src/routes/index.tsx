import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Leaf, Truck, Wheat, Sparkles, Phone } from "lucide-react";
import heroCombined from "@/assets/hero-combined.jpg";
import heroMango from "@/assets/hero-mango.jpg";
import heroBread from "@/assets/hero-bread.jpg";
import { FRUIT_PRODUCTS } from "@/data/fruits";
import { BAKERY_PRODUCTS } from "@/data/bakery";
import { FruitCard } from "@/components/fruits/FruitCard";
import { BakeCard } from "@/components/bakery/BakeCard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const fruitPicks = FRUIT_PRODUCTS.filter((p) => p.category === "exotic" && !p.outOfStock).slice(0, 3);
  const bakePicks = BAKERY_PRODUCTS.filter((p) => p.category === "cookies").slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10 lg:py-24">
          <div className="relative z-10 order-2 lg:order-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-primary" /> One market · two kitchens
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-[5.25rem]">
              Fresh fruit.<br />
              <span className="italic text-primary">Fresh bakes.</span><br />
              One doorstep.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Berry &amp; Curry brings together two of our great loves —
              tree-ripened organic fruit from small Indian orchards, and soft,
              hygienic breads, buns and crunchy bites baked fresh every day.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/fruits"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:gap-4 hover:bg-clay-deep"
              >
                Shop fresh fruits
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/bakery"
                className="group inline-flex items-center gap-3 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:gap-4 hover:border-primary hover:text-primary"
              >
                Browse the bakery
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-border/70 pt-8 text-left">
              <Stat n="30+" l="Fresh products" />
              <Stat n="48h" l="Farm to doorstep" />
              <Stat n="Daily" l="Baked to order" />
            </dl>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-3 rounded-md bg-sage/30 blur-2xl" aria-hidden />
              <img
                src={heroCombined}
                alt="A warm flat lay of fresh mangoes, blueberries, dragon fruit and golden bakery bread"
                width={1600}
                height={1400}
                className="relative aspect-[7/6] w-full rounded-sm object-cover shadow-[0_30px_80px_-30px_rgba(110,60,25,0.4)]"
              />
              <div className="absolute -bottom-6 -left-4 hidden max-w-[220px] rounded-sm border border-border/70 bg-background/95 p-4 shadow-lg backdrop-blur sm:block">
                <p className="font-display text-lg leading-tight text-foreground">Two kitchens, one care</p>
                <p className="mt-1 text-xs text-muted-foreground">Orchard-fresh fruit &amp; oven-fresh bakes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROMISES ticker */}
      <section className="border-y border-border/60 bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-8 md:grid-cols-5 lg:px-10">
          <Promise icon={<Leaf className="size-4" />} title="Naturally grown" />
          <Promise icon={<Truck className="size-4" />} title="Cold-chain delivery" />
          <Promise icon={<Wheat className="size-4" />} title="Baked fresh daily" />
          <Promise icon={<Sparkles className="size-4" />} title="Clean & hygienic" />
          <Promise icon={<Leaf className="size-4" />} title="100% vegetarian" />
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Two departments</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Pick your <span className="italic">craving.</span>
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Department
            to="/fruits"
            image={heroMango}
            eyebrow="Department one"
            title="Fresh Fruits"
            copy="Tree-ripened mangoes, curated combos, and rare exotic organic fruit — hand-picked from small family orchards."
            cta="Enter the market"
          />
          <Department
            to="/bakery"
            image={heroBread}
            eyebrow="Department two"
            title="Fresh Bakery"
            copy="Soft breads, pillowy buns, crisp rusk and our signature crunchy bites — baked fresh every single morning."
            cta="Enter the bakery"
          />
        </div>
      </section>

      {/* FRUIT PICKS */}
      <section className="bg-sage/25">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">From the orchard</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                Fresh exotic fruits.
              </h2>
            </div>
            <Link to="/fruits/shop" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-8">
              All fruits <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {fruitPicks.map((p) => <FruitCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* BAKERY PICKS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">From the oven</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Our crunchy bites.
            </h2>
          </div>
          <Link to="/bakery/shop" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-8">
            All bakes <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {bakePicks.map((p) => <BakeCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="rounded-sm bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">Order fruit or bakery</p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Fruit or bakes? Why not both.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-primary-foreground/80">
            Place your order and we'll have it ready — fresh from the orchard and the oven.
          </p>
        </div>
      </section>
    </>
  );
}

function Department({
  to,
  image,
  eyebrow,
  title,
  copy,
  cta,
}: {
  to: "/fruits" | "/bakery";
  image: string;
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
}) {
  return (
    <Link to={to} className="group relative overflow-hidden rounded-sm border border-border/70">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 p-7 text-background">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-background/80">{eyebrow}</p>
        <h3 className="mt-2 font-display text-4xl leading-tight">{title}</h3>
        <p className="mt-3 max-w-md text-sm text-background/85">{copy}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline decoration-2 underline-offset-8">
          {cta} <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <dt className="font-display text-3xl leading-none text-foreground sm:text-4xl">{n}</dt>
      <dd className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">{l}</dd>
    </div>
  );
}

function Promise({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-full bg-secondary-foreground/10 text-accent">{icon}</span>
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
}
