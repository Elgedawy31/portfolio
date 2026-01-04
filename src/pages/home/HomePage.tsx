import Hero from "@/components/sections/Hero/Hero"
import { MySkillsSection } from "@/components/sections/skills"
import { SelectedProjectsSection } from "@/components/sections/projects"

function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
    <Hero />
    <MySkillsSection />
    <SelectedProjectsSection />
    </div>
  )
}

export default HomePage
