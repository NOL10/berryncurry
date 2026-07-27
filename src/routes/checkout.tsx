import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/lib/razorpay";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Berry and Curry" },
      { name: "description", content: "Complete your Berry and Curry order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

type Status = "idle" | "processing" | "success";

type CheckoutCustomer = {
  name: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pin: string;
};

type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error?: {
    description?: string;
    reason?: string;
  };
};

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: Record<string, string>;
  theme: {
    color: string;
  };
  handler: (response: RazorpaySuccessResponse) => void;
  modal: {
    ondismiss: () => void;
  };
};

type RazorpayCheckoutInstance = {
  open: () => void;
  on: (event: "payment.failed", handler: (response: RazorpayFailureResponse) => void) => void;
};

const SAVED_CUSTOMER_KEY = "bnc.checkout.customer.v1";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayCheckoutInstance;
  }
}

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const createOrder = useServerFn(createRazorpayOrder);
  const verifyPayment = useServerFn(verifyRazorpayPayment);
  const [status, setStatus] = useState<Status>("idle");
  const [orderId, setOrderId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [savedCustomer] = useState<CheckoutCustomer>(() => readSavedCustomer());

  if (items.length === 0 && status !== "success") {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center lg:py-32">
        <h1 className="font-display text-5xl text-foreground">Nothing to check out.</h1>
        <p className="mt-4 text-muted-foreground">Add a few items to your basket first.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/fruits/shop"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-clay-deep"
          >
            Shop fruits
          </Link>
          <Link
            to="/bakery/shop"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary"
          >
            Shop bakery
          </Link>
        </div>
      </section>
    );
  }

  const delivery = subtotal >= 500 || subtotal === 0 ? 0 : 49;
  const total = subtotal + delivery;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("processing");
    setError("");

    try {
      const customer = getCheckoutCustomer(e.currentTarget);
      saveCustomer(customer);
      const order = await createOrder({
        data: {
          customer,
          expectedTotal: total,
          items: items.map((item) => ({
            dept: item.dept,
            slug: item.slug,
            qty: item.qty,
          })),
        },
      });

      await loadRazorpayCheckout();
      const paymentResponse = await openRazorpayCheckout({
        amount: order.amount,
        currency: order.currency,
        keyId: order.keyId,
        orderId: order.id,
        receipt: order.receipt,
        totalItems: items.reduce((sum, item) => sum + item.qty, 0),
        customer,
      });

      const verification = await verifyPayment({
        data: {
          ...paymentResponse,
          customer,
          expectedTotal: total,
          receipt: order.receipt,
          items: items.map((item) => ({
            dept: item.dept,
            slug: item.slug,
            qty: item.qty,
          })),
        },
      });

      setOrderId(verification.paymentId);
      clear();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment could not be completed.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center lg:py-32">
        <CheckCircle2 className="mx-auto size-12 text-primary" />
        <h1 className="mt-6 font-display text-5xl text-foreground">Order placed successfully!</h1>
        <p className="mt-4 text-muted-foreground">
          Payment received. Your Razorpay payment reference is{" "}
          <span className="font-mono font-semibold text-foreground">{orderId}</span>.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll call you shortly on the number you provided to confirm delivery.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => navigate({ to: "/" })}
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-clay-deep"
          >
            Back home
          </button>
          <Link
            to="/bakery/shop"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary"
          >
            Keep shopping
          </Link>
        </div>
      </section>
    );
  }

  const busy = status === "processing";

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Checkout</p>
      <h1 className="mt-3 font-display text-5xl leading-[1.05] text-foreground">Almost there.</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]"
      >
        <div className="space-y-8">
          <fieldset className="space-y-4">
            <legend className="font-display text-2xl text-foreground">Contact</legend>
            <Field label="Full name" name="name" defaultValue={savedCustomer.name} required />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Phone"
                name="phone"
                type="tel"
                defaultValue={savedCustomer.phone}
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                defaultValue={savedCustomer.email}
                required
              />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-display text-2xl text-foreground">Delivery</legend>
            <Field
              label="Address line 1"
              name="address1"
              defaultValue={savedCustomer.address1}
              required
            />
            <Field label="Address line 2" name="address2" defaultValue={savedCustomer.address2} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="City" name="city" defaultValue={savedCustomer.city} required />
              <Field label="State" name="state" defaultValue={savedCustomer.state} required />
              <Field label="PIN" name="pin" defaultValue={savedCustomer.pin} required />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-display text-2xl text-foreground">Payment</legend>
            <div className="rounded-sm border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
              Secure online payment via Razorpay. Test mode is enabled while test API keys are
              configured.
            </div>
            {error && (
              <div className="flex items-start gap-2 rounded-sm border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Note: All orders are final. No refunds or cancellations once payment is processed.
            </p>
          </fieldset>
        </div>

        <aside className="h-fit rounded-sm border border-border bg-card p-6">
          <h2 className="font-display text-2xl text-foreground">Order summary</h2>
          <ul className="mt-4 divide-y divide-border/70 text-sm">
            {items.map((i) => (
              <li key={`${i.dept}:${i.slug}`} className="flex justify-between gap-3 py-3">
                <span className="min-w-0 truncate">
                  <span className="text-muted-foreground">{i.qty} × </span>
                  {i.name}
                </span>
                <span className="shrink-0 font-medium">
                  ₹{(i.price * i.qty).toLocaleString("en-IN")}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border/70 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>₹{subtotal.toLocaleString("en-IN")}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd>{delivery === 0 ? "Free" : `₹${delivery}`}</dd>
            </div>
          </dl>
          <div className="mt-4 flex items-baseline justify-between border-t border-border/70 pt-4">
            <span className="font-display text-lg">Total</span>
            <span className="font-display text-2xl text-foreground">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
          <button
            type="submit"
            disabled={busy}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-clay-deep disabled:opacity-70"
          >
            {busy && <Loader2 className="size-4 animate-spin" />}
            {busy ? "Opening Razorpay…" : `Pay ₹${total.toLocaleString("en-IN")}`}
          </button>
          <Link
            to="/cart"
            className="mt-4 block text-center text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            Back to cart
          </Link>
        </aside>
      </form>
    </section>
  );
}

function blankCustomer(): CheckoutCustomer {
  return {
    name: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pin: "",
  };
}

function readSavedCustomer(): CheckoutCustomer {
  try {
    const raw = localStorage.getItem(SAVED_CUSTOMER_KEY);
    if (!raw) return blankCustomer();

    const parsed = JSON.parse(raw) as Partial<CheckoutCustomer>;

    return {
      ...blankCustomer(),
      ...Object.fromEntries(
        Object.entries(parsed).map(([key, value]) => [key, typeof value === "string" ? value : ""]),
      ),
    };
  } catch {
    return blankCustomer();
  }
}

function saveCustomer(customer: CheckoutCustomer) {
  try {
    localStorage.setItem(SAVED_CUSTOMER_KEY, JSON.stringify(customer));
  } catch {
    // Ignore storage failures so checkout can continue in private or restricted browsers.
  }
}

function getCheckoutCustomer(form: HTMLFormElement): CheckoutCustomer {
  const formData = new FormData(form);
  const value = (name: string) => String(formData.get(name) ?? "").trim();

  return {
    name: value("name"),
    phone: value("phone"),
    email: value("email"),
    address1: value("address1"),
    address2: value("address2"),
    city: value("city"),
    state: value("state"),
    pin: value("pin"),
  };
}

function loadRazorpayCheckout() {
  if (window.Razorpay) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay Checkout could not be loaded."));
    document.body.appendChild(script);
  });
}

function openRazorpayCheckout({
  amount,
  currency,
  keyId,
  orderId,
  receipt,
  totalItems,
  customer,
}: {
  amount: number;
  currency: string;
  keyId: string;
  orderId: string;
  receipt: string;
  totalItems: number;
  customer: CheckoutCustomer;
}) {
  return new Promise<RazorpaySuccessResponse>((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error("Razorpay Checkout is not available."));
      return;
    }

    const checkout = new window.Razorpay({
      key: keyId,
      amount,
      currency,
      name: "Berry and Curry",
      description: `${totalItems} item${totalItems === 1 ? "" : "s"} from Berry and Curry`,
      order_id: orderId,
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      notes: {
        receipt,
        address: [customer.address1, customer.address2, customer.city, customer.state, customer.pin]
          .filter(Boolean)
          .join(", "),
      },
      theme: {
        color: "#7f4a2f",
      },
      handler: resolve,
      modal: {
        ondismiss: () => reject(new Error("Payment was cancelled.")),
      },
    });

    checkout.on("payment.failed", (response) => {
      reject(
        new Error(
          response.error?.description ??
            response.error?.reason ??
            "Razorpay reported that the payment failed.",
        ),
      );
    });

    checkout.open();
  });
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
        {required && " *"}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}
