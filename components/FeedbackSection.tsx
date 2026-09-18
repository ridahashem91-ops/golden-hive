'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, MessageSquare, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

export interface FeedbackItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  rating: number;
  reviewerName: string;
  comment: string;
  createdAt: string;
}

export const INITIAL_FEEDBACKS: FeedbackItem[] = [
  {
    id: 'fb-init-1',
    productId: PRODUCTS[0]?.id || 'prod-1',
    productName: PRODUCTS[0]?.name || 'Golden Reserve Raw Wildflower Honey',
    productImage: PRODUCTS[0]?.image || 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    rating: 5,
    reviewerName: 'Layla K.',
    comment: 'Absolute liquid gold! The floral aroma is incredible and arrived fresh.',
    createdAt: 'Just now'
  },
  {
    id: 'fb-init-2',
    productId: PRODUCTS[1]?.id || 'prod-2',
    productName: PRODUCTS[1]?.name || 'MGO 550+ Certified Organic Manuka Honey',
    productImage: PRODUCTS[1]?.image || 'https://images.unsplash.com/photo-1587049352851-8c4e89133924?auto=format&fit=crop&q=80&w=800',
    rating: 5,
    reviewerName: 'Karim M.',
    comment: 'Top quality Manuka. Noticeable boost in daily wellness and energy.',
    createdAt: '1 min ago'
  }
];

export function getStoredFeedbacks(): FeedbackItem[] {
  if (typeof window === 'undefined') return INITIAL_FEEDBACKS;
  try {
    const saved = localStorage.getItem('golden_hive_feedbacks');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return INITIAL_FEEDBACKS;
}

export function saveStoredFeedbacks(items: FeedbackItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('golden_hive_feedbacks', JSON.stringify(items));
    window.dispatchEvent(new Event('golden_hive_feedback_updated'));
  } catch (e) {
    console.error(e);
  }
}

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(INITIAL_FEEDBACKS);

  useEffect(() => {
    setFeedbacks(getStoredFeedbacks());

    const handleUpdate = () => {
      setFeedbacks(getStoredFeedbacks());
    };

    window.addEventListener('golden_hive_feedback_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('golden_hive_feedback_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  if (feedbacks.length === 0) return null;

  return (
    <section className="bg-gradient-to-b from-amber-50/80 via-amber-100/40 to-[#FFFDF9] py-16 px-4 sm:px-6 lg:px-8 border-t border-amber-200/80 w-full">
      <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wide uppercase mb-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Customer Feedback Observer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-amber-900/70">
            Read real reviews and feedback from honey lovers with product pictures.
          </p>
        </div>
        <div className="px-4 py-2 bg-amber-100/70 rounded-2xl border border-amber-200 text-amber-900 font-semibold text-xs flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-amber-700" />
          <span>{feedbacks.length} Verified Reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((fb) => {
          const productImg = fb.productImage || 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800';

          return (
            <div
              key={fb.id}
              className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-lg shadow-amber-900/5 hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Big Product Image Banner */}
                <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-5 border border-amber-200/60 bg-amber-50 shadow-xs group/img">
                  <Image
                    src={productImg}
                    alt={fb.productName}
                    fill
                    className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-amber-950/20 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      Reviewed Product
                    </span>
                    <h4 className="text-sm font-serif font-bold text-white drop-shadow-xs" title={fb.productName}>
                      {fb.productName}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          fb.rating >= s
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-amber-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-amber-900/55">{fb.createdAt}</span>
                </div>

                <p className="text-amber-950/90 text-xs sm:text-sm italic leading-relaxed mb-6">
                  "{fb.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-amber-900/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs border border-amber-200">
                    {fb.reviewerName.charAt(0)}
                  </div>
                  <span className="font-bold text-amber-950">{fb.reviewerName}</span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                  Verified Review
                </span>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
