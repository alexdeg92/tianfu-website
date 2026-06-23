'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      name: "Mapo Tofu",
      description: "Silken tofu in signature Sichuan numbing peppercorn sauce with ground pork",
      price: "$16.95",
      spiceLevel: 4,
      category: "tofu"
    },
    {
      name: "Gong Bao Chicken",
      description: "Diced chicken breast with roasted peanuts, dried chilies, and aromatic spices",
      price: "$17.95",
      spiceLevel: 3,
      category: "chicken"
    },
    {
      name: "Chongqing Chicken",
      description: "Crispy chicken tossed with dried chilies and Sichuan peppercorns",
      price: "$18.95",
      spiceLevel: 4,
      category: "chicken"
    },
    {
      name: "Beef with Black Bean Sauce",
      description: "Tender beef slices with fermented black beans and bell peppers",
      price: "$19.95",
      spiceLevel: 3,
      category: "beef"
    },
    {
      name: "Hot & Sour Soup",
      description: "Traditional soup with tofu, mushrooms, and bamboo shoots in peppery broth",
      price: "$5.95",
      spiceLevel: 3,
      category: "soup"
    },
    {
      name: "Wonton Soup",
      description: "Handmade wontons in clear, delicate broth with fresh bok choy",
      price: "$5.50",
      spiceLevel: 1,
      category: "soup"
    },
    {
      name: "Duck Cheeks",
      description: "Tender duck cheeks braised until melt-in-mouth tender, finished in Sichuan sauce",
      price: "$22.95",
      spiceLevel: 2,
      category: "specialty"
    },
    {
      name: "Beef Tongue",
      description: "Delicately prepared sliced beef tongue with aromatic spices and sesame oil",
      price: "$21.95",
      spiceLevel: 2,
      category: "specialty"
    }
  ];

  const filteredItems = activeCategory === 'all' ? menuItems : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="w-full bg-stone-950 text-stone-100">
      {/* Navigation */}
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-stone-950/95 backdrop-blur-md shadow-2xl border-b border-amber-900/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-serif text-2xl text-amber-400 font-bold tracking-wide">天府</div>
          <div className="hidden md:flex gap-12 text-sm">
            <Link href="#home" className="text-stone-300 hover:text-amber-400 transition duration-300 font-light">Home</Link>
            <Link href="#about" className="text-stone-300 hover:text-amber-400 transition duration-300 font-light">About</Link>
            <Link href="#menu" className="text-stone-300 hover:text-amber-400 transition duration-300 font-light">Menu</Link>
            <Link href="#contact" className="text-stone-300 hover:text-amber-400 transition duration-300 font-light">Contact</Link>
          </div>
          <button className="md:hidden text-amber-400 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-stone-900 border-t border-amber-900/20 p-6 space-y-3 text-center">
            <Link href="#home" className="block py-2 text-stone-300 hover:text-amber-400">Home</Link>
            <Link href="#about" className="block py-2 text-stone-300 hover:text-amber-400">About</Link>
            <Link href="#menu" className="block py-2 text-stone-300 hover:text-amber-400">Menu</Link>
            <Link href="#contact" className="block py-2 text-stone-300 hover:text-amber-400">Contact</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="mb-6 inline-block">
            <span className="text-amber-400 text-sm font-light tracking-widest uppercase">Authentic Sichuan Cuisine</span>
          </div>
          <h1 className="font-serif text-6xl md:text-7xl text-amber-50 mb-6 leading-tight">
            Culinary Artistry <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-red-400">Meets Tradition</span>
          </h1>
          <p className="text-xl text-stone-300 mb-12 font-light max-w-2xl mx-auto">
            Experience the bold, complex flavors of Sichuan cuisine crafted with 13+ years of expertise
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 px-10 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Reserve a Table
            </button>
            <button className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400/10 px-10 py-4 rounded-full font-semibold transition-all duration-300">
              Explore Menu
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 border-t border-amber-900/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-6">
              <span className="text-amber-400 text-sm font-light tracking-widest uppercase">Our Story</span>
            </div>
            <h2 className="font-serif text-5xl text-amber-50 mb-8">Tradition Served Fresh</h2>
            <p className="text-stone-300 text-lg leading-relaxed mb-6 font-light">
              Established in 2011, Tian Fu has been Montreal's premier destination for authentic Sichuan cuisine. Our chefs bring generational expertise and passion to every dish.
            </p>
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-3xl text-amber-400 font-bold mb-2">13+</div>
                <p className="text-stone-400 text-sm">Years</p>
              </div>
              <div>
                <div className="text-3xl text-amber-400 font-bold mb-2">779</div>
                <p className="text-stone-400 text-sm">Reviews</p>
              </div>
              <div>
                <div className="text-3xl text-amber-400 font-bold mb-2">4.1★</div>
                <p className="text-stone-400 text-sm">Rating</p>
              </div>
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-900/30 to-red-900/30 border border-amber-900/30 flex items-center justify-center">
            <span className="text-6xl">🏮</span>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 border-t border-amber-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="text-amber-400 text-sm font-light tracking-widest uppercase">Signature Selection</span>
            </div>
            <h2 className="font-serif text-5xl text-amber-50">Featured Dishes</h2>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {['all', 'chicken', 'beef', 'tofu', 'soup', 'specialty'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full transition-all duration-300 font-light capitalize ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-stone-950'
                    : 'border border-amber-900/30 text-stone-300 hover:border-amber-400/50'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-stone-800 to-stone-900 border border-amber-900/20 hover:border-amber-700/50 transition-all duration-500 p-6">
                <h3 className="font-serif text-lg text-amber-50 group-hover:text-amber-100 transition">{item.name}</h3>
                <p className="text-sm text-stone-400 mt-2 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-amber-400 font-medium text-sm">{item.price}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < item.spiceLevel ? 'text-red-500' : 'text-stone-700'}>🌶️</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 border-t border-amber-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="text-amber-400 text-sm font-light tracking-widest uppercase">Get in Touch</span>
            </div>
            <h2 className="font-serif text-5xl text-amber-50">Visit Tian Fu</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="font-serif text-xl text-amber-50 mb-3">Location</h3>
              <p className="text-stone-400 font-light text-sm">
                8025 Taschereau Blvd<br />
                Brossard, QC J4Y 1A4
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-serif text-xl text-amber-50 mb-3">Contact</h3>
              <p className="text-stone-400 font-light text-sm">
                <a href="tel:4504628888" className="hover:text-amber-400 transition">450-462-8888</a><br />
                <a href="mailto:tianfu@gmail.com" className="hover:text-amber-400 transition">tianfu@gmail.com</a>
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🕐</div>
              <h3 className="font-serif text-xl text-amber-50 mb-3">Hours</h3>
              <p className="text-stone-400 font-light text-sm">
                Mon-Wed, Fri-Sun<br />
                11 AM - 2 PM, 4-8:30 PM<br />
                <span className="text-red-400">Closed Thursdays</span>
              </p>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-amber-900/20 text-center">
            <p className="text-stone-400 font-light mb-6">Follow us</p>
            <div className="flex justify-center gap-8">
              <a href="https://facebook.com" className="text-amber-400 hover:text-amber-300 transition">Facebook</a>
              <a href="https://instagram.com" className="text-amber-400 hover:text-amber-300 transition">Instagram</a>
              <a href="https://yelp.com" className="text-amber-400 hover:text-amber-300 transition">Yelp</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-amber-900/20 bg-stone-950/50">
        <div className="max-w-6xl mx-auto text-center text-stone-600 font-light text-sm">
          © 2024 Tian Fu. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
