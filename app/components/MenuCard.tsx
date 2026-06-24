import Image from "next/image";
import { MenuItem } from "../data";

export function SpiceMeter({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${value} out of 5 spice level`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={`h-1.5 w-4 rounded-full ${index < value ? "bg-[#b51f18]" : "bg-white/10"}`} />
      ))}
    </div>
  );
}

export function MenuCard({ item, priority = false }: { item: MenuItem; priority?: boolean }) {
  return (
    <article className="menu-card group">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#17120d]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          className="object-cover opacity-85 transition duration-700 group-hover:[transform:scale(1.08)] group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <span className="rounded-full border border-[#d0a55d]/40 bg-black/45 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#f0ca79] backdrop-blur">
            {item.category}
          </span>
          <span className="font-serif text-xl text-[#f8e4b3]">{item.price}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-5">
          <h3 className="font-serif text-2xl text-[#fff8e8]">{item.name}</h3>
        </div>
        <p className="mt-3 min-h-[72px] text-sm leading-6 text-stone-400">{item.description}</p>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs uppercase tracking-[0.22em] text-stone-500">Heat</span>
          <SpiceMeter value={item.spice} />
        </div>
      </div>
    </article>
  );
}
