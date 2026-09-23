import House from './House'
import Garden from './Garden'
import SakuraPetals from './SakuraPetals'
import Lighting from './Lighting'
import Ground from './Ground'

export default function Scene() {
  return (
    <>
      <Lighting />
      <Ground />
      <House />
      <Garden />
      <SakuraPetals />
      <fog attach="fog" args={['#EAF8FF', 30, 80]} />
    </>
  )
}
