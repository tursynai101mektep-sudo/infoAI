import { NavLink } from "react-router-dom";
import {
  BookOpen,
  Bot,
  ClipboardCheck,
  Code2,
  BarChart3,
  Home,
  UserRound,
  GraduationCap,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface NavEntry {
  label: string;
  to: string;
  icon: LucideIcon;
}

const MAIN_NAV: { section: string; items: NavEntry[] }[] = [
  {
    section: "Обучение",
    items: [
      { label: "Главная", to: "/", icon: Home },
      { label: "Курсы", to: "/courses", icon: BookOpen },
      { label: "Код-студия", to: "/code", icon: Code2 },
      { label: "AI-наставник", to: "/ai", icon: Bot },
      { label: "Тесты", to: "/tests", icon: ClipboardCheck },
      { label: "Прогресс", to: "/progress", icon: BarChart3 },
    ],
  },
  {
    section: "Личное",
    items: [
      { label: "Профиль", to: "/profile", icon: UserRound },
      { label: "Панель учителя", to: "/teacher", icon: GraduationCap },
    ],
  },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 via-accent-blue to-accent-violet shadow-card">
          <Code2 size={22} className="text-white" />
        </div>
        <div>
          <p className="font-display text-lg font-bold leading-none tracking-tight text-ink">
            Info<span className="text-gradient">AI</span>
          </p>
          <p className="mt-1 text-[11px] font-medium text-slate-400">Учим информатику с ИИ</p>
        </div>
      </div>

      <nav className="mt-2 flex-1 space-y-6 overflow-y-auto px-3 scrollbar-thin">
        {MAIN_NAV.map((group) => (
          <div key={group.section}>
            <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400/80">
              {group.section}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-ink text-white shadow-card"
                          : "text-slate-500 hover:bg-slate-100 hover:text-ink"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          className={
                            isActive
                              ? "text-primary-400"
                              : "text-slate-400 transition-colors group-hover:text-accent-blue"
                          }
                        />
                        <span className="flex-1">{item.label}</span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary-400 to-accent-blue" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="m-3 rounded-2xl bg-gradient-to-br from-ink to-ink-soft p-4 text-white shadow-card">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-primary-400" />
          <p className="text-sm font-bold">Неделя обучения</p>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-slate-300">
          Готов до цели дня — остался 1 урок.
        </p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-primary-400 to-accent-blue transition-all duration-1000" />
        </div>
        <span className="mt-2 inline-block text-[11px] font-semibold text-primary-400">
          78% плана на эту неделю
        </span>
      </div>
    </div>
  );
}