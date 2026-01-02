// layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { Header, Footer } from "@/components/common";
import { ContactSection } from "@/components/sections/contact";
import { TestimonialsSection } from "@/components/sections/testimonials";

export default function MainLayout() {
  return (
    <div className="min-h-screen  flex flex-col">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 grow">
        <Outlet />
      </main>
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
