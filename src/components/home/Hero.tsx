import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, PlayCircle, Users, Bot, Flame } from "lucide-react";
import CodeWindow from "./CodeWindow";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-40 -z-10 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />

      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-ink shadow-card">
            <Bot size={16} className="text-accent-blue" />
            AI-платформа для школьников
            <span className="relative flex h-2 w-2 rounded-full bg-emerald-400">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            </span>
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl xl:text-[3.85rem]">
            Изучай информатику.
            <br />
            <span className="text-gradient">Создавай будущее.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500">
            AI-платформа, которая помогает понять программирование, алгоритмы и
            технологии — с практикой, тестами и личным наставником рядом.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/courses"
              className="group inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-bold text-white shadow-card transition-all duration-300 hover:shadow-lift"
            >
              <PlayCircle size={18} className="text-primary-400 transition-transform group-hover:scale-110" />
              Начать обучение
            </Link>
            <Link
              to="/ai"
              className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-ink shadow-card transition-all duration-300 hover:border-accent-blue hover:text-accent-blue"
            >
              <Sparkles size={18} className="text-accent-violet transition-transform group-hover:rotate-12" />
              Попробовать AI
            </Link>
          </div>

          <div className="mt-9 flex items-center gap-6">
            <div>
              <p className="font-display text-2xl font-bold text-ink">12 000+</p>
              <p className="text-xs font-medium text-slate-400">учеников учатся</p>
            </div>
            <div className="h-9 w-px bg-slate-200" />
            <div>
              <p className="font-display text-2xl font-bold text-ink">980+</p>
              <p className="text-xs font-medium text-slate-400">задач и тестов</p>
            </div>
            <div className="h-9 w-px bg-slate-200" />
            <div>
              <p className="font-display text-2xl font-bold text-ink">4.9/5</p>
              <p className="text-xs font-medium text-slate-400">оценка школ</p>
            </div>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
            <Flame size={16} />
            Серия: 7 дней занятий — продолжай!
          </div>
        </div>

        <CodeWindow />
      </div>
    </section>
  );
}