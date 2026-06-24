import type { Metadata } from "next";
import { MenuCard } from "../components/MenuCard";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { categories, menuItems } from "../data";

export const metadata: Metadata = {
  title: "Full Menu",
  description: "Explore Tian Fu Restaurant's Sichuan menu with appetizers, soups, chicken, beef, seafood, tofu, specialties, rice, and noodles.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero eyebrow="Full menu" title="Sichuan classics, house specialties, and wok-fired comfort.">
        Browse the full menu by category. Every dish uses Tian Fu's available restaurant imagery with optimized WebP assets and lazy loading.
      </PageHero>

      <section className="section-shell">
        <div className="sticky top-[73px] z-20 -mx-5 mb-10 overflow-x-auto border-y border-white/10 bg-[#0b0a08]/90 px-5 py-3 backdrop-blur md:-mx-10 md:px-10 xl:top-0">
          <div className="flex gap-3">
            {categories.map((category) => (
              <a key={category} href={`#${category.replaceAll(" ", "-").replace("&", "and")}`} className="category-pill">
                {category}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-14">
          {categories.map((category) => {
            const items = menuItems.filter((item) => item.category === category);
            if (!items.length) return null;
            return (
              <section key={category} id={category.replaceAll(" ", "-").replace("&", "and")} className="scroll-mt-28">
                <Reveal>
                  <div className="mb-7 flex items-end justify-between gap-5 border-b border-white/10 pb-4">
                    <h2 className="font-serif text-4xl text-[#fff8e8]">{category}</h2>
                    <span className="text-sm uppercase tracking-[0.22em] text-stone-500">{items.length} dishes</span>
                  </div>
                </Reveal>
                <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
                  {items.map((item, index) => (
                    <Reveal key={item.name} delay={Math.min(index * 70, 260)}>
                      <MenuCard item={item} />
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}
