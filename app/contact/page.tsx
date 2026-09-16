'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, User, Phone } from 'lucide-react';
import HomeSidebar from '@/components/HomeSidebar';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col lg:flex-row text-amber-950">
      {/* Sidebar Navigation */}
      <HomeSidebar />

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header Banner */}
        <div className="bg-gradient-to-b from-amber-50/70 via-[#FFFDF9] to-[#FFFDF9] py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-900/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wide uppercase mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>We're Here For You</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight text-amber-950 mb-4">
              Contact <span className="italic font-normal text-amber-600">Golden Hive</span>
            </h1>
            <p className="text-base sm:text-lg text-amber-950/80 max-w-2xl mx-auto leading-relaxed">
              Reach out to us directly through WhatsApp or Instagram, or place a customer order. Our team is ready to assist you!
            </p>
          </div>
        </div>

        {/* Contact Options Grid */}
        <div className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* Customer Order Card */}
            <div className="bg-white rounded-3xl p-8 border border-amber-200/80 shadow-lg shadow-amber-900/5 hover:border-amber-400 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-6 border border-amber-200 group-hover:scale-110 transition-transform shadow-sm">
                  <User className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-950 mb-2">Customer Order</h3>
                <p className="text-sm text-amber-900/70 mb-6 leading-relaxed">
                  Submit your custom order details directly through our customer order form for express processing.
                </p>
              </div>
              <Link
                href="/order"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-2xl transition-all shadow-md shadow-amber-600/20 text-sm"
              >
                <span>Go to Order Form</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white rounded-3xl p-8 border border-amber-200/80 shadow-lg shadow-amber-900/5 hover:border-amber-400 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-200 group-hover:scale-110 transition-transform shadow-sm">
                  <Phone className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-950 mb-2">WhatsApp Chat</h3>
                <p className="text-sm text-amber-900/70 mb-6 leading-relaxed">
                  Chat with our beekeepers instantly on WhatsApp for inquiries, recommendations, and support.
                </p>
              </div>
              <a
                href="https://wa.me/15555555555"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition-all shadow-md shadow-emerald-600/20 text-sm"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Instagram Card */}
            <div className="bg-white rounded-3xl p-8 border border-amber-200/80 shadow-lg shadow-amber-900/5 hover:border-amber-400 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-6 border border-pink-200 group-hover:scale-110 transition-transform shadow-sm">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-950 mb-2">Instagram DM</h3>
                <p className="text-sm text-amber-900/70 mb-6 leading-relaxed">
                  Follow our journey and send us a direct message on Instagram for daily updates and gift ideas.
                </p>
              </div>
              <a
                href="https://instagram.com/goldenhivehoney"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-semibold rounded-2xl transition-all shadow-md shadow-pink-600/20 text-sm"
              >
                <span>Message on Instagram</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
