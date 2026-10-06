import {
  UserRound,
  Flame,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Award,
  Zap,
  Lock,
  CalendarDays,
} from "lucide-react";
import {
  STUDENT,
  PROGRESS,
  ACHIEVEMENTS,
  TOPIC_PROGRESS,
  TEST_HISTORY,
} from "../data/progress";
import { getIcon } from "../lib/icons";
import StatCard from "../components/ui/StatCard";
import ProgressBar from "../components/ui/ProgressBar";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

export default function Profile() {
  const unlockedCount = ACHIEVEMENTS.filter((a) => a.unlocked).length;

  return (
    <div>
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-600">
          <UserRound size={13} /> Профиль ученика
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          {STUDENT.name}
        </h1>
      </div>

      <Card className="overflow-hidden">
        <div className="relative bg-ink px-6 py-8 md:px-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent-violet/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative flex flex-wrap items-center gap-5">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${STUDENT.avatarColor} font-display text-2xl font-bold text-white shadow-lift`}
            >
              {STUDENT.firstName[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-2xl font-bold text-white">{STUDENT.name}</p>
              <p className="mt-0.5 text-sm text-slate-400">
                {STUDENT.grade} · {STUDENT.className} · {STUDENT.school}
              </p>
              <p className="mt-1 max-w-md text-sm text-slate-300">{STUDENT.bio}</p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 rounded-xl bg-orange-400/15 px-4 py-2.5 text-sm font-bold text-orange-300">
                <Flame size={16} /> {PROGRESS.streakDays} дней
              </span>
              <span className="flex items-center gap-1.5 rounded-xl bg-emerald-400/15 px-4 py-2.5 text-sm font-bold text-emerald-300">
                <Zap size={16} /> {PROGRESS.xp} XP
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={CheckCircle2}
          label="Задач решено"
          value={PROGRESS.tasksSolved}
          iconClasses="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          icon={BookOpen}
          label="Уроков пройдено"
          value={PROGRESS.lessonsDone}
          iconClasses="bg-sky-50 text-sky-600"
        />
        <StatCard
          icon={Award}
          label="Средний балл тестов"
          value={`${PROGRESS.avgTestScore}%`}
          iconClasses="bg-violet-50 text-violet-600"
        />
        <StatCard
          icon={CalendarDays}
          label="Прогресс платформы"
          value={`${PROGRESS.overallProgress}%`}
          iconClasses="bg-amber-50 text-amber-600"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-lg font-bold text-ink">Достижения</p>
              <p className="text-xs text-slate-400">
                {unlockedCount} из {ACHIEVEMENTS.length} открыто
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-600">
              <Sparkles size={13} /> {unlockedCount}/{ACHIEVEMENTS.length}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {ACHIEVEMENTS.map((a) => {
              const Icon = getIcon(a.icon);
              return (
                <div
                  key={a.id}
                  className={`flex items-center gap-3 rounded-xl border p-4 transition-all duration-300 ${
                    a.unlocked
                      ? "border-transparent bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-card"
                      : "border-slate-200 bg-slate-50/60 opacity-70"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      a.unlocked
                        ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-card"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink">{a.title}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-400">
                      {a.description}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-400">
                      {a.unlocked ? (
                        <span className="text-emerald-600">Открыто · {a.date}</span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Lock size={10} /> Закрыто
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="p-6">
            <p className="font-display text-lg font-bold text-ink">Изученные темы</p>
            <div className="mt-4 space-y-3.5">
              {TOPIC_PROGRESS.map((t) => (
                <div key={t.name}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <span className="text-xs font-bold text-slate-400">{t.percent}%</span>
                  </div>
                  <div className="mt-1.5">
                    <ProgressBar value={t.percent} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <p className="font-display text-lg font-bold text-ink">История тестов</p>
            <div className="mt-4 space-y-2.5">
              {TEST_HISTORY.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 transition hover:bg-slate-50"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${
                      h.percent >= 80
                        ? "bg-gradient-to-br from-emerald-400 to-emerald-500"
                        : "bg-gradient-to-br from-amber-400 to-orange-500"
                    }`}
                  >
                    {h.score}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{h.test}</p>
                    <p className="text-xs text-slate-400">
                      {h.category} · {h.date}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-sm font-bold ${
                      h.percent >= 80 ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {h.percent}%
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className="border-slate-200 bg-slate-50 text-slate-500">5 тестов пройдено</Badge>
              <Badge className="border-emerald-200 bg-emerald-50 text-emerald-600">Лучший: 100%</Badge>
              <Badge className="border-slate-200 bg-slate-50 text-slate-500">Средний: 82%</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}