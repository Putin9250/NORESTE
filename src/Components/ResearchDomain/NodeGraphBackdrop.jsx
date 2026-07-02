import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NodeGraphBackdrop({ nodeCount = 6 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const nodeColors = [
      0xc5a059, // brass
      0x6b8fa7, // teal
      0x5a6a7b, // steel
      0x8c4a3a, // signal
      0xc5a059,
      0x5a6a7b,
    ];

    const nodes = Array.from({ length: nodeCount }).map((_, i) => {
      const geo = new THREE.SphereGeometry(0.06, 12, 12);
      const mat = new THREE.MeshBasicMaterial({
        color: nodeColors[i % nodeColors.length],
        transparent: true,
        opacity: 0.35,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / nodeCount) * Math.PI * 2 + Math.random() * 0.3;
      const radius = 4 + Math.random() * 2;
      mesh.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3
      );
      mesh.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002
      );
      scene.add(mesh);
      return mesh;
    });

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x5a6a7b,
      transparent: true,
      opacity: 0.04,
    });
    let lineSegments = new THREE.LineSegments(new THREE.BufferGeometry(), lineMat);
    scene.add(lineSegments);

    const maxDist = 6.5;

    function updateLines() {
      const positions = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = nodes[i].position.distanceTo(nodes[j].position);
          if (d < maxDist) {
            positions.push(
              nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
              nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
            );
          }
        }
      }
      lineSegments.geometry.dispose();
      lineSegments.geometry = new THREE.BufferGeometry();
      lineSegments.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
      );
    }

    let rafId;

    function animate() {
      nodes.forEach((n) => {
        n.position.add(n.userData.velocity);
        ['x', 'y', 'z'].forEach((axis) => {
          const bound = axis === 'z' ? 3 : axis === 'y' ? 4 : 7;
          if (Math.abs(n.position[axis]) > bound) {
            n.userData.velocity[axis] *= -1;
          }
        });
      });
      updateLines();
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      nodes.forEach((n) => {
        n.geometry.dispose();
        n.material.dispose();
      });
      lineMat.dispose();
      lineSegments.geometry.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [nodeCount]);

  return <div className="node-graph-backdrop" ref={mountRef} aria-hidden="true" />;
}