'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Sparkles, MessageSquare, CheckCircle, Clock, ArrowRight, User } from 'lucide-react';
import HomeSidebar from '@/components/HomeSidebar';
import { PRODUCTS } from '@/data/products';
import { FeedbackItem, getStoredFeedbacks, saveStoredFeedbacks } from '@/components/FeedbackSection';

interface PendingFeedback {
  id: string;
  item: FeedbackItem;
  remainingSeconds: number;
}

export default function FeedbackPage() {
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0]?.id || '');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewerName, setReviewerName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Queue and Feedbacks
  const [pendingQueue, setPendingQueue] = useState<PendingFeedback[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);

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

  // Handle 10-second countdown for pending queue items
  useEffect(() => {
    if (pendingQueue.length === 0) return;

    const timer = setInterval(() => {
      setPendingQueue(prev => {
        const updated = prev.map(item => ({
          ...item,
          remainingSeconds: item.remainingSeconds - 1
        }));

        // Find items that reached 0 seconds
        const readyItems = updated.filter(item => item.remainingSeconds <= 0);
        const stillPending = updated.filter(item => item.remainingSeconds > 0);

        if (readyItems.length > 0) {
          const newFeedbacksToAdd = readyItems.map(p => p.item);
          setFeedbacks(currFeedbacks => {
            const updatedFeedbacks = [...newFeedbacksToAdd, ...currFeedbacks];
            saveStoredFeedbacks(updatedFeedbacks);
            return updatedFeedbacks;
          });
        }

        return stillPending;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingQueue]);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!comment.trim()) {
      setErrorMessage('Please write your feedback/comment.');
      return;
    }

    const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

    const newFeedbackItem: FeedbackItem = {
      id: `fb-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      rating,
      reviewerName: reviewerName.trim(),
      comment: comment.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    // Add to pending queue with 10 seconds delay
    const newPending: PendingFeedback = {
      id: `pending-${Date.now()}`,
      item: newFeedbackItem,
      remainingSeconds: 10
    };

    setPendingQueue(prev => [...prev, newPending]);
    setSuccessMessage(`Feedback submitted successfully! Entering 10-second delay queue before appearing at the bottom observer on the home & feedback pages.`);
    setErrorMessage(null);
    setComment('');
    setReviewerName('');

    setTimeout(() => {
      setSuccessMessage(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col lg:flex-row text-amber-950">
      {/* Sidebar Navigation */}
      <HomeSidebar />

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-start">
        {/* Header Banner */}
        <div className="bg-gradient-to-b from-amber-50/70 via-[#FFFDF9] to-[#FFFDF9] py-6 lg:py-8 px-4 sm:px-6 lg:px-8 border-b border-amber-900/15">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wide uppercase mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Customer Reviews & Feedback</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold tracking-tight text-amber-950 mb-2">
              Rate & Review <span className="italic font-normal text-amber-600">Golden Hive Products</span>
            </h1>
            <p className="text-sm sm:text-base text-amber-950/80 max-w-2xl mx-auto leading-relaxed">
              Share your experience with our artisanal honeys. Submitted feedbacks enter our 10-second delay processing queue before appearing live in the feedback observer at the bottom of the home and feedback pages.
            </p>
          </div>
        </div>

        {/* Feedback Form Section */}
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-xl shadow-amber-900/5 mb-12">
            <h2 className="text-xl font-serif font-bold text-amber-950 mb-6 pb-4 border-b border-amber-900/10 flex items-center gap-2.5">
              <MessageSquare className="w-5 h-5 text-amber-700" />
              Submit Product Feedback & Rating
            </h2>

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs sm:text-sm font-medium">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmitFeedback} className="space-y-6">
              {/* Product Selection */}
              <div>
                <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                  Select Product *
                </label>
                <div className="space-y-4">
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FFFDF9] border border-amber-200 rounded-2xl text-amber-950 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium"
                  >
                    {PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name} (${prod.price.toFixed(2)})
                      </option>
                    ))}
                  </select>

                  {/* Large Selected Product Preview Card */}
                  {(() => {
                    const selProd = PRODUCTS.find(p => p.id === selectedProductId);
                    if (!selProd) return null;
                    return (
                      <div className="bg-amber-50/90 rounded-2xl p-4 sm:p-5 border border-amber-200 flex items-center gap-4 shadow-sm">
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-amber-300 bg-white shadow-md">
                          <Image
                            src={selProd.image}
                            alt={selProd.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                            Selected Product for Review
                          </span>
                          <h4 className="text-sm sm:text-base font-serif font-bold text-amber-950 truncate mb-1">
                            {selProd.name}
                          </h4>
                          <p className="text-xs sm:text-sm font-semibold text-amber-800">
                            ${selProd.price.toFixed(2)} {selProd.originalPrice && <span className="line-through text-amber-900/40 ml-1.5">${selProd.originalPrice.toFixed(2)}</span>}
                          </p>
                          <p className="text-xs text-amber-900/70 mt-1 line-clamp-1">
                            {selProd.description}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Rating Stars */}
              <div>
                <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                  Rating (1 to 5 Stars) *
                </label>
                <div className="flex items-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          (hoverRating || rating) >= star
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-amber-200'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-sm font-bold text-amber-900">
                    {rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Reviewer Name */}
              <div>
                <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                  Your Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-700/60">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Youssef N."
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#FFFDF9] border border-amber-200 rounded-2xl text-amber-950 placeholder:text-amber-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Feedback Comment */}
              <div>
                <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                  Feedback & Comments *
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe your taste experience, quality, texture, and packaging..."
                  required
                  className="w-full px-4 py-3 bg-[#FFFDF9] border border-amber-200 rounded-2xl text-amber-950 placeholder:text-amber-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-2xl transition-all shadow-md shadow-amber-600/20 text-sm flex items-center justify-center gap-2"
              >
                <span>Submit Feedback (10s Delay Queue)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Pending Queue Section (If any items are in 10s delay) */}
          {pendingQueue.length > 0 && (
            <div className="mb-12 bg-amber-50/80 rounded-3xl p-6 sm:p-8 border border-amber-300 shadow-md">
              <div className="flex items-center gap-2.5 mb-4">
                <Clock className="w-5 h-5 text-amber-700 animate-spin" />
                <h3 className="text-lg font-serif font-bold text-amber-950">
                  Feedback Queue (10-Second Delay Processing)
                </h3>
              </div>
              <p className="text-xs text-amber-900/70 mb-4">
                Your submitted feedback is currently waiting in the 10-second delay queue before publishing to the bottom observer feed.
              </p>
              <div className="space-y-3">
                {pendingQueue.map((pq) => (
                  <div key={pq.id} className="bg-white rounded-2xl p-4 border border-amber-200 flex items-center justify-between shadow-xs gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-amber-200/60 bg-white shadow-xs">
                        <Image
                          src={pq.item.productImage || 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800'}
                          alt={pq.item.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-amber-950 text-xs sm:text-sm">{pq.item.reviewerName}</span>
                          <span className="text-[11px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md font-medium truncate max-w-[150px]">{pq.item.productName}</span>
                        </div>
                        <p className="text-xs text-amber-900/80 mt-1 italic truncate max-w-xs sm:max-w-md">"{pq.item.comment}"</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-amber-100/80 px-3 py-1.5 rounded-xl border border-amber-200 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span className="text-xs font-bold text-amber-900 font-mono">
                        {pq.remainingSeconds}s remaining
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Observer Section for Feedbacks with Product Pictures */}
          <div className="border-t border-amber-900/15 pt-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wide uppercase mb-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Live Observer Feed</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-950">
                  Customer Feedback Observer
                </h2>
                <p className="text-xs sm:text-sm text-amber-900/70">
                  All verified and 10-second delayed feedbacks appear here with product pictures.
                </p>
              </div>
              <div className="px-4 py-2 bg-amber-100/70 rounded-2xl border border-amber-200 text-amber-900 font-semibold text-xs flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-700" />
                <span>{feedbacks.length} Total Feedbacks Recorded</span>
              </div>
            </div>

            {feedbacks.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-amber-200/80 shadow-sm text-amber-900/60 text-sm">
                No feedback items yet. Be the first to submit a review above!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feedbacks.map((fb) => {
                  const productImg = fb.productImage || 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800';

                  return (
                    <div
                      key={fb.id}
                      className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-lg shadow-amber-900/5 hover:border-amber-400 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Big Product Image Banner */}
                        <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-5 border border-amber-200/60 bg-amber-50 shadow-xs group/img">
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
                            <h4 className="text-sm sm:text-base font-serif font-bold text-white drop-shadow-xs" title={fb.productName}>
                              {fb.productName}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-4 h-4 ${
                                  fb.rating >= s
                                    ? 'text-amber-500 fill-amber-500'
                                    : 'text-amber-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] font-mono text-amber-900/55">{fb.createdAt}</span>
                        </div>

                        <p className="text-amber-950/90 text-sm sm:text-base italic leading-relaxed mb-6">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
