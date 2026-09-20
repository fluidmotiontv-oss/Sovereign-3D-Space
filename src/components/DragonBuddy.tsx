import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PlasmaShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#ff3300') },
    uMouse: { value: new THREE.Vector2(0, 0) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec2 uMouse;
    varying vec2 vUv;
    
    void main() {
      vec2 p = -1.0 + 2.0 * vUv;
      float d = length(p);
      
      float col = 0.0;
      col += sin(d * 10.0 - uTime * 5.0);
      col += sin(p.x * 20.0 + uTime * 2.0);
      col += sin(p.y * 15.0 + uTime * 3.0);
      
      vec3 finalColor = uColor * (0.5 + 0.5 * col);
      float alpha = smoothstep(0.8, 0.2, d);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

const PlasmaSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial 
        args={[PlasmaShaderMaterial]} 
        transparent 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export const DragonBuddy: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 40);
      mouseY.set(e.clientY - 40);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        position: 'fixed',
        zIndex: 1000,
        pointerEvents: 'none',
        width: 80,
        height: 80,
      }}
    >
      <div className="w-full h-full relative">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <PlasmaSphere />
        </Canvas>
        
        {/* Dragon Eyes (Simple) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 pointer-events-none">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_#fff]" />
          <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_#fff]" />
        </div>
      </div>
    </motion.div>
  );
};
