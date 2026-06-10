import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransition } from "../ui/GSAPWrappers";

export function Layout() {
  return (
    <div className="flex flex-col bg-white text-[#1A1A1A] font-['Jost'] selection:bg-[#1A1A1A] selection:text-white">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
