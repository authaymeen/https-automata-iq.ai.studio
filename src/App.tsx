import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsCounter from "./components/StatsCounter";
import ServicesGrid from "./components/ServicesGrid";
import InteractiveSimulator from "./components/InteractiveSimulator";
import FeaturedProjects from "./components/FeaturedProjects";
import RoiCalculator from "./components/RoiCalculator";
import ProcessMethodology from "./components/ProcessMethodology";
import RiskFreeWarranty from "./components/RiskFreeWarranty";
import ConsultationBooking from "./components/ConsultationBooking";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background ambient lighting orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] ambient-orb" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] ambient-orb" />
        <div className="absolute -bottom-40 right-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] ambient-orb" />
      </div>

      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Main Page Layout */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <StatsCounter />
          <ServicesGrid />
          <InteractiveSimulator />
          <FeaturedProjects />
          <RoiCalculator />
          <ProcessMethodology />
          <RiskFreeWarranty />
          <ConsultationBooking />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </div>
  );
}
