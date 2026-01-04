import Hero from "@/components/sections/Hero/Hero"
import { MySkillsSection } from "@/components/sections/skills"

function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
    <Hero />
    <MySkillsSection />

    </div>
  )
}

export default HomePage
