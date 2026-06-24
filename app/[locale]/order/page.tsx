import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/app/components/PageHero";
import { Reveal } from "@/app/components/Reveal";
import { orderingLinks, restaurant } from "@/app/data";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[locale]/order">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.order.metaTitle,
    description: dict.order.metaDescription,
  };
}

export default async function OrderPage({ params }: PageProps<"/[locale]/order">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <div className="flex min-h-[calc(100dvh-73px)] flex-col xl:min-h-dvh">
      <PageHero compact eyebrow={dict.order.eyebrow} title={dict.order.title}>
        {dict.order.lead}
      </PageHero>
      <section className="order-shell section-shell">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {orderingLinks.map((link, index) => (
            <Reveal key={link.id} delay={index * 90}>
              <a href={link.href} target="_blank" rel="noreferrer" className="ordering-platform">
                <span>{link.name}</span>
                <strong>{dict.ordering[link.id].label}</strong>
                <em>{dict.common.startOrder}</em>
              </a>
            </Reveal>
          ))}
          <Reveal delay={orderingLinks.length * 90}>
            <a href={`tel:${restaurant.phone.replaceAll("-", "")}`} className="ordering-platform">
              <span>{dict.ordering.phone.name}</span>
              <strong>{dict.ordering.phone.label}</strong>
              <em>{dict.ordering.phone.cta}</em>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
