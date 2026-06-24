import Image from "next/image";
import { imageAssets } from "../data";

export function PageHero({
  eyebrow,
  title,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={
        compact
          ? "relative shrink-0 overflow-hidden border-b border-subtle px-5 py-10 md:px-10 md:py-12"
          : "relative overflow-hidden border-b border-subtle px-5 py-20 md:px-10 md:py-28"
      }
    >
      <Image src={imageAssets.pattern} alt="" fill priority className="object-cover opacity-[0.06]" />
      <div className="page-hero-overlay absolute inset-0" />
      <div className="relative max-w-6xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1
          className={
            compact
              ? "text-heading mt-3 max-w-4xl font-serif text-4xl leading-[1.02] md:text-5xl"
              : "text-heading mt-5 max-w-4xl font-serif text-5xl leading-[0.98] md:text-7xl"
          }
        >
          {title}
        </h1>
        <div
          className={
            compact
              ? "text-body-muted mt-4 max-w-2xl text-base leading-7"
              : "text-body-muted mt-7 max-w-2xl text-lg leading-8"
          }
        >
          {children}
        </div>
      </div>
    </section>
  );
}
