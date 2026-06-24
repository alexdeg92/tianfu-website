import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompactMenuCard } from "@/app/components/CompactMenuCard";
import { MenuCategoryNav } from "@/app/components/MenuCategoryNav";
import { Reveal } from "@/app/components/Reveal";
import { categoryIds, categoryAnchor, menuItems } from "@/app/data";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { getCategoryLabel, resolveMenuItems } from "@/i18n/menu";

export async function generateMetadata({ params }: PageProps<"/[locale]/menu">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.menu.metaTitle,
    description: dict.menu.metaDescription,
  };
}

export default async function MenuPage({ params }: PageProps<"/[locale]/menu">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const categories = categoryIds.map((id) => ({
    id,
    label: getCategoryLabel(id, locale, dict),
  }));

  return (
    <section className="menu-shell section-shell">
      <MenuCategoryNav categories={categories} />

      <div className="grid gap-14">
        {categoryIds.map((categoryId) => {
          const items = menuItems.filter((item) => item.categoryId === categoryId);
          if (!items.length) return null;
          const resolved = resolveMenuItems(items, locale, dict);
          const categoryLabel = getCategoryLabel(categoryId, locale, dict);

          return (
            <section key={categoryId} id={categoryAnchor(categoryId)} className="scroll-mt-28">
              <Reveal>
                <div className="mb-7 flex items-end justify-between gap-5 border-b border-subtle pb-4">
                  <h2 className="text-heading font-serif text-4xl">{categoryLabel}</h2>
                  <span className="text-muted text-sm uppercase tracking-[0.22em]">
                    {items.length} {dict.common.dishes}
                  </span>
                </div>
              </Reveal>
              <div className="menu-item-grid grid gap-0 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
                {resolved.map((item, index) => (
                  <Reveal key={item.id} delay={Math.min(index * 70, 260)}>
                    <CompactMenuCard
                      item={item}
                      heatLabel={dict.common.heat}
                      spiceLevelTemplate={dict.common.spiceLevel}
                      itemDetailLabel={dict.menu.itemDetailLabel}
                      closeItemDetailLabel={dict.menu.closeItemDetail}
                    />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
