import { Zap, ChevronRight, UserCheck, TrendingUp } from "lucide-react";
import { highlightLine } from "../../lib/highlight";
import RingProgress from "../ui/RingProgress";

const CODE = [
  'def total(n):',
  '    return sum(range(1, n + 1))',
  '',
  'scores = [4, 5, 4, 5, 3]',
  'print(f"Сумма: {total(10)}")',
  '# ожидаем: Сумма: 55',
];

const TERMINAL = [
  { prompt: "$ python main.py", type: "cmd" },
  { prompt: "Сумма: 55", type: "out" },
];

export default function CodeWindow() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-emerald-300/40 via-sky-300/30 to-violet-300/40 blur-2xl" />

      <div className="overflow-hidden rounded-2xl bg-ink shadow-lift ring-1 ring-white/10">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-rose-400/90" />
          <span className="h-3 w-3 rounded-full bg-amber-400/90" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
          <span className="ml-3 rounded-md bg-white/10 px-2 py-0.5 font-mono text-xs text-slate-300">
            main.py
          </span>
          <span className="ml-auto rounded-md bg-emerald-400/15 px-2 py-0.5 text-[11px] font-bold text-emerald-300">
            Python 3.12
          </span>
        </div>

        <div className="px-4 py-4 font-mono text-[13px] leading-6">
          <div className="grid grid-cols-[2.2rem_1fr] gap-x-3">
            {CODE.map((line, i) => (
              <div key={i} className="contents">
                <span className="select-none text-right text-slate-600">{i + 1}</span>
                <pre className={`whitespace-pre-wrap ${line.trim() === "" ? "text-slate-600" : ""}`}>
                  {line.trim() === "" ? line : highlightLine(line)}
                </pre>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 bg-ink-soft px-4 py-3 font-mono text-[13px] leading-6">
          {TERMINAL.map((t, i) => (
            <div key={i} className="flex gap-2">
              {t.type === "cmd" ? (
                <>
                  <span className="select-none text-emerald-400">$</span>
                  <span className="text-slate-200">{t.prompt}</span>
                </>
              ) : (
                <>
                  <span className="select-none text-accent-blue">›</span>
                  <span className="text-primary-400">{t.prompt}</span>
                </>
              )}
            </div>
          ))}
          <span className="mt-1 inline-block h-4 w-2 animate-blink bg-primary-400 align-middle" />
        </div>
      </div>

      <div className="absolute -left-10 top-24 hidden animate-float rounded-2xl glass p-4 shadow-lift sm:block">
        <div className="flex items-center gap-3">
          <RingProgress value={68} size={56} stroke={6} label="68" />
          <div>
            <p className="text-xs font-bold text-ink">Недельный прогресс</p>
            <p className="mt-0.5 text-[11px] text-slate-500">Цель: 27/40 XP</p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
              <TrendingUp size={11} /> +12%
            </span>
          </div>
        </div>
      </div>

      <div className="absolute -left-8 -bottom-6 hidden animate-float rounded-2xl glass p-4 shadow-lift sm:block" style={{ animationDelay: "1.2s" }}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-accent-blue text-white">
            <UserCheck size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-ink">AI-рекомендация</p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Продолжить тему
              <br />
              <span className="font-semibold text-accent-blue">«Списки в Python»</span>
            </p>
          </div>
          <ChevronRight size={16} className="text-slate-400" />
        </div>
      </div>

      <div className="absolute -right-6 top-1/2 hidden animate-float rounded-2xl bg-ink px-4 py-3 text-white shadow-lift md:block" style={{ animationDelay: "0.6s" }}>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <Zap size={15} className="text-amber-300" />
          </div>
          <div>
            <p className="font-display text-sm font-bold leading-none">+120 XP</p>
            <p className="mt-1 text-[11px] text-slate-400">за сегодня</p>
          </div>
        </div>
      </div>
    </div>
  );
}