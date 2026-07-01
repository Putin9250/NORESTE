import React from "react";
import "./CoreDomains.scss";

const DOMAINS = [
  {
    id: "01",
    title: "Energy Transition & Resource Security",
    items: [
      "crude oil",
      "LNG",
      "nuclear",
      "renewables",
      "power infrastructure",
      "grid economics",
      "battery ecosystems",
      "energy storage",
      "hydrogen realism",
      "energy geopolitics",
    ],
  },
  {
    id: "02",
    title: "Climate, Water & Sustainability",
    items: [
      "ESG reality vs narrative",
      "practical climate adaptation",
      "agriculture stress",
      "urban heat economics",
      "water scarcity",
      "carbon economics",
      "climate migration",
      "insurance impacts",
    ],
  },
  {
    id: "03",
    title: "Geo-Economics & Strategic Policy",
    items: [
      "India-China-US dynamics",
      "trade wars",
      "sanctions",
      "currency realignment",
      "sovereign debt",
      "supply chain shifts",
      "manufacturing relocation",
    ],
  },
  {
    id: "04",
    title: "Defense, Aerospace & Strategic Technologies",
    items: [
      "weapon systems",
      "dual-use technologies",
      "drones",
      "cyber warfare",
      "semiconductor geopolitics",
      "satellite infrastructure",
      "space economy",
    ],
  },
  {
    id: "05",
    title: "Future Industries & Long-Cycle Opportunities",
    items: [
      "AI infrastructure",
      "robotics",
      "biotech",
      "rare earths",
      "deep sea exploration",
      "communication infrastructure",
      "logistics transformation",
    ],
  },
  {
    id: "06",
    title: "Capital Markets & Strategic Allocation",
    items: [
      "long-horizon equity themes",
      "sector positioning",
      "valuation asymmetry",
      "institutional positioning",
      "portfolio risk architecture",
    ],
  },
];

export default function CoreDomains() {
  return (
    <section className="core-domains" aria-labelledby="domains-heading">
      <div className="core-domains__container core-domains__container--animate">
        {/* --- Header --- */}
        <div className="core-domains__header">
          <div className="core-domains__eyebrow">
            <span className="core-domains__eyebrow-line" aria-hidden="true" />
            <span className="core-domains__eyebrow-label">
              03 — Core Research Domains
            </span>
            <span className="core-domains__eyebrow-line" aria-hidden="true" />
          </div>
          <h2 id="domains-heading" className="core-domains__heading">
            Where we build <span className="core-domains__heading-accent">structural foresight</span>
          </h2>
          <p className="core-domains__subheading">
            Strategic pillars that define our research agenda — mapped across
            the long-cycle transitions that matter.
          </p>
        </div>

        {/* --- Grid --- */}
        <div className="core-domains__grid">
          {DOMAINS.map((domain, index) => (
            <article
              key={domain.id}
              className="domain-card"
              style={{ animationDelay: `${0.08 * (index + 1)}s` }}
            >
              <header className="domain-card__header">
                <span className="domain-card__number">{domain.id}</span>
                <h3 className="domain-card__title">{domain.title}</h3>
              </header>
              <ul className="domain-card__list">
                {domain.items.map((item, idx) => (
                  <li
                    key={item}
                    className="domain-card__item"
                    style={{ animationDelay: `${0.02 * (idx + 1)}s` }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}