import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";

const Home = lazy(() => import("./pages/Home"));
const Courses = lazy(() => import("./pages/Courses"));
const CodeStudio = lazy(() => import("./pages/CodeStudio"));
const AIAssistant = lazy(() => import("./pages/AI"));
const Tests = lazy(() => import("./pages/Tests"));
const ProgressPage = lazy(() => import("./pages/Progress"));
const Teacher = lazy(() => import("./pages/Teacher"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 shadow-card ring-1 ring-slate-200/80">
        <span className="h-3 w-3 animate-bounce rounded-full bg-primary-400 [animation-delay:0.1s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-accent-blue [animation-delay:0.2s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-accent-violet [animation-delay:0.3s]" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/code" element={<CodeStudio />} />
            <Route path="/ai" element={<AIAssistant />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}