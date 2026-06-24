import Image from "next/image";
import Link from "next/link";
import { MenuCard } from "./components/MenuCard";
import { Reveal } from "./components/Reveal";
import { featuredItems, imageAssets, orderingLinks, restaurant } from "./data";

export default function Home() {
  return (
    <>
      <section className="relative min-h-[92svh] overflow-hidden px-5 py-16 md:px-10 md:py-24">
        <Image src={imageAssets.pattern} alt="" fill priority className="object-cover opacity-[0.05]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(181,31,24,0.34),transparent_33%),linear-gradient(120deg,#090807_0%,#19120d_55%,#0b0a08_100%)]" />
        <div className="relative grid min-h-[calc(92svh-8rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="eyebrow">Brossard · Minutes from Montreal</p>
            <h1 className="mt-6 max-w-4xl font-serif text-6xl leading-[0.92] text-[#fff8e8] md:text-8xl">
              Tian Fu Restaurant
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-stone-300">
              Authentic Sichuan cooking with the slow heat, bright aromatics, and precise wok work that make the cuisine unforgettable.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/order" className="primary-button">
                Order delivery
              </Link>
              <Link href="/menu" className="secondary-button">
                View full menu
              </Link>
            </div>
          </Reveal>

          <Reveal delay={140} className="relative">
            <div className="hero-dish">
              <Image
                src={imageAssets.hero}
                alt="Tian Fu Sichuan fish dish in chili oil"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#f0ca79]">Signature heat</p>
                  <h2 className="mt-2 font-serif text-3xl text-white">Chili oil, peppercorn, depth</h2>
                </div>
                <span className="rounded-full bg-[#b51f18] px-4 py-2 text-sm font-semibold text-white">Sichuan</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="grid border-y border-white/10 md:grid-cols-3">
        {[
          ["Years serving Brossard", restaurant.years],
          ["Guest reviews", restaurant.reviews],
          ["Local rating", restaurant.rating],
        ].map(([label, value]) => (
          <div key={label} className="stat-panel">
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <section className="section-shell">
        <Reveal>
          <div className="section-heading">
            <p className="eyebrow">Featured dishes</p>
            <h2>Built around the essential Sichuan balance: fragrant, fiery, and deeply savory.</h2>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
          {featuredItems.map((item, index) => (
            <Reveal key={item.name} delay={index * 80}>
              <MenuCard item={item} priority={index < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell border-t border-white/10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Order direct from your app</p>
            <h2 className="mt-4 font-serif text-5xl text-[#fff8e8]">Dinner plans, handled.</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {orderingLinks.map((link, index) => (
              <Reveal key={link.name} delay={index * 90}>
                <a href={link.href} target="_blank" rel="noreferrer" className="delivery-card">
                  <span>{link.name}</span>
                  <small>{link.label}</small>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
