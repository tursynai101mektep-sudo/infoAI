import { Link } from "react-router-dom";
import {
  Bot,
  Code2,
  GitBranch,
  ClipboardCheck,
  ScanSearch,
  TrendingUp,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
  to: string;
  tile: string;
  glow: string;
}

const FEATURES: Feature[] = [
  {
    icon: Bot,
    title: "AI-наставник",
    text: "Объясняет сложные темы простым языком — как живой репетитор, который всегда онлайн.",
    to: "/ai",
    tile: "bg-emerald-50 text-emerald-600",
    glow: "group-hover:shadow-[0_10px_40px_-12px_rgba(16,185,129,0.45)]",
  },
  {
    icon: Code2,
    title: "Практика кода",
    text: "Позволяет решать небольшие задачи по программированию прямо в браузере.",
    to: "/code",
    tile: "bg-sky-50 text-sky-600",
    glow: "group-hover:shadow-[0_10px_40px_-12px_rgba(56,189,248,0.45)]",
  },
  {
    icon: GitBranch,
    title: "Алгоритмы",
    text: "Интерактивное изучение алгоритмов и структур данных с визуализациями.",
    to: "/courses",
    tile: "bg-violet-50 text-violet-600",
    glow: "group-hover:shadow-[0_10px_40px_-12px_rgba(139,92,246,0.45)]",
  },
  {
    icon: ClipboardCheck,
    title: "Тесты",
    text: "Проверка знаний после каждой темы — с подробным разбором ошибок.",
    to: "/tests",
    tile: "bg-amber-50 text-amber-600",
    glow: "group-hover:shadow-[0_10px_40px_-12px_rgba(245,158,11,0.45)]",
  },
  {
    icon: ScanSearch,
    title: "Анализ ошибок",
    text: "Показывает слабые места ученика и предлагает, что стоит повторить.",
    to: "/progress",
    tile: "bg-rose-50 text-rose-600",
    glow: "group-hover:shadow-[0_10px_40px_-12px_rgba(244,63,94,0.45)]",
  },
  {
    icon: TrendingUp,
    title: "Персональный прогресс",
    text: "AI предлагает темы для дальнейшего изучения на основе твоих результатов.",
    to: "/profile",
    tile: "bg-cyan-50 text-cyan-600",
    glow: "group-hover:shadow-[0_10px_40px_-12px_rgba(34,211,238,0.45)]",
  },
];

export default function Features() {
  return (
    <section className="py-16">
      <SectionHeading
        eyebrow="Возможности"
        title="Всё, что нужно, чтобы полюбить информатику"
        subtitle="Один сервис — целая экосистема: от первого print() до своего проекта с ИИ."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <Link
              key={f.title}
              to={f.to}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lift ${f.glow}`}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-slate-100 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${f.tile}`}>
                <Icon size={22} />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent-blue opacity-0 transition-all duration-300 group-hover:opacity-100">
                Открыть <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}