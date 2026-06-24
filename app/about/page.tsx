import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { imageAssets, restaurant } from "../data";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Tian Fu Restaurant's authentic Sichuan cooking, Brossard location, and long-running local reputation.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Tian Fu" title="A focused Sichuan kitchen with a loyal Brossard following.">
        Tian Fu has built its reputation on unapologetic flavor, precise wok work, and the layered heat that defines Sichuan cooking.
      </PageHero>
      <section className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="relative min-h-[470px] overflow-hidden rounded-sm border border-[#d0a55d]/20">
              <Image src={imageAssets.hero} alt="Tian Fu signature Sichuan dish" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">The house style</p>
            <h2 className="mt-4 font-serif text-5xl leading-tight text-[#fff8e8]">Numbing peppercorn, chili fragrance, and clean technique.</h2>
            <p className="mt-7 text-lg leading-8 text-stone-300">
              The menu moves from approachable favorites like wonton soup and Gong Bao chicken to deeper Sichuan staples including mapo tofu, spicy fish, and specialty cuts prepared with care.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["Years", restaurant.years],
                ["Reviews", restaurant.reviews],
                ["Rating", restaurant.rating],
              ].map(([label, value]) => (
                <div key={label} className="mini-stat">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
