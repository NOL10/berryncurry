import { createFileRoute } from "@tanstack/react-router";
import { BAKERY_CATEGORIES, BAKERY_PRODUCTS, bakeryByCategory } from "@/data/bakery";
import { BakeCard } from "@/components/bakery/BakeCard";
import { useState } from "react";

export const Route = createFileRoute("/bakery/shop")({
  head: () => ({
    meta: [
      { title: "Bakery Catalogue — Berry and Curry" },
      { name: "description", content: "Browse every fresh bake — breads, buns, rusk, snacks and signature crunchy bites." },
      { property: "og:title", content: "Bakery Catalogue — Berry and Curry" },
      { property: "og:description", content: "Freshly baked breads, buns, rusk and crunchy bites. Order on 6362428384." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(BAKERY_CATEGORIES.map(c => [c.id, true]))
  );
  const PREVIEW_COUNT = 4;
  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-[11px]">The catalogue</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl leading-[1.02] text-foreground sm:mt-3 sm:text-5xl sm:text-7xl">
            Fresh from the oven, <span className="italic">every day.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:mt-6 sm:text-base">
            {BAKERY_PRODUCTS.length} fresh bakes · call{" "}
            <a href="tel:6362428384" className="font-medium text-primary underline decoration-2 underline-offset-4">6362428384</a>{" "}
            to order.
          </p>
          <nav className="mt-6 flex flex-wrap gap-2 sm:mt-10">
            {BAKERY_CATEGORIES.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground sm:px-4 sm:py-2 sm:text-sm">
                {c.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {BAKERY_CATEGORIES.map((cat, idx) => {
        const items = bakeryByCategory(cat.id);
        if (!items.length) return null;
        const isOpen = !!expanded[cat.id];
        const visible = isOpen ? items : items.slice(0, PREVIEW_COUNT);
        const hasMore = items.length > PREVIEW_COUNT;
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
                {visible.map((p) => <BakeCard key={p.slug} product={p} />)}
              </div>
              {hasMore && (
                <div className="mt-8 flex justify-center sm:mt-10">
                  <button
                    type="button"
                    onClick={() => setExpanded((s) => ({ ...s, [cat.id]: !isOpen }))}
                    className="rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground sm:px-6 sm:py-2.5"
                  >
                    {isOpen ? `Show less` : `See all ${cat.label.toLowerCase()} (${items.length})`}
                  </button>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
