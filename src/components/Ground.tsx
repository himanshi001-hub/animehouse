import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Ground() {
  const grassRef = useRef<THREE.Mesh>(null)
  
  return (
    <group>
      {/* Main ground plane */}
      <mesh
        ref={grassRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[60, 60, 32, 32]} />
        <meshStandardMaterial
          color="#7CCB68"
          roughness={0.9}
        />
      </mesh>
      
      {/* Subtle ground variation - darker patches */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
        receiveShadow
      >
        <circleGeometry args={[30, 32]} />
        <meshStandardMaterial
          color="#6DB85A"
          roughness={1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}
