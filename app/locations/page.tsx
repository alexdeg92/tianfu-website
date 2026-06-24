import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { restaurant } from "../data";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find Tian Fu Restaurant at 8025 Taschereau Blvd in Brossard, Quebec, with hours and contact details.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero eyebrow="Visit us" title="Tian Fu Restaurant in Brossard.">
        Conveniently located on Taschereau Boulevard for dine-in, pickup, and delivery across Brossard and nearby Montreal neighborhoods.
      </PageHero>
      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="map-panel">
              <div>
                <p className="eyebrow">Address</p>
                <h2 className="mt-4 font-serif text-4xl text-[#fff8e8]">{restaurant.address}</h2>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=8025%20Taschereau%20Blvd%20Brossard%20QC%20J4Y%201A4"
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button mt-8 inline-flex"
                >
                  Open in maps
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="hours-panel">
              <h2 className="font-serif text-3xl text-[#fff8e8]">Hours</h2>
              <div className="mt-6 grid gap-3">
                {restaurant.hours.map(([day, hours]) => (
                  <div key={day} className="hours-row">
                    <span>{day}</span>
                    <strong>{hours}</strong>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
