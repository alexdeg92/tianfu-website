import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MenuCard } from "@/app/components/MenuCard";
import { Reveal } from "@/app/components/Reveal";
import { featuredItems, imageAssets, orderingLinks, restaurant } from "@/app/data";
import { pageAlternates } from "@/app/lib/seo";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { localizedPath } from "@/i18n/navigation";
import { resolveMenuItems } from "@/i18n/menu";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
    ...pageAlternates(locale, "/"),
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const featured = resolveMenuItems(featuredItems, locale, dict);

  return (
    <>
      <section className="relative min-h-[88svh] overflow-hidden px-5 pt-5 pb-14 md:px-10 md:pt-8 md:pb-20 xl:min-h-[92svh] xl:pt-14 xl:pb-24">
        <Image src={imageAssets.pattern} alt="" fill priority className="object-cover opacity-[0.05]" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative grid max-w-7xl items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <Reveal>
            <p className="eyebrow">{dict.home.eyebrow}</p>
            <h1 className="text-heading mt-6 max-w-4xl font-serif text-6xl leading-[0.92] md:text-8xl">
              {dict.home.title}
            </h1>
            <p className="text-body-muted mt-7 max-w-2xl text-xl leading-8">{dict.home.description}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href={localizedPath(locale, "/order")} className="primary-button">
                {dict.home.orderDelivery}
              </Link>
              <Link href={localizedPath(locale, "/menu")} className="secondary-button">
                {dict.home.viewMenu}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={140} className="relative">
            <div className="hero-dish">
              <Image
                src={imageAssets.hero}
                alt={dict.home.heroImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
              <div className="image-scrim absolute inset-0" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-5">
                <div>
                  <p className="text-gold-bright text-xs uppercase tracking-[0.3em]">{dict.home.signatureHeat}</p>
                  <h2 className="text-heading mt-2 font-serif text-3xl">{dict.home.signatureTitle}</h2>
                </div>
                <span className="menu-card-badge shrink-0 rounded-sm px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.28em] backdrop-blur-sm">
                  {dict.common.sichuan}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="grid border-y border-subtle md:grid-cols-3">
        {[
          [dict.home.statYears, restaurant.years],
          [dict.home.statReviews, restaurant.reviews],
          [dict.home.statRating, restaurant.rating],
        ].map(([label, value]) => (
          <div key={label} className="stat-panel">
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <section className="section-shell">
        <Reveal>
          <div className="section-heading">
            <p className="eyebrow">{dict.home.featuredEyebrow}</p>
            <h2>{dict.home.featuredTitle}</h2>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
          {featured.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              <MenuCard
                item={item}
                heatLabel={dict.common.heat}
                spiceLevelTemplate={dict.common.spiceLevel}
                priority={index < 2}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell border-t border-subtle">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">{dict.home.orderEyebrow}</p>
            <h2 className="text-heading mt-4 font-serif text-5xl">{dict.home.orderTitle}</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {orderingLinks.map((link, index) => (
              <Reveal key={link.id} delay={index * 90} className="h-full">
                <a href={link.href} target="_blank" rel="noreferrer" className="delivery-card h-full">
                  <span>{link.name}</span>
                  <small>{dict.ordering[link.id].label}</small>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
