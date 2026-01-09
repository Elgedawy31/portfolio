import { useEffect, useState } from "react"
import Hero from "@/components/sections/Hero/Hero"
import IntroSpotlight from "@/components/sections/Hero/IntroSpotlight"
import { MySkillsSection } from "@/components/sections/skills"
import { SelectedProjectsSection } from "@/components/sections/projects"
import { StatisticsSection } from "@/components/sections/statistics"
import { getEmployeeProfile, type EmployeeProfile } from "@/api/Api"

function HomePage() {
  const [profile, setProfile] = useState<EmployeeProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await getEmployeeProfile("AhmedRoyale")
        if (response.success && response.data) {
          setProfile(response.data)
          console.log("Employee profile data:", response.data)
        } else {
          throw new Error(response.message || "Failed to fetch profile")
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch profile"
        setError(errorMessage)
        console.error("Error fetching employee profile:", err)
      } finally {
        // Only set loading to false after data is received or error occurs
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  // Profile data is available and can be passed to child components
  // Example: <Hero profile={profile} />
  if (profile) {
    // Profile data is loaded and ready to use
    console.log("Profile loaded:", profile)
  }

  return (
    <div className="relative min-h-screen w-full">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-900 dark:text-white font-medium">Loading profile...</span>
          </div>
        </div>
      )}
      {error && !loading && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
          Error: {error}
        </div>
      )}
      <IntroSpotlight
      />
      <Hero />
      <MySkillsSection />
      <SelectedProjectsSection />
      <StatisticsSection />
    </div>
  )
}

export default HomePage
