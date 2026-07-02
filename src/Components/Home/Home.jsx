import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { BufferGeometry, Float32BufferAttribute, Color, DoubleSide } from "three";
import { motion } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import { FaGlobe, FaFileAlt, FaUsers, FaBullseye, FaArrowRight } from "react-icons/fa";
import "./Home.scss";
import Connecter from './Connecter'; // your custom lorem component

// ──────────────────────────────────────
// SEO & Content Config
// ──────────────────────────────────────
const SEO = {
  title: "Noreste Strategic | Understanding Structural Shifts Before Markets Price Them",
  description:
    "Noreste delivers confidential, thesis-driven research and strategic advisory across global macroeconomics, energy, climate transition, technology, geopolitics, and long-duration investment themes.",
  url: "https://www.norestestrategic.com/",
  image: "https://www.norestestrategic.com/og-image.jpg",
  siteName: "Noreste Strategic",
  twitterHandle: "@norestestrategic",
};

const NAV_LINKS = [
  { label: "Research", href: "/research" },
  { label: "Insights", href: "/insights" },
  { label: "Advisory", href: "/advisory" },
];

const UTILITY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const FOOTER_LINKS = [
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

const FLOATING_TAGS = [
  { label: "Geopolitics", position: "top-left" },
  { label: "Capital", position: "top-right" },
  { label: "Policy", position: "bottom-left" },
  { label: "Intelligence", position: "bottom-right" },
];

const STATS = [
  { icon: FaGlobe, value: "190+", label: "Countries Covered" },
  { icon: FaFileAlt, value: "250+", label: "Strategic Reports" },
  { icon: FaUsers, value: "45", label: "Regional Experts" },
  { icon: FaBullseye, value: "24/7", label: "Global Monitoring" },
];

// ──────────────────────────────────────
// 3D Rotating Globe Component
// ──────────────────────────────────────
const RotatingGlobe = () => {
  const earthRef = useRef();
  const ringRefs = useRef([]);
  const globeSpeed = 0.15;

  const pointsGeometry = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new Color("#cba558");

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.2;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
    return geometry;
  }, []);

  useEffect(() => () => pointsGeometry.dispose(), [pointsGeometry]);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += globeSpeed * 0.01;
    }
    ringRefs.current.forEach((r, i) => {
      if (r) {
        r.rotation.x = Math.sin(Date.now() * 0.0002 + i) * 0.1;
        r.rotation.z = Math.cos(Date.now() * 0.0002 + i) * 0.1;
      }
    });
  });

  return (
    <group>
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#0b1320"
          emissive="#111e33"
          roughness={0.5}
          metalness={0.3}
          emissiveIntensity={0.2}
        />
      </Sphere>
      <points geometry={pointsGeometry}>
        <pointsMaterial size={0.08} transparent opacity={0.8} blending={2} depthWrite={false} vertexColors />
      </points>
      <mesh ref={(el) => (ringRefs.current[0] = el)}>
        <ringGeometry args={[2.6, 2.65, 64]} />
        <meshBasicMaterial color="#cba558" transparent opacity={0.15} side={DoubleSide} />
      </mesh>
      <mesh ref={(el) => (ringRefs.current[1] = el)} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[2.8, 2.85, 64]} />
        <meshBasicMaterial color="#cba558" transparent opacity={0.1} side={DoubleSide} />
      </mesh>
      <mesh ref={(el) => (ringRefs.current[2] = el)} rotation={[0, Math.PI / 2, Math.PI / 4]}>
        <ringGeometry args={[3.0, 3.05, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={DoubleSide} />
      </mesh>
    </group>
  );
};

// ──────────────────────────────────────
// JSON‑LD Structured Data
// ──────────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SEO.siteName,
  url: SEO.url,
  logo: `${SEO.url}logo.png`,
  description: SEO.description,
  sameAs: [],
};

// ──────────────────────────────────────
// Main Home Component
// ──────────────────────────────────────
const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis;
    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      if (prefersReducedMotion) {
        tl.set(
          [
            ".home__nav",
            ".home__hero-heading",
            ".home__hero-supporting",
            ".home__hero-cta",
            ".home__feature",
            ".stats-bar .stat-item"
          ],
          { opacity: 1, x: 0, y: 0 }
        );
      } else {
        tl.from(".home__nav", { y: -50, opacity: 0, duration: 1 })
          .from(".home__hero-heading", { y: 50, opacity: 0, duration: 1.2 }, "-=0.8")
          .from(".home__hero-supporting", { y: 30, opacity: 0, duration: 1 }, "-=0.8")
          .from(".home__hero-cta", { y: 20, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.6")
          .from(".home__feature", { x: -50, opacity: 0, stagger: 0.15, duration: 1 }, "-=0.8")
          .from(".stats-bar .stat-item", { y: 30, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.5");
      }
    }, rootRef);

    return () => {
      lenis?.destroy();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const handler = (e) => e.matches && setMenuOpen(false);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="home" ref={rootRef}>
      <Helmet>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <link rel="canonical" href={SEO.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:url" content={SEO.url} />
        <meta property="og:image" content={SEO.image} />
        <meta property="og:site_name" content={SEO.siteName} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.title} />
        <meta name="twitter:description" content={SEO.description} />
        <meta name="twitter:image" content={SEO.image} />
        {SEO.twitterHandle && <meta name="twitter:site" content={SEO.twitterHandle} />}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Background layers */}
      <div className="home__bg-split" aria-hidden="true" />
      <div className="home__bg-number" aria-hidden="true">{new Date().getFullYear()}</div>
      <div className="home__bg-letter" aria-hidden="true">N</div>

      {/* 3D Globe Canvas */}
      <div className="home__globe-canvas" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <RotatingGlobe />
        </Canvas>
      </div>

      {/* Navbar */}
      <header className="home__nav">
        <div className="home__nav-left">
          <Link to="/" className="home__logo">NORESTE</Link>
          <ul className="home__nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}><Link to={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="home__nav-right">
          <Link to="/institutional-access" className="home__nav-access">Institutional Access</Link>
          {UTILITY_LINKS.map((link) => (
            <Link key={link.label} to={link.href}>{link.label}</Link>
          ))}
          <button
            className={`home__hamburger${menuOpen ? " home__hamburger--open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div className={`home__mobile-menu${menuOpen ? " home__mobile-menu--open" : ""}`}>
        <button className="home__mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
        <ul>
          {[...NAV_LINKS, { label: "Institutional Access", href: "/institutional-access" }, ...UTILITY_LINKS].map((link) => (
            <li key={link.label}>
              <Link to={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Hero Section (new copy) */}
      <section className="home__hero">
        <div className="home__hero-content">
          <h1 className="home__hero-heading">
            Understanding Structural Shifts
            <br />
            Before Markets Price Them
          </h1>
          <p className="home__hero-supporting">
            Noreste delivers confidential, thesis-driven research and strategic advisory across
            global macroeconomics, energy, climate transition, technology, geopolitics, and
            long-duration investment themes.
            <br />
            We work with family offices, business groups, institutional investors, and global
            Indians seeking clarity beyond market noise.
          </p>
          <div className="home__hero-cta">
            <motion.a
              href="/research"
              className="home__btn home__btn--primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Research Areas <FaArrowRight style={{ marginLeft: "0.5rem" }} />
            </motion.a>
            <motion.a
              href="/contact"
              className="home__btn home__btn--secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Request Private Consultation
            </motion.a>
          </div>
        </div>

        {/* Mobile badges (visible only on small screens) */}
        <div className="home__feature-mobile">
          {FLOATING_TAGS.map((tag) => (
            <span key={tag.label} className="home__feature-mobile-badge">{tag.label}</span>
          ))}
        </div>

        {/* Desktop floating tags (fixed position) */}
        {FLOATING_TAGS.map((tag) => (
          <div key={tag.label} className={`home__feature home__feature--${tag.position}`}>
            {tag.position.endsWith("left") ? (
              <>
                <span>{tag.label}</span>
                <div className="home__feature-line" />
              </>
            ) : (
              <>
                <div className="home__feature-line" />
                <span>{tag.label}</span>
              </>
            )}
          </div>
        ))}
      </section>

      {/* Stats Bar */}
      <section className="stats-bar" aria-label="Key figures">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div className="stat-item" key={label}>
            <div className="icon-wrapper"><Icon aria-hidden="true" /></div>
            <div className="info">
              <h3>{value}</h3>
              <p>{label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Additional Content (Lorem) */}
      <section className="home__lorem-section">
        <Connecter />
      </section>

      {/* Footer */}
      <footer className="home__footer">
        <p>© {new Date().getFullYear()} NORESTE STRATEGIC. All rights reserved.</p>
        <ul className="home__footer-links">
          {FOOTER_LINKS.map((link) => (
            <li key={link.label}><Link to={link.href}>{link.label}</Link></li>
          ))}
        </ul>
      </footer>
    </div>
  );
};

export default Home;