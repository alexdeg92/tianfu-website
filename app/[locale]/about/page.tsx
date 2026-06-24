import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/app/components/PageHero";
import { Reveal } from "@/app/components/Reveal";
import { imageAssets, restaurant } from "@/app/data";
import { pageAlternates } from "@/app/lib/seo";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
    ...pageAlternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <div className="about-page flex flex-1 flex-col">
      <PageHero tight compact eyebrow={dict.about.eyebrow} title={dict.about.title}>
        {dict.about.lead}
      </PageHero>
      <section className="about-shell section-shell flex flex-col justify-start">
        <div className="about-grid flex flex-col lg:flex-row lg:items-start">
          <Reveal className="min-w-0 flex-1">
            <div className="about-image-panel relative overflow-hidden rounded-sm border border-chrome">
              <Image
                src={imageAssets.hero}
                alt={dict.about.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="min-w-0 flex-1" delay={120}>
            <div className="about-content">
              <p className="eyebrow">{dict.about.styleEyebrow}</p>
              <h2 className="text-heading about-style-title font-serif leading-tight">{dict.about.styleTitle}</h2>
              <p className="text-body-muted about-style-body">{dict.about.styleBody}</p>
              <div className="about-stats grid gap-2 sm:grid-cols-3">
                {[
                  [restaurant.years, dict.common.years],
                  [restaurant.reviews, dict.common.reviews],
                  [restaurant.rating, dict.common.rating],
                ].map(([value, label]) => (
                  <div key={label} className="mini-stat">
                    <strong>{value}</strong>
                    <span>{label}</span>
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
