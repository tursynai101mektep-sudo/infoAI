import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-surface">
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block lg:w-64 lg:border-r lg:border-slate-200/80 lg:bg-white">
        <Sidebar />
      </div>

      <div className="lg:pl-64">
        <Topbar />
        <main key={pathname} className="mx-auto max-w-7xl px-4 py-6 animate-fade-up md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}