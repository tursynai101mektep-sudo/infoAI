import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="rounded-2xl bg-ink px-6 py-4 font-mono text-sm text-primary-400 shadow-lift">
        <p><span className="text-slate-500">$</span> page not found</p>
        <p className="text-slate-400">› Ошибка 404</p>
      </div>
      <h1 className="mt-6 font-display text-3xl font-bold text-ink">Такой страницы нет</h1>
      <p className="mt-2 max-w-md text-slate-500">
        Кажется, мы забрели не в тот каталог. Вернись на главную — там точно найдётся что поучить.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white shadow-card transition hover:shadow-lift"
        >
          <Home size={16} /> На главную
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-ink shadow-card transition hover:border-accent-blue"
        >
          <ArrowLeft size={16} /> Назад
        </button>
      </div>
    </div>
  );
}