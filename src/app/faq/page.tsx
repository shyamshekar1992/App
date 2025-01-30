// src/app/components/FAQSection.tsx
"use client";

import React, { useState } from "react";
import { faqData } from '../data/faqData';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<{ [key: string]: number | null }>({});

  const toggleAccordion = (category: string, index: number) => {
    setOpenIndex((prev) => ({
      ...prev,
      [category]: prev[category] === index ? null : index,
    }));
  };

  return (
    <div className="bg-cyan-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        {faqData.map((faqCategory, categoryIndex) => (
          <div key={categoryIndex} className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-cyan-800">{faqCategory.category}</h2>
            <div className="mt-4 space-y-4">
              {faqCategory.items.map((item, index) => (
                <div key={index} className="border-b border-gray-300">
                  <button
                    className="w-full text-left py-3 flex items-center justify-between"
                    onClick={() => toggleAccordion(faqCategory.category, index)}
                  >
                    <span className="text-lg font-semibold text-cyan-700">
                      {item.title}
                    </span>
                    <span
                      className={`transform transition-transform ${
                        openIndex[faqCategory.category] === index ? "rotate-45" : "rotate-0"
                      } text-cyan-700`}
                    >
                      +
                    </span>
                  </button>
                  {openIndex[faqCategory.category] === index && (
                    <div className="mt-2 text-gray-600 text-sm">{item.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
