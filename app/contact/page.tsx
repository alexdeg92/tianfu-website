import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { restaurant } from "../data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Tian Fu Restaurant by phone or email, and view address, hours, and restaurant policies.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Call, visit, or plan your next Sichuan dinner.">
        For dine-in, pickup, large tables, or quick questions, Tian Fu can be reached directly by phone or email.
      </PageHero>
      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal>
            <a className="contact-card" href={`tel:${restaurant.phone.replaceAll("-", "")}`}>
              <span>Phone</span>
              <strong>{restaurant.phone}</strong>
            </a>
          </Reveal>
          <Reveal delay={100}>
            <a className="contact-card" href={`mailto:${restaurant.email}`}>
              <span>Email</span>
              <strong>{restaurant.email}</strong>
            </a>
          </Reveal>
          <Reveal delay={200}>
            <div className="contact-card">
              <span>Address</span>
              <strong>{restaurant.address}</strong>
            </div>
          </Reveal>
        </div>
        <Reveal delay={180}>
          <div className="policy-panel">
            <h2 className="font-serif text-3xl text-[#fff8e8]">Restaurant notes</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "No corkage fees for outside beverages",
                "Outside food items are not permitted",
                "15% service charge for large round tables",
                "Takeout containers provided at no charge",
              ].map((policy) => (
                <p key={policy}>{policy}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
