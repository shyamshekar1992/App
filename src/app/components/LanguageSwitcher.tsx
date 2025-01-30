"use client";

import { useLocale } from '../context/localeContext';

const LanguageSwitcher = () => {
  const { locale, switchLocale } = useLocale();

  return (
    <div className="relative">
      <select
        className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600 focus:ring focus:ring-blue-500"
        value={locale}
        onChange={(e) => switchLocale(e.target.value as "en" | "de")}
      >
        <option value="en">🇬🇧 English</option>
        <option value="de">🇩🇪 Deutsch</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
