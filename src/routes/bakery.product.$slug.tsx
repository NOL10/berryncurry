import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Wheat, Sparkles, HandPlatter, Phone, ShoppingBag, Check, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { getBake, BAKERY_PRODUCTS } from "@/data/bakery";
import { BakeCard } from "@/components/bakery/BakeCard";
import { useCart } from "@/lib/cart";
import { Rating } from "@/components/site/Rating";

export const Route = createFileRoute("/bakery/product/$slug")({
  loader: ({ params }) => {
    const product = getBake(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Berry and Curry` },
          { name: "description", content: loaderData.product.blurb },
          { property: "og:title", content: `${loaderData.product.name} — Berry and Curry` },
          { property: "og:description", content: loaderData.product.blurb },
        ]
      : [{ title: "Unavailable" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-display text-5xl">We couldn't find that bake.</h1>
      <p className="mt-4 text-muted-foreground">It may have sold out for the day. Try the full catalogue.</p>
      <Link to="/bakery/shop" className="mt-8 inline-flex items-center gap-2 text-primary underline underline-offset-8">Back to the catalogue</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = BAKERY_PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const handleAdd = () => {
    add({ slug: product.slug, dept: "bakery", name: product.name, price: product.price, image: product.image, weight: product.weight }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-8 text-sm text-muted-foreground lg:px-10">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/bakery/shop" className="hover:text-primary">Bakery</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-10 lg:py-16">
        <div className="relative">
          <div className="absolute -inset-4 rounded-md bg-sage/40 blur-2xl" aria-hidden />
          <img src={product.image} alt={product.name} className="relative aspect-square w-full rounded-sm object-cover shadow-[0_30px_80px_-30px_rgba(90,55,25,0.4)]" />
        </div>
        <div className="lg:pt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{product.categoryLabel}</p>
          <h1 className="mt-3 font-display text-5xl leading-[1.02] text-foreground sm:text-6xl">{product.name}</h1>
          <div className="mt-3"><Rating slug={product.slug} size="md" showCount /></div>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{product.blurb}</p>

          <div className="mt-8 flex items-baseline gap-4">
            <p className="font-display text-4xl text-foreground">₹{product.price.toLocaleString("en-IN")}</p>
            <span className="rounded-full bg-accent/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sage-deep">{product.weight}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Freshly baked to order · inclusive of all taxes</p>

          <div className="mt-8 rounded-sm border border-border/70 bg-card p-5">
            <p className="text-sm text-foreground/80">{product.story}</p>
          </div>

          <div className="mt-6 rounded-sm border border-border/70 bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">Ingredients</p>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ingredient, index) => (
                <span key={index} className="inline-flex items-center rounded-full bg-sage/40 px-3 py-1 text-xs font-medium text-foreground">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-11 place-items-center text-foreground hover:text-primary" aria-label="Decrease quantity"><Minus className="size-4" /></button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid size-11 place-items-center text-foreground hover:text-primary" aria-label="Increase quantity"><Plus className="size-4" /></button>
            </div>
            <button onClick={handleAdd} className="group inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-all hover:gap-4 hover:bg-clay-deep">
              {added ? <><Check className="size-4" /> Added to cart</> : <><ShoppingBag className="size-4" /> Add {qty} · ₹{(product.price * qty).toLocaleString("en-IN")}</>}
            </button>

          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border/70 pt-8">
            <Trait icon={<HandPlatter className="size-4" />} label="Baked fresh daily" />
            <Trait icon={<Wheat className="size-4" />} label="Premium ingredients" />
            <Trait icon={<Sparkles className="size-4" />} label="Clean & hygienic" />
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-sage/40">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Why you'll love it</p>
          <p className="mt-4 font-display text-3xl leading-snug text-foreground sm:text-4xl">"{product.story}"</p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">You might also like</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <BakeCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </>
  );
}

function Trait({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-foreground/80">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}
