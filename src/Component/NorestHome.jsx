import React, { useEffect, useRef } from "react";
import "./NorestHome.scss";

/**
 * NORESTE — Strategic Research House & Think Tank
 * Full home page: hero, who-we-are, research domains, difference,
 * practitioner network, philosophy, private research model,
 * client segments, intelligence notes, advisory, founding principles, contact.
 *
 * Motion: every section reveals with an alternating left/right/up
 * translate + fade as it enters the viewport (see useReveal + [data-reveal]).
 * Images are curated Unsplash direct URLs — swap freely.
 */

const IMAGES = {
  heroOrbit: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2600&auto=format&fit=crop", // earth from orbit
  astronaut: "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1600&auto=format&fit=crop", // astronaut tethered
  ocean: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=2200&auto=format&fit=crop", // deep dark ocean
  texture: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop", // topo map

  energy: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop",
  climate: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
  geoecon: "https://images.unsplash.com/photo-1451187863213-d1bcbaae3fa3?q=80&w=1200&auto=format&fit=crop",
  defense: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200&auto=format&fit=crop",
  future: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  capital: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop",

  practitioner: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
  desk: "https://images.unsplash.com/photo-1590650046871-92c887180603?q=80&w=1200&auto=format&fit=crop",
  delta: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop",
  mountains: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
};

// ---------------------------------------------------------------------------
// CONTENT
// ---------------------------------------------------------------------------

const DOMAINS = [
  {
    n: "01",
    title: "Energy Transition & Resource Security",
    items: ["Crude oil", "LNG", "Nuclear", "Renewables", "Grid economics", "Battery ecosystems", "Hydrogen realism", "Energy geopolitics"],
    img: IMAGES.energy,
  },
  {
    n: "02",
    title: "Climate, Water & Sustainability",
    items: ["ESG reality vs narrative", "Climate adaptation", "Agriculture stress", "Urban heat economics", "Water scarcity", "Carbon economics", "Climate migration"],
    img: IMAGES.climate,
  },
  {
    n: "03",
    title: "Geo-Economics & Strategic Policy",
    items: ["India–China–US dynamics", "Trade wars", "Sanctions", "Currency realignment", "Sovereign debt", "Supply-chain shifts", "Manufacturing relocation"],
    img: IMAGES.geoecon,
  },
  {
    n: "04",
    title: "Defense, Aerospace & Strategic Technologies",
    items: ["Weapon systems", "Dual-use technologies", "Drones", "Cyber warfare", "Semiconductor geopolitics", "Satellite infrastructure", "Space economy"],
    img: IMAGES.defense,
  },
  {
    n: "05",
    title: "Future Industries & Long-Cycle Opportunities",
    items: ["AI infrastructure", "Robotics", "Biotech", "Rare earths", "Deep-sea exploration", "Communication infrastructure", "Logistics transformation"],
    img: IMAGES.future,
  },
  {
    n: "06",
    title: "Capital Markets & Strategic Allocation",
    items: ["Long-horizon equity themes", "Sector positioning", "Valuation asymmetry", "Institutional positioning", "Portfolio risk architecture"],
    img: IMAGES.capital,
  },
];

const PRINCIPLES = [
  "Long Horizon Over Short-Term Noise",
  "Practical Realism Over Narrative Investing",
  "Risk Evaluation Before Return Projection",
  "Structural Research Over Speculative Commentary",
  "Independent Thinking Over Consensus Dependence",
  "Capital Allocation With Responsibility",
];

const SEGMENTS = [
  "Family Offices",
  "Ultra HNI Investors",
  "Entrepreneur Families",
  "NRIs & Global Indians",
  "Business Houses",
  "Strategic Capital Allocators",
  "Institutions Seeking Independent Research",
];

const NOTES = [
  { tag: "Macro Dispatch", title: "The Quiet Repricing of Energy Corridors", excerpt: "Why the next decade of capex is being decided along shipping lanes most allocators aren't watching yet." },
  { tag: "Structural Observation", title: "Rare Earths and the New Resource Map", excerpt: "Reading the mineral supply chain as a strategic asset class, not a commodity footnote." },
  { tag: "Geopolitical Implication", title: "Currency Realignment, Slowly Then Suddenly", excerpt: "The structural signals beneath a decade of managed exchange-rate calm." },
  { tag: "Sector Transition Note", title: "Grid Economics Before AI Economics", excerpt: "Compute demand is now a power-infrastructure story before it is a chip story." },
];

const SERVICES = [
  "Strategic Investment Advisory",
  "Macro & Sector Intelligence",
  "Family Office Research Support",
  "ESG & Sustainability Assessment",
  "Strategic Risk Evaluation",
  "Long-Horizon Capital Positioning",
  "Sectoral Opportunity Mapping",
  "Geopolitical & Policy Impact Analysis",
  "Bespoke Research Engagements",
];

const FELLOWS = [
  { role: "Domain Chair — Energy & Crude Oil", focus: "Crude oil markets, energy security, LNG, refining economics, and transition risk.", tag: "Former senior executive, oil & gas sector" },
  { role: "Senior Fellow — Currency & Monetary Systems", focus: "Central banking behaviour, exchange-rate regimes, sovereign liquidity.", tag: "Former banking-sector professional" },
  { role: "Senior Advisor — Commodities & Strategic Resources", focus: "Mining, metals, rare earths, and commodity-market cycles.", tag: "Commodity-market veteran" },
  { role: "Strategic Fellow — Defense & Aerospace Systems", focus: "Dual-use technology, procurement cycles, strategic deterrence economics.", tag: "Former defense & aerospace professional" },
  { role: "Domain Chair — Banking, Credit & Financial Systems", focus: "Credit cycles, regulatory architecture, systemic risk.", tag: "Former banking & regulatory professional" },
  { role: "Senior Advisor — Technology & Communication Infrastructure", focus: "Telecom, data centers, AI infrastructure, digital systems.", tag: "Digital-infrastructure specialist" },
];

const FOUNDING = [
  { title: "Integrity", copy: "Research free of transactional influence." },
  { title: "Responsibility", copy: "Capital treated as a long-term trust, not a trade." },
  { title: "Disciplined Thinking", copy: "Structure before speculation, always." },
  { title: "Intellectual Independence", copy: "Conclusions follow evidence, not consensus." },
  { title: "Sustainability", copy: "Systems must survive the horizon they're built for." },
  { title: "National Development", copy: "Strategic clarity in service of durable growth." },
  { title: "Ethical Capital Allocation", copy: "Return without extraction." },
];

// ---------------------------------------------------------------------------
// REVEAL HOOK — alternating left / right / up entrance
// ---------------------------------------------------------------------------
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );
    el.querySelectorAll("[data-reveal]").forEach((node) => obs.observe(node));
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function NorestHome() {
  const containerRef = useReveal();

  return (
    <div className="noreste" ref={containerRef}>
      {/* ================= NAV ================= */}
      <header className="nav">
        <div className="nav__inner">
          <div className="nav__mark">
            <span className="nav__mark-glyph">N</span>
            <span className="nav__mark-text">NORESTE</span>
          </div>
          <nav className="nav__links">
            <a href="#domains">Research Domains</a>
            <a href="#difference">Our Difference</a>
            <a href="#philosophy">Philosophy</a>
            <a href="#notes">Intelligence Notes</a>
            <a href="#contact">Access</a>
          </nav>
          <a className="nav__cta" href="#contact">Request Private Consultation</a>
        </div>
      </header>

      {/* ================= SCENE 1 — ORBIT HERO ================= */}
      <section className="hero">
        <div className="hero__bg" style={{ backgroundImage: `url(${IMAGES.heroOrbit})` }} />
        {/* <div className="hero__astronaut" style={{ backgroundImage: `url(${IMAGES.astronaut})`, borderRadius:'50%' }} /> */}
        <div className="hero__vignette" />
        <div className="hero__stars" />

        <div className="hero__content">
          <p className="hero__kicker" data-reveal="up">Precision Research, Reserved for the Few.</p>
          <h1 className="hero__title" data-reveal="up">
            Understanding Structural Shifts
            <br />
            <span>Before Markets Price Them</span>
          </h1>
          <p className="hero__sub" data-reveal="up">
            Noreste delivers confidential, thesis-driven research and strategic advisory across
            global macroeconomics, energy, climate transition, technology, geopolitics and
            long-duration investment themes — for family offices, business groups, institutional
            investors and global Indians seeking clarity beyond market noise.
          </p>
          <div className="hero__actions" data-reveal="up">
            <a href="#domains" className="btn btn--primary">Explore Research Areas</a>
            <a href="#contact" className="btn btn--ghost">Request Private Consultation</a>
          </div>
        </div>

        <div className="hero__coords">28.6139° N · 77.2090° E — ORBITAL DESK</div>
        <div className="hero__scroll">SCROLL <span>↓</span></div>
      </section>

      {/* ================= SCENE 2 — DEEP OCEAN TRANSITION ================= */}
      <section className="ocean">
        <div className="ocean__bg" style={{ backgroundImage: `url(${IMAGES.ocean})` }} />
        <div className="ocean__overlay" />
        <div className="ocean__scan" />
        <div className="ocean__content" data-reveal="up">
          <span className="ocean__eyebrow">Frontier Below</span>
          <h2>We Study Systems From Above — and Below.</h2>
          <p>
            Where orbit reveals the shape of power, the depths reveal the shape of scarcity.
            Rare earths, strategic minerals and resource corridors are mapped with the same
            discipline as capital and policy — near-future realism, not spectacle.
          </p>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="who">
        <div className="who__text" data-reveal="left">
          <span className="eyebrow">Who We Are</span>
          <h2>An Independent Strategic Research House</h2>
          <p>
            Noreste is an independent strategic research house and geo-economic think tank
            focused on long-cycle structural transitions shaping capital, industries and
            civilizations.
          </p>
          <p className="who__lede">Our work combines:</p>
          <ul className="pill-list">
            {["Equity intelligence", "Macroeconomic analysis", "Sectoral deep dives", "Geopolitical research", "ESG realism", "Technological transition studies", "Strategic risk evaluation"].map((t) => (
              <li key={t} style={{cursor:'pointer'}}>{t}</li>
            ))}
          </ul>
          <p className="who__closing">
            We believe serious investing requires more than quarterly earnings interpretation.
            It requires understanding where the world is structurally moving.
          </p>
        </div>
        <div className="who__media" data-reveal="right">
          <img src={IMAGES.desk} alt="Strategic research desk" />
          <div className="who__media-texture" style={{ backgroundImage: `url(${IMAGES.texture})` }} />
        </div>
      </section>

      {/* ================= CORE RESEARCH DOMAINS ================= */}
      <section id="domains" className="domains">
        <div className="section-head" data-reveal="up">
          <span className="eyebrow">Core Research Domains</span>
          <h2>Strategic Domains, Not Retail Sectors</h2>
          <p>Six lenses through which every structural shift is read, cross-referenced and stress-tested.</p>
        </div>

        <div className="domains__grid">
          {DOMAINS.map((d, i) => (
            <article
              className="domain-card"
              key={d.title}
              data-reveal={i % 2 === 0 ? "left" : "right"}
              style={{ transitionDelay: `${(i % 3) * 90}ms`, cursor:'pointer' }}
            >
              <div className="domain-card__img" style={{ backgroundImage: `url(${d.img})` }}>
                <span className="domain-card__n">{d.n}</span>
              </div>
              <div className="domain-card__body">
                <h3>{d.title}</h3>
                <ul>
                  {d.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= OUR DIFFERENCE ================= */}
      <section id="difference" className="difference">
        <div className="difference__bg" style={{ backgroundImage: `url(${IMAGES.mountains})` }} />
        <div className="difference__overlay" />
        <div className="difference__content">
          <span className="eyebrow eyebrow--light" data-reveal="up">Our Difference</span>
          <h2 data-reveal="up">Built on Experience, Not Market Noise</h2>
          <p data-reveal="up">
            Noreste integrates insights from senior domain specialists, policymakers, sector
            veterans, engineers, economists and institutional practitioners who have spent
            decades operating inside critical industries. Our research is strengthened by
            practical understanding — not theoretical commentary alone.
          </p>
          <div className="difference__tags">
            {["Former PSU Leadership", "Central Banking Professionals", "Infrastructure Specialists", "Energy Veterans", "Defense Professionals", "Policy Advisors", "Sector Technologists"].map((t, i) => (
              <span key={t} data-reveal={i % 2 === 0 ? "left" : "right"} style={{cursor:'pointer'}}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRACTITIONER-LED RESEARCH ================= */}
      <section className="practitioners">
        <div className="section-head" data-reveal="up">
          <span className="eyebrow">Senior Fellows &amp; Domain Experts</span>
          <h2>Practitioner-Led Research</h2>
          <p>
            Practical intelligence from professionals who have spent decades inside critical
            sectors — banking, energy, commodities, infrastructure, technology, defense,
            sustainability and strategic resources.
          </p>
        </div>

        <div className="practitioners__body">
          <div className="practitioners__img" data-reveal="left">
            <img src={IMAGES.practitioner} alt="Practitioner-led research boardroom" />
          </div>
          <p className="practitioners__copy" data-reveal="right">
            NORESTE's research model is built around practitioner-led intelligence. Each core
            research domain is guided by senior industry veterans, former institutional leaders,
            sector specialists and experienced professionals who have spent decades inside the
            systems being studied. From energy and commodities to currency systems, banking,
            defense, infrastructure, climate transition, rare earths, technology and global
            macroeconomics, our research is strengthened by people who understand not only
            theory and market data, but execution reality, policy constraints, scalability and
            institutional behaviour.
          </p>
        </div>

        <div className="fellows__grid">
          {FELLOWS.map((f, i) => (
            <div className="fellow-card" key={f.role} data-reveal={i % 2 === 0 ? "left" : "right"} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <span className="fellow-card__tag">{f.tag}</span>
              <h3>{f.role}</h3>
              <p>{f.focus}</p>
            </div>
          ))}
        </div>

        <p className="practitioners__note" data-reveal="up">
          Where market intelligence meets institutional experience — research strengthened by
          those who have built, regulated, financed and operated the systems we study.
        </p>
      </section>

      {/* ================= RESEARCH PHILOSOPHY ================= */}
      <section id="philosophy" className="philosophy">
        <div className="philosophy__bg" style={{ backgroundImage: `url(${IMAGES.delta})` }} />
        <div className="philosophy__overlay" />
        <div className="section-head section-head--light" data-reveal="up">
          <span className="eyebrow eyebrow--light">Research Philosophy</span>
          <h2>How Humanity, Capital and Civilization Adapt</h2>
          <p>Understanding how humanity, capital, technology and civilization adapt under long-cycle structural change.</p>
        </div>
        <ol className="principles">
          {PRINCIPLES.map((p, i) => (
            <li key={p} data-reveal={i % 2 === 0 ? "left" : "right"} style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="principles__index">{String(i + 1).padStart(2, "0")}</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ================= PRIVATE RESEARCH MODEL ================= */}
      <section className="private-model">
        <div className="private-model__text" data-reveal="left">
          <span className="eyebrow">Private Research Model</span>
          <h2>Research Reserved for Serious Capital</h2>
          <p>
            Most Noreste research is produced for private circulation. Public publications are
            intentionally limited to executive synopses and thematic previews. Our detailed work
            remains confidential and is designed for family offices, institutional allocators,
            business groups, strategic investors and global Indian capital networks.
          </p>
        </div>
        <div className="private-model__badge" data-reveal="right">
          <div className="private-model__ring">
            <span>Confidential</span>
            <span>Circulation</span>
          </div>
        </div>
      </section>

      {/* ================= CLIENT SEGMENTS ================= */}
      <section className="segments">
        <div className="section-head" data-reveal="up">
          <span className="eyebrow">We Work With</span>
          <h2>Client Segments</h2>
        </div>
        <div className="segments__row">
          {SEGMENTS.map((s, i) => (
            <span className="segment-chip" key={s} data-reveal={i % 2 === 0 ? "left" : "right"} style={{ transitionDelay: `${(i % 4) * 60}ms`, cursor:'pointer' }}>
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ================= INTELLIGENCE NOTES ================= */}
      <section id="notes" className="notes">
        <div className="section-head" data-reveal="up">
          <span className="eyebrow">Thought Intelligence</span>
          <h2>Intelligence Notes &amp; Strategic Briefings</h2>
          <p>Short. Sharp. Intellectual. Executive summaries, macro notes, thematic insights and structural observations — deliberately limited in volume.</p>
        </div>
        <div className="notes__grid">
          {NOTES.map((n, i) => (
            <article className="note-card" key={n.title} data-reveal={i % 2 === 0 ? "left" : "right"} style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
              <span className="note-card__tag">{n.tag}</span>
              <h3>{n.title}</h3>
              <p>{n.excerpt}</p>
              <span className="note-card__link" style={{cursor:'pointer'}}>Read Synopsis →</span>
            </article>
          ))}
        </div>
      </section>

      {/* ================= ADVISORY & CONSULTING ================= */}
      <section className="advisory">
        <div className="section-head" data-reveal="up">
          <span className="eyebrow">Advisory &amp; Consulting</span>
          <h2>Engagement Beyond the Written Note</h2>
        </div>
        <div className="advisory__grid">
          {SERVICES.map((s, i) => (
            <div className="advisory-chip" key={s} data-reveal={i % 2 === 0 ? "left" : "right"} style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <span className="advisory-chip__n">{String(i + 1).padStart(2, "0")}</span>
              {s}
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOUNDING PRINCIPLES ================= */}
      <section className="founding">
        <div className="section-head section-head--light" data-reveal="up">
          <span className="eyebrow eyebrow--light">Founding Principles</span>
          <h2>Institutional Philosophy, Not Storytelling</h2>
        </div>
        <div className="founding__grid">
          {FOUNDING.map((f, i) => (
            <div className="founding-card" key={f.title} data-reveal={i % 2 === 0 ? "left" : "right"} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <h3>{f.title}</h3>
              <p>{f.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="contact">
        <div className="contact__inner" data-reveal="up">
          <span className="eyebrow">Access</span>
          <h2>Confidential Consultation Request</h2>
          <p>
            Noreste engages by invitation and request. Reach out for an institutional inquiry,
            partnership inquiry, or research collaboration — we respond personally, not through
            an automated pipeline.
          </p>
          <div className="contact__actions">
            <a href="mailto:desk@noreste.in" className="btn btn--primary">Request Private Consultation</a>
            <a href="mailto:research@noreste.in" className="btn btn--ghost">Institutional Inquiry</a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="nav__mark">
            <span className="nav__mark-glyph">N</span>
            <span className="nav__mark-text">NORESTE</span>
          </div>
          <p>A Strategic Research House and Think Tank for Long-Horizon Capital</p>
          <nav className="footer__links">
            <a href="#domains">Research Domains</a>
            <a href="#difference">Our Difference</a>
            <a href="#philosophy">Philosophy</a>
            <a href="#notes">Intelligence Notes</a>
            <a href="#contact">Access</a>
          </nav>
          <p className="footer__fine">© {new Date().getFullYear()} Noreste. One Earth. Shared Destiny.</p>
        </div>
      </footer>
    </div>
  );
}