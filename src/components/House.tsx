import { useMemo } from 'react'
import * as THREE from 'three'

function GableRoof() {
  const roofGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    // Cross-section of the roof (triangle)
    shape.moveTo(-5.5, 0)
    shape.lineTo(0, 3)
    shape.lineTo(5.5, 0)
    shape.lineTo(-5.5, 0)

    const extrudeSettings = {
      depth: 9,
      bevelEnabled: false,
    }
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geo.center()
    return geo
  }, [])

  return (
    <group position={[0, 4.25, 0]}>
      {/* Main roof */}
      <mesh geometry={roofGeometry} castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#D96B63" roughness={0.7} />
      </mesh>
      
      {/* Roof edge trim - front */}
      <mesh position={[0, 0.05, 4.55]} castShadow>
        <boxGeometry args={[11.2, 0.15, 0.15]} />
        <meshStandardMaterial color="#B85C52" roughness={0.6} />
      </mesh>
      
      {/* Roof edge trim - back */}
      <mesh position={[0, 0.05, -4.55]} castShadow>
        <boxGeometry args={[11.2, 0.15, 0.15]} />
        <meshStandardMaterial color="#B85C52" roughness={0.6} />
      </mesh>
      
      {/* Roof ridge */}
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[0.3, 0.2, 9.2]} />
        <meshStandardMaterial color="#C45A52" roughness={0.6} />
      </mesh>
    </group>
  )
}

function SlidingDoor() {
  return (
    <group position={[0, 1.75, 4.01]}>
      {/* Door frame */}
      <mesh castShadow>
        <boxGeometry args={[2.4, 3.6, 0.12]} />
        <meshStandardMaterial color="#6B4535" roughness={0.8} />
      </mesh>
      
      {/* Left glass panel */}
      <mesh position={[-0.55, 0, 0.02]}>
        <boxGeometry args={[1.0, 3.3, 0.06]} />
        <meshStandardMaterial
          color="#BFE7E8"
          transparent
          opacity={0.75}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      
      {/* Right glass panel */}
      <mesh position={[0.55, 0, 0.02]}>
        <boxGeometry args={[1.0, 3.3, 0.06]} />
        <meshStandardMaterial
          color="#BFE7E8"
          transparent
          opacity={0.75}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      
      {/* Center divider */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.08, 3.3, 0.08]} />
        <meshStandardMaterial color="#6B4535" roughness={0.8} />
      </mesh>
      
      {/* Horizontal divider */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[2.2, 0.08, 0.08]} />
        <meshStandardMaterial color="#6B4535" roughness={0.8} />
      </mesh>
      
      {/* Handle */}
      <mesh position={[0.3, 0, 0.08]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#C4A44A" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Door step */}
      <mesh position={[0, -1.85, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.15, 0.8]} />
        <meshStandardMaterial color="#B9B0A3" roughness={0.9} />
      </mesh>
    </group>
  )
}

function Window({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Window frame */}
      <mesh castShadow>
        <boxGeometry args={[2.4, 2.2, 0.12]} />
        <meshStandardMaterial color="#6B4535" roughness={0.8} />
      </mesh>
      
      {/* Glass */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[2.1, 1.9, 0.06]} />
        <meshStandardMaterial
          color="#B8E5F2"
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      
      {/* Cross divider - vertical */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.07, 1.9, 0.07]} />
        <meshStandardMaterial color="#6B4535" roughness={0.8} />
      </mesh>
      
      {/* Cross divider - horizontal */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[2.1, 0.07, 0.07]} />
        <meshStandardMaterial color="#6B4535" roughness={0.8} />
      </mesh>
      
      {/* Window sill */}
      <mesh position={[0, -1.15, 0.15]} castShadow>
        <boxGeometry args={[2.6, 0.1, 0.35]} />
        <meshStandardMaterial color="#6B4535" roughness={0.8} />
      </mesh>
    </group>
  )
}

function Chimney() {
  return (
    <group position={[3, 6.5, -1]}>
      <mesh castShadow>
        <boxGeometry args={[0.8, 2, 0.8]} />
        <meshStandardMaterial color="#B85C52" roughness={0.8} />
      </mesh>
      {/* Chimney cap */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[1.0, 0.15, 1.0]} />
        <meshStandardMaterial color="#8B4040" roughness={0.7} />
      </mesh>
    </group>
  )
}

export default function House() {
  return (
    <group>
      {/* Foundation */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[10.5, 0.5, 8.5]} />
        <meshStandardMaterial color="#D8D1C5" roughness={0.9} />
      </mesh>
      
      {/* Walls */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[10, 4, 8]} />
        <meshStandardMaterial color="#FFF4DC" roughness={0.8} />
      </mesh>
      
      {/* Roof */}
      <GableRoof />
      
      {/* Sliding door - front center */}
      <SlidingDoor />
      
      {/* Windows - front */}
      <Window position={[-3.2, 2.5, 4.05]} />
      <Window position={[3.2, 2.5, 4.05]} />
      
      {/* Side windows */}
      <Window position={[5.05, 2.5, -1]} />
      <Window position={[-5.05, 2.5, -1]} />
      
      {/* Chimney */}
      <Chimney />
      
      {/* Decorative beam under roof - front */}
      <mesh position={[0, 4.3, 4.1]} castShadow>
        <boxGeometry args={[10.2, 0.2, 0.15]} />
        <meshStandardMaterial color="#6B4535" roughness={0.8} />
      </mesh>
      
      {/* Decorative beam under roof - back */}
      <mesh position={[0, 4.3, -4.1]} castShadow>
        <boxGeometry args={[10.2, 0.2, 0.15]} />
        <meshStandardMaterial color="#6B4535" roughness={0.8} />
      </mesh>
    </group>
  )
}
