import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import "./Who.scss";

const CAPABILITIES = [
  "Equity Intelligence",
  "Macroeconomic Analysis",
  "Sectoral Deep Dives",
  "Geopolitical Research",
  "ESG Realism",
  "Technological Transition Studies",
  "Strategic Risk Evaluation",
];

// ─── 3D Core ──────────────────────────────────────────
function Core({ reduced }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const wireRef = useRef();
  const rings = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Track mouse on window – works even if canvas has pointer-events:none
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current = { x, y };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speed = reduced ? 0.1 : 0.6;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.08 * speed;
      coreRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    }

    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.06 * speed;
      wireRef.current.rotation.z = Math.sin(t * 0.08) * 0.08;
    }

    rings.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.x += delta * (0.04 + i * 0.02) * speed;
        ring.rotation.y += delta * (0.03 + i * 0.015) * speed;
      }
    });

    // Smooth mouse tracking
    if (groupRef.current) {
      const targetX = mouseRef.current.x * 0.15;
      const targetY = mouseRef.current.y * 0.1;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.4, 4]} />
        <MeshDistortMaterial
          color="#1a2a4a"
          emissive="#c5a059"
          emissiveIntensity={0.08}
          distort={0.3}
          speed={reduced ? 0.3 : 1.2}
          roughness={0.15}
          metalness={0.6}
        />
      </mesh>

      <mesh ref={wireRef} scale={1.15}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color="#c5a059" wireframe transparent opacity={0.15} />
      </mesh>

      {[
        { radius: 2.4, color: "#c5a059", opacity: 0.25 },
        { radius: 2.9, color: "#6b8fa7", opacity: 0.15 },
        { radius: 3.4, color: "#c5a059", opacity: 0.1 },
      ].map((ring, i) => (
        <mesh
          key={i}
          ref={(el) => (rings.current[i] = el)}
          rotation={[Math.PI / 3 + i * 0.3, i * 0.5, 0]}
        >
          <torusGeometry args={[ring.radius, 0.005, 8, 128]} />
          <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} />
        </mesh>
      ))}

      {!reduced && (
        <Sparkles
          count={60}
          scale={5}
          size={1.2}
          speed={0.15}
          color="#c5a059"
          opacity={0.3}
        />
      )}
    </group>
  );
}

// ─── Scene ─────────────────────────────────────────────
function Scene({ reduced }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }} // Let mouse events pass through
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 4, 5]} intensity={0.8} color="#c5a059" />
      <pointLight position={[-4, -3, -4]} intensity={0.4} color="#6b8fa7" />
      <Core reduced={reduced} />
    </Canvas>
  );
}

// ─── Main Component ────────────────────────────────────
const Who = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section className="who" id="about">
      <div className="who__canvas-layer" aria-hidden="true">
        <Scene reduced={reduced} />
      </div>

      <div className="who__container">
        <motion.span
          className="who__eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Noreste
        </motion.span>

        <motion.h2
          className="who__statement"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          An independent strategic research house
          <br className="who__br" />
          and geo-economic think tank focused on
          <br className="who__br" />
          <span className="who__highlight">long-cycle structural transitions</span>
          <br className="who__br" />
          shaping capital, industries, and civilizations.
        </motion.h2>

        <div className="who__ticker" aria-label="Areas of work">
          <div className="who__ticker-track">
            {[...CAPABILITIES, ...CAPABILITIES].map((c, i) => (
              <span className="who__ticker-item" key={i}>
                {c}
                <span className="who__ticker-dot">●</span>
              </span>
            ))}
          </div>
        </div>

        <motion.div
          className="who__quote"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          <div className="who__quote-line" />
          <blockquote>
            “Serious investing requires more than quarterly earnings interpretation.
            It requires understanding <span>where the world is structurally moving</span>.”
          </blockquote>
          <cite>— Noreste Strategic</cite>
        </motion.div>

        <motion.div
          className="who__grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {CAPABILITIES.map((cap, index) => (
            <motion.div
              key={cap}
              className="who__grid-item"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.03 * index }}
            >
              <span className="who__grid-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="who__grid-label">{cap}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Who;