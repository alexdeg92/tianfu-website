import Image from "next/image";
import { imageAssets } from "../data";

export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 px-5 py-20 md:px-10 md:py-28">
      <Image src={imageAssets.pattern} alt="" fill priority className="object-cover opacity-[0.06]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(181,31,24,0.32),transparent_34%),linear-gradient(135deg,#0b0a08_0%,#17100c_60%,#0b0a08_100%)]" />
      <div className="relative max-w-6xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] text-[#fff8e8] md:text-7xl">{title}</h1>
        <div className="mt-7 max-w-2xl text-lg leading-8 text-stone-300">{children}</div>
      </div>
    </section>
  );
}
