import React from "react";
import "./who.scss";

const DISCIPLINES = [
  { bearing: "045.1", label: "Equity Intelligence" },
  { bearing: "045.2", label: "Macroeconomic Analysis" },
  { bearing: "045.3", label: "Sectoral Deep Dives" },
  { bearing: "045.4", label: "Geopolitical Research" },
  { bearing: "045.5", label: "ESG Realism" },
  { bearing: "045.6", label: "Technological Transition Studies" },
  { bearing: "045.7", label: "Strategic Risk Evaluation" },
];

const BearingIcon = () => (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="18.5" className="noreste-intro__bearing-ring" />
    <line x1="20" y1="20" x2="20" y2="4" className="noreste-intro__bearing-tick" />
    <line x1="20" y1="20" x2="30.9" y2="9.1" className="noreste-intro__bearing-needle" />
  </svg>
);

export default function who() {
  return (
    <section className="noreste-intro" aria-labelledby="noreste-intro-heading">
      <div className="noreste-intro__field" aria-hidden="true">
        <span className="noreste-intro__field-line" />
      </div>

      {/* Added an animation container class */}
      <div className="noreste-intro__container noreste-intro__container--animate">
        <div className="noreste-intro__eyebrow">
          <BearingIcon />
          <span>Bearing 045&deg; &mdash; Northeast</span>
        </div>

        <div className="noreste-intro__grid">
          <div className="noreste-intro__lead">
            <h2 id="noreste-intro-heading" className="noreste-intro__heading">
              Noreste is an independent
              <br />
              strategic research house
              <span className="noreste-intro__heading-accent">
                {" "}
                &amp; geo&#8209;economic think tank
              </span>
              .
            </h2>

            <p className="noreste-intro__lede">
              Focused on the long&#8209;cycle structural transitions shaping
              capital, industries, and civilizations.
            </p>

            <p className="noreste-intro__thesis">
              We believe serious investing requires more than quarterly
              earnings interpretation. It requires understanding{" "}
              <em>where the world is structurally moving.</em>
            </p>
          </div>

          <div className="noreste-intro__chart">
            <span className="noreste-intro__chart-label">Our work combines</span>
            <ol className="noreste-intro__list">
              {DISCIPLINES.map((item, index) => (
                <li
                  key={item.bearing}
                  className="noreste-intro__item"
                  style={{ animationDelay: `${0.05 * (index + 1)}s` }}
                >
                  <span className="noreste-intro__item-bearing">{item.bearing}</span>
                  <span className="noreste-intro__item-rule" aria-hidden="true" />
                  <span className="noreste-intro__item-label">{item.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}