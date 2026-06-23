'use client';

import { useState } from 'react';
import Link from 'next/link';

const MenuItem = ({ name, description, spiceLevel }: { name: string; description: string; spiceLevel: string }) => (
  <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg border border-red-100">
    <h3 className="font-semibold text-red-900 text-lg">{name}</h3>
    <p className="text-red-700 text-sm mt-1">{description}</p>
    <div className="flex items-center gap-2 mt-3">
      <span className="text-xs font-medium bg-red-600 text-white px-2 py-1 rounded-full">
        {spiceLevel}
      </span>
    </div>
  </div>
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Mapo Tofu", description: "Spicy tofu in authentic Sichuan sauce", spiceLevel: "🌶️🌶️🌶️ Hot" },
    { name: "Gong Bao Chicken", description: "Diced chicken with peanuts and dried chilies", spiceLevel: "🌶️🌶️ Medium-Hot" },
    { name: "Sizzling Beef", description: "Hot plate beef with fresh vegetables", spiceLevel: "🌶️🌶️ Medium" },
    { name: "Spicy Soup", description: "Traditional Sichuan hot and sour soup", spiceLevel: "🌶️🌶️🌶️ Hot" },
    { name: "Wonton Soup", description: "Homemade wontons in clear broth", spiceLevel: "Mild" },
    { name: "Duck Cheeks", description: "Tender duck cheeks in Sichuan sauce", spiceLevel: "🌶️🌶️ Medium" },
    { name: "Beef Tongue", description: "Sliced beef tongue with authentic spices", spiceLevel: "🌶️🌶️ Medium-Hot" },
    { name: "Intestines", description: "Specialty prepared in traditional sauce", spiceLevel: "🌶️🌶️ Medium" },
  ];

  return (
    <div className="w-full bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-red-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">🍜 Tian Fu</div>
          <div className="hidden md:flex gap-8 text-white">
            <Link href="#home" className="hover:text-red-100 transition">Home</Link>
            <Link href="#menu" className="hover:text-red-100 transition">Menu</Link>
            <Link href="#contact" className="hover:text-red-100 transition">Contact</Link>
          </div>
          <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-red-800 p-4 space-y-2 text-white">
            <Link href="#home" className="block py-2">Home</Link>
            <Link href="#menu" className="block py-2">Menu</Link>
            <Link href="#contact" className="block py-2">Contact</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-b from-red-600 to-orange-500 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Authentic Sichuan Cuisine</h1>
          <p className="text-xl md:text-2xl mb-8 text-red-100">Experience bold flavors and traditional cooking techniques</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-red-700 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition">
              Reserve a Table
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition">
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-red-900 mb-6">Welcome to Tian Fu</h2>
            <p className="text-lg text-red-800 mb-4">
              Since opening our doors, Tian Fu has been serving the Brossard community with authentic Sichuan cuisine prepared by skilled chefs. Each dish is crafted with traditional techniques and the finest ingredients.
            </p>
            <p className="text-lg text-red-800">
              Whether you're seeking mild comfort or bold, spicy adventure, our diverse menu has something for everyone. Our specialty items including duck cheeks, beef tongue, and traditional preparations offer an authentic taste of Sichuan province.
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-400 to-red-500 h-96 rounded-lg shadow-lg flex items-center justify-center">
            <div className="text-6xl">🍲</div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-red-900 text-center mb-12">Featured Dishes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, idx) => (
              <MenuItem key={idx} {...item} />
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-red-800 mb-4">
              Our complete menu features soups, appetizers, beef, chicken, seafood, tofu, and vegetable dishes.
            </p>
            <a href="https://www.tianfu.ca/" target="_blank" rel="noopener noreferrer" className="inline-block bg-red-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-800 transition">
              View Complete Menu
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-red-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold">4.1★</div>
            <p className="text-red-100 mt-2">Rating on Google</p>
          </div>
          <div>
            <div className="text-4xl font-bold">779+</div>
            <p className="text-red-100 mt-2">Reviews</p>
          </div>
          <div>
            <div className="text-4xl font-bold">13+</div>
            <p className="text-red-100 mt-2">Years in Business</p>
          </div>
          <div>
            <div className="text-4xl font-bold">100%</div>
            <p className="text-red-100 mt-2">Authentic Sichuan</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-red-900 mb-4">📍 Location</h3>
            <p className="text-gray-700">8025 Taschereau Blvd</p>
            <p className="text-gray-700">Brossard, QC J4Y 1A4</p>
            <p className="text-gray-700">Canada</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-red-900 mb-4">📞 Contact</h3>
            <p className="text-gray-700 mb-2"><span className="font-semibold">Phone:</span> 450-462-8888</p>
            <p className="text-gray-700"><span className="font-semibold">Email:</span> tianfu@gmail.com</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-red-900 mb-4">⏰ Hours</h3>
            <p className="text-gray-700 text-sm">Mon-Wed & Fri-Sun: 11AM-2PM, 4PM-8:30PM</p>
            <p className="text-gray-700 text-sm mt-2">Thursday: CLOSED</p>
            <p className="text-gray-700 text-sm mt-4 font-semibold">No corkage fees • Free takeout containers</p>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-12 px-4 bg-red-700 text-white text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Follow Us</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="https://www.facebook.com/p/Tian-Fu-Asian-Bistro-100065045346912/" target="_blank" rel="noopener noreferrer" className="bg-white text-red-700 px-6 py-2 rounded-full font-semibold hover:bg-red-50 transition">
              Facebook
            </a>
            <a href="https://www.instagram.com/tianfu_restaurant/" target="_blank" rel="noopener noreferrer" className="bg-white text-red-700 px-6 py-2 rounded-full font-semibold hover:bg-red-50 transition">
              Instagram
            </a>
            <a href="https://www.yelp.ca/biz/tian-fu-brossard" target="_blank" rel="noopener noreferrer" className="bg-white text-red-700 px-6 py-2 rounded-full font-semibold hover:bg-red-50 transition">
              Yelp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-400">&copy; 2026 Tian Fu Restaurant. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2">8025 Taschereau Blvd, Brossard, QC | 450-462-8888</p>
        </div>
      </footer>
    </div>
  );
}
