"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, GitFork } from "lucide-react";

const products = [
  {
    id: "brushalarm",
    number: "01",
    kind: "iOS / Routine",
    name: "BrushAlarm",
    headline: "An alarm you earn by getting up.",
    copy: "A focused iOS alarm that turns dismissal into a real morning action: show the camera a toothbrush. Recognition stays on-device.",
    github: "https://github.com/Vorela-Systems/BrushAlarm",
    image: "/products/brushalarm.png",
    facts: ["iOS 26+", "On-device vision", "No account"],
    tone: "blue",
  },
  {
    id: "specvault",
    number: "02",
    kind: "iOS / Household",
    name: "SpecVault",
    headline: "The exact part number, when you need it.",
    copy: "A local reference for filters, bulbs, batteries, and every other replacement spec a home quietly asks you to remember.",
    github: "https://github.com/Vorela-Systems/SpecVault",
    image: "/products/specvault.png",
    facts: ["SwiftUI", "Local records", "Compatibility checks"],
    tone: "mono",
  },
  {
    id: "tradespace",
    number: "03",
    kind: "Web / Engineering",
    name: "TradeSpace",
    headline: "Make the trade before you make the purchase.",
    copy: "A transparent workbench for comparing robotics motors and gearboxes across feasibility, weighted priorities, and the Pareto frontier.",
    github: "https://github.com/Vorela-Systems/TradeSpace",
    live: "https://vorela-systems.github.io/TradeSpace/",
    facts: ["Local-first", "Explainable math", "Live on the web"],
    tone: "red",
  },
];

export default function Home() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      const center = window.innerHeight / 2;
      nodes.forEach((node) => {
        const speed = Number(node.dataset.parallax ?? 0.08);
        const rect = node.getBoundingClientRect();
        const offset = Math.max(-110, Math.min(110, (rect.top + rect.height / 2 - center) * speed));
        node.style.setProperty("--parallax-y", `${offset}px`);
      });
    };

    const onScroll = () => {
      if (!frame && !reduceMotion) frame = requestAnimationFrame(updateParallax);
    };

    const sections = ["top", ...products.map((product) => product.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -45%", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main>
      <nav className="floating-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Vorela Systems home">
          <span className="brand-mark">VS</span>
          <span>Vorela Systems</span>
        </a>
        <div className="nav-register" aria-label="Product sections">
          {products.map((product) => (
            <a key={product.id} href={`#${product.id}`} className={active === product.id ? "active" : ""}>
              <span>{product.number}</span>
              <b>{product.name}</b>
            </a>
          ))}
        </div>
        <a className="nav-github" href="https://github.com/Vorela-Systems" target="_blank" rel="noreferrer">
          <GitFork aria-hidden="true" size={15} />
          <span>GitHub</span>
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-watermark parallax" data-parallax="-0.05" aria-hidden="true">V/S</div>
        <div className="hero-copy">
          <p className="eyebrow">Vorela Systems / Product index / 2026</p>
          <h1>Small tools for real routines and hard decisions.</h1>
          <p className="lede">
            Practical, privacy-conscious software with clear interfaces, local-first data, and no unnecessary machinery.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#brushalarm">Inspect the work <ArrowDown size={15} /></a>
            <a className="text-action" href="https://github.com/Vorela-Systems" target="_blank" rel="noreferrer">View the organization <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <aside className="signal-board parallax" data-parallax="0.045">
          <div className="signal-head"><span>Product register</span><b>Active</b></div>
          <dl>
            <div><dt>Products</dt><dd>03</dd></div>
            <div><dt>Native iOS</dt><dd>02</dd></div>
            <div><dt>Engineering web</dt><dd>01</dd></div>
          </dl>
          <p><i /> Built around one concrete job at a time.</p>
        </aside>
        <div className="hero-index" aria-hidden="true">FIELD NOTES<br />001—003</div>
      </section>

      <section className="manifesto" aria-label="Company principles">
        <p className="eyebrow">Operating principles</p>
        <div className="principles">
          <span><b>01</b> Useful before impressive</span>
          <span><b>02</b> Local by default</span>
          <span><b>03</b> Transparent systems</span>
        </div>
      </section>

      <section className="product-register" id="work">
        {products.map((product, index) => (
          <article className={`product product-${product.tone}`} id={product.id} key={product.id}>
            <div className="product-number parallax" data-parallax="-0.035" aria-hidden="true">{product.number}</div>
            <div className="product-copy">
              <p className="eyebrow">{product.number} / {product.kind}</p>
              <h2>{product.name}</h2>
              <h3>{product.headline}</h3>
              <p>{product.copy}</p>
              <ul aria-label={`${product.name} details`}>
                {product.facts.map((fact) => <li key={fact}>{fact}</li>)}
              </ul>
              <div className="product-actions">
                {product.live && <a className="primary-action" href={product.live} target="_blank" rel="noreferrer">Open TradeSpace <ArrowUpRight size={15} /></a>}
                <a className="text-action" href={product.github} target="_blank" rel="noreferrer"><GitFork size={15} /> Source on GitHub</a>
              </div>
            </div>

            <div className={`product-visual visual-${index + 1} parallax`} data-parallax={index % 2 === 0 ? "0.055" : "-0.045"}>
              {product.image ? (
                <div className="icon-specimen">
                  <div className="specimen-label"><span>Product icon</span><b>{product.name}</b></div>
                  <img src={product.image} alt={`${product.name} app icon`} />
                  <div className="crop-marks" aria-hidden="true"><i /><i /><i /><i /></div>
                </div>
              ) : (
                <div className="trade-preview" aria-label="TradeSpace interface excerpt">
                  <div className="preview-head"><span>TS</span><b>TradeSpace</b><em>LOCAL STUDY</em></div>
                  <div className="preview-grid">
                    <div className="preview-panel"><small>01 / REQUIREMENTS</small><strong>24.0 kg</strong><span>system mass</span></div>
                    <div className="preview-panel red"><small>02 / DECISION</small><strong>87</strong><span>weighted score</span></div>
                    <div className="preview-chart"><i /><i /><i /><i /><i /></div>
                  </div>
                  <div className="preview-row"><span>VECTOR 42 / 34:1</span><b>● FRONTIER</b><span>$366</span><span>179% MARGIN</span></div>
                  <div className="preview-row dim"><span>ATLAS 25 / 50:1</span><b>DOMINATED</b><span>$260</span><span>78% MARGIN</span></div>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      <footer>
        <div>
          <p className="eyebrow">Vorela Systems / Product company</p>
          <h2>Software with a reason to exist.</h2>
        </div>
        <a href="https://github.com/Vorela-Systems" target="_blank" rel="noreferrer">
          <GitFork size={18} /> github.com/Vorela-Systems <ArrowUpRight size={16} />
        </a>
        <p className="copyright">© 2026 Vorela Systems</p>
      </footer>
    </main>
  );
}
