import { Link } from "react-router-dom";
import { Terminal, ClipboardCheck, ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-16 pt-0">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-center shadow-lift md:px-14">
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-accent-violet/20 blur-3xl" />
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-400">
            Начни прямо сейчас
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-white md:text-4xl">
            Готов написать свой первый код?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400">
            Реши задачку прямо сейчас — без установки программ и настроек. Всё
            работает в браузере, а AI поможет, если возникнет вопрос.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/code"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-accent-blue px-6 py-3.5 text-sm font-bold text-ink transition-all hover:opacity-90"
            >
              <Terminal size={18} />
              Открыть код-студию
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/tests"
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
            >
              <ClipboardCheck size={18} />
              Пройти мини-тест
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}