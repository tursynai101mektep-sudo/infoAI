import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, ListChecks } from "lucide-react";
import { COURSES, CATEGORIES, LEVEL_META, type Course } from "../data/courses";
import { getIcon } from "../lib/icons";
import ProgressBar from "../components/ui/ProgressBar";
import Badge from "../components/ui/Badge";

function CourseCard({ course }: { course: Course }) {
  const Icon = getIcon(course.icon);
  const level = LEVEL_META[course.level];
  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${course.accent} text-white shadow-card transition-transform duration-300 group-hover:scale-105`}
        >
          <Icon size={22} />
        </div>
        <Badge className={level.classes}>{level.label}</Badge>
      </div>

      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-ink">{course.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{course.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {course.tags.map((t) => (
          <span
            key={t}
            className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-500 ring-1 ring-slate-100"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1"><ListChecks size={13} /> {course.lessons} уроков</span>
        <span className="flex items-center gap-1"><Clock size={13} /> ~{course.lessons * 20} мин</span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-400">
            Пройдено {course.lessonsDone} из {course.lessons}
          </span>
          <span className="font-display text-sm font-bold text-ink">{course.progress}%</span>
        </div>
        <div className="mt-2">
          <ProgressBar value={course.progress} />
        </div>
      </div>

      <Link
        to="/code"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3 text-sm font-bold text-white transition-all duration-300 hover:shadow-lift hover:opacity-90"
      >
        <BookOpen size={16} className="text-primary-400" />
        {course.progress > 0 ? "Продолжить" : "Начать курс"}
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

export default function Courses() {
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(
    () => (category === "all" ? COURSES : COURSES.filter((c) => c.category === category)),
    [category]
  );

  return (
    <div>
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
          12 курсов
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Курсы по информатике
        </h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          От первых строк Python до нейросетей и кибербезопасности. Каждый курс
          построен так, чтобы ты сразу практиковался.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              category === c.key
                ? "bg-ink text-white shadow-card"
                : "border border-slate-200 bg-white text-slate-500 hover:border-accent-blue hover:text-accent-blue"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-400">
          В этой категории пока нет курсов.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}