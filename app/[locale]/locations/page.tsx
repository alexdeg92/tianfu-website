import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/app/components/PageHero";
import { Reveal } from "@/app/components/Reveal";
import { restaurant } from "@/app/data";
import { pageAlternates } from "@/app/lib/seo";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[locale]/locations">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.locations.metaTitle,
    description: dict.locations.metaDescription,
    ...pageAlternates(locale, "/locations"),
  };
}

export default async function LocationsPage({ params }: PageProps<"/[locale]/locations">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const mapsQuery = restaurant.address.replace(/,\s*/g, " ");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(restaurant.address)}&z=15&output=embed`;

  return (
    <div className="locations-page flex flex-1 flex-col">
      <PageHero tight compact eyebrow={dict.locations.eyebrow} title={dict.locations.title}>
        {dict.locations.lead}
      </PageHero>
      <section className="locations-shell section-shell flex flex-col justify-start">
        <div className="locations-grid flex flex-col gap-4 lg:flex-row lg:items-stretch">
          <Reveal className="flex min-w-0 flex-1 flex-col">
            <div className="map-panel map-panel--preview flex h-full min-h-0 flex-col">
              <div className="map-panel__embed">
                <iframe
                  src={mapsEmbedUrl}
                  title={`${restaurant.name}, ${restaurant.address}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="map-panel__content">
                <p className="eyebrow">{dict.locations.addressEyebrow}</p>
                <h2 className="text-heading mt-2 font-serif text-xl leading-tight md:text-2xl">{restaurant.address}</h2>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="primary-button mt-2.5 inline-flex">
                  {dict.common.openInMaps}
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal className="flex shrink-0 flex-col lg:w-[42%]" delay={120}>
            <div className="hours-panel">
              <h2 className="text-heading font-serif text-xl md:text-2xl">{dict.common.hours}</h2>
              <div className="hours-grid mt-3">
                {restaurant.hours.map(([dayKey, hours]) => (
                  <div key={dayKey} className="hours-row">
                    <span>{dict.days[dayKey]}</span>
                    <strong>{hours === "closed" ? dict.common.closed : hours}</strong>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
