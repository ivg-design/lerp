import CodeTyper from "@/components/CodeTyper";
import WordRotator from "@/components/WordRotator";
import MouseRepulsor from "@/components/MouseRepulsor";
import BentoGrid from "@/components/BentoGrid";
import FAQ from "@/components/FAQ";
import HeroRive from "@/components/HeroRive";
import MobileNav from "@/components/MobileNav";
import CourseCtaText from "@/components/CourseCtaText";


const BASE = "/apps/lerp";

export default function Home() {
  return (
    <>
      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="/apps/lerp/" className="nav-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${BASE}/lerp_nav_marks.svg`} alt="LERP" className="nav-logo-img" />
          </a>
          <div className="nav-links">
            <a href="#why">why lerp</a>
            <a href="#code">scripting</a>
            <a href="#curriculum">curriculum</a>
            <a href="#faq">faq</a>
          </div>
          <a href="/apps/lerp/getting-started/welcome" className="nav-cta nav-cta-desktop">
            <CourseCtaText startText="start learning" continueText="continue course" />
          </a>
          <MobileNav />
        </div>
      </nav>

      {/* Hero — full-bleed Rive animation */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-rive-canvas" id="hero-rive">
            <HeroRive />
          </div>
        </div>
      </section>

      {/* Spectrum Line */}
      <div className="spectrum-line" />

      {/* Why LERP */}
      <section className="why-lerp" id="why">
        <MouseRepulsor className="why-inner">
          <span className="section-tag yellow">// the_gap</span>
          <h2 className="wave-h2">
            You know
            <br />
            keyframes.
            <br />
            <span className="wave-not">Not Luau.</span>
          </h2>
          <p className="wave-desc">
            Rive&apos;s scripting engine lets you add logic, data binding, and
            interactivity to animations — but there&apos;s no structured path to
            learn it. LERP is the first interactive course built specifically for
            Rive&apos;s Luau runtime.
          </p>

          {/* s2-builds card */}
          <div className="why-card card-builds" data-repulse data-base-transform="rotate(-5deg)">
            <span className="builds-num">3</span>
            <span className="builds-bar" />
            <div className="builds-right">
              <span className="builds-label">capstone builds</span>
              <div className="builds-list">
                <span>
                  Interactive button
                  <br />
                  with hit detection
                </span>
                <span>
                  Data-driven chart
                  <br />
                  with ViewModels
                </span>
                <span>
                  Star-catching mini-game
                  <br />
                  with physics
                </span>
              </div>
            </div>
          </div>

          {/* s2-native card */}
          <div className="why-card card-native" data-repulse data-base-transform="rotate(4.5deg)">
            <span className="section-tag purple">// rive_native</span>
            <h3>
              Built for
              <br />
              the editor.
            </h3>
            <p className="card-desc">
              Not a separate sandbox. Every exercise runs inside Rive — the same
              tool you&apos;ll ship with.
            </p>
            <span className="card-badge">rive editor ↗</span>
          </div>

          {/* s2-path card */}
          <div className="why-card card-path" data-repulse data-base-transform="rotate(0deg)">
            <span className="section-tag yellow">// learning_path</span>
            <div className="path-labels">
              <span className="pl1">1</span>
              <span className="pl2">2</span>
              <span className="pl3">3</span>
              <span className="pl4">4</span>
              <span className="pl5">5</span>
              <span className="pl6">6</span>
              <span className="pl7">7</span>
              <span className="pl8">8</span>
            </div>
            <div className="path-names">
              <span>
                Nodes → Drawing → Data Binding → State Machines
              </span>
              <span>
                → Constraints → Procedural → Physics → Capstones
              </span>
            </div>
            <div className="path-end">
              <span className="path-arrow">→</span>
              <span className="path-label">
                Runtime-ready Rive developer
              </span>
            </div>
          </div>

          {/* LERP picks up from there wordmark */}
          <div className="lerp-wordmark">
            <span className="wm-lerp" data-text="LERP">LERP</span>
            <div className="wm-sub">
              <span className="wm-picks">PICKS </span>
              <div className="wm-line2">
                <span className="wm-up">up</span>
                <span className="wm-from">from</span>
              </div>
            </div>
            <span className="wm-there">there</span>
          </div>

          {/* Stat cards (moved from hero) */}
          <div className="stat-card card-77" data-repulse data-base-transform="rotate(-5deg)">
            <span className="stat-num">91</span>
            <span className="stat-accent" />
            <span className="stat-label">docs pages</span>
            <span className="stat-desc">Lessons, reference, projects, and workflow docs.</span>
          </div>

          <div className="stat-card card-189" data-repulse data-base-transform="rotate(9deg)">
            <span className="stat-label-top">QUIZZES</span>
            <span className="stat-accent" />
            <span className="stat-num">203</span>
            <span className="stat-desc">
              Multiple-choice &amp; code
              <br />
              output quizzes.
            </span>
          </div>
        </MouseRepulsor>
      </section>

      {/* Spectrum Line */}
      <div className="spectrum-line reverse" />

      {/* Code Section */}
      <section className="code-section" id="code">
        <MouseRepulsor className="code-inner">
          <div className="code-block-wrap" data-repulse data-base-transform="rotate(0deg)">
            <CodeTyper />
          </div>

          <div className="code-editorial">
            <span className="section-tag lime">// not_computer_science</span>
            <span className="ed-line1">Rive Luau</span>
            <span className="ed-line2">empowers</span>
            <span className="ed-line3"><WordRotator /></span>
            <span className="ed-line4">creatives.</span>
            <p className="ed-body">
              {`Luau is a typed scripting language from Roblox — 200KB runtime, gradual type system, built for engines that think in frames and physics. Exactly like Rive.

Every lesson maps to production workflows. You write real scripts in the Rive Editor, not abstract exercises.`}
            </p>
          </div>

          {/* Stat cards (moved from hero) */}
          <div className="stat-card card-201" data-repulse data-base-transform="rotate(4deg)">
            <span className="stat-num">222</span>
            <span className="stat-accent-v" />
            <div className="stat-right">
              <span className="stat-label">exercises</span>
              <span className="stat-desc">
                Hands-on coding challenges validated in real-time.
              </span>
            </div>
          </div>

          <div className="stat-card card-8" data-repulse data-base-transform="rotate(-13.5deg)">
            <div className="card-8-top">
              <span className="stat-num">8</span>
              <span className="stat-label-vert">PARTS</span>
            </div>
            <span className="stat-accent" />
            <span className="stat-desc">Basics to advanced.</span>
          </div>

          <div className="stat-card card-free" data-repulse data-base-transform="rotate(-3deg)">
            <span className="stat-num">$0.00</span>
            <span className="stat-accent" />
            <span className="stat-label">forever free</span>
            <span className="stat-desc">
              No account. No tracking. MIT licensed.
            </span>
          </div>

          <div className="stat-card card-10" data-repulse data-base-transform="rotate(5deg)">
            <span className="stat-num">11</span>
            <span className="stat-accent-v" />
            <div className="stat-right">
              <span className="stat-label">protocol lessons</span>
              <span className="stat-desc">
                Structured patterns for every Rive runtime API.
              </span>
            </div>
          </div>
        </MouseRepulsor>
      </section>

      {/* Spectrum Line */}
      <div className="spectrum-line" />

      {/* Curriculum */}
      <section className="curriculum" id="curriculum">
        <div className="cur-header">
          <span className="section-tag cyan">// the_curriculum</span>
          <span className="cur-h1">Eight parts.</span>
          <span className="cur-h2">Zero filler.</span>
        </div>

        <BentoGrid />
      </section>

      {/* Spectrum Line */}
      <div className="spectrum-line reverse" />

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="faq-inner">
          <div className="faq-header">
            <span className="section-tag emerald">// frequently_asked</span>
            <span className="faq-h1">Common</span>
            <span className="faq-h2">questions.</span>
            <p className="faq-desc">
              Everything you need to know
              <br />
              before getting started.
            </p>
            <div className="faq-deco">
              <div className="deco-rect deco1" />
              <div className="deco-rect deco2" />
              <div className="deco-rect deco3" />
              <div className="deco-rect deco4" />
              <div className="deco-rect deco5" />
            </div>
          </div>
          <FAQ />
        </div>
      </section>

      {/* Spectrum Line between FAQ and CTA */}
      <div className="spectrum-line" />

      {/* Final CTA + Footer */}
      <section className="final-cta" id="cta">
        <div className="cta-glow" />
        <div className="cta-content">
          <span className="cta-code">-- start()</span>
          <div className="cta-title-group">
            <span className="cta-h1">Ready to write</span>
            <span className="cta-h2">code that moves?</span>
          </div>
          <p className="cta-sub">
            Free forever. MIT licensed. No account required.
            <br />
            No tracking. Your progress stays on your device.
          </p>
          <div className="cta-btns">
            <a href="/apps/lerp/getting-started/welcome" className="btn-cta-primary">
              <CourseCtaText startText="start the course" continueText="continue your course" /> <span className="arrow">→</span>
            </a>
            <a href="https://github.com/ivg-design/lerp" className="btn-cta-ghost" target="_blank" rel="noopener noreferrer">
              view on github
            </a>
          </div>
          <div className="cta-trust">
            <span>open source</span>
            <span className="dot-sep">·</span>
            <span>no accounts</span>
            <span className="dot-sep">·</span>
            <span>zero telemetry</span>
            <span className="dot-sep">·</span>
            <span>localStorage only</span>
          </div>
        </div>
        <div className="cta-badge badge-mit">
          <span className="badge-label">100% FREE</span>
          <span className="badge-val">MIT Licensed</span>
        </div>
        <div className="cta-badge badge-zero">
          <span className="badge-label">ZERO</span>
          <span className="badge-val">Telemetry</span>
        </div>
        <div className="cta-badge badge-lessons">
          <span className="badge-label">91</span>
          <span className="badge-val">Docs Pages</span>
        </div>
        <div className="cta-badge badge-oss">
          <span className="badge-label">OPEN SOURCE</span>
          <span className="badge-val">GitHub</span>
        </div>
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}/lerp_footer_marks.svg`} alt="LERP — Luau Education for Rive Professionals" className="footer-logo-img" />
            </div>
            <div className="footer-center">
              <span className="footer-tagline">
                The interactive scripting course for Rive.
              </span>
              <span className="footer-copy">
                © 2026 IVG Design. MIT License.
              </span>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <h4>learn</h4>
                <a href="/apps/lerp/getting-started/welcome">getting started</a>
                <a href="/apps/lerp/fundamentals/variables">fundamentals</a>
                <a href="/apps/lerp/advanced/core-types">advanced</a>
                <a href="/apps/lerp/projects/interactive-button">projects</a>
              </div>
              <div className="footer-col">
                <h4>reference</h4>
                <a href="/apps/lerp/category/api-reference">api docs</a>
                <a href="/apps/lerp/oop/prototype-based">oop patterns</a>
                <a href="/apps/lerp/site-map">site map</a>
                <a href="/apps/lerp/sitemap.xml">xml sitemap</a>
                <a href="/apps/lerp/llms.txt">llms.txt</a>
                <a href="/apps/lerp/agents.md">ai agent</a>
              </div>
              <div className="footer-col">
                <h4>community</h4>
                <a href="https://github.com/ivg-design/lerp" target="_blank" rel="noopener noreferrer">github repo</a>
                <a href="https://github.com/ivg-design/lerp/issues" target="_blank" rel="noopener noreferrer">report an issue</a>
                <a href="https://community.rive.app" target="_blank" rel="noopener noreferrer">rive community</a>
                <a href="/apps/lerp/contribution-instructions">contribute</a>
              </div>
              <div className="footer-col">
                <h4>trust</h4>
                <a href="/apps/lerp/editorial-methodology">editorial methodology</a>
                <a href="/apps/lerp/corrections-policy">corrections policy</a>
                <a href="/apps/lerp/privacy-local-storage">privacy (localStorage)</a>
                <a href="/apps/lerp/open-source-license">MIT license</a>
              </div>
            </div>
          </div>
        </footer>
      </section>

      {/* Bottom Spectrum */}
      <div className="spectrum-line bottom" />
    </>
  );
}
