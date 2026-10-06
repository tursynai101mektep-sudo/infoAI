import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ClipboardCheck,
  Clock,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ListChecks,
  AlertTriangle,
} from "lucide-react";
import { TESTS, getTestRecommendations, type Test } from "../data/tests";
import { getIcon } from "../lib/icons";
import RingProgress from "../components/ui/RingProgress";
import ProgressBar from "../components/ui/ProgressBar";

type Phase = "choose" | "quiz" | "result";

const LETTERS = ["А", "Б", "В", "Г"];

export default function Tests() {
  const [phase, setPhase] = useState<Phase>("choose");
  const [test, setTest] = useState<Test | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  const startTest = (t: Test) => {
    setTest(t);
    setQIndex(0);
    setSelected(null);
    setAnswers([]);
    setPhase("quiz");
  };

  const choose = (i: number) => {
    if (selected !== null || !test) return;
    setSelected(i);
  };

  const next = () => {
    if (!test) return;
    if (selected === null) return;
    const updated = [...answers];
    updated[qIndex] = selected;
    setAnswers(updated);
    setSelected(null);

    if (qIndex + 1 < test.questions.length) {
      setQIndex((i) => i + 1);
    } else {
      setPhase("result");
    }
  };

  const backToTests = () => {
    setPhase("choose");
    setTest(null);
  };

  /* ---------- Выбор теста ---------- */
  if (phase === "choose") {
    return (
      <div>
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600">
            <ClipboardCheck size={13} /> Проверка знаний
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Тесты по информатике
          </h1>
          <p className="mt-2 max-w-2xl text-slate-500">
            Проверь себя после каждой темы. В конце получишь разбор ошибок и план,
            что повторить дальше.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {TESTS.map((t) => {
            const Icon = getIcon(t.icon);
            return (
              <div
                key={t.id}
                className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-card">
                    <Icon size={22} />
                  </div>
                  <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-100">
                    {t.difficulty}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{t.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{t.description}</p>
                <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1">
                    <ListChecks size={13} /> {t.questions.length} вопросов
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} /> ~{t.minutes} мин
                  </span>
                </div>
                <button
                  onClick={() => startTest(t)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3 text-sm font-bold text-white transition-all hover:shadow-lift hover:opacity-90"
                >
                  Начать тест <ArrowRight size={15} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---------- Результат ---------- */
  if (phase === "result" && test) {
    const correctCount = test.questions.reduce(
      (acc, q, i) => (answers[i] === q.correct ? acc + 1 : acc),
      0
    );
    const percent = Math.round((correctCount / test.questions.length) * 100);
    const mistakes = test.questions.flatMap((q, i) =>
      answers[i] !== q.correct ? [{ q, given: answers[i] }] : []
    );

    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
            <CheckCircle2 size={13} /> Тест завершён
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink">
            {test.title}
          </h1>
        </div>

        <div className="rounded-3xl bg-white p-8 text-center shadow-card ring-1 ring-slate-200/80 animate-fade-up">
          <RingProgress
            value={percent}
            size={170}
            stroke={14}
            label={`${percent}%`}
            sublabel="правильных ответов"
            barClass={
              percent >= 80
                ? "stroke-emerald-500"
                : percent >= 50
                  ? "stroke-amber-400"
                  : "stroke-rose-400"
            }
          />
          <p className="mt-5 font-display text-xl font-bold text-ink">
            {correctCount} из {test.questions.length} верно
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {percent >= 80
              ? "Отличный результат! Ты уверенно владеешь темой."
              : percent >= 50
                ? "Хороший старт. Повтори параграфы с ошибками — и результат станет выше."
                : "Не расстраивайся! Разбор внизу подскажет, с чего начать."}
          </p>
        </div>

        {mistakes.length > 0 && (
          <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50/60 p-6 shadow-card animate-fade-up">
            <p className="flex items-center gap-2 font-display text-lg font-bold text-rose-700">
              <AlertTriangle size={18} /> Разбор ошибок
            </p>
            <div className="mt-4 space-y-3">
              {mistakes.map(({ q, given }) => (
                <div key={q.id} className="rounded-xl bg-white p-4 ring-1 ring-rose-100">
                  <p className="flex items-start gap-2 text-sm font-semibold text-ink">
                    <XCircle size={16} className="mt-0.5 shrink-0 text-rose-500" />
                    {q.question}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Твой ответ:{" "}
                    <span className="font-semibold text-rose-500">{q.options[given ?? 0]}</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Правильный:{" "}
                    <span className="font-semibold text-emerald-600">{q.options[q.correct]}</span>
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{q.explain}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {mistakes.length === 0 && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-card animate-fade-up">
            <CheckCircle2 size={22} className="text-emerald-500" />
            <p className="text-sm font-semibold text-emerald-700">
              Без единой ошибки! Заработан бейдж «Точность 100%».
            </p>
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-ink p-6 text-white shadow-card animate-fade-up">
          <p className="flex items-center gap-2 font-display text-lg font-bold">
            <HelpCircle size={18} className="text-primary-400" /> Рекомендации
          </p>
          <ul className="mt-3 space-y-2">
            {getTestRecommendations(test.id).map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => startTest(test)}
            className="flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white shadow-card transition hover:shadow-lift"
          >
            <RotateCcw size={15} /> Пройти ещё раз
          </button>
          <button
            onClick={backToTests}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-ink shadow-card transition hover:border-accent-blue"
          >
            <ArrowLeft size={15} /> К другим тестам
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Вопрос ---------- */
  if (test) {
    const q = test.questions[qIndex];
    const answered = selected !== null;
    const isLast = qIndex + 1 === test.questions.length;
    const answeredSoFar = answers.filter((a) => a !== undefined).length;

    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={backToTests}
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-accent-blue"
          >
            <ArrowLeft size={15} /> Все тесты
          </button>
          <span className="text-sm font-bold text-slate-400">
            Вопрос {qIndex + 1} из {test.questions.length}
          </span>
        </div>

        <div className="mb-6">
          <ProgressBar
            value={((qIndex + (answered ? 1 : 0)) / test.questions.length) * 100}
          />
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-slate-200/80 animate-fade-up md:p-8">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-xs font-bold text-white">
              {test.title}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Верно: {answeredSoFar} / {qIndex}
            </span>
          </div>

          <h2 className="mt-5 font-display text-xl font-bold leading-snug text-ink md:text-2xl">
            {q.question}
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {q.options.map((opt, i) => {
              const isCorrect = answered && i === q.correct;
              const isWrong = answered && i === selected && i !== q.correct;
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={answered}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ${
                    isCorrect
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : isWrong
                        ? "border-rose-300 bg-rose-50 text-rose-600"
                        : answered
                          ? "border-slate-100 bg-slate-50 text-slate-400"
                          : "border-slate-200 bg-white text-slate-600 hover:border-accent-blue hover:bg-sky-50/50"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                      isCorrect
                        ? "bg-emerald-500 text-white"
                        : isWrong
                          ? "bg-rose-500 text-white"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {LETTERS[i]}
                  </span>
                  {opt}
                  {isCorrect && <CheckCircle2 size={18} className="ml-auto shrink-0 text-emerald-500" />}
                  {isWrong && <XCircle size={18} className="ml-auto shrink-0 text-rose-500" />}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600 animate-fade-up">
              <span className="font-bold text-ink">Пояснение: </span>
              {q.explain}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={next}
              disabled={!answered}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-accent-blue px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-40"
            >
              {isLast ? "Завершить тест" : "Следующий"} <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}