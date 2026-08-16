import { createFileRoute } from "@tanstack/react-router";
import { FRUIT_CATEGORIES, FRUIT_PRODUCTS, fruitsByCategory } from "@/data/fruits";
import { FruitCard } from "@/components/fruits/FruitCard";

export const Route = createFileRoute("/fruits/shop")({
  head: () => ({
    meta: [
      { title: "Fruit Market — Berry and Curry" },
      { name: "description", content: "Browse exotic organic fruits — avocados, berries, dragon fruit, and more in season." },
      { property: "og:title", content: "Fruit Market — Berry and Curry" },
      { property: "og:description", content: "Browse exotic organic fruits — avocados, berries, dragon fruit, and more in season." },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">The market</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[1.02] text-foreground sm:text-7xl">
            Exotic organic fruits, <span className="italic">fresh daily.</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">{FRUIT_PRODUCTS.length} exotic fruits · updated weekly with what's freshly picked.</p>
          <nav className="mt-10 flex flex-wrap gap-2">
            {FRUIT_CATEGORIES.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground">
                {c.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {FRUIT_CATEGORIES.map((cat) => {
        const items = fruitsByCategory(cat.id);
        if (!items.length) return null;
        return (
          <section key={cat.id} id={cat.id} className="scroll-mt-24 bg-sage/20">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="mt-2 font-display text-4xl leading-tight text-foreground sm:text-5xl">{cat.label}</h2>
                  <p className="mt-3 max-w-lg text-muted-foreground">{cat.blurb}</p>
                </div>
                <p className="hidden text-sm text-muted-foreground sm:block">{items.length} items</p>
              </div>
              <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((p) => <FruitCard key={p.slug} product={p} />)}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
