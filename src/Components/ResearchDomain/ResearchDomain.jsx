import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ResearchDomain.scss";

const AUTOPLAY_MS = 5000;

const DOMAINS = [
  {
    code: "ENR",
    title: "Energy Transition & Resource Security",
    description:
      "Physical molecules, grid economics, and geopolitical friction — tracking the real transition from crude to hydrogen, and every kilowatt in between.",
    tags: ["Crude Oil", "LNG", "Nuclear", "Renewables", "Hydrogen"],
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1000&h=700&fit=crop",
  },
  {
    code: "CLM",
    title: "Climate, Water & Sustainability",
    description:
      "Real economic exposure: agricultural stress, urban heat, water scarcity, and the cascading effects on insurance and capital.",
    tags: [
      "Climate Adaptation",
      "Water Scarcity",
      "Carbon Economics",
      "Migration",
    ],
    image:
      "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=1000&h=700&fit=crop",
  },
  {
    code: "GEO",
    title: "Geo-Economics & Strategic Policy",
    description:
      "Trade wars, sanctions, currency shifts, and manufacturing relocation — mapping how policy becomes P&L.",
    tags: ["Trade Wars", "Sanctions", "Currency", "Supply Chain"],
    image:
      "https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=1000&h=700&fit=crop",
  },
  {
    code: "DEF",
    title: "Defense, Aerospace & Strategic Technologies",
    description:
      "Dual-use technology, semiconductor sovereignty, satellite constellations, and the widening space economy.",
    tags: ["Weapon Systems", "Cyber Warfare", "Semiconductors", "Space"],
    image:
      "https://tse3.mm.bing.net/th/id/OIP.7_A05v-lPt9D0vZzz5154QHaFG?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    code: "FUT",
    title: "Future Industries & Long-Cycle Opportunities",
    description:
      "AI infrastructure, robotics, biotech, and rare earths — long-cycle bets the market is still mispricing.",
    tags: ["AI Infrastructure", "Robotics", "Biotech", "Rare Earths"],
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1000&h=700&fit=crop",
  },
  {
    code: "CAP",
    title: "Capital Markets & Strategic Allocation",
    description:
      "Translating macro and sectoral insight into positioning, sizing, and portfolio architecture.",
    tags: ["Equity Themes", "Sector Positioning", "Risk Architecture"],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&h=700&fit=crop",
  },
];

function ResearchDomain() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);
  const total = DOMAINS.length;

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return undefined;
    timeoutRef.current = setTimeout(advance, AUTOPLAY_MS);
    return () => clearTimeout(timeoutRef.current);
  }, [activeIndex, isPaused, advance]);

  const selectDomain = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  const active = DOMAINS[activeIndex];

  // ─── Stronger Animation Variants ────────────────────────
  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 0.96,
      y: 20,
    },
    center: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const imageVariants = {
    enter: {
      scale: 1.08,
      opacity: 0,
    },
    center: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      scale: 1.08,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.04,
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    }),
  };

  const progressVariants = {
    initial: { scaleX: 0 },
    animate: {
      scaleX: 1,
      transition: {
        duration: AUTOPLAY_MS / 1000,
        ease: "linear",
      },
    },
    exit: {
      scaleX: 0,
      transition: { duration: 0 },
    },
  };

  return (
    <section className="research-domains">
      <div className="research-domains__container">
        {/* ─── Header with Scroll Animation ──────────────── */}
        <motion.div
          className="research-domains__header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="research-domains__eyebrow">Research Focus</span>
          <h2 className="research-domains__title">Core Research Domains</h2>
          <p className="research-domains__subtitle">
            Mapping the structural transitions that reshape capital, industries,
            and civilizations.
          </p>
        </motion.div>

        {/* ─── Panel with Scroll Animation ───────────────── */}
        <motion.div
          className="research-domains__panel"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          viewport={{ once: true, amount: 0.15 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ─── Coverage Index ─────────────────────────── */}
          <nav
            className="research-domains__index"
            aria-label="Research domain index"
          >
            {DOMAINS.map((domain, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.button
                  key={domain.code}
                  className={`research-domains__index-item${isActive ? " is-active" : ""}`}
                  onClick={() => selectDomain(index)}
                  aria-current={isActive}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="research-domains__index-code">
                    {domain.code}
                  </span>
                  <span className="research-domains__index-label">
                    {domain.title}
                  </span>
                  {isActive && (
                    <motion.span
                      key={`progress-${activeIndex}`}
                      className="research-domains__index-progress"
                      variants={progressVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* ─── Active Domain Display ──────────────────── */}
          <div className="research-domains__stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.code}
                className="research-domains__slide"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.div
                  className="research-domains__slide-image"
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <img src={active.image} alt={active.title} loading="lazy" />
                  <div className="research-domains__slide-overlay" />
                  <span className="research-domains__slide-code">
                    {active.code}
                  </span>

                  {/* ─── Glow accent ────────────────────── */}
                  <div className="research-domains__slide-glow" />
                </motion.div>

                <motion.div
                  className="research-domains__slide-content"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h3
                    variants={itemVariants}
                    className="research-domains__slide-title"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    variants={itemVariants}
                    className="research-domains__slide-description"
                  >
                    {active.description}
                  </motion.p>
                  <motion.div className="research-domains__slide-tags">
                    {active.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        className="research-domains__slide-tag"
                        custom={i}
                        variants={tagVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* ─── Ambient particle overlay ────────────── */}
            <div className="research-domains__particles" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ResearchDomain;
