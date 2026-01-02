// layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { Header, Footer } from "@/components/common";
import { ContactSection } from "@/components/sections/contact";
import { TestimonialsSection } from "@/components/sections/testimonials";

export default function MainLayout() {
  return (
    <div className="min-h-screen  flex flex-col">
      <Header />

      <main className="mx-auto max-w-7xl px-4 grow">
        <Outlet />
      </main>
     <section className="bg-section-background">
     <TestimonialsSection />
      <ContactSection />
      <Footer />
     </section>
    </div>
  );
}
