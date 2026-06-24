"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ResolvedMenuItem } from "@/i18n/menu";

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MenuItemDetailSheet({
  item,
  open,
  onClose,
  closeLabel,
  returnFocusRef,
}: {
  item: ResolvedMenuItem;
  open: boolean;
  onClose: () => void;
  closeLabel: string;
  returnFocusRef: React.RefObject<HTMLElement | null>;
}) {
  const titleId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const root = rootRef.current;
    if (!root) return;

    const focusable = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [open, handleClose, returnFocusRef]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      ref={rootRef}
      className="menu-detail-root menu-detail-root-open"
      role="presentation"
    >
      <div className="menu-detail-backdrop" onClick={handleClose} aria-hidden="true" />
      <button
        type="button"
        className="menu-detail-close close-button"
        aria-label={closeLabel}
        onClick={handleClose}
      >
        ×
      </button>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="menu-detail-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="menu-detail-image relative overflow-hidden">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 1023px) 92vw, 0px"
            className="object-cover"
            priority
          />
        </div>
        <div className="menu-detail-body">
          <h3 id={titleId} className="menu-detail-title font-serif">
            {item.name}
          </h3>
          <p className="menu-detail-price font-serif">{item.price}</p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
