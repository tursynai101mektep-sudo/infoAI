import { Link } from "react-router-dom";
import { Home as HomeIcon } from "lucide-react";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import CoursePreview from "../components/home/CoursePreview";
import CtaSection from "../components/home/CtaSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <CoursePreview />
      <CtaSection />
      <footer className="mt-8 pb-4 text-center text-xs text-slate-400">
        <Link to="/" className="inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-accent-blue transition-colors">
          <HomeIcon size={12} /> InfoAI — изучай информатику, создавай будущее
        </Link>
      </footer>
    </div>
  );
}