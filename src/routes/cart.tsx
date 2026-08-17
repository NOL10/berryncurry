import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Berry and Curry" },
      { name: "description", content: "Review your fresh fruit and bakery selections." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQty, remove } = useCart();

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-16 text-center sm:px-6 sm:py-24 lg:py-32">
        <ShoppingBag className="mx-auto size-8 text-muted-foreground sm:size-10" />
        <h1 className="mt-5 font-display text-4xl text-foreground sm:mt-6 sm:text-5xl">Your basket is empty.</h1>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">Start with a mango or a fresh loaf — we've got you either way.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8">
          <Link to="/fruits/shop" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-clay-deep sm:px-6 sm:py-3">Shop fruits</Link>
          <Link to="/bakery/shop" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary sm:px-6 sm:py-3">Shop bakery</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-[11px]">Your basket</p>
      <h1 className="mt-2 font-display text-4xl leading-[1.05] text-foreground sm:mt-3 sm:text-5xl">Review & check out.</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-12 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
        <ul className="divide-y divide-border/70 border-y border-border/70">
          {items.map((i) => (
            <li key={`${i.dept}:${i.slug}`} className="flex gap-3 py-4 sm:gap-4 sm:py-5">
              <img src={i.image} alt={i.name} className="size-20 shrink-0 rounded-sm object-cover sm:size-24" />
              <div className="flex flex-1 flex-col justify-between gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]">{i.dept === "fruits" ? "Fresh Fruits" : "Bakery"} · {i.weight}</p>
                    <h3 className="mt-1 truncate font-display text-lg text-foreground sm:text-xl">{i.name}</h3>
                  </div>
                  <button onClick={() => remove(i.dept, i.slug)} aria-label={`Remove ${i.name}`} className="text-muted-foreground transition-colors hover:text-primary">
                    <Trash2 className="size-3.5 sm:size-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button onClick={() => setQty(i.dept, i.slug, i.qty - 1)} className="grid size-8 place-items-center text-foreground hover:text-primary sm:size-9" aria-label="Decrease"><Minus className="size-3 sm:size-3.5" /></button>
                    <span className="w-8 text-center text-sm font-medium">{i.qty}</span>
                    <button onClick={() => setQty(i.dept, i.slug, i.qty + 1)} className="grid size-8 place-items-center text-foreground hover:text-primary sm:size-9" aria-label="Increase"><Plus className="size-3 sm:size-3.5" /></button>
                  </div>
                  <p className="text-sm font-semibold text-foreground sm:text-base">₹{(i.price * i.qty).toLocaleString("en-IN")}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-sm border border-border bg-card p-5 sm:p-6">
          <h2 className="font-display text-xl text-foreground sm:text-2xl">Order summary</h2>
          <dl className="mt-4 space-y-3 text-xs sm:mt-6 sm:text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-medium">₹{subtotal.toLocaleString("en-IN")}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd className="font-medium">Calculated at checkout</dd></div>
          </dl>
          <div className="mt-4 flex items-baseline justify-between border-t border-border/70 pt-4 sm:mt-6">
            <span className="font-display text-base sm:text-lg">Total</span>
            <span className="font-display text-xl text-foreground sm:text-2xl">₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <Link to="/checkout" className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-clay-deep sm:mt-6 sm:px-6 sm:py-3.5">
            Proceed to checkout
          </Link>
          <p className="mt-2 text-center text-xs text-muted-foreground sm:mt-3">Minimum order value: ₹500</p>
          <div className="mt-4 flex justify-center gap-4 text-sm">
            <Link to="/fruits/shop" className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline">More fruits</Link>
            <Link to="/bakery/shop" className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline">More bakery</Link>
          </div>
        </aside>
      </div>
    </section>
  );
}