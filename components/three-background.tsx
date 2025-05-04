"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

function FloatingSphere({ position, size, speed, distort, color }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={0.5}
          roughness={0.4}
          metalness={0.2}
          opacity={0.8}
          transparent
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <FloatingSphere position={[-3, -1, -5]} size={1.5} speed={0.5} distort={0.4} color="#6d28d9" />
      <FloatingSphere position={[4, 2, -6]} size={2} speed={0.3} distort={0.3} color="#8b5cf6" />
      <FloatingSphere position={[-5, 3, -4]} size={1} speed={0.7} distort={0.5} color="#7c3aed" />
      <Environment preset="night" />
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
