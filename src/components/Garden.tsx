import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function StonePath() {
  const stones = useMemo(() => {
    const positions: [number, number, number][] = []
    for (let z = 4.5; z <= 12; z += 0.9) {
      const offsetX = (Math.random() - 0.5) * 0.3
      positions.push([offsetX, 0.05, z])
    }
    return positions
  }, [])

  return (
    <group>
      {stones.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]} receiveShadow>
          <circleGeometry args={[0.3 + Math.random() * 0.15, 6 + Math.floor(Math.random() * 3)]} />
          <meshStandardMaterial color="#B9B0A3" roughness={0.95} />
        </mesh>
      ))}
    </group>
  )
}

function Flower({ position, color }: { position: [number, number, number]; color: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, [])
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.4 + timeOffset) * 0.05
    }
  })

  const petals = useMemo(() => {
    const p = []
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2
      p.push({
        position: [Math.cos(angle) * 0.15, 0.3, Math.sin(angle) * 0.15] as [number, number, number],
        rotation: [0, 0, angle] as [number, number, number]
      })
    }
    return p
  }, [])

  return (
    <group ref={groupRef} position={position}>
      {/* Stem */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 6]} />
        <meshStandardMaterial color="#4A8B3F" roughness={0.8} />
      </mesh>
      
      {/* Petals */}
      {petals.map((petal, i) => (
        <mesh key={i} position={petal.position} rotation={petal.rotation}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
      ))}
      
      {/* Center */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FFD700" roughness={0.5} />
      </mesh>
      
      {/* Leaves */}
      <mesh position={[0.1, 0.1, 0]} rotation={[0, 0, -0.5]}>
        <sphereGeometry args={[0.08, 6, 4]} />
        <meshStandardMaterial color="#5BA84E" roughness={0.8} />
      </mesh>
      <mesh position={[-0.1, 0.08, 0]} rotation={[0, 0, 0.5]}>
        <sphereGeometry args={[0.07, 6, 4]} />
        <meshStandardMaterial color="#5BA84E" roughness={0.8} />
      </mesh>
    </group>
  )
}

function SakuraTree() {
  const leavesRef = useRef<THREE.Group>(null)
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, [])
  
  useFrame(({ clock }) => {
    if (leavesRef.current) {
      leavesRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3 + timeOffset) * 0.02
      leavesRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.2 + timeOffset) * 0.01
    }
  })

  const leafClusters = useMemo(() => {
    const clusters: { position: [number, number, number]; scale: number }[] = []
    // Main canopy
    for (let i = 0; i < 12; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.6
      const r = 1.5 + Math.random() * 1.2
      clusters.push({
        position: [
          Math.sin(phi) * Math.cos(theta) * r,
          5.5 + Math.cos(phi) * r * 0.7 + Math.random() * 0.5,
          Math.sin(phi) * Math.sin(theta) * r
        ],
        scale: 0.8 + Math.random() * 0.6
      })
    }
    return clusters
  }, [])

  return (
    <group position={[-6, 0, 3]}>
      {/* Trunk */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.35, 3, 8]} />
        <meshStandardMaterial color="#6B4535" roughness={0.9} />
      </mesh>
      
      {/* Main branches */}
      <mesh position={[0.3, 3.5, 0]} rotation={[0, 0, 0.4]} castShadow>
        <cylinderGeometry args={[0.08, 0.15, 2.5, 6]} />
        <meshStandardMaterial color="#6B4535" roughness={0.9} />
      </mesh>
      <mesh position={[-0.4, 3.8, 0.2]} rotation={[0.2, 0, -0.5]} castShadow>
        <cylinderGeometry args={[0.06, 0.12, 2, 6]} />
        <meshStandardMaterial color="#6B4535" roughness={0.9} />
      </mesh>
      <mesh position={[0.1, 4, -0.3]} rotation={[-0.3, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.06, 0.1, 1.8, 6]} />
        <meshStandardMaterial color="#6B4535" roughness={0.9} />
      </mesh>
      
      {/* Leaf clusters (sakura blossoms) */}
      <group ref={leavesRef}>
        {leafClusters.map((cluster, i) => (
          <mesh key={i} position={cluster.position} castShadow>
            <sphereGeometry args={[cluster.scale * 0.6, 8, 8]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#FFB7C5' : i % 3 === 1 ? '#FFC8D6' : '#FFA5B8'}
              roughness={0.7}
            />
          </mesh>
        ))}
      </group>
      
      {/* Tree base/roots */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 0.2, 8]} />
        <meshStandardMaterial color="#5A3A2A" roughness={0.95} />
      </mesh>
    </group>
  )
}

function GrassBlades() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const count = 200
  
  const { matrices, offsets } = useMemo(() => {
    const matrices: THREE.Matrix4[] = []
    const offsets: number[] = []
    const tempMatrix = new THREE.Matrix4()
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30
      const z = (Math.random() - 0.5) * 30
      
      // Skip area near house
      if (Math.abs(x) < 6 && Math.abs(z) < 5) continue
      
      tempMatrix.makeTranslation(x, 0.15, z)
      tempMatrix.multiply(new THREE.Matrix4().makeScale(0.05, 0.2 + Math.random() * 0.2, 0.05))
      matrices.push(tempMatrix.clone())
      offsets.push(Math.random() * Math.PI * 2)
    }
    return { matrices, offsets }
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const tempMatrix = new THREE.Matrix4()
    const tempPosition = new THREE.Vector3()
    const tempQuaternion = new THREE.Quaternion()
    const tempScale = new THREE.Vector3()
    
    for (let i = 0; i < matrices.length; i++) {
      matrices[i].decompose(tempPosition, tempQuaternion, tempScale)
      const sway = Math.sin(clock.elapsedTime * 0.4 + offsets[i]) * 0.1
      tempMatrix.makeTranslation(tempPosition.x, tempPosition.y, tempPosition.z)
      tempMatrix.multiply(new THREE.Matrix4().makeRotationZ(sway))
      tempMatrix.multiply(new THREE.Matrix4().makeScale(tempScale.x, tempScale.y, tempScale.z))
      meshRef.current.setMatrixAt(i, tempMatrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, matrices.length]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#5BA84E" roughness={0.8} />
    </instancedMesh>
  )
}

export default function Garden() {
  return (
    <group>
      <StonePath />
      
      {/* Flowers */}
      <Flower position={[-5, 0.2, 5]} color="#FF9FB2" />
      <Flower position={[5, 0.2, 6]} color="#FFD86B" />
      <Flower position={[-4, 0.2, 9]} color="#C5A3FF" />
      <Flower position={[4, 0.2, 8]} color="#FF9FB2" />
      <Flower position={[-3, 0.2, 7]} color="#FFD86B" />
      <Flower position={[6, 0.2, 4]} color="#C5A3FF" />
      
      {/* Sakura tree */}
      <SakuraTree />
      
      {/* Grass blades */}
      <GrassBlades />
      
      {/* Small bushes */}
      <mesh position={[5.5, 0.4, 3]} castShadow>
        <sphereGeometry args={[0.6, 8, 8]} />
        <meshStandardMaterial color="#5BA84E" roughness={0.8} />
      </mesh>
      <mesh position={[5.8, 0.35, 3.5]} castShadow>
        <sphereGeometry args={[0.45, 8, 8]} />
        <meshStandardMaterial color="#4A8B3F" roughness={0.8} />
      </mesh>
      <mesh position={[-5.5, 0.35, -2]} castShadow>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="#5BA84E" roughness={0.8} />
      </mesh>
    </group>
  )
}
