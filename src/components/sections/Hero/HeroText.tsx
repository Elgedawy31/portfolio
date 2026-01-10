import { Motion } from "@/motion/Motion"

interface HeroTextProps {
  show: boolean
  isIntroFinished: boolean
}

function HeroText({ show, isIntroFinished }: HeroTextProps) {
  if (!show) return null

  return (
    <Motion show={isIntroFinished} variant="fadeDown" className="mb-4">
      <h2 className="text-white text-2xl font-bold uppercase">
        GET WHAT YOU NEED
      </h2>
    </Motion>
  )
}

export default HeroText

