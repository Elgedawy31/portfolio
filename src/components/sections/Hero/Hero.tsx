import { Suspense, lazy } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"

const HeroMobile = lazy(() => import("./HeroMobile"))
const HeroDesktop = lazy(() => import("./HeroDesktop"))

function Hero() {
  const isMobile = useIsMobile()

  return (
    <div className="min-h-screen">
      <Suspense fallback={null}>
        {isMobile ? <HeroMobile /> : <HeroDesktop />}
      </Suspense>
    </div>
  )
}

export default Hero
