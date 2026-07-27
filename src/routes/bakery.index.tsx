import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Wheat, Sparkles, HandPlatter, Phone, Star } from "lucide-react";
import heroBread from "@/assets/hero-bread.jpg";
import storyBaker from "@/assets/story-baker.jpg";
import catCrunch from "@/assets/cat-crunch.jpg";
import { BAKERY_PRODUCTS, BAKERY_CATEGORIES, bakeryByCategory, BAKERY_TESTIMONIALS } from "@/data/bakery";
import { BakeCard } from "@/components/bakery/BakeCard";

export const Route = createFileRoute("/bakery/")({
  head: () => ({
    meta: [
      { title: "Fresh Bakery — Berry and Curry" },
      { name: "description", content: "Soft breads, pillowy buns, crisp rusk and signature crunchy bites — baked fresh every day." },
      { property: "og:title", content: "Fresh Bakery — Berry and Curry" },
      { property: "og:description", content: "Freshly baked breads, buns, rusk and crunchy bites. Order on 6362428384." },
    ],
  }),
  component: BakeryHome,
});

function BakeryHome() {
  const breads = bakeryByCategory("breads").slice(0, 4);
  const buns = bakeryByCategory("buns");
  const crunch = bakeryByCategory("cookies");
  const pavBases = bakeryByCategory("pav-bases");
  const rusk = bakeryByCategory("rusk");
  const bites = bakeryByCategory("bites");
  const cakes = bakeryByCategory("cakes").slice(0, 4);
  const muffins = bakeryByCategory("muffins").slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10 lg:py-24">
          <div className="relative z-10 order-2 lg:order-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-primary" /> Baked fresh daily
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-[5.25rem]">
              Every bite,<br />
              <span className="italic text-primary">fresh delight.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Freshly baked every day with premium ingredients. Soft breads,
              pillowy buns, crisp rusk, and our signature crunchy bites — made
              hygienic, made delicious.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/bakery/shop" className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:gap-4 hover:bg-clay-deep">
                Browse the catalogue
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <a href="tel:6362428384" className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-8 hover:text-primary">
                <Phone className="size-4" /> 6362428384
              </a>
            </div>
            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-border/70 pt-8 text-left">
              <Stat n="21+" l="Fresh bakes" />
              <Stat n="Daily" l="Baked to order" />
              <Stat n="100%" l="Hygienic" />
            </dl>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-3 rounded-md bg-sage/40 blur-2xl" aria-hidden />
              <img src={heroBread} alt="A golden loaf of fresh bread" width={1600} height={1408} className="relative aspect-[7/6] w-full rounded-sm object-cover shadow-[0_30px_80px_-30px_rgba(90,55,25,0.4)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Browse by category</p>
          <nav className="mt-6 flex flex-wrap gap-2">
            {BAKERY_CATEGORIES.map((c) => (
              <Link key={c.id} to="/bakery/shop" hash={c.id} className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground">
                {c.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">The daily loaf</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Fresh breads,<br />soft to the last slice.
            </h2>
          </div>
          <Link to="/bakery/shop" hash="breads" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-8">
            All breads <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {breads.map((p) => <BakeCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="bg-sage/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-10">
          <img src={storyBaker} alt="Baker's hands kneading dough" width={1408} height={1008} loading="lazy" className="aspect-[4/3] w-full rounded-sm object-cover" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-deep">Our kitchen</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Fresh means <span className="italic">fresh.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/80">
              Every loaf, bun, and bite is made from scratch each day with
              premium ingredients and a whole lot of care. No shortcuts, no
              stale shelves — just soft, hygienic, genuinely delicious bakes.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary underline decoration-primary decoration-2 underline-offset-8">
              Read our story <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Soft & pillowy</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Buns for<br /><span className="italic">every craving.</span>
            </h2>
          </div>
          <Link to="/bakery/shop" hash="buns" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-8">
            All buns <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {buns.map((p) => <BakeCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Pav & Pizza Bases</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Perfect bases<br /><span className="italic">for every meal.</span>
            </h2>
          </div>
          <Link to="/bakery/shop" hash="pav-bases" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-8">
            All bases <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {pavBases.map((p) => <BakeCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="bg-sage/20">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Rusk, Khari & Sticks</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                Crunchy companions<br /><span className="italic">for chai time.</span>
            </h2>
          </div>
          <Link to="/bakery/shop" hash="rusk" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-8">
            All rusk <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {rusk.map((p) => <BakeCard key={p.slug} product={p} />)}
        </div>
      </div>
    </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Savoury Bites</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Bold flavours<br /><span className="italic">in every bite.</span>
            </h2>
          </div>
          <Link to="/bakery/shop" hash="bites" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-8">
            All bites <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {bites.map((p) => <BakeCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="bg-sage/20">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Cakes & Rolls</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                Sweet slices<br /><span className="italic">freshly baked.</span>
            </h2>
          </div>
          <Link to="/bakery/shop" hash="cakes" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-8">
            All cakes <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {cakes.map((p) => <BakeCard key={p.slug} product={p} />)}
        </div>
      </div>
    </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Muffins & Brownies</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Rich, fudgy<br /><span className="italic">indulgence.</span>
            </h2>
          </div>
          <Link to="/bakery/shop" hash="muffins" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-primary decoration-2 underline-offset-8">
            All muffins <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {muffins.map((p) => <BakeCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="border-t border-border/60 bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Crunchy bites</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                Our signature<br /><span className="italic">crunch collection.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Eight moreish flavours — from classic Salt and fiery Kara to
                buttery Cashew and honeyed flakes. Crisp, snackable, and made to disappear fast.
              </p>
              <img src={catCrunch} alt="A rustic bowl of golden crunchy snack bites" width={1000} height={1000} loading="lazy" className="mt-10 aspect-[4/3] w-full rounded-sm object-cover" />
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
              {crunch.map((p) => <BakeCard key={p.slug} product={p} />)}
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
            {BAKERY_TESTIMONIALS.map((t, i) => (
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
        <div className="rounded-sm bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">Order bakery</p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Hungry yet? Place your order.</h2>
          <p className="mx-auto mt-5 max-w-md text-primary-foreground/80">Freshly baked to order. Place your order and we'll have it ready.</p>
        </div>
      </section>

      <p className="pb-16 text-center text-sm text-muted-foreground">
        {BAKERY_PRODUCTS.length} fresh bakes in the catalogue · Buy Healthy, Be Healthy 🌿
      </p>
    </>
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
