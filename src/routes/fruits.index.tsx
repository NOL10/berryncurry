import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Star, Phone } from "lucide-react";
import heroMango from "@/assets/hero-mango.jpg";
import storyHands from "@/assets/story-hands.jpg";
import exoticFlat from "@/assets/exotic-flat.jpg";
import { FRUIT_PRODUCTS, fruitsByCategory, FRUIT_TESTIMONIALS } from "@/data/fruits";
import { FruitCard } from "@/components/fruits/FruitCard";

export const Route = createFileRoute("/fruits/")({
  head: () => ({
    meta: [
      { title: "Fresh Fruits — Berry and Curry" },
      { name: "description", content: "Tree-ripened mangoes, curated combos and exotic organic fruit, hand-picked from small Indian orchards." },
      { property: "og:title", content: "Fresh Fruits — Berry and Curry" },
      { property: "og:description", content: "Single-origin mangoes and rare exotic fruit, naturally ripened." },
      { property: "og:image", content: "https://berryncurry.com/wp-content/uploads/2025/06/dasheri-300x300.webp" },
    ],
  }),
  component: FruitsHome,
});

function FruitsHome() {
  const mangoes = fruitsByCategory("mangoes").slice(0, 4);
  const combos = fruitsByCategory("combos");
  const exotic = fruitsByCategory("exotic");

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10 lg:py-24">
          <div className="relative z-10 order-2 lg:order-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-primary" /> Mango season · vol. 06
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-[5.25rem]">
              A mango<br />
              <span className="italic text-primary">worth waiting</span><br />
              a year for.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Tree-ripened. Hand-picked. Chemical-free. Sent straight from small
              orchards across India to your kitchen — never a day older than it
              should be.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/fruits/shop" className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:gap-4 hover:bg-clay-deep">
                Shop this season
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link to="/about" className="text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-8 hover:text-primary">
                How we source
              </Link>
            </div>
            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-border/70 pt-8 text-left">
              <Stat n="12+" l="Heritage varietals" />
              <Stat n="48h" l="Farm to doorstep" />
              <Stat n="0" l="Ripening chemicals" />
            </dl>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-3 rounded-md bg-sage/25 blur-2xl" aria-hidden />
              <img src={heroMango} alt="A ripe mango cradled by fresh leaves" width={1600} height={1408} className="relative aspect-[7/6] w-full rounded-sm object-cover shadow-[0_30px_80px_-30px_rgba(120,60,30,0.35)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Chapter one</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Single-origin mangoes,<br />picked at their peak.
            </h2>
          </div>
          <Link to="/fruits/shop" hash="mangoes" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-8">
            All mangoes <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {mangoes.map((p) => <FruitCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="bg-sage/25">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-10">
          <img src={storyHands} alt="A farmer holding freshly harvested mangoes" width={1408} height={1008} loading="lazy" className="aspect-[4/3] w-full rounded-sm object-cover" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-deep">Our sourcing</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              <span className="italic">Twelve orchards.</span><br />One promise.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/80">
              We work with a small handful of family-run orchards from Uttar
              Pradesh to Karnataka. Every crate is inspected by hand, ripened on
              the tree, and packed the day it's picked.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary underline decoration-primary decoration-2 underline-offset-8">
              Read the story <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Chapter two</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Curated combos<br /><span className="italic">for the season.</span>
            </h2>
          </div>
          <Link to="/fruits/shop" hash="combos" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-8">
            All combos <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {combos.map((p) => <FruitCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="border-t border-border/60 bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Chapter three</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                Beyond<br /><span className="italic">the mango.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Blueberries from cool-climate farms. Nilgiri avocados. Dragon
                fruit from Andhra. A short, rotating list of the rare and the seasonal.
              </p>
              <img src={exoticFlat} alt="Flat lay of exotic fruits" width={1408} height={1008} loading="lazy" className="mt-10 aspect-[4/3] w-full rounded-sm object-cover" />
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
              {exotic.map((p) => <FruitCard key={p.slug} product={p} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Happy customers</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              What people<br /><span className="italic">are saying.</span>
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FRUIT_TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-sm border border-border bg-background p-6">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="size-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 text-base leading-relaxed text-foreground">"{t.text}"</p>
                <div className="mt-4">
                  <p className="font-medium text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <h2 className="font-display text-3xl text-foreground sm:text-4xl">This week's favourites</h2>
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {FRUIT_PRODUCTS.slice(0, 3).map((p) => <FruitCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="rounded-sm bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">Order fruit</p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Fresh from the orchard.</h2>
          <p className="mx-auto mt-5 max-w-md text-primary-foreground/80">Tree-ripened, hand-picked fruit. Place your order and we'll deliver to your doorstep.</p>
        </div>
      </section>
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <dt className="font-display text-3xl text-foreground sm:text-4xl">{n}</dt>
      <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{l}</dd>
    </div>
  );
}
