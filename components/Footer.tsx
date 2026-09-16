import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, Headphones, ArrowRight, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#2C221E] text-amber-100/70 pt-16 pb-12 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-16 border-b border-amber-900/30">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-950/80 rounded-2xl text-amber-400 shrink-0 border border-amber-800/30">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-100 text-sm mb-1">Free Hive Delivery</h4>
              <p className="text-xs text-amber-200/60 leading-relaxed">Free express delivery on all orders over $50 nationwide.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-950/80 rounded-2xl text-amber-400 shrink-0 border border-amber-800/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-100 text-sm mb-1">100% Pure & Raw</h4>
              <p className="text-xs text-amber-200/60 leading-relaxed">Guaranteed unheated, unfiltered raw honey straight from ethical apiaries.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-950/80 rounded-2xl text-amber-400 shrink-0 border border-amber-800/30">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-100 text-sm mb-1">Satisfaction Guarantee</h4>
              <p className="text-xs text-amber-200/60 leading-relaxed">Not delighted? Return any jar within 30 days for a full replacement or refund.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-950/80 rounded-2xl text-amber-400 shrink-0 border border-amber-800/30">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-100 text-sm mb-1">Beekeeper Support</h4>
              <p className="text-xs text-amber-200/60 leading-relaxed">Our honey experts are here to answer all your floral and pairing questions.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-16 border-b border-amber-900/30">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                🐝
              </div>
              <span className="font-serif font-extrabold text-xl text-amber-100 tracking-tight">Golden Hive</span>
            </div>
            <p className="text-sm text-amber-200/70 max-w-sm mb-6 leading-relaxed">
              Harvesting the world's finest raw, single-origin and artisanal infused honeys. Supporting sustainable beekeeping and pure natural wellness.
            </p>
            <div className="flex items-center gap-3">
              <input 
                type="email" 
                placeholder="Enter your email for 10% off"
                className="bg-amber-950/60 border border-amber-800/50 rounded-xl px-4 py-2.5 text-sm text-amber-100 placeholder:text-amber-400/40 focus:outline-hidden focus:ring-2 focus:ring-amber-500 flex-1"
              />
              <button className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-4 py-2.5 rounded-xl transition-colors text-sm shrink-0 shadow-md">
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-amber-100 text-sm mb-4">Honey Collections</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/#catalog" className="hover:text-amber-200 transition-colors">Raw Wildflower</Link></li>
              <li><Link href="/#catalog" className="hover:text-amber-200 transition-colors">Manuka & Medicinal</Link></li>
              <li><Link href="/#catalog" className="hover:text-amber-200 transition-colors">Infused & Artisanal</Link></li>
              <li><Link href="/#catalog" className="hover:text-amber-200 transition-colors">Hive & Gifts</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-amber-100 text-sm mb-4">Customer Care</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/contact" className="hover:text-amber-200 transition-colors font-medium text-amber-300">Contact Us Page</Link></li>
              <li><a href="https://wa.me/15555555555" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors flex items-center gap-1.5">WhatsApp Chat</a></li>
              <li><a href="https://instagram.com/goldenhivehoney" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition-colors flex items-center gap-1.5">Instagram DM</a></li>
              <li><Link href="/contact" className="hover:text-amber-200 transition-colors">FAQ & Pairings</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-amber-100 text-sm mb-4">Our Hive</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="#footer" className="hover:text-amber-200 transition-colors">Our Story</Link></li>
              <li><Link href="#footer" className="hover:text-amber-200 transition-colors">Bee Conservation</Link></li>
              <li><Link href="#footer" className="hover:text-amber-200 transition-colors">Sustainability</Link></li>
              <li><Link href="#footer" className="hover:text-amber-200 transition-colors">Wholesale & Chefs</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-300/40 gap-4">
          <p>© 2026 Golden Hive Artisanal Honey Co. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#footer" className="hover:text-amber-200">Privacy Policy</Link>
            <Link href="#footer" className="hover:text-amber-200">Terms of Service</Link>
            <Link href="#footer" className="hover:text-amber-200">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
