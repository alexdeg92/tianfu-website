"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import type { ResolvedMenuItem } from "@/i18n/menu";
import { MenuCard } from "./MenuCard";
import { MenuItemDetailSheet } from "./MenuItemDetailSheet";

const MOBILE_MEDIA = "(max-width: 1023px)";

function subscribeMobileMedia(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(MOBILE_MEDIA);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getMobileSnapshot() {
  return window.matchMedia(MOBILE_MEDIA).matches;
}

function getServerMobileSnapshot() {
  return false;
}

function formatItemDetailLabel(template: string, name: string) {
  return template.replace("{name}", name);
}

export function CompactMenuCard({
  item,
  heatLabel,
  spiceLevelTemplate,
  priority = false,
  itemDetailLabel,
  closeItemDetailLabel,
}: {
  item: ResolvedMenuItem;
  heatLabel: string;
  spiceLevelTemplate: string;
  priority?: boolean;
  itemDetailLabel: string;
  closeItemDetailLabel: string;
}) {
  const [detailOpen, setDetailOpen] = useState(false);
  const mobileDetailEnabled = useSyncExternalStore(
    subscribeMobileMedia,
    getMobileSnapshot,
    getServerMobileSnapshot,
  );
  const triggerRef = useRef<HTMLDivElement>(null);

  const openDetail = useCallback(() => {
    if (!window.matchMedia(MOBILE_MEDIA).matches) return;
    setDetailOpen(true);
  }, []);

  if (!mobileDetailEnabled) {
    return (
      <MenuCard
        item={item}
        heatLabel={heatLabel}
        spiceLevelTemplate={spiceLevelTemplate}
        priority={priority}
        compactBelowLg
      />
    );
  }

  return (
    <>
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        className="menu-card-trigger"
        aria-label={formatItemDetailLabel(itemDetailLabel, item.name)}
        aria-expanded={detailOpen}
        aria-haspopup="dialog"
        onClick={openDetail}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openDetail();
          }
        }}
      >
        <MenuCard
          item={item}
          heatLabel={heatLabel}
          spiceLevelTemplate={spiceLevelTemplate}
          priority={priority}
          compactBelowLg
        />
      </div>
      <MenuItemDetailSheet
        item={item}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        closeLabel={closeItemDetailLabel}
        returnFocusRef={triggerRef}
      />
    </>
  );
}
