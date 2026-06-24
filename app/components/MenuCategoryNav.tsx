"use client";

import { useEffect, useRef, useState } from "react";
import { categoryAnchor } from "@/app/lib/menu-nav";

export function MenuCategoryNav({
  categories,
}: {
  categories: { id: string; label: string }[];
}) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const measure = () => setNavHeight(nav.offsetHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const media = window.matchMedia("(min-width: 1280px)");

    const createObserver = () => {
      const topOffset = media.matches ? "0px" : "-73px";
      return new IntersectionObserver(
        ([entry]) => setStuck(!entry.isIntersecting),
        { threshold: 0, rootMargin: `${topOffset} 0px 0px 0px` },
      );
    };

    let observer = createObserver();
    observer.observe(sentinel);

    const onBreakpointChange = () => {
      observer.disconnect();
      observer = createObserver();
      observer.observe(sentinel);
    };

    media.addEventListener("change", onBreakpointChange);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", onBreakpointChange);
    };
  }, []);

  useEffect(() => {
    document.body.dataset.menuNavStuck = stuck ? "true" : "false";
    return () => {
      delete document.body.dataset.menuNavStuck;
    };
  }, [stuck]);

  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none h-px w-full" aria-hidden />
      {stuck ? <div style={{ height: navHeight }} aria-hidden /> : null}
      <div
        ref={navRef}
        className={
          stuck
            ? "fixed left-0 right-0 top-0 z-[60] overflow-x-auto border-y border-subtle bg-nav-sticky px-5 py-3 backdrop-blur md:px-10 xl:left-[280px]"
            : "sticky top-[73px] z-20 -mx-5 mb-10 overflow-x-auto border-y border-subtle bg-nav-sticky px-5 py-3 backdrop-blur md:-mx-10 md:px-10 xl:top-0"
        }
      >
        <div className="flex gap-3">
          {categories.map((category) => (
            <a key={category.id} href={`#${categoryAnchor(category.id)}`} className="category-pill">
              {category.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
