import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import { COURSES } from "../../data/courses";
import { getIcon } from "../../lib/icons";
import ProgressBar from "../ui/ProgressBar";
import SectionHeading from "../ui/SectionHeading";

const PREVIEW = COURSES.filter((c) => c.progress > 0)
  .sort((a, b) => b.progress - a.progress)
  .slice(0, 6);

export default function CoursePreview() {
  return (
    <section className="py-16 pt-0">
      <SectionHeading
        eyebrow="Продолжи обучение"
        title="Твои курсы уже ждут"
        subtitle="Подхватывай с того места, где остановился. AI сам подсказывает следующий урок."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PREVIEW.map((course) => {
          const Icon = getIcon(course.icon);
          return (
            <Link
              key={course.id}
              to="/courses"
              className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${course.accent} text-white shadow-card`}
                >
                  <Icon size={20} />
                </div>
                <span className="font-display text-sm font-bold text-ink">{course.progress}%</span>
              </div>
              <h3 className="mt-4 font-display text-base font-bold leading-snug text-ink">
                {course.title}
              </h3>
              <p className="mt-1.5 text-xs text-slate-400">
                {course.lessonsDone} из {course.lessons} уроков
              </p>
              <div className="mt-4">
                <ProgressBar value={course.progress} />
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent-blue">
                <BookOpen size={15} /> Продолжить
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}