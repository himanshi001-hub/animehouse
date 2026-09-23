import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Scene from './components/Scene'

function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#87CEEB] to-[#EAF8FF]">
      <Canvas
        shadows
        camera={{
          position: [14, 9, 16],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        gl={{ antialias: true }}
      >
        <Scene />
        <OrbitControls
          target={[0, 2.5, 0]}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={5}
          maxDistance={40}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
        <p className="text-sm text-gray-700 font-medium">🌸 Anime Sakura House</p>
        <p className="text-xs text-gray-500">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  )
}

export default App
