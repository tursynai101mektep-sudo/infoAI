import { useState } from "react";
import { Play, RotateCcw, BookOpen, Code2, ScanSearch, MoveRight } from "lucide-react";

interface SortStep {
  values: number[];
  compare: [number, number];
  swapped: boolean;
  done: boolean;
}

function buildSteps(initial: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initial];
  let sorted = false;
  const n = arr.length;

  for (let pass = 0; pass < n - 1 && !sorted; pass++) {
    sorted = true;
    for (let i = 0; i < n - 1 - pass; i++) {
      const swapped = arr[i] > arr[i + 1];
      if (swapped) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
      steps.push({
        values: [...arr],
        compare: [i, i + 1],
        swapped,
        done: false,
      });
    }
  }

  return steps.map((s, i) => (i === steps.length - 1 ? { ...s, done: true } : s));
}

const HEIGHTS: Record<number, string> = {
  2: "h-6",
  4: "h-12",
  7: "h-20",
  9: "h-28",
};

export default function HowItWorks() {
  const [steps] = useState(() => buildSteps([7, 2, 9, 4]));
  const [idx, setIdx] = useState(0);

  const current = steps[idx];
  const isFirst = idx === 0;
  const isLast = idx === steps.length - 1;

  return (
    <section className="py-16">
      <div className="overflow-hidden rounded-3xl bg-ink text-white shadow-lift">
        <div className="bg-grid-dark p-8 md:p-12 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-400">
                Как это работает
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-4xl">
                От первой строки — до своего проекта на ИИ
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
                Переходи по шагам сразу после теории: это помогает закреплять
                знания в несколько раз быстрее, чем просто чтение.
              </p>

              <div className="mt-8 space-y-0">
                {[
                  { icon: BookOpen, step: "01", title: "Изучай", text: "Короткие уроки без воды — с примерами кода." },
                  { icon: Code2, step: "02", title: "Практикуй", text: "Решай задачи и пиши код прямо в браузере." },
                  { icon: ScanSearch, step: "03", title: "Анализируй", text: "AI разбирает ошибки и строит план учёбы." },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.step} className="group relative flex gap-4 py-3">
                      {i < 2 && (
                        <span className="absolute left-[27px] top-14 h-8 w-px bg-gradient-to-b from-white/25 to-transparent" />
                      )}
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-colors group-hover:bg-white/10">
                        <Icon size={22} className="text-primary-400" />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-slate-500">{item.step}</p>
                        <h3 className="mt-1 font-display text-lg font-bold">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm text-slate-300">
                  <span className="text-accent-violet">bubble_sort</span>(["7","2","9","4"])
                </p>
                <span className="flex items-center gap-1.5">
                  {isLast && <span className="rounded-md bg-emerald-400/15 px-2 py-1 text-[11px] font-bold text-emerald-300">Отсортировано</span>}
                </span>
              </div>

              <div className="mt-6 flex h-36 items-end justify-center gap-3">
                {current.values.map((v, i) => {
                  const isCompare = current.compare.includes(i);
                  const isSwap = current.swapped && isCompare;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <span
                        className={`font-mono text-sm font-bold ${
                          isCompare ? (isSwap ? "text-amber-300" : "text-sky-300") : "text-slate-400"
                        }`}
                      >
                        {v}
                      </span>
                      <div
                        className={`w-12 rounded-t-lg ${HEIGHTS[v]} transition-all duration-300 ${
                          isCompare
                            ? isSwap
                              ? "bg-gradient-to-t from-amber-500 to-amber-300"
                              : "bg-gradient-to-t from-sky-500 to-sky-300"
                            : "bg-gradient-to-t from-white/25 to-white/10"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 min-h-[2.5rem] text-center font-mono text-sm text-slate-400">
                {isLast
                  ? "Массив отсортирован за 3 прохода!"
                  : current.swapped
                    ? "Соседние элементы меняются местами…"
                    : `Сравниваем элементы [${current.values[current.compare[0]]}] и [${current.values[current.compare[1]]}]`}
              </p>

              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => setIdx(0)}
                  disabled={isFirst}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/15 disabled:opacity-40"
                >
                  <RotateCcw size={15} /> Сброс
                </button>
                <button
                  onClick={() => setIdx((i) => Math.min(i + 1, steps.length - 1))}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-accent-blue px-5 py-2 text-sm font-bold text-ink transition hover:opacity-90"
                >
                  {isLast ? "Готово" : "Следующий шаг"} <Play size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-slate-500">
            <span className="flex items-center gap-2">Алгоритмы <MoveRight size={14} className="text-slate-600" /></span>
            <span className="flex items-center gap-2">Структуры данных <MoveRight size={14} className="text-slate-600" /></span>
            <span className="flex items-center gap-2">Python <MoveRight size={14} className="text-slate-600" /></span>
            <span className="flex items-center gap-2">Базы данных <MoveRight size={14} className="text-slate-600" /></span>
            <span className="flex items-center gap-2">ИИ и сети</span>
          </div>
        </div>
      </div>
    </section>
  );
}