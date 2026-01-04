import Hero from "@/components/sections/Hero/Hero"
import { MySkillsSection } from "@/components/sections/skills"
import { SelectedProjectsSection } from "@/components/sections/projects"
import { StatisticsSection } from "@/components/sections/statistics"

function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
    <Hero />
    <MySkillsSection />
    <SelectedProjectsSection />
    <StatisticsSection />
    </div>
  )
}

export default HomePage
