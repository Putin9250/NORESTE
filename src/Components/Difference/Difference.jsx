import React from 'react';
import { motion } from 'framer-motion';
import './Difference.scss';

const ROSTER_ROW_1 = [
  { name: 'Former PSU Leadership', role: 'Senior Research Advisor' },
  { name: 'Central Banking Professionals', role: 'Strategic Fellow' },
  { name: 'Infrastructure Specialists', role: 'Domain Expert' },
  { name: 'Energy Veterans', role: 'Industry Specialist' },
];

const ROSTER_ROW_2 = [
  { name: 'Defense Professionals', role: 'Strategic Fellow' },
  { name: 'Policy Advisors', role: 'Senior Research Advisor' },
  { name: 'Sector Technologists', role: 'Domain Expert' },
  { name: 'Institutional Practitioners', role: 'Industry Specialist' },
];

function RosterRow({ items, direction = 'left', speed = 32 }) {
  // Duplicate the list so the CSS-driven loop is seamless.
  const doubled = [...items, ...items];
  return (
    <div className="our-difference__roster-row" data-direction={direction}>
      <div
        className="our-difference__roster-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <div className="our-difference__roster-card" key={`${item.name}-${i}`}>
            <span className="our-difference__roster-role">{item.role}</span>
            <span className="our-difference__roster-name">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Difference() {
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
    }),
  };

  return (
    <section className="our-difference">
      {/* ─── Message Panel ─────────────────────────────── */}
      <div className="our-difference__message">
        <motion.span
          className="our-difference__eyebrow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          custom={0}
          variants={itemVariants}
        >
          Our Difference
        </motion.span>

        <motion.h2
          className="our-difference__heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={1}
          variants={itemVariants}
        >
          Built on Experience,
          <br />
          Not Market Noise
        </motion.h2>

        <motion.p
          className="our-difference__copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={2}
          variants={itemVariants}
        >
          Noreste integrates insights from senior domain specialists,
          policymakers, sector veterans, engineers, economists, and
          institutional practitioners who have spent decades operating
          inside critical industries. Our research is strengthened by
          practical understanding — not theoretical commentary alone.
        </motion.p>

        <motion.div
          className="our-difference__divider"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={3}
          variants={itemVariants}
        />
      </div>

      {/* ─── Roster Panel ───────────────────────────────── */}
      <div className="our-difference__roster" aria-label="Advisory roster">
        <RosterRow items={ROSTER_ROW_1} direction="left" speed={34} />
        <RosterRow items={ROSTER_ROW_2} direction="right" speed={40} />
      </div>
    </section>
  );
}

export default Difference;