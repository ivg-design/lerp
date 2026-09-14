"use client";

import { useState, useCallback } from "react";
import { FAQS, type FAQItemData } from "@/lib/faqs";

function FAQItem({
  item,
  isOpen,
  onToggle,
  defaultOpen,
}: {
  item: FAQItemData;
  isOpen: boolean;
  onToggle: () => void;
  defaultOpen?: boolean;
}) {
  return (
    <div
      className={`faq-item faq-accent-${item.accent} ${isOpen ? "faq-open" : ""}`}
    >
      <button className="faq-summary" onClick={onToggle}>
        <span>{item.question}</span>
        <span className="faq-chevron">&#x25BE;</span>
      </button>
      <div className="faq-answer-wrapper">
        <div className="faq-answer-inner">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <div className="faq-list">
      {FAQS.map((item, i) => (
        <FAQItem
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
