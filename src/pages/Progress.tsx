import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import {
  Target,
  CheckCircle2,
  BookOpen,
  Award,
  Flame,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  PROGRESS,
  WEEKLY_ACTIVITY,
  TEST_SCORES,
  TOPIC_PROGRESS,
  RECENT_ACTIVITY,
} from "../data/progress";
import StatCard from "../components/ui/StatCard";
import RingProgress from "../components/ui/RingProgress";
import ProgressBar from "../components/ui/ProgressBar";
import Card from "../components/ui/Card";

const ACTIVITY_ICONS: Record<string, { icon: typeof CheckCircle2; cls: string }> = {
  task: { icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-600" },
  ai: { icon: Activity, cls: "bg-violet-50 text-violet-600" },
  test: { icon: Award, cls: "bg-amber-50 text-amber-600" },
  lesson: { icon: BookOpen, cls: "bg-sky-50 text-sky-600" },
};

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  boxShadow: "0 10px 30px -12px rgba(11,18,32,0.2)",
  fontSize: 13,
  fontWeight: 600,
  background: "#fff",
};

export default function ProgressPage() {
  return (
    <div>
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
          <TrendingUp size={13} /> Личный прогресс
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Твой прогресс идёт в гору
        </h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          AI анализирует твои результаты и подсказывает, куда двигаться дальше.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
          <p className="text-sm font-bold text-slate-500">Общий прогресс</p>
          <div className="mt-3 flex items-center gap-4">
            <RingProgress
              value={PROGRESS.overallProgress}
              size={92}
              stroke={9}
              label={`${PROGRESS.overallProgress}%`}
            />
            <div className="space-y-1 text-xs text-slate-400">
              <p>Задачи: {PROGRESS.tasksSolved}/{PROGRESS.tasksTotal}</p>
              <p>Уроки: {PROGRESS.lessonsDone}/{PROGRESS.lessonsTotal}</p>
              <p>Уровень: {PROGRESS.xp} XP</p>
            </div>
          </div>
        </div>
        <StatCard
          icon={CheckCircle2}
          label="Задач решено"
          value={PROGRESS.tasksSolved}
          hint={`из ${PROGRESS.tasksTotal} доступных`}
          iconClasses="bg-emerald-50 text-emerald-600"
          trend="+12%"
        />
        <StatCard
          icon={BookOpen}
          label="Уроков пройдено"
          value={PROGRESS.lessonsDone}
          hint={`из ${PROGRESS.lessonsTotal}`}
          iconClasses="bg-sky-50 text-sky-600"
          trend="+5"
        />
        <StatCard
          icon={Award}
          label="Средний балл тестов"
          value={`${PROGRESS.avgTestScore}%`}
          hint="за последние 6 недель"
          iconClasses="bg-violet-50 text-violet-600"
          trend="+9%"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-lg font-bold text-ink">Активность за неделю</p>
              <p className="text-xs text-slate-400">XP за каждый день</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-bold text-orange-600">
              <Flame size={14} /> Серия: {PROGRESS.streakDays} дней
            </span>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WEEKLY_ACTIVITY} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#10B981"
                  strokeWidth={3}
                  fill="url(#xpGrad)"
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <p className="font-display text-lg font-bold text-ink">Результаты тестов</p>
          <p className="text-xs text-slate-400">средний балл по неделям</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TEST_SCORES} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#8B5CF6", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Card className="p-6">
          <p className="font-display text-lg font-bold text-ink">Темы, которые я изучил</p>
          <p className="text-xs text-slate-400">прогресс по разделам</p>
          <div className="mt-5 space-y-4">
            {TOPIC_PROGRESS.map((t) => (
              <div key={t.name}>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <span className="text-xs font-bold text-slate-400">{t.percent}%</span>
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar value={t.percent} />
                  </div>
                  <span className="w-16 text-right text-[11px] text-slate-400">{t.lessons}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="font-display text-lg font-bold text-ink">Недавняя активность</p>
          <p className="text-xs text-slate-400">каждый шаг добавляет XP</p>
          <div className="mt-4 space-y-3">
            {RECENT_ACTIVITY.map((a) => {
              const meta = ACTIVITY_ICONS[a.type];
              const Icon = meta.icon;
              return (
                <div
                  key={a.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 transition hover:bg-slate-50"
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${meta.cls}`}>
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{a.title}</p>
                    <p className="text-xs text-slate-400">{a.time}</p>
                  </div>
                  <span
                    className={`shrink-0 text-xs font-bold ${
                      a.positive !== false ? "text-emerald-500" : "text-slate-400"
                    }`}
                  >
                    {a.detail}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}