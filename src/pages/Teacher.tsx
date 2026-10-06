import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Users,
  Award,
  ClipboardCheck,
  Activity,
  Search,
  Flame,
  TrendingDown,
  Radio,
} from "lucide-react";
import {
  STUDENTS,
  CLASS_PERFORMANCE,
  CLASS_TEST_RESULTS,
  HARD_TOPICS,
} from "../data/students";
import StatCard from "../components/ui/StatCard";
import ProgressBar from "../components/ui/ProgressBar";
import Card from "../components/ui/Card";

const STATUS_META: Record<string, { label: string; cls: string }> = {
  online: { label: "онлайн", cls: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  active: { label: "активен", cls: "bg-sky-50 text-sky-600 border-sky-200" },
  offline: { label: "офлайн", cls: "bg-slate-50 text-slate-400 border-slate-200" },
  help: { label: "нужна помощь", cls: "bg-amber-50 text-amber-600 border-amber-200" },
};

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  boxShadow: "0 10px 30px -12px rgba(11,18,32,0.2)",
  fontSize: 13,
  fontWeight: 600,
  background: "#fff",
};

export default function Teacher() {
  const [classFilter, setClassFilter] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      STUDENTS.filter(
        (s) =>
          (classFilter === "all" || s.className === classFilter) &&
          s.name.toLowerCase().includes(query.toLowerCase())
      ),
    [classFilter, query]
  );

  const stats = useMemo(() => {
    const avg = filtered.length
      ? Math.round(filtered.reduce((a, s) => a + s.avgScore, 0) / filtered.length)
      : 0;
    const tasks = filtered.reduce((a, s) => a + s.tasksDone, 0);
    const online = filtered.filter((s) => s.status === "online" || s.status === "active").length;
    return { avg, tasks, online };
  }, [filtered]);

  const classes = useMemo(() => Array.from(new Set(STUDENTS.map((s) => s.className))), []);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-600">
            <Users size={13} /> Для учителя
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Панель учителя
          </h1>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            Тұрсынай Айдарқызы
          </p>
          <p className="mt-2 max-w-2xl text-slate-500">
            Видно успеваемость класса в реальном времени: тесты, задачи, слабые
            темы и активность учеников.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {["all", ...classes].map((c) => (
            <button
              key={c}
              onClick={() => setClassFilter(c)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                classFilter === c
                  ? "bg-ink text-white shadow-card"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-accent-violet hover:text-accent-violet"
              }`}
            >
              {c === "all" ? "Все классы" : `9${c}`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Users}
          label="Учеников"
          value={filtered.length}
          hint={classFilter === "all" ? "все классы" : `класс 9${classFilter}`}
          iconClasses="bg-violet-50 text-violet-600"
          trend={classes.includes(classFilter) ? "" : "+2"}
        />
        <StatCard
          icon={Award}
          label="Средний балл"
          value={`${stats.avg}%`}
          hint="по всем тестам за месяц"
          iconClasses="bg-emerald-50 text-emerald-600"
          trend="+4%"
        />
        <StatCard
          icon={ClipboardCheck}
          label="Заданий выполнено"
          value={stats.tasks}
          hint="за этот месяц"
          iconClasses="bg-sky-50 text-sky-600"
          trend="+18"
        />
        <StatCard
          icon={Activity}
          label="Активность класса"
          value={`${stats.online}`}
          hint="учеников сейчас онлайн"
          iconClasses="bg-amber-50 text-amber-600"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-6">
          <p className="font-display text-lg font-bold text-ink">Успеваемость класса</p>
          <p className="text-xs text-slate-400">средний балл и выполнение заданий по неделям</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CLASS_PERFORMANCE} margin={{ top: 10, right: 16, left: -14, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 13, fontWeight: 600 }} />
                <Line
                  type="monotone"
                  dataKey="avgScore"
                  name="Средний балл"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="completion"
                  name="Выполнение"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#8B5CF6", strokeWidth: 2, stroke: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="p-6">
            <p className="flex items-center gap-2 font-display text-lg font-bold text-ink">
              <TrendingDown size={18} className="text-rose-500" /> Сложные темы
            </p>
            <p className="text-xs text-slate-400">где класс ошибается чаще всего</p>
            <div className="mt-4 space-y-4">
              {HARD_TOPICS.map((t) => (
                <div key={t.name}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <span className="text-xs font-bold text-slate-400">
                      {t.avgScore}% · {t.attempts} попыток
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <ProgressBar
                      value={t.avgScore}
                      barClassName={
                        t.avgScore < 55 ? "bg-rose-400" : t.avgScore < 65 ? "bg-amber-400" : "bg-emerald-400"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <p className="flex items-center gap-2 font-display text-lg font-bold text-ink">
              <Radio size={18} className="text-sky-500" /> Результаты тестов
            </p>
            <div className="mt-3 space-y-2.5">
              {CLASS_TEST_RESULTS.map((r) => (
                <div key={r.id} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{r.student}</p>
                    <p className="truncate text-xs text-slate-400">{r.test}</p>
                  </div>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${
                      r.percent >= 80
                        ? "bg-emerald-500"
                        : r.percent >= 60
                          ? "bg-amber-400"
                          : "bg-rose-400"
                    }`}
                  >
                    {r.score}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card className="mt-5 overflow-hidden p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-display text-lg font-bold text-ink">Ученики</p>
            <p className="text-xs text-slate-400">
              {classFilter === "all" ? "все классы" : `класс 9${classFilter}`} · {filtered.length} учеников
            </p>
          </div>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-surface px-3 py-2 transition focus-within:border-accent-violet">
            <Search size={15} className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти ученика…"
              className="w-44 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </label>
        </div>

        <div className="mt-4 overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pr-4">Ученик</th>
                <th className="pb-3 pr-4">Средний балл</th>
                <th className="pb-3 pr-4">Задачи</th>
                <th className="pb-3 pr-4">Серия</th>
                <th className="pb-3 pr-4">Статус</th>
                <th className="pb-3">Был активен</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const status = STATUS_META[s.status];
                return (
                  <tr key={s.id} className="border-t border-slate-100 transition hover:bg-slate-50/60">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-accent-blue text-xs font-bold text-white">
                          {s.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-ink">{s.name}</p>
                          <p className="text-xs text-slate-400">класс 9{s.className}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-display font-bold text-ink">{s.avgScore}%</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-semibold text-slate-600">{s.tasksDone}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange-500">
                        <Flame size={13} /> {s.streak}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${status.cls}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400">{s.lastActive}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-400">Никого не нашли по фильтрам.</p>
          )}
        </div>
      </Card>
    </div>
  );
}