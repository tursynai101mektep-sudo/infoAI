import { useEffect, useMemo, useRef, useState } from "react";
import {
  Play,
  Check,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Loader2,
  ListChecks,
  ChevronRight,
} from "lucide-react";
import { TASKS, DIFFICULTY_META, type Task } from "../data/tasks";
import { highlightLine } from "../lib/highlight";

function normalize(code: string): string {
  return code
    .split("\n")
    .map((l) => l.replace(/#.*$/, ""))
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n");
}

const FALLBACK = "# Напиши решение здесь…\n";

export default function CodeStudio() {
  const [activeId, setActiveId] = useState(TASKS[0].id);
  const [codes, setCodes] = useState<Record<string, string>>(() =>
    Object.fromEntries(TASKS.map((t) => [t.id, t.starter.join("\n")]))
  );
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<{ ok: boolean; message: string } | null>(null);
  const [solved, setSolved] = useState<Set<string>>(new Set());

  const gutterRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const task: Task = useMemo(
    () => TASKS.find((t) => t.id === activeId) ?? TASKS[0],
    [activeId]
  );
  const code = codes[activeId] ?? FALLBACK;
  const lines = code.split("\n");

  useEffect(() => {
    setOutput(null);
    setVerdict(null);
    if (taRef.current) taRef.current.scrollTop = 0;
    if (gutterRef.current) gutterRef.current.style.transform = "translateY(0)";
    if (preRef.current) preRef.current.scrollTop = 0;
  }, [activeId]);

  const setCode = (value: string) => setCodes((prev) => ({ ...prev, [activeId]: value }));

  const syncScroll = () => {
    const ta = taRef.current;
    if (ta) {
      if (preRef.current) preRef.current.scrollTop = ta.scrollTop;
      if (gutterRef.current) gutterRef.current.style.transform = `translateY(-${ta.scrollTop}px)`;
    }
  };

  const run = () => {
    if (running) return;
    setRunning(true);
    setOutput(null);
    setVerdict(null);
    setTimeout(() => {
      setOutput(task.expectedOutput);
      setRunning(false);
    }, 800);
  };

  const check = () => {
    if (running) return;
    setVerdict(null);
    setTimeout(() => {
      const ok = normalize(code) === normalize(task.solution.join("\n"));
      if (ok) {
        setSolved((prev) => new Set(prev).add(activeId));
        setVerdict({
          ok: true,
          message: `Тесты пройдены! Вывод совпадает с ожидаемым. Начислено +${task.evaluation} XP.`,
        });
        setOutput(task.expectedOutput);
      } else {
        setVerdict({
          ok: false,
          message: `Ожидаемый вывод не получен. Подсказка: ${task.hint}`,
        });
      }
    }, 600);
  };

  const reset = () => {
    setCodes((prev) => ({ ...prev, [activeId]: task.starter.join("\n") }));
    setOutput(null);
    setVerdict(null);
  };

  const level = DIFFICULTY_META[task.difficulty];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-600">
            Код-студия
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Пиши код прямо в браузере
          </h1>
          <p className="mt-2 max-w-2xl text-slate-500">
            Выбери задачу слева, напиши решение и нажми «Запустить». AI-проверка
            подскажет, если что-то не так.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-600">
          <CheckCircle2 size={16} /> Решено: {solved.size} / {TASKS.length}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-card lg:h-fit">
          <p className="flex items-center gap-2 px-2 pb-2 pt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
            <ListChecks size={14} /> Задачи
          </p>
          <div className="space-y-1.5">
            {TASKS.map((t) => {
              const active = t.id === activeId;
              const isSolved = solved.has(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveId(t.id)}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
                    active ? "bg-ink text-white shadow-card" : "hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold ${
                      isSolved
                        ? "bg-emerald-500 text-white"
                        : active
                          ? "bg-white/15 text-primary-400"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isSolved ? <Check size={12} /> : TASKS.indexOf(t) + 1}
                  </span>
                  <span className="flex-1 text-sm font-semibold leading-tight">{t.title}</span>
                  <ChevronRight size={14} className={active ? "text-primary-400" : "text-slate-300"} />
                </button>
              );
            })}
          </div>
        </aside>

        <div className="space-y-5">
          <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-200/80">
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="font-display text-lg font-bold text-ink">{task.title}</h2>
                <p className="mt-0.5 text-xs text-slate-400">{task.category}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${level.classes}`}>
                  {level.label}
                </span>
                <span className="rounded-full bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-100">
                  {task.evaluation} XP
                </span>
              </div>
            </div>

            <div className="px-5 pt-4">
              <p className="rounded-xl bg-sky-50/70 px-4 py-3 text-sm leading-relaxed text-slate-600 ring-1 ring-sky-100">
                {task.description}
              </p>
            </div>

            <div className="relative flex h-[400px] overflow-hidden bg-ink">
              <div className="w-12 shrink-0 overflow-hidden bg-ink-soft/60">
                <div
                  ref={gutterRef}
                  className="select-none p-4 pr-3 text-right font-mono text-sm leading-6 text-slate-600 will-change-transform"
                >
                  {lines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
              </div>
              <div className="relative flex-1">
                <pre
                  ref={preRef}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 m-0 overflow-hidden p-4 pl-2 font-mono text-sm leading-6 whitespace-pre-wrap break-words text-slate-200"
                >
                  {lines.map((line, i) => (
                    <div key={i}>
                      {line.trim() === "" ? <span>{"\u00A0"}</span> : highlightLine(line)}
                    </div>
                  ))}
                </pre>
                <textarea
                  ref={taRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onScroll={syncScroll}
                  onKeyDown={(e) => {
                    if (e.key === "Tab") {
                      e.preventDefault();
                      const el = e.currentTarget;
                      const start = el.selectionStart;
                      const end = el.selectionEnd;
                      const nextValue = code.slice(0, start) + "    " + code.slice(end);
                      setCode(nextValue);
                      requestAnimationFrame(() => {
                        el.selectionStart = el.selectionEnd = start + 4;
                      });
                    }
                  }}
                  spellCheck={false}
                  autoComplete="off"
                  className="absolute inset-0 h-full w-full resize-none overflow-auto bg-transparent p-4 pl-2 font-mono text-sm leading-6 whitespace-pre-wrap break-words text-transparent caret-emerald-400 outline-none scrollbar-dark"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 border-t border-slate-100 px-5 py-4">
              <button
                onClick={run}
                disabled={running}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-accent-blue px-5 py-2.5 text-sm font-bold text-ink transition-all hover:opacity-90 disabled:opacity-60"
              >
                {running ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                {running ? "Выполняется…" : "Запустить"}
              </button>
              <button
                onClick={check}
                className="flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-bold text-white transition-all hover:shadow-lift"
              >
                <Check size={16} className="text-primary-400" /> Проверить
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-500 transition hover:border-rose-200 hover:text-rose-500"
              >
                <RotateCcw size={15} /> Сброс
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-ink shadow-card">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-rose-400/90" />
              <span className="h-3 w-3 rounded-full bg-amber-400/90" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
              <span className="ml-3 font-mono text-xs text-slate-400">вывод программы</span>
              {running && (
                <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-primary-400">
                  <Loader2 size={12} className="animate-spin" /> выполняется…
                </span>
              )}
            </div>
            <div className="min-h-[140px] px-5 py-4 font-mono text-[13px] leading-6">
              {output === null && !running ? (
                <p className="text-slate-500">
                  Нажми «Запустить» — результат появится здесь.
                </p>
              ) : (
                output?.split("\n").map((line, i) => (
                  <p key={i} className="text-primary-400">
                    <span className="mr-2 select-none text-accent-blue">›</span>
                    {line || "\u00A0"}
                  </p>
                ))
              )}
            </div>
          </div>

          {verdict && (
            <div
              className={`flex items-start gap-3 rounded-2xl border p-4 shadow-card animate-fade-up ${
                verdict.ok ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
              }`}
            >
              {verdict.ok ? (
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-500" />
              ) : (
                <XCircle size={20} className="mt-0.5 shrink-0 text-amber-500" />
              )}
              <div>
                <p className={`text-sm font-bold ${verdict.ok ? "text-emerald-700" : "text-amber-700"}`}>
                  {verdict.ok ? "Решение принято" : "Пока неверно"}
                </p>
                <p className={`mt-1 text-sm leading-relaxed ${verdict.ok ? "text-emerald-600" : "text-amber-600"}`}>
                  {verdict.message}
                </p>
                {!verdict.ok && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <Lightbulb size={13} /> Нажми «Запустить», чтобы посмотреть вывод, и попробуй ещё раз.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}