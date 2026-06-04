"use client";

import { useState } from "react";

interface CardData {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  desc: string;
  bg: string;
  dark?: boolean;
  lessons: string[];
}

const CARDS: CardData[][] = [
  [
    {
      id: "getting-started", tag: "01 · 4 lessons", tagColor: "dark",
      title: "Getting Started",
      desc: "Two paths: beginners write their first script from zero. Experienced devs get JS/AE comparison tables and the factory pattern in one sitting.",
      bg: "bento-getting-started", dark: true,
      lessons: ["Welcome to Rive Scripting", "Why Luau?", "Your First Script", "How Rive Scripts Work"],
    },
    {
      id: "luau-fund", tag: "02 · 7 lessons", tagColor: "lime",
      title: "Luau\nFundamentals",
      desc: "Variables, types, control flow, functions, tables, iteration.",
      bg: "bento-luau-fund",
      lessons: ["Variables", "Data Types", "Operators", "Control Flow", "Functions", "Tables", "Iteration"],
    },
  ],
  [
    {
      id: "type-system", tag: "03 · 7 lessons", tagColor: "emerald",
      title: "Type System",
      desc: "Gradual typing, strict mode, generics, type narrowing, and union types.",
      bg: "bento-type",
      lessons: ["Type System Intro", "Annotations", "Strict Mode", "Custom Types", "Advanced Types", "Generics", "Late Initializer"],
    },
    {
      id: "oop", tag: "04 · 8 lessons", tagColor: "dark",
      title: "OOP Deep Dive",
      desc: "Metatables, __index, classes, inheritance, encapsulation. The patterns behind every protocol.",
      bg: "bento-oop", dark: true,
      lessons: ["Prototype-Based Programming", "Metatables", "Index Metamethod", "Classes", "Self and Methods", "Inheritance", "Encapsulation", "Patterns"],
    },
    {
      id: "rive-int", tag: "05 · 15 lessons", tagColor: "purple",
      title: "Rive Integration",
      desc: "Rive protocol lessons for Node, Layout, Converter, Path Effect, ListenerAction, ScriptedInterpolator, and more.",
      bg: "bento-rive-int",
      lessons: ["Environment", "Script Types", "Script Capability Matrix", "Inputs", "AI Agent", "Node Protocol", "Node Lifecycle", "Layout Protocol", "Converter Protocol", "Path Effect Protocol", "Listener Action Protocol", "Transition Condition Protocol", "ScriptedInterpolator Protocol", "Util Protocol", "Test Protocol"],
    },
  ],
  [
    {
      id: "advanced", tag: "06 · 8 lessons", tagColor: "dark",
      title: "Advanced Rive\nScripting",
      desc: "Drawing API, procedural animation, custom easing, GPU shaders, and advanced data binding patterns.",
      bg: "bento-adv", dark: true,
      lessons: ["Core Types", "Drawing API", "ViewModels", "Listener Protocol", "Game Logic", "Instantiation", "Procedural", "GPU Shaders"],
    },
    {
      id: "best", tag: "07 · 4 lessons", tagColor: "emerald",
      title: "Best Practices",
      desc: "Code organization, debugging, performance, and production workflow patterns.",
      bg: "bento-best",
      lessons: ["Architecture", "Performance", "Debugging", "Resources"],
    },
    {
      id: "projects", tag: "08 · 4 projects", tagColor: "yellow",
      title: "Keystone\nProjects",
      desc: "Interactive builds plus guided shader labs for GPUCanvas, textures, post-processing, and 3D-style rendering.",
      bg: "bento-projects", dark: true,
      lessons: ["Interactive Button — pointer input + ViewModel triggers", "Data Visualization — bar chart driven by ViewModel data", "Catch the Stars — mini-game with clicking, scoring, physics", "GPU Shader Labs — early-access shader and post-processing exercises"],
    },
  ],
];

export default function BentoGrid() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bento-grid">
      {CARDS.map((row, ri) => (
        <div key={ri} className={`bento-row ${hovered ? "has-hover" : ""}`}>
          {row.map((card) => {
            const isHovered = hovered === card.id;
            const isExpanded = expanded === card.id;
            return (
              <div
                key={card.id}
                className={[
                  "bento-card",
                  card.bg,
                  isHovered ? "hovered" : "",
                  isExpanded ? "expanded" : "",
                ].join(" ")}
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setExpanded(isExpanded ? null : card.id)}
              >
                <span className={`bento-tag ${card.tagColor}`}>{card.tag}</span>
                <h3 className={card.dark ? "dark" : ""}>
                  {card.title.split("\n").map((l, i) => (
                    <span key={i}>{i > 0 && <br />}{l}</span>
                  ))}
                </h3>
                <p className={card.dark ? "dark" : ""}>{card.desc}</p>
                {/* Lessons — only rendered for THIS card when expanded */}
                <div className="bento-expand">
                  <div className="bento-expand-inner">
                    <div className={`bento-lessons ${card.dark ? "dark" : ""}`}>
                      <span className="bento-lessons-label">lessons</span>
                      <ul>
                        {card.lessons.map((l, i) => (
                          <li key={i}>{l}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
