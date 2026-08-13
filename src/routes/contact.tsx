import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Berry and Curry" },
      { name: "description", content: "Get in touch about fruit orders, bakery orders, shipping, wholesale, and bulk enquiries." },
      { property: "og:title", content: "Contact — Berry and Curry" },
      { property: "og:description", content: "Reach the Berry and Curry team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-24 lg:px-10">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Get in touch</p>
        <h1 className="mt-3 font-display text-5xl leading-[1.02] text-foreground sm:text-6xl">
          Say hello.<br /><span className="italic">We reply the same day.</span>
        </h1>
        <p className="mt-6 max-w-md text-muted-foreground">
          Questions on fruit orders, bakery orders, shipping, wholesale, or a
          custom gift box? Drop us a line and someone from the team will get
          back to you personally.
        </p>
        <ul className="mt-10 space-y-5 text-sm">
          <Item icon={<Phone className="size-4" />} label="Call / WhatsApp" value="6362428384" />
          <Item icon={<Mail className="size-4" />} label="Email" value="hello@berryncurry.com" />
          <Item icon={<MapPin className="size-4" />} label="Studio" value="Indiranagar, Bengaluru" />
        </ul>
      </div>
      <form className="rounded-sm border border-border/70 bg-card p-8 shadow-sm sm:p-10" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Your name" placeholder="Ananya Rao" />
          <Field label="Email" type="email" placeholder="you@orchard.com" />
        </div>
        <div className="mt-5">
          <Field label="Subject" placeholder="Fruit / bakery / wholesale enquiry" />
        </div>
        <div className="mt-5">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Message</label>
          <textarea rows={6} className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none" placeholder="Tell us a little about what you're after…" />
        </div>
        <button className="mt-8 w-full rounded-full bg-primary py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-clay-deep">
          Send message
        </button>
      </form>
    </section>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</label>
      <input type={type} placeholder={placeholder} className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none" />
    </div>
  );
}

function Item({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-start gap-4">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-accent/30 text-sage-deep">{icon}</span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        <p className="mt-1 text-base text-foreground">{value}</p>
      </div>
    </li>
  );
}
