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
    <div className="flex min-h-[calc(100dvh-73px)] flex-col xl:min-h-dvh">
      <PageHero compact eyebrow={dict.locations.eyebrow} title={dict.locations.title}>
        {dict.locations.lead}
      </PageHero>
      <section className="locations-shell section-shell flex flex-1 flex-col">
        <div className="grid flex-1 gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <Reveal className="h-full">
            <div className="map-panel map-panel--preview h-full">
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
                <h2 className="text-heading mt-3 font-serif text-3xl leading-tight md:text-4xl">{restaurant.address}</h2>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="primary-button mt-5 inline-flex">
                  {dict.common.openInMaps}
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal className="h-full" delay={120}>
            <div className="hours-panel h-full">
              <h2 className="text-heading font-serif text-2xl md:text-3xl">{dict.common.hours}</h2>
              <div className="hours-grid mt-4">
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
