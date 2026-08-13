import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import storyHands from "@/assets/story-hands.jpg";
import storyBaker from "@/assets/story-baker.jpg";
import heroCombined from "@/assets/hero-combined.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Berry and Curry" },
      { name: "description", content: "How Berry and Curry sources tree-ripened fruit from small orchards and bakes soft breads and crunchy bites fresh every day." },
      { property: "og:title", content: "Our Story — Berry and Curry" },
      { property: "og:description", content: "One market, two departments — orchard-fresh fruit and oven-fresh bakery." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10 lg:py-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Our story</p>
        <h1 className="mt-4 font-display text-6xl leading-[1.02] text-foreground sm:text-8xl">
          One market, <span className="italic">two loves</span>.
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Berry &amp; Curry began with a childhood memory of eating Langra
          mangoes off the tree, sticky-fingered and barefoot — and a love of
          warm bread pulled straight from the oven. Today we bring both under
          one roof: orchard-fresh fruit and daily-fresh bakery.
        </p>
      </section>

      <section className="border-y border-border/60 bg-sage/25">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <img src={storyHands} width={1408} height={1008} loading="lazy" alt="Farmer hands with mangoes" className="aspect-[4/3] w-full rounded-sm object-cover" />
          <div className="lg:pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-deep">The orchard</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Growers we've <span className="italic">actually met.</span>
            </h2>
            <p className="mt-6 leading-relaxed text-foreground/80">
              Twelve family orchards across Uttar Pradesh, Andhra Pradesh, and
              Karnataka. Every season we drive out, walk the rows, taste from the
              tree, and only then decide what we buy.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/80">
              No middlemen. No cold storage. No calcium carbide. Fruit that is
              picked, boxed, and dispatched inside 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <div className="order-2 lg:order-1 lg:pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-deep">The kitchen</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Fresh means <span className="italic">fresh.</span>
            </h2>
            <p className="mt-6 leading-relaxed text-foreground/80">
              We bake in small batches through the early morning, so what
              reaches you is soft, warm, and made the same day. No day-old
              shelves, no compromises.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/80">
              Clean kitchen, premium ingredients, and recipes we're genuinely
              proud of — because you deserve nothing less than delicious.
            </p>
          </div>
          <img src={storyBaker} width={1408} height={1008} loading="lazy" alt="Baker kneading dough" className="order-1 aspect-[4/3] w-full rounded-sm object-cover lg:order-2" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          {[
            { n: "01", t: "Sourced & baked with care", d: "We taste every varietal on the tree and bake every batch by hand — nothing average leaves us." },
            { n: "02", t: "Naturally good", d: "Sun-ripened fruit and premium bakery ingredients. No shortcuts, no chemicals." },
            { n: "03", t: "Delivered fresh", d: "Cold-chain fruit across India and daily-fresh bakes, made hygienic and delicious." },
          ].map((s) => (
            <div key={s.n}>
              <p className="font-display text-5xl text-primary">{s.n}</p>
              <h3 className="mt-4 font-display text-2xl text-foreground">{s.t}</h3>
              <p className="mt-3 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img src={heroCombined} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
          <h2 className="font-display text-5xl leading-tight sm:text-6xl">Fruit or bakes? Why not both.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/fruits" className="inline-flex items-center gap-3 rounded-full bg-primary-foreground px-8 py-4 text-sm font-medium text-primary hover:bg-accent hover:text-accent-foreground">Shop fresh fruits</Link>
            <Link to="/bakery" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-4 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10">Browse the bakery</Link>
            <a href="tel:6362428384" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-4 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10">
              <Phone className="size-4" /> 6362428384
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
