import Hero from "@/components/sections/Hero/Hero"
import IntroSpotlight from "@/components/sections/Hero/IntroSpotlight"
import { MySkillsSection } from "@/components/sections/skills"
import { SelectedProjectsSection } from "@/components/sections/projects"
import { StatisticsSection } from "@/components/sections/statistics"
import { useProfile } from "@/stores/ProfileContext"

function HomePage() {
  const { profile } = useProfile()
  console.log(profile);
  

  return (
    <div className="relative min-h-screen w-full">
      <IntroSpotlight
      />
      <Hero />
      <MySkillsSection skills={profile?.skills} />
      <SelectedProjectsSection projects={profile?.projects} />
      <StatisticsSection profile={profile} />
    </div>
  )
}

export default HomePage
