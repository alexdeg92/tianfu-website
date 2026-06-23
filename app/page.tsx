'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const MenuItem = ({ name, description, spiceLevel, image }: { name: string; description: string; spiceLevel: string; image?: string }) => (
  <div className="group relative overflow-hidden rounded-xl bg-stone-900 shadow-2xl transition-all duration-500 hover:shadow-amber-900/50">
    {/* Image placeholder with gradient */}
    <div className="h-48 bg-gradient-to-br from-amber-900 via-red-900 to-stone-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
      <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-50 group-hover:opacity-70 transition-opacity duration-500">
        {image || '🍲'}
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="font-serif text-xl font-bold text-amber-50 mb-2 group-hover:text-amber-200 transition-colors">{name}</h3>
      <p className="text-amber-100/80 text-sm mb-4 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-amber-200 bg-amber-900/50 px-3 py-1 rounded-full border border-amber-700/50">
          {spiceLevel}
        </span>
      </div>
    </div>
  </div>
);

const SpiceIndicator = ({ level }: { level: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-lg ${i < level ? 'text-red-500' : 'text-amber-700/30'}`}
      >
        🌶️
      </span>
    ))}
  </div>
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: "Mapo Tofu", description: "Silken tofu in aromatic Sichuan sauce with traditional spices", spiceLevel: "Very Hot", level: 5, category: "tofu" },
    { name: "Gong Bao Chicken", description: "Hand-cut chicken with roasted peanuts and Sichuan peppercorns", spiceLevel: "Hot", level: 4, category: "chicken" },
    { name: "Sizzling Beef", description: "Premium beef on hot plate with seasonal vegetables", spiceLevel: "Medium", level: 3, category: "beef" },
    { name: "Chongqing Chicken", description: "Crispy chicken thighs with dried chilies and Sichuan pepper", spiceLevel: "Very Hot", level: 5, category: "chicken" },
    { name: "Hot & Sour Soup", description: "Traditional Sichuan soup with vinegar, chili oil, and mushrooms", spiceLevel: "Hot", level: 4, category: "soup" },
    { name: "Wonton Soup", description: "Hand-folded wontons in delicate chicken broth", spiceLevel: "Mild", level: 1, category: "soup" },
    { name: "Duck Cheeks", description: "Tender duck cheeks braised in signature Sichuan sauce", spiceLevel: "Medium-Hot", level: 3, category: "specialty" },
    { name: "Beef Tongue", description: "Thinly sliced beef tongue with numbing Sichuan peppercorn", spiceLevel: "Medium-Hot", level: 3, category: "specialty" },
  ];

  const categories = ['all', 'chicken', 'beef', 'tofu', 'soup', 'specialty'];
  const filteredItems = activeTab === 'all' ? menuItems : menuItems.filter(item => item.category === activeTab);

  return (
    <div className="w-full bg-stone-950 text-stone-100">
      {/* Navigation */}
      <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? 'bg-stone-950/95 backdrop-blur-md shadow-2xl shadow-black' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="#" className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent hover:from-amber-100 hover:to-amber-50 transition-all duration-300">
            Tian Fu
          </Link>

          <div className="hidden md:flex gap-10 text-amber-100/80">
            <Link href="#home" className="font-serif hover:text-amber-200 transition-colors duration-300 text-sm tracking-wide">Home</Link>
            <Link href="#menu" className="font-serif hover:text-amber-200 transition-colors duration-300 text-sm tracking-wide">Menu</Link>
            <Link href="#experience" className="font-serif hover:text-amber-200 transition-colors duration-300 text-sm tracking-wide">Experience</Link>
            <Link href="#contact" className="font-serif hover:text-amber-200 transition-colors duration-300 text-sm tracking-wide">Contact</Link>
          </div>

          <button className="md:hidden text-amber-200 text-2xl hover:text-amber-100 transition" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-stone-950/98 backdrop-blur-md p-6 space-y-4 text-amber-100 border-t border-amber-900/30">
            <Link href="#home" className="block font-serif py-2 hover:text-amber-200">Home</Link>
            <Link href="#menu" className="block font-serif py-2 hover:text-amber-200">Menu</Link>
            <Link href="#experience" className="block font-serif py-2 hover:text-amber-200">Experience</Link>
            <Link href="#contact" className="block font-serif py-2 hover:text-amber-200">Contact</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen w-full overflow-hidden pt-20 flex items-center justify-center">
        {/* Background gradient with depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/20 to-stone-950 z-0" />

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl opacity-50 z-0" />
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-red-900/10 rounded-full blur-3xl opacity-50 z-0" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
          <div className="mb-8 inline-block">
            <span className="text-amber-200/60 text-sm tracking-widest font-serif uppercase">Authentic Sichuan Excellence</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-100 bg-clip-text text-transparent">
              Culinary Artistry
            </span>
            <br />
            <span className="text-amber-100">Meets Tradition</span>
          </h1>

          <p className="text-lg md:text-xl text-amber-100/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the bold, complex flavors of authentic Sichuan cuisine, where every dish tells a story of culinary mastery and heritage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-serif font-semibold rounded-lg hover:from-amber-400 hover:to-amber-300 transition-all duration-300 shadow-xl shadow-amber-900/50 hover:shadow-amber-900/70">
              Reserve a Table
            </button>
            <button className="group px-8 py-4 border-2 border-amber-300/50 text-amber-100 font-serif font-semibold rounded-lg hover:bg-amber-900/20 hover:border-amber-300 transition-all duration-300 backdrop-blur-sm">
              Explore Menu
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="experience" className="py-24 px-4 md:px-8 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden shadow-2xl shadow-black">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-red-900/30 to-stone-900 z-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl opacity-20">🍲</div>
              </div>
              <div className="absolute inset-0 border border-amber-700/30 rounded-2xl" />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="mb-6">
              <h2 className="text-5xl md:text-5xl font-serif font-bold mb-4">
                <span className="bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent">
                  Authentic Sichuan
                </span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-red-500 rounded-full" />
            </div>

            <p className="text-amber-100/80 text-lg mb-6 leading-relaxed">
              Since our founding, Tian Fu has been dedicated to bringing authentic Sichuan cuisine to the community. Our chefs master traditional techniques passed down through generations, creating dishes that balance numbing spice, bold flavors, and refined elegance.
            </p>

            <p className="text-amber-100/80 text-lg mb-8 leading-relaxed">
              From delicate hand-folded wontons to aromatic specialty preparations, each dish celebrates the complexity and depth of Sichuan culinary tradition. We source the finest ingredients and prepare everything fresh, honoring both authenticity and excellence.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-serif font-bold text-amber-200">4.1★</div>
                <p className="text-amber-100/60 text-sm mt-2">Highly Rated</p>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-amber-200">779+</div>
                <p className="text-amber-100/60 text-sm mt-2">Reviews</p>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-amber-200">13+</div>
                <p className="text-amber-100/60 text-sm mt-2">Years</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-4 md:px-8 relative">
        <div className="absolute inset-0 top-0 h-96 bg-gradient-to-b from-amber-900/10 to-transparent z-0" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-5xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent">
                Signature Dishes
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-red-500 rounded-full mx-auto mb-8" />
            <p className="text-amber-100/70 text-lg max-w-2xl mx-auto">
              A curated selection of our most celebrated dishes, each crafted with precision and passion
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full font-serif text-sm tracking-wide transition-all duration-300 ${
                  activeTab === cat
                    ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-900/50'
                    : 'bg-amber-900/30 text-amber-200 hover:bg-amber-900/50 border border-amber-700/50'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <MenuItem key={idx} {...item} />
            ))}
          </div>

          {/* Full Menu CTA */}
          <div className="text-center mt-16">
            <p className="text-amber-100/70 text-lg mb-6">
              Discover our complete menu with appetizers, soups, and more specialties
            </p>
            <a
              href="https://www.tianfu.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-serif font-semibold rounded-lg hover:from-amber-400 hover:to-amber-300 transition-all duration-300 shadow-xl shadow-amber-900/50 hover:shadow-amber-900/70"
            >
              View Complete Menu
            </a>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-amber-900/20 via-stone-950 to-red-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: "🌶️", title: "Bold Flavors", desc: "Authentic Sichuan numbing and spice" },
              { icon: "👨‍🍳", title: "Expert Chefs", desc: "Masters of traditional techniques" },
              { icon: "✨", title: "Premium Quality", desc: "Finest ingredients, fresh daily" },
              { icon: "🎭", title: "Heritage", desc: "13+ years of culinary excellence" }
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-lg font-serif font-bold text-amber-100 mb-2">{item.title}</h3>
                <p className="text-amber-100/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-5xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent">
                Visit Us
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-red-500 rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📍",
                title: "Location",
                content: ["8025 Taschereau Blvd", "Brossard, QC J4Y 1A4", "Canada"]
              },
              {
                icon: "📞",
                title: "Contact",
                content: ["Phone: 450-462-8888", "Email: tianfu@gmail.com"]
              },
              {
                icon: "🕐",
                title: "Hours",
                content: ["Mon-Wed & Fri-Sun", "11 AM - 2 PM", "4 PM - 8:30 PM", "Thursday: Closed"]
              }
            ].map((item, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-red-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8 rounded-2xl border border-amber-700/30 group-hover:border-amber-500/50 transition-colors duration-300">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-serif font-bold text-amber-100 mb-4">{item.title}</h3>
                  <div className="space-y-2">
                    {item.content.map((line, i) => (
                      <p key={i} className="text-amber-100/70 font-serif">{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Policies */}
          <div className="mt-16 p-8 rounded-2xl border border-amber-700/30 bg-amber-900/10">
            <h3 className="text-2xl font-serif font-bold text-amber-100 mb-6">Our Policies</h3>
            <div className="grid md:grid-cols-2 gap-6 text-amber-100/70">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <p className="font-serif">No corkage fees for outside beverages</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <p className="font-serif">Free takeout containers</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✗</span>
                <p className="font-serif">Outside food items not permitted</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <p className="font-serif">15% service charge for large round tables</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-16 px-4 md:px-8 border-t border-amber-700/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-amber-100 mb-8">Connect With Us</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { name: "Facebook", url: "https://www.facebook.com/p/Tian-Fu-Asian-Bistro-100065045346912/" },
              { name: "Instagram", url: "https://www.instagram.com/tianfu_restaurant/" },
              { name: "Yelp", url: "https://www.yelp.ca/biz/tian-fu-brossard" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-amber-500/50 text-amber-200 font-serif font-semibold rounded-lg hover:bg-amber-900/30 hover:border-amber-400 transition-all duration-300"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-700/20 bg-stone-950/50 py-12 px-4 md:px-8 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-100/50 font-serif mb-2">&copy; 2026 Tian Fu Restaurant. All rights reserved.</p>
          <p className="text-amber-100/40 text-sm font-serif">8025 Taschereau Blvd, Brossard, QC | 450-462-8888</p>
        </div>
      </footer>
    </div>
  );
}
