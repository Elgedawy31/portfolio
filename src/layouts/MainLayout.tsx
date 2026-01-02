// layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { Header, Footer } from "@/components/common";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-primary text-foreground flex flex-col">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
