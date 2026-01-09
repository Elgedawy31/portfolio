// layouts/MainLayout.tsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "@/components/common";
import { ContactSection } from "@/components/sections/contact";
import { ProfileProvider } from "@/stores/ProfileContext";
import { getEmployeeProfile, type EmployeeProfile } from "@/api/Api";

export default function MainLayout() {
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getEmployeeProfile("AhmedRoyale");
        if (response.success && response.data) {
          setProfile(response.data);
        }
      } catch (err) {
        console.error("Error fetching employee profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ProfileProvider profile={profile}>
      <div className="min-h-screen  flex flex-col">
        <Header />

        <main className=" max-w-7xl grow">
          <Outlet />
        </main>
       <section className="bg-section-background">
       {/* <TestimonialsSection /> */}
        <ContactSection />
        <Footer />
       </section>
      </div>
    </ProfileProvider>
  );
}
