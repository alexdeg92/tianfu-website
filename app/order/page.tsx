import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { orderingLinks } from "../data";

export const metadata: Metadata = {
  title: "Ordering & Delivery",
  description: "Order Tian Fu Restaurant through DoorDash, Uber Eats, or SkipTheDishes for delivery or pickup.",
};

export default function OrderPage() {
  return (
    <>
      <PageHero eyebrow="Ordering & delivery" title="Get Tian Fu delivered while the chili oil is still calling.">
        Choose your preferred delivery platform for pickup or delivery. Links open directly to Tian Fu search/order pages where platform availability can be confirmed.
      </PageHero>
      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-3">
          {orderingLinks.map((link, index) => (
            <Reveal key={link.name} delay={index * 90}>
              <a href={link.href} target="_blank" rel="noreferrer" className="ordering-platform">
                <span>{link.name}</span>
                <strong>{link.label}</strong>
                <em>Start order</em>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
