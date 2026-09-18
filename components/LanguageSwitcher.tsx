'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-amber-100/70 border border-amber-200/80 rounded-xl p-1 text-xs font-semibold">
      <Globe className="w-3.5 h-3.5 text-amber-800 ml-1" />
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-lg transition-all ${
          language === 'en'
            ? 'bg-amber-700 text-white shadow-sm'
            : 'text-amber-900/80 hover:text-amber-950 hover:bg-amber-200/50'
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`px-2.5 py-1 rounded-lg transition-all ${
          language === 'ar'
            ? 'bg-amber-700 text-white shadow-sm'
            : 'text-amber-900/80 hover:text-amber-950 hover:bg-amber-200/50'
        }`}
      >
        العربية
      </button>
    </div>
  );
}
