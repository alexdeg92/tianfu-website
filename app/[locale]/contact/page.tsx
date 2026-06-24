import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/app/components/PageHero";
import { Reveal } from "@/app/components/Reveal";
import { restaurant } from "@/app/data";
import { pageAlternates } from "@/app/lib/seo";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    ...pageAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <div className="contact-page flex flex-1 flex-col">
      <PageHero tight compact eyebrow={dict.contact.eyebrow} title={dict.contact.title}>
        {dict.contact.lead}
      </PageHero>
      <section className="contact-shell section-shell flex flex-col justify-start">
        <div className="grid gap-3 lg:grid-cols-3">
          <Reveal>
            <a className="contact-card" href={`tel:${restaurant.phone.replaceAll("-", "")}`}>
              <span>{dict.common.phone}</span>
              <strong>{restaurant.phone}</strong>
            </a>
          </Reveal>
          <Reveal delay={100}>
            <a className="contact-card" href={`mailto:${restaurant.email}`}>
              <span>{dict.common.email}</span>
              <strong>{restaurant.email}</strong>
            </a>
          </Reveal>
          <Reveal delay={200}>
            <div className="contact-card">
              <span>{dict.common.address}</span>
              <strong>{restaurant.address}</strong>
            </div>
          </Reveal>
        </div>
        <Reveal delay={180}>
          <div className="policy-panel">
            <h2 className="text-heading font-serif text-xl md:text-2xl">{dict.contact.policiesTitle}</h2>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {dict.contact.policies.map((policy) => (
                <p key={policy}>{policy}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
