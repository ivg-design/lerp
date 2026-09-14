export type FAQItemData = {
  question: string;
  answer: string;
  accent: "yellow" | "emerald" | "cyan" | "purple" | "lime" | "green";
};

export const FAQS: FAQItemData[] = [
  {
    question: "Do I need programming experience?",
    answer:
      "No. Part 01 starts from zero. If you can use Rive’s visual editor, you can learn scripting. JavaScript, After Effects, or Unity experience helps — LERP includes comparison tables so you can map what you already know.",
    accent: "yellow",
  },
  {
    question: "Is this the same as learning Luau?",
    answer:
      "Partially. LERP teaches Luau fundamentals, but everything is taught through Rive’s scripting context — protocols, nodes, animation APIs. It’s Luau for Rive, not Luau in general.",
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
      "Use the Rive Editor and follow the setup notes in each lesson. The core course does not require a separate IDE, terminal, or build toolchain.",
    accent: "purple",
  },
  {
    question: "How long does the full course take?",
    answer:
      "Work at your own pace through the eight parts. Start with the fundamentals, use the exercises to check your understanding, and finish with the capstone projects.",
    accent: "yellow",
  },
  {
    question: "How is my progress tracked?",
    answer:
      "Course progress uses localStorage only. No account or server-side learner profile is required. Progress, preferences, and quiz scores stay on your device and can be exported as JSON. The website separately counts selected actions in aggregate; see the measurement disclosure.",
    accent: "lime",
  },
  {
    question: "Does LERP cover runtime integration?",
    answer:
      "LERP focuses on scripting inside the Rive Editor. Runtime integration (iOS, Android, Web, Flutter) is covered in Rive’s official runtime docs. Runtime and editor support varies by feature and version. Check the course compatibility baseline and validate your exported file in its target host.",
    accent: "emerald",
  },
  {
    question: "What’s the difference between scripts and state machines?",
    answer:
      "State machines handle visual state transitions and blend trees. Scripts add procedural logic, data binding, physics, and custom drawing that state machines can’t express. LERP teaches you how to use both together effectively.",
    accent: "cyan",
  },
  {
    question: "Can I contribute or report errors?",
    answer:
      "Yes. LERP is open-source on GitHub. File issues, submit corrections, or contribute lessons via pull requests.",
    accent: "green",
  },
];
