// layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { Header, Footer } from "@/components/common";
import { ContactSection } from "@/components/sections/contact";

export default function MainLayout() {
  return (
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
  );
}
