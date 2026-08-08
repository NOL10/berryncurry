import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Package, Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "Order Successful — Berry and Curry" },
      { name: "description", content: "Your order has been placed successfully." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderSuccessPage,
  validateSearch: (search: Record<string, unknown>) => ({
    paymentId: (search.paymentId as string | undefined) ?? undefined,
    orderId: (search.orderId as string | undefined) ?? undefined,
  }),
});

function OrderSuccessPage() {
  const { paymentId, orderId } = useSearch({ from: "/order-success" });

  return (
    <section className="mx-auto max-w-2xl px-6 py-24 lg:py-32">
      <div className="text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="size-10 text-primary" />
        </div>
        <h1 className="mt-8 font-display text-5xl leading-tight text-foreground">Order Placed Successfully!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Thank you for your order. We've received your payment and will process it shortly.
        </p>
      </div>

      <div className="mt-12 rounded-sm border border-border bg-card p-8">
        <h2 className="font-display text-2xl text-foreground">Order Details</h2>
        
        {paymentId && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border/70 pb-4">
              <span className="text-sm text-muted-foreground">Payment ID</span>
              <span className="font-mono text-sm font-medium text-foreground">{paymentId}</span>
            </div>
            {orderId && (
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <span className="text-sm text-muted-foreground">Order ID</span>
                <span className="font-mono text-sm font-medium text-foreground">{orderId}</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-8">
          <h3 className="font-display text-lg text-foreground">What happens next?</h3>
          <ul className="mt-4 space-y-4">
            <li className="flex items-start gap-3">
              <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Phone className="size-3 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">We'll call you</p>
                <p className="text-sm text-muted-foreground">Our team will contact you on your provided phone number to confirm delivery details.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Package className="size-3 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Fresh preparation</p>
                <p className="text-sm text-muted-foreground">Your items are prepared fresh and packed with care for delivery.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="size-3 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Doorstep delivery</p>
                <p className="text-sm text-muted-foreground">Your order will be delivered to your address at the scheduled time.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Need help? Contact us at{" "}
          <a href="mailto:hello@berryncurry.com" className="font-medium text-primary hover:underline">
            hello@berryncurry.com
          </a>{" "}
          or call{" "}
          <a href="tel:6362428384" className="font-medium text-primary hover:underline">
            6362428384
          </a>
        </p>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-clay-deep"
        >
          Back to Home
        </Link>
        <Link
          to="/fruits/shop"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary"
        >
          Shop Fruits
        </Link>
        <Link
          to="/bakery/shop"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary"
        >
          Shop Bakery
        </Link>
      </div>
    </section>
  );
}
