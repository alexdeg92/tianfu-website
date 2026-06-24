"use client";

import { ReactNode, useCallback, useRef, useState } from "react";
import type { ResolvedMenuItem } from "@/i18n/menu";
import { MenuItemDetailSheet } from "./MenuItemDetailSheet";

const MOBILE_MEDIA = "(max-width: 1023px)";

export function MenuMobileDetail({
  itemsById,
  closeItemDetailLabel,
  children,
}: {
  itemsById: Record<string, ResolvedMenuItem>;
  closeItemDetailLabel: string;
  children: ReactNode;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const openItem = openId ? itemsById[openId] : null;

  const openDetail = useCallback(
    (card: HTMLElement) => {
      const id = card.dataset.menuItemId;
      if (!id || !itemsById[id]) return;
      triggerRef.current = card;
      setOpenId(id);
    },
    [itemsById],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!window.matchMedia(MOBILE_MEDIA).matches) return;
      const card = (event.target as HTMLElement).closest<HTMLElement>("[data-menu-item-id]");
      if (!card) return;
      openDetail(card);
    },
    [openDetail],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const card = (event.target as HTMLElement).closest<HTMLElement>("[data-menu-item-id]");
      if (!card || !window.matchMedia(MOBILE_MEDIA).matches) return;
      event.preventDefault();
      openDetail(card);
    },
    [openDetail],
  );

  return (
    <div onClick={handleClick} onKeyDown={handleKeyDown}>
      {children}
      {openItem ? (
        <MenuItemDetailSheet
          item={openItem}
          open={openId !== null}
          onClose={() => setOpenId(null)}
          closeLabel={closeItemDetailLabel}
          returnFocusRef={triggerRef}
        />
      ) : null}
    </div>
  );
}
