"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export function LazySection({
  children,
  className = "",
  id,
  eager = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (eager || visible) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, visible]);

  return (
    <section ref={ref} id={id} className={className}>
      {visible ? children : <div className="min-h-[50vh]" aria-hidden />}
    </section>
  );
}
