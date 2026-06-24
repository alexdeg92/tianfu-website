import Image from "next/image";
import type { ResolvedMenuItem } from "@/i18n/menu";
import { formatSpiceLevel } from "@/i18n/menu";

export function SpiceMeter({
  value,
  spiceLevelLabel,
}: {
  value: number;
  spiceLevelLabel: string;
}) {
  return (
    <div className="flex items-center gap-1" aria-label={spiceLevelLabel}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`h-1.5 w-4 rounded-full lg:h-[0.3rem] lg:w-[0.85rem] ${index < value ? "heat-dot-active" : "heat-dot-inactive"}`}
        />
      ))}
    </div>
  );
}

export function MenuCard({
  item,
  heatLabel,
  spiceLevelTemplate,
  priority = false,
  compactBelowLg = false,
  mobileInteractive = false,
  mobileAriaLabel,
}: {
  item: ResolvedMenuItem;
  heatLabel: string;
  spiceLevelTemplate: string;
  priority?: boolean;
  compactBelowLg?: boolean;
  mobileInteractive?: boolean;
  mobileAriaLabel?: string;
}) {
  const cardClass = compactBelowLg ? "menu-card menu-card--compact group" : "menu-card group";

  return (
    <article
      className={cardClass}
      {...(mobileInteractive
        ? {
            "data-menu-item-id": item.id,
            role: "button" as const,
            tabIndex: 0,
            "aria-label": mobileAriaLabel,
          }
        : {})}
    >
      <div className="menu-card-image relative aspect-[4/3] overflow-hidden lg:aspect-[5/3]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes={
            compactBelowLg
              ? "(max-width: 1023px) 88px, (max-width: 1280px) 33vw, 25vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          }
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover opacity-85 transition duration-700 group-hover:[transform:scale(1.08)] group-hover:opacity-100"
        />
        <div className="image-scrim absolute inset-0" />
        <div className="menu-card-image-overlay absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 lg:bottom-3 lg:left-3 lg:right-3 lg:gap-2">
          <span className="menu-card-badge rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] backdrop-blur lg:px-2 lg:py-0.5 lg:text-[0.65rem] lg:tracking-[0.16em]">
            {item.categoryLabel}
          </span>
          <span className="menu-card-price font-serif text-xl lg:text-lg">{item.price}</span>
        </div>
      </div>
      <div className="menu-card-body p-5 lg:p-4">
        <div className="menu-card-header flex items-start justify-between gap-3 lg:gap-3">
          <h3 className="menu-card-title font-serif text-2xl lg:text-xl">{item.name}</h3>
          {compactBelowLg ? (
            <span className="menu-card-price menu-card-price--inline font-serif text-lg">{item.price}</span>
          ) : null}
        </div>
        <p className="menu-card-desc mt-3 min-h-[72px] text-sm leading-6 lg:mt-2 lg:min-h-[3.25rem] lg:text-xs lg:leading-5">
          {item.description}
        </p>
        <div className="menu-card-divider mt-5 flex items-center justify-between border-t pt-4 lg:mt-3 lg:pt-3">
          <span className="text-muted text-xs uppercase tracking-[0.22em]">{heatLabel}</span>
          <SpiceMeter value={item.spice} spiceLevelLabel={formatSpiceLevel(spiceLevelTemplate, item.spice)} />
        </div>
      </div>
    </article>
  );
}
