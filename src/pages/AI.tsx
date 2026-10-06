import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  Trash2,
  Sparkles,
  Lightbulb,
  GraduationCap,
  BookOpen,
  Zap,
} from "lucide-react";
import { SUGGESTED_QUESTIONS, getMockReply } from "../data/ai";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
}

const GREETING: Message = {
  id: 0,
  role: "ai",
  text:
    "Привет! Я AI-наставник InfoAI. Объясняю темы по информатике простыми словами и помогаю с задачами.\n\nЗадай вопрос — например: «Объясни, что такое цикл for в Python простыми словами». Или выбери готовый вопрос ниже.",
};

let nextId = 1;

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const autosize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setInput("");
    setMessages((prev) => [...prev, { id: ++nextId, role: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: ++nextId, role: "ai", text: getMockReply(text) },
      ]);
      setTyping(false);
    }, 850);
  };

  const clearChat = () => {
    setMessages([GREETING]);
    setTyping(false);
  };

  return (
    <div>
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-600">
          <Sparkles size={13} /> AI-наставник
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Спроси наставника
        </h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Сложная тема? Объясним простыми словами и на примерах. Пока отвечаем
          учебным демо-модулем — без интернета и API.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex h-[620px] flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-200/80">
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3.5">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 via-accent-blue to-accent-violet text-white">
                <Bot size={20} />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink">InfoAI-наставник</p>
              <p className="text-xs text-emerald-500">онлайн · отвечает мгновенно</p>
            </div>
            <button
              onClick={clearChat}
              className="ml-auto flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-400 transition hover:border-rose-200 hover:text-rose-500"
              title="Очистить чат"
            >
              <Trash2 size={14} /> Очистить
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 scrollbar-thin">
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end animate-fade-up">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-ink to-ink-soft px-4 py-3 text-sm leading-relaxed text-white shadow-card">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex items-start gap-3 animate-fade-up">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-accent-blue text-white">
                    <Bot size={17} />
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                    {m.text}
                  </div>
                </div>
              )
            )}

            {typing && (
              <div className="flex items-start gap-3 animate-fade-in">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-accent-blue text-white">
                  <Bot size={17} />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-slate-200/80 bg-slate-50 px-4 py-3.5">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.3s]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-slate-100 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (inputRef.current) autosize(inputRef.current);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder="Задай вопрос по информатике…"
                className="max-h-32 min-h-[3rem] flex-1 resize-none rounded-xl border border-slate-200 bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-accent-blue focus:bg-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-accent-blue text-white transition-all hover:opacity-90 disabled:opacity-40"
                aria-label="Отправить"
              >
                <Send size={18} />
              </button>
            </form>
            <p className="mt-2 text-center text-[11px] text-slate-400">
              Shift + Enter — перенос строки
            </p>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
            <p className="flex items-center gap-2 text-sm font-bold text-ink">
              <Lightbulb size={16} className="text-amber-400" /> Предложенные вопросы
            </p>
            <div className="mt-3 space-y-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="w-full rounded-xl bg-slate-50 px-3.5 py-2.5 text-left text-sm leading-snug text-slate-600 transition hover:bg-sky-50 hover:text-accent-blue"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-ink p-5 text-white shadow-card">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Sparkles size={16} className="text-primary-400" /> Что умеет?
            </p>
            <div className="mt-3 space-y-3 text-sm text-slate-300">
              <p className="flex items-start gap-2">
                <GraduationCap size={15} className="mt-0.5 shrink-0 text-primary-400" />
                Объяснять темы простыми словами
              </p>
              <p className="flex items-start gap-2">
                <BookOpen size={15} className="mt-0.5 shrink-0 text-accent-blue" />
                Подбирать примеры кода
              </p>
              <p className="flex items-start gap-2">
                <Zap size={15} className="mt-0.5 shrink-0 text-accent-violet" />
                Находить твои слабые места
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}