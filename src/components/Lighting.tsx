export default function Lighting() {
  return (
    <>
      {/* Ambient light - warm afternoon */}
      <ambientLight color="#FFF3DD" intensity={1.2} />
      
      {/* Main directional light (sun) */}
      <directionalLight
        color="#FFF1D0"
        intensity={2}
        position={[5, 10, 5]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0001}
      />
      
      {/* Soft fill light */}
      <directionalLight
        color="#B8D9FF"
        intensity={0.4}
        position={[-5, 5, -5]}
      />
      
      {/* Hemisphere light for natural sky/ground color */}
      <hemisphereLight
        args={['#87CEEB', '#7CCB68', 0.3]}
      />
    </>
  )
}
