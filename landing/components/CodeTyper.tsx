"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ───────────────────────────────────────────
   Script data — each line has text + color class
   Mistakes: { line, at, wrong } — at char index,
   type `wrong` chars, pause, delete them, continue
   ─────────────────────────────────────────── */

interface ScriptLine {
  text: string;
  color: string;
}

interface Mistake {
  line: number;
  at: number;
  wrong: string;
}

interface Script {
  filename: string;
  lines: ScriptLine[];
  mistakes: Mistake[];
}

const SCRIPTS: Script[] = [
  /* ── Script 1: Node<T> — procedural drawing ── */
  {
    filename: "pulsing_circle.luau",
    lines: [
      { text: "-- Node<PulsingCircle>", color: "cl-comment" },
      { text: "-- Draws a circle that pulses using sin()", color: "cl-comment" },
      { text: "", color: "cl-grey" },
      { text: "type PulsingCircle = {", color: "cl-lime" },
      { text: "  path: Path,", color: "cl-grey" },
      { text: "  paint: Paint,", color: "cl-grey" },
      { text: "  elapsed: number }", color: "cl-grey" },
      { text: "", color: "cl-grey" },
      { text: "-- called once when the script attaches", color: "cl-comment" },
      { text: "function init(self: PulsingCircle, context: Context): boolean", color: "cl-yellow" },
      { text: "  self.path = Path.new()", color: "cl-grey" },
      { text: "  self.paint = Paint.with({", color: "cl-grey" },
      { text: '    style = "fill",', color: "cl-grey" },
      { text: "    color = Color.rgb(92, 232, 138),", color: "cl-grey" },
      { text: "    feather = 4,", color: "cl-grey" },
      { text: "  })", color: "cl-grey" },
      { text: "  self.elapsed = 0", color: "cl-grey" },
      { text: "  return true", color: "cl-purple" },
      { text: "end", color: "cl-yellow" },
      { text: "", color: "cl-grey" },
      { text: "-- runs every frame with delta time", color: "cl-comment" },
      { text: "function advance(self: PulsingCircle, seconds: number): boolean", color: "cl-yellow" },
      { text: "  self.elapsed = self.elapsed + seconds", color: "cl-grey" },
      { text: "  local r = 80 + math.sin(self.elapsed * 3) * 30", color: "cl-grey" },
      { text: "", color: "cl-grey" },
      { text: "  -- rebuild path each frame (required)", color: "cl-comment" },
      { text: "  self.path:reset()", color: "cl-grey" },
      { text: "  self.path:moveTo(Vector.xy(256 + r, 256))", color: "cl-grey" },
      { text: "  self.path:close()", color: "cl-grey" },
      { text: "  return true", color: "cl-purple" },
      { text: "end", color: "cl-yellow" },
      { text: "", color: "cl-grey" },
      { text: "-- render the path with our paint", color: "cl-comment" },
      { text: "function draw(self: PulsingCircle, renderer: Renderer)", color: "cl-yellow" },
      { text: "  renderer:drawPath(self.path, self.paint)", color: "cl-grey" },
      { text: "end", color: "cl-yellow" },
      { text: "", color: "cl-grey" },
      { text: "-- factory: late() for objects created in init", color: "cl-comment" },
      { text: "return function(): Node<PulsingCircle>", color: "cl-lime" },
      { text: "  return {", color: "cl-grey" },
      { text: "    init = init, advance = advance, draw = draw,", color: "cl-grey" },
      { text: "    path = late(), paint = late(), elapsed = 0,", color: "cl-grey" },
      { text: "  }", color: "cl-grey" },
      { text: "end", color: "cl-yellow" },
    ],
    mistakes: [
      { line: 11, at: 18, wrong: "new()" },
      { line: 24, at: 12, wrong: "self.time" },
    ],
  },
  /* ── Script 2: Converter<T> — color interpolation ── */
  {
    filename: "color_lerp.luau",
    lines: [
      { text: "-- Converter<ColorLerp>", color: "cl-comment" },
      { text: "-- Maps a 0-1 number to a color gradient", color: "cl-comment" },
      { text: "", color: "cl-grey" },
      { text: "type DataInputs = DataValueNumber", color: "cl-lime" },
      { text: "type DataOutput = DataValueColor", color: "cl-lime" },
      { text: "", color: "cl-grey" },
      { text: "type ColorLerp = {", color: "cl-lime" },
      { text: "  startColor: Color,", color: "cl-grey" },
      { text: "  endColor: Color }", color: "cl-grey" },
      { text: "", color: "cl-grey" },
      { text: "function init(self: ColorLerp, context: Context): boolean", color: "cl-yellow" },
      { text: "  -- brand yellow to brand purple", color: "cl-comment" },
      { text: "  self.startColor = Color.rgb(254, 251, 16)", color: "cl-grey" },
      { text: "  self.endColor = Color.rgb(162, 48, 250)", color: "cl-grey" },
      { text: "  return true", color: "cl-purple" },
      { text: "end", color: "cl-yellow" },
      { text: "", color: "cl-grey" },
      { text: "-- number -> color (forward direction)", color: "cl-comment" },
      { text: "function convert(self: ColorLerp, input: DataInputs): DataOutput", color: "cl-yellow" },
      { text: "  local dv = DataValue.color()", color: "cl-grey" },
      { text: "  if input:isNumber() then", color: "cl-grey" },
      { text: "    local t = (input :: DataValueNumber).value", color: "cl-grey" },
      { text: "    dv.value = Color.lerp(self.startColor, self.endColor, t)", color: "cl-grey" },
      { text: "  end", color: "cl-grey" },
      { text: "  return dv", color: "cl-purple" },
      { text: "end", color: "cl-yellow" },
      { text: "", color: "cl-grey" },
      { text: "-- inverse: color -> number (required)", color: "cl-comment" },
      { text: "function reverseConvert(self: ColorLerp, input: DataOutput): DataInputs", color: "cl-yellow" },
      { text: "  local dv = DataValue.number()", color: "cl-grey" },
      { text: "  -- approximate by checking red channel ratio", color: "cl-comment" },
      { text: "  if input:isColor() then", color: "cl-grey" },
      { text: "    local c = (input :: DataValueColor).value", color: "cl-grey" },
      { text: "    local r = Color.red(c)", color: "cl-grey" },
      { text: "    dv.value = 1 - (r / 255)", color: "cl-grey" },
      { text: "  end", color: "cl-grey" },
      { text: "  return dv", color: "cl-purple" },
      { text: "end", color: "cl-yellow" },
      { text: "", color: "cl-grey" },
      { text: "return function(): Converter<ColorLerp, DataInputs, DataOutput>", color: "cl-lime" },
      { text: "  return {", color: "cl-grey" },
      { text: "    init = init,", color: "cl-grey" },
      { text: "    convert = convert,", color: "cl-grey" },
      { text: "    reverseConvert = reverseConvert,", color: "cl-grey" },
      { text: "    startColor = Color.rgb(0, 0, 0),", color: "cl-grey" },
      { text: "    endColor = Color.rgb(0, 0, 0),", color: "cl-grey" },
      { text: "  }", color: "cl-grey" },
      { text: "end", color: "cl-yellow" },
    ],
    mistakes: [
      { line: 12, at: 22, wrong: "Color.rgba" },
      { line: 22, at: 20, wrong: "Color.lerp(self.start" },
    ],
  },
  /* ── Script 3: Node<T> — physics + ViewModel triggers ── */
  {
    filename: "bounce_node.luau",
    lines: [
      { text: "-- Node<BounceNode>", color: "cl-comment" },
      { text: "-- Applies gravity to a node, resets via VM trigger", color: "cl-comment" },
      { text: "", color: "cl-grey" },
      { text: "type BounceNode = {", color: "cl-lime" },
      { text: "  velocity: number,", color: "cl-grey" },
      { text: "  gravity: number,", color: "cl-grey" },
      { text: "  ctx: Context }", color: "cl-grey" },
      { text: "", color: "cl-grey" },
      { text: "function init(self: BounceNode, context: Context): boolean", color: "cl-yellow" },
      { text: "  self.velocity = 0", color: "cl-grey" },
      { text: "  self.gravity = 980", color: "cl-grey" },
      { text: "  self.ctx = context -- store for markNeedsUpdate", color: "cl-grey" },
      { text: "", color: "cl-grey" },
      { text: "  -- bind to ViewModel trigger", color: "cl-comment" },
      { text: "  local vm = context:viewModel()", color: "cl-grey" },
      { text: "  if vm then", color: "cl-grey" },
      { text: '    local trigger = vm:getTrigger("reset")', color: "cl-grey" },
      { text: "    if trigger then", color: "cl-grey" },
      { text: "      -- no-arg callback (required)", color: "cl-comment" },
      { text: "      trigger:addListener(function()", color: "cl-purple" },
      { text: "        self.velocity = -400", color: "cl-grey" },
      { text: "        -- wake the advance loop", color: "cl-comment" },
      { text: "        self.ctx:markNeedsUpdate()", color: "cl-cyan" },
      { text: "      end)", color: "cl-purple" },
      { text: "    end", color: "cl-grey" },
      { text: "  end", color: "cl-grey" },
      { text: "  return true", color: "cl-purple" },
      { text: "end", color: "cl-yellow" },
      { text: "", color: "cl-grey" },
      { text: "-- physics step: gravity + floor bounce", color: "cl-comment" },
      { text: "function advance(self: BounceNode, seconds: number): boolean", color: "cl-yellow" },
      { text: "  self.velocity = self.velocity + self.gravity * seconds", color: "cl-grey" },
      { text: "  local node = self.ctx:node()", color: "cl-grey" },
      { text: "  local y = node:y() + self.velocity * seconds", color: "cl-grey" },
      { text: "", color: "cl-grey" },
      { text: "  -- floor collision at y=500", color: "cl-comment" },
      { text: "  if y > 500 then", color: "cl-grey" },
      { text: "    y = 500", color: "cl-grey" },
      { text: "    self.velocity = self.velocity * -0.75", color: "cl-grey" },
      { text: "  end", color: "cl-grey" },
      { text: "  node:y(y)", color: "cl-grey" },
      { text: "  return true", color: "cl-purple" },
      { text: "end", color: "cl-yellow" },
      { text: "", color: "cl-grey" },
      { text: "return function(): Node<BounceNode>", color: "cl-lime" },
      { text: "  return {", color: "cl-grey" },
      { text: "    init = init, advance = advance,", color: "cl-grey" },
      { text: "    velocity = 0, gravity = 980, ctx = nil,", color: "cl-grey" },
      { text: "  }", color: "cl-grey" },
      { text: "end", color: "cl-yellow" },
    ],
    mistakes: [
      { line: 10, at: 18, wrong: "0.0" },
      { line: 31, at: 20, wrong: "self.velcity" },
    ],
  },
  /* ── Script 4: Node<T> — gradients + renderer transforms ── */
  {
    filename: "gradient_ring.luau",
    lines: [
      { text: "-- Node<GradientRing>", color: "cl-comment" },
      { text: "-- Rotating ring with a radial spectrum gradient", color: "cl-comment" },
      { text: "", color: "cl-grey" },
      { text: "type GradientRing = {", color: "cl-lime" },
      { text: "  path: Path,", color: "cl-grey" },
      { text: "  paint: Paint,", color: "cl-grey" },
      { text: "  angle: number }", color: "cl-grey" },
      { text: "", color: "cl-grey" },
      { text: "function init(self: GradientRing, context: Context): boolean", color: "cl-yellow" },
      { text: "  self.path = Path.new()", color: "cl-grey" },
      { text: "", color: "cl-grey" },
      { text: "  -- stroke paint with radial gradient", color: "cl-comment" },
      { text: "  self.paint = Paint.with({", color: "cl-grey" },
      { text: '    style = "stroke",', color: "cl-grey" },
      { text: "    thickness = 6,", color: "cl-grey" },
      { text: '    cap = "round",', color: "cl-grey" },
      { text: "    gradient = Gradient.radial(", color: "cl-grey" },
      { text: "      Vector.xy(256, 256), 120,", color: "cl-grey" },
      { text: "      {", color: "cl-grey" },
      { text: "        { position = 0, color = Color.rgb(254, 251, 16) },", color: "cl-grey" },
      { text: "        { position = 0.5, color = Color.rgb(85, 231, 137) },", color: "cl-grey" },
      { text: "        { position = 1, color = Color.rgb(162, 48, 250) },", color: "cl-grey" },
      { text: "      }", color: "cl-grey" },
      { text: "    )", color: "cl-grey" },
      { text: "  })", color: "cl-grey" },
      { text: "  self.angle = 0", color: "cl-grey" },
      { text: "  return true", color: "cl-purple" },
      { text: "end", color: "cl-yellow" },
      { text: "", color: "cl-grey" },
      { text: "function advance(self: GradientRing, seconds: number): boolean", color: "cl-yellow" },
      { text: "  self.angle = self.angle + seconds * 1.5", color: "cl-grey" },
      { text: "", color: "cl-grey" },
      { text: "  -- rebuild geometry each frame", color: "cl-comment" },
      { text: "  self.path:reset()", color: "cl-grey" },
      { text: "  local cx, cy, r = 256, 256, 120", color: "cl-grey" },
      { text: "  self.path:moveTo(Vector.xy(cx + r, cy))", color: "cl-grey" },
      { text: "  self.path:close()", color: "cl-grey" },
      { text: "  return true", color: "cl-purple" },
      { text: "end", color: "cl-yellow" },
      { text: "", color: "cl-grey" },
      { text: "-- save/restore isolates the rotation transform", color: "cl-comment" },
      { text: "function draw(self: GradientRing, renderer: Renderer)", color: "cl-yellow" },
      { text: "  renderer:save()", color: "cl-grey" },
      { text: "  renderer:transform(Mat2D.withRotation(self.angle))", color: "cl-grey" },
      { text: "  renderer:drawPath(self.path, self.paint)", color: "cl-grey" },
      { text: "  renderer:restore()", color: "cl-grey" },
      { text: "end", color: "cl-yellow" },
      { text: "", color: "cl-grey" },
      { text: "return function(): Node<GradientRing>", color: "cl-lime" },
      { text: "  return {", color: "cl-grey" },
      { text: "    init = init, advance = advance, draw = draw,", color: "cl-grey" },
      { text: "    path = late(), paint = late(), angle = 0,", color: "cl-grey" },
      { text: "  }", color: "cl-grey" },
      { text: "end", color: "cl-yellow" },
    ],
    mistakes: [
      { line: 14, at: 15, wrong: "4" },
      { line: 30, at: 31, wrong: "seoncds" },
    ],
  },
];

/* ─── Timing constants ─── */
const BASE_CHAR_MS = 110;
const CHAR_VARIANCE = 50;
const LINE_PAUSE_MS = 450;
const BLANK_LINE_PAUSE_MS = 250;
const MISTAKE_PAUSE_BEFORE_DELETE_MS = 600;
const MISTAKE_DELETE_CHAR_MS = 40;
const MISTAKE_PAUSE_AFTER_DELETE_MS = 300;
const SCRIPT_DONE_PAUSE_MS = 3500;
const CLEAR_PAUSE_MS = 600;

function charDelay(): number {
  return BASE_CHAR_MS + Math.random() * CHAR_VARIANCE - CHAR_VARIANCE / 2;
}

/* ─── Component ─── */
export default function CodeTyper() {
  const [lines, setLines] = useState<{ text: string; color: string }[]>([]);
  const [filename, setFilename] = useState(SCRIPTS[0].filename);
  const [cursorLine, setCursorLine] = useState(0);
  const [cursorCol, setCursorCol] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const codeAreaRef = useRef<HTMLDivElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef(false);

  const sleep = useCallback(
    (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(() => resolve(), ms);
        // Store for potential cleanup
        return () => clearTimeout(id);
      }),
    []
  );

  const scrollToBottom = useCallback(() => {
    if (codeAreaRef.current) {
      codeAreaRef.current.scrollTop = codeAreaRef.current.scrollHeight;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = gutterRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    cancelRef.current = false;
    let running = true;

    async function wait(ms: number) {
      return new Promise<void>((res) => setTimeout(res, ms));
    }

    async function typeAllScripts() {
      let scriptIdx = 0;

      while (running) {
        const script = SCRIPTS[scriptIdx % SCRIPTS.length];

        // Set filename and clear
        setFilename(script.filename);
        setLines([]);
        setCursorLine(0);
        setCursorCol(0);
        setShowCursor(true);

        await wait(CLEAR_PAUSE_MS);

        // Build a sorted list of mistakes for this script
        const mistakes = [...script.mistakes].sort(
          (a, b) => a.line - b.line || a.at - b.at
        );

        // Type each line
        const typedLines: { text: string; color: string }[] = [];

        for (let li = 0; li < script.lines.length; li++) {
          if (!running) return;

          const line = script.lines[li];
          typedLines.push({ text: "", color: line.color });

          setCursorLine(li);
          setCursorCol(0);
          setLines([...typedLines]);

          // Find mistakes for this line
          const lineMistakes = mistakes.filter((m) => m.line === li);

          if (line.text === "") {
            // Blank line — just pause briefly
            await wait(BLANK_LINE_PAUSE_MS);
            continue;
          }

          let charIdx = 0;

          while (charIdx < line.text.length) {
            if (!running) return;

            // Check if a mistake starts here
            const mistake = lineMistakes.find((m) => m.at === charIdx);
            if (mistake) {
              // Type the wrong text
              for (let mi = 0; mi < mistake.wrong.length; mi++) {
                if (!running) return;
                typedLines[li] = {
                  text: line.text.slice(0, charIdx) + mistake.wrong.slice(0, mi + 1),
                  color: line.color,
                };
                setCursorCol(charIdx + mi + 1);
                setLines([...typedLines]);
                scrollToBottom();
                await wait(charDelay());
              }

              // Pause — realize the mistake
              await wait(MISTAKE_PAUSE_BEFORE_DELETE_MS);

              // Delete the wrong text
              for (let di = mistake.wrong.length; di > 0; di--) {
                if (!running) return;
                typedLines[li] = {
                  text: line.text.slice(0, charIdx) + mistake.wrong.slice(0, di - 1),
                  color: line.color,
                };
                setCursorCol(charIdx + di - 1);
                setLines([...typedLines]);
                await wait(MISTAKE_DELETE_CHAR_MS);
              }

              await wait(MISTAKE_PAUSE_AFTER_DELETE_MS);

              // Now continue typing the correct text from charIdx
            }

            // Type the correct character
            typedLines[li] = {
              text: line.text.slice(0, charIdx + 1),
              color: line.color,
            };
            setCursorCol(charIdx + 1);
            setLines([...typedLines]);
            scrollToBottom();
            await wait(charDelay());
            charIdx++;
          }

          // End of line pause
          await wait(LINE_PAUSE_MS);
        }

        // Script complete — pause with blinking cursor
        await wait(SCRIPT_DONE_PAUSE_MS);

        // Transition: brief pause, clear, next script
        setShowCursor(false);
        await wait(200);

        scriptIdx++;
      }
    }

    typeAllScripts();

    return () => {
      running = false;
    };
  }, [scrollToBottom]);

  // Sync gutter scroll with code area scroll
  const handleScroll = useCallback(() => {
    if (codeAreaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = codeAreaRef.current.scrollTop;
    }
  }, []);

  const lineCount = Math.max(lines.length, 1);

  return (
    <div className="code-block">
      <div className="code-titlebar">
        <div className="code-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="code-filename">{filename}</span>
        <span className="code-spacer" />
      </div>
      <div className="code-area-wrapper">
        <div className="code-gutter" ref={gutterRef}>
          {Array.from({ length: lineCount }, (_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <div className="code-gutter-sep" />
        <div
          className="code-lines-scroll"
          ref={codeAreaRef}
          onScroll={handleScroll}
        >
          <div className="code-lines">
            {lines.map((line, i) => (
              <span key={i} className={line.color}>
                {line.text}
                {showCursor && i === cursorLine && (
                  <span className="typing-cursor" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="code-statusbar">
        <div className="code-status-left">
          <span>&#xE0A0; main</span>
        </div>
        <div className="code-status-right">
          <span>Luau</span>
          <span>UTF-8</span>
          <span>
            Ln {cursorLine + 1}, Col {cursorCol + 1}
          </span>
        </div>
      </div>
    </div>
  );
}
