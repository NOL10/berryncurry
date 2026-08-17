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
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-[11px]">The market</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl leading-[1.02] text-foreground sm:mt-3 sm:text-5xl sm:text-7xl">
            Exotic organic fruits, <span className="italic">fresh daily.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:mt-6 sm:text-base">{FRUIT_PRODUCTS.length} exotic fruits · updated weekly with what's freshly picked.</p>
          <nav className="mt-6 flex flex-wrap gap-2 sm:mt-10">
            {FRUIT_CATEGORIES.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground sm:px-4 sm:py-2 sm:text-sm">
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
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-20 lg:px-10">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
                <div>
                  <h2 className="mt-1 font-display text-3xl leading-tight text-foreground sm:mt-2 sm:text-4xl sm:text-5xl">{cat.label}</h2>
                  <p className="mt-2 max-w-lg text-sm text-muted-foreground sm:mt-3 sm:text-base">{cat.blurb}</p>
                </div>
                <p className="text-sm text-muted-foreground sm:block">{items.length} items</p>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-x-8 sm:gap-y-14">
                {items.map((p) => <FruitCard key={p.slug} product={p} />)}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
