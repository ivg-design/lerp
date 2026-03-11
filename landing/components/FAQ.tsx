"use client";

import { useState, useCallback } from "react";

interface FAQItemData {
  question: string;
  answer: string;
  accent: string;
}

const FAQS: FAQItemData[] = [
  {
    question: "Do I need programming experience?",
    answer:
      "No. Part 01 starts from zero. If you can use Rive\u2019s visual editor, you can learn scripting. JavaScript, AfterEffects, or Unity experience helps \u2014 LERP includes comparison tables so you can map what you already know.",
    accent: "yellow",
  },
  {
    question: "Is this the same as learning Luau?",
    answer:
      "Partially. LERP teaches Luau fundamentals, but everything is taught through Rive\u2019s scripting context \u2014 protocols, nodes, animation APIs. It\u2019s Luau for Rive, not Luau in general.",
    accent: "emerald",
  },
  {
    question: "How much does it cost?",
    answer:
      "$0. Forever. MIT licensed. No paywalls, no premium tiers, no accounts required.",
    accent: "cyan",
  },
  {
    question: "What tools do I need?",
    answer:
      "Just the Rive Editor (free). All exercises run inside Rive. No IDE, terminal, or build tools needed.",
    accent: "purple",
  },
  {
    question: "How long does the full course take?",
    answer:
      "At 1\u20132 lessons per day, most learners complete all 8 parts in 6\u20138 weeks. Each lesson is self-contained, so you can go at your own pace. The three capstone projects at the end take a few hours each.",
    accent: "yellow",
  },
  {
    question: "How is my progress tracked?",
    answer:
      "LocalStorage only. No accounts, no server, no telemetry. You own your data. Progress, preferences, quiz scores \u2014 all on your device. Export anytime via JSON.",
    accent: "lime",
  },
  {
    question: "Does LERP cover runtime integration?",
    answer:
      "LERP focuses on scripting inside the Rive Editor. Runtime integration (iOS, Android, Web, Flutter) is covered in Rive\u2019s official runtime docs. However, every script you write in LERP is production-ready and works identically in any runtime.",
    accent: "emerald",
  },
  {
    question: "What\u2019s the difference between scripts and state machines?",
    answer:
      "State machines handle visual state transitions and blend trees. Scripts add procedural logic, data binding, physics, and custom drawing that state machines can\u2019t express. LERP teaches you how to use both together effectively.",
    accent: "cyan",
  },
  {
    question: "Can I contribute or report errors?",
    answer:
      "Yes. LERP is open-source on GitHub. File issues, submit corrections, or contribute lessons via pull requests.",
    accent: "green",
  },
];

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
