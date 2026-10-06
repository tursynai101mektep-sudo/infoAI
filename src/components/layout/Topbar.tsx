import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, Flame, Bot, X } from "lucide-react";
import Sidebar from "./Sidebar";
import { PROGRESS } from "../../data/progress";

const TITLES: Record<string, string> = {
  "/": "Главная",
  "/courses": "Курсы",
  "/code": "Код-студия",
  "/ai": "AI-наставник",
  "/tests": "Тесты",
  "/progress": "Прогресс",
  "/teacher": "Панель учителя",
  "/profile": "Профиль",
};

export default function Topbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const title = TITLES[pathname] ?? "InfoAI";

  const submitSearch = () => {
    if (!search.trim()) return;
    navigate("/ai");
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-slate-200/80 bg-surface/80 px-4 backdrop-blur-md md:px-6">
        <button
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-ink shadow-card transition hover:bg-slate-50 lg:hidden"
          aria-label="Открыть меню"
        >
          <Menu size={20} />
        </button>

        <div className="lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 via-accent-blue to-accent-violet">
              <Bot size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-ink">
              Info<span className="text-gradient">AI</span>
            </span>
          </Link>
        </div>

        <div className="hidden items-center text-sm text-slate-400 lg:flex">
          <span className="font-display text-lg font-bold text-ink">{title}</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitSearch();
            }}
            className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-card transition focus-within:border-accent-blue md:flex"
          >
            <Search size={16} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Искать темы, задачи, курсы…"
              className="w-48 bg-transparent text-sm outline-none placeholder:text-slate-400 focus:w-64 transition-all"
            />
          </form>

          <div className="flex items-center gap-1.5 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2">
            <Flame size={16} className="text-orange-500" />
            <span className="text-sm font-bold text-orange-600">{PROGRESS.streakDays}</span>
          </div>

          <Link
            to="/ai"
            className="hidden items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-all hover:shadow-lift hover:opacity-90 sm:flex"
          >
            <Bot size={16} className="text-primary-400" />
            AI-помощник
          </Link>

          <Link
            to="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-accent-blue to-accent-violet text-sm font-bold text-white shadow-card transition hover:shadow-lift"
            title="Профиль"
          >
            УЖ
          </Link>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-lift animate-fade-in">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
              aria-label="Закрыть меню"
            >
              <X size={18} />
            </button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}