import Hero from "@/components/sections/Hero/Hero"
import IntroSpotlight from "@/components/sections/Hero/IntroSpotlight"
import { MySkillsSection } from "@/components/sections/skills"
import { SelectedProjectsSection } from "@/components/sections/projects"
import { StatisticsSection } from "@/components/sections/statistics"
import heroBgV2 from "@/assets/hero-bg-v2.svg"

function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      <IntroSpotlight
        backgroundImage={heroBgV2}
        runOnce={false}
        respectReducedMotion={false}
      />
      <Hero />
      <MySkillsSection />
      <SelectedProjectsSection />
      <StatisticsSection />
    </div>
  )
}

export default HomePage
