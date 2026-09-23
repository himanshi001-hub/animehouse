import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PetalData {
  position: THREE.Vector3
  velocity: THREE.Vector3
  rotation: THREE.Euler
  rotationSpeed: THREE.Vector3
  scale: number
  color: string
}

export default function SakuraPetals() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const count = 80
  
  const petals = useMemo<PetalData[]>(() => {
    const colors = ['#FFB7C5', '#FFC8D6', '#FFA5B8', '#FFD1DC', '#FFE0E8']
    const data: PetalData[] = []
    
    for (let i = 0; i < count; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 25,
          Math.random() * 15 + 3,
          (Math.random() - 0.5) * 25
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          -0.3 - Math.random() * 0.3,
          (Math.random() - 0.5) * 0.3
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ),
        scale: 0.08 + Math.random() * 0.06,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    return data
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const colorArray = useMemo(() => {
    const arr = new Float32Array(count * 3)
    const colors = ['#FFB7C5', '#FFC8D6', '#FFA5B8', '#FFD1DC', '#FFE0E8']
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)])
      arr[i * 3] = color.r
      arr[i * 3 + 1] = color.g
      arr[i * 3 + 2] = color.b
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    
    const time = clock.elapsedTime
    
    for (let i = 0; i < count; i++) {
      const petal = petals[i]
      
      // Update position
      petal.position.x += petal.velocity.x * 0.016 + Math.sin(time * 0.5 + i) * 0.005
      petal.position.y += petal.velocity.y * 0.016
      petal.position.z += petal.velocity.z * 0.016 + Math.cos(time * 0.3 + i) * 0.005
      
      // Update rotation
      petal.rotation.x += petal.rotationSpeed.x * 0.016
      petal.rotation.y += petal.rotationSpeed.y * 0.016
      petal.rotation.z += petal.rotationSpeed.z * 0.016
      
      // Reset if below ground
      if (petal.position.y < -0.5) {
        petal.position.set(
          (Math.random() - 0.5) * 25,
          10 + Math.random() * 5,
          (Math.random() - 0.5) * 25
        )
        petal.velocity.set(
          (Math.random() - 0.5) * 0.3,
          -0.3 - Math.random() * 0.3,
          (Math.random() - 0.5) * 0.3
        )
      }
      
      // Apply transform
      dummy.position.copy(petal.position)
      dummy.rotation.copy(petal.rotation)
      dummy.scale.setScalar(petal.scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow>
      <planeGeometry args={[1, 0.7]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </planeGeometry>
      <meshStandardMaterial
        vertexColors
        side={THREE.DoubleSide}
        transparent
        opacity={0.85}
        roughness={0.5}
      />
    </instancedMesh>
  )
}
