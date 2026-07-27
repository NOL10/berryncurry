import { Link } from "@tanstack/react-router";
import type { BakeProduct } from "@/data/bakery";
import { Rating } from "@/components/site/Rating";

export function BakeCard({ product }: { product: BakeProduct }) {
  return (
    <Link
      to="/bakery/product/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden rounded-sm bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-foreground/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-background backdrop-blur-sm">
          {product.weight}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {product.categoryLabel}
          </p>
          <h3 className="mt-1 truncate font-display text-xl leading-tight text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{product.blurb}</p>
          <div className="mt-2">
            <Rating slug={product.slug} />
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-base font-semibold text-foreground">₹{product.price.toLocaleString("en-IN")}</p>
        </div>
      </div>
    </Link>
  );
}