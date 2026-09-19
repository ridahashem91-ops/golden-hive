'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2.5 bg-amber-100/80 hover:bg-amber-200/80 border border-amber-200 rounded-xl text-xs font-bold text-amber-950 transition-all shadow-xs w-full justify-center group"
      aria-label="Toggle Language"
    >
      <Languages className="w-4 h-4 text-amber-700 group-hover:scale-110 transition-transform" />
      <span>{language === 'en' ? 'العربية (Arabic)' : 'English'}</span>
    </button>
  );
}
