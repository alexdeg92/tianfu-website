import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LazySection } from "@/app/components/LazySection";
import { menuCardAriaLabel } from "@/app/lib/menu-labels";
import { MenuMobileDetail } from "@/app/components/MenuMobileDetail";
import { MenuCard } from "@/app/components/MenuCard";
import { MenuCategoryNav } from "@/app/components/MenuCategoryNav";
import { Reveal } from "@/app/components/Reveal";
import { categoryAnchor, categoryIds, menuItems, menuItemsByCategory } from "@/app/data";
import { pageAlternates } from "@/app/lib/seo";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { getCategoryLabel, resolveMenuItems, type ResolvedMenuItem } from "@/i18n/menu";

export async function generateMetadata({ params }: PageProps<"/[locale]/menu">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.menu.metaTitle,
    description: dict.menu.metaDescription,
    ...pageAlternates(locale, "/menu"),
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
  const resolved = resolveMenuItems(menuItems, locale, dict);
  const itemsById = Object.fromEntries(
    resolved.map((item) => [item.id, item]),
  ) as Record<string, ResolvedMenuItem>;

  return (
    <section className="menu-shell">
      <MenuCategoryNav categories={categories} />

      <MenuMobileDetail
        itemsById={itemsById}
        closeItemDetailLabel={dict.menu.closeItemDetail}
      >
        <div className="grid gap-14">
          {menuItemsByCategory.map(({ categoryId, items }, categoryIndex) => {
            if (!items.length) return null;
            const categoryLabel = getCategoryLabel(categoryId, locale, dict);

            return (
              <LazySection
                key={categoryId}
                id={categoryAnchor(categoryId)}
                className="scroll-mt-28"
                eager={categoryIndex === 0}
              >
                <Reveal>
                  <div className="mb-7 flex items-end justify-between gap-5 border-b border-subtle pb-4">
                    <h2 className="text-heading font-serif text-4xl">{categoryLabel}</h2>
                    <span className="text-muted text-sm uppercase tracking-[0.22em]">
                      {items.length} {dict.common.dishes}
                    </span>
                  </div>
                </Reveal>
                <div className="menu-item-grid grid gap-0 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
                  {items.map((item) => {
                    const resolvedItem = itemsById[item.id];
                    if (!resolvedItem) return null;

                    return (
                    <MenuCard
                      key={item.id}
                      item={resolvedItem}
                      heatLabel={dict.common.heat}
                      spiceLevelTemplate={dict.common.spiceLevel}
                      compactBelowLg
                      mobileInteractive
                      mobileAriaLabel={menuCardAriaLabel(dict.menu.itemDetailLabel, resolvedItem.name)}
                    />
                    );
                  })}
                </div>
              </LazySection>
            );
          })}
        </div>
      </MenuMobileDetail>
    </section>
  );
}
