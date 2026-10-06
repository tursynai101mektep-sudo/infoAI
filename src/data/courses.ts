export type Level = "beginner" | "intermediate" | "advanced";

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  level: Level;
  lessons: number;
  lessonsDone: number;
  progress: number;
  accent: string;
  tags: string[];
}

export const CATEGORIES = [
  { key: "all", label: "Все направления" },
  { key: "python", label: "Python" },
  { key: "algorithms", label: "Алгоритмы" },
  { key: "security", label: "Информационная безопасность" },
  { key: "databases", label: "Базы данных" },
  { key: "networks", label: "Компьютерные сети" },
  { key: "ai", label: "Основы ИИ" },
] as const;

export const COURSES: Course[] = [
  {
    id: "python-start",
    title: "Python с нуля",
    description: "Переменные, типы данных, ветвления и первые программы. Идеально для старта в программировании.",
    category: "python",
    icon: "python",
    level: "beginner",
    lessons: 24,
    lessonsDone: 18,
    progress: 75,
    accent: "from-sky-400 to-blue-500",
    tags: ["Основы", "Синтаксис", "Циклы"],
  },
  {
    id: "python-structures",
    title: "Списки, кортежи и словари",
    description: "Главные структуры данных Python: разбираемся на практике с примерами и задачами.",
    category: "python",
    icon: "layers",
    level: "intermediate",
    lessons: 18,
    lessonsDone: 9,
    progress: 50,
    accent: "from-emerald-400 to-teal-500",
    tags: ["Структуры данных", "Списки", "Методы"],
  },
  {
    id: "algo-basics",
    title: "Алгоритмы: от простого к сложному",
    description: "Поиск, сортировки, сложность O(n). Интерактивные визуализации каждого алгоритма.",
    category: "algorithms",
    icon: "git-branch",
    level: "intermediate",
    lessons: 20,
    lessonsDone: 4,
    progress: 20,
    accent: "from-violet-400 to-purple-500",
    tags: ["Сортировки", "Поиск", "Big O"],
  },
  {
    id: "algo-graphs",
    title: "Графы и деревья",
    description: "Обходы BFS/DFS, деревья поиска и алгоритмы на графах. Визуальные схемы для каждой задачи.",
    category: "algorithms",
    icon: "network",
    level: "advanced",
    lessons: 16,
    lessonsDone: 0,
    progress: 0,
    accent: "from-fuchsia-400 to-violet-500",
    tags: ["Графы", "BFS", "DFS"],
  },
  {
    id: "sec-basics",
    title: "Основы кибербезопасности",
    description: "Пароли, шифрование, защита данных и правила безопасности в интернете.",
    category: "security",
    icon: "shield",
    level: "beginner",
    lessons: 15,
    lessonsDone: 11,
    progress: 73,
    accent: "from-rose-400 to-pink-500",
    tags: ["Шифрование", "Пароли", "Защита"],
  },
  {
    id: "sec-networks",
    title: "Сетевая безопасность",
    description: "Что такое VPN, вредоносные программы и как защитить школьную сеть от атак.",
    category: "security",
    icon: "lock",
    level: "intermediate",
    lessons: 12,
    lessonsDone: 2,
    progress: 17,
    accent: "from-orange-400 to-rose-500",
    tags: ["VPN", "Атаки", "Защита"],
  },
  {
    id: "db-sql",
    title: "Базы данных и SQL",
    description: "Таблицы, запросы SELECT, JOIN и проектирование простых баз данных.",
    category: "databases",
    icon: "database",
    level: "intermediate",
    lessons: 19,
    lessonsDone: 13,
    progress: 68,
    accent: "from-cyan-400 to-sky-500",
    tags: ["SQL", "Таблицы", "Запросы"],
  },
  {
    id: "db-design",
    title: "Моделирование данных",
    description: "Схемы, нормализация и связи между таблицами. Практика на реальных примерах.",
    category: "databases",
    icon: "table",
    level: "advanced",
    lessons: 14,
    lessonsDone: 0,
    progress: 0,
    accent: "from-teal-400 to-cyan-500",
    tags: ["Нормализация", "Схемы", "ER-модели"],
  },
  {
    id: "net-basics",
    title: "Компьютерные сети",
    description: "IP-адреса, протоколы TCP/IP, DNS и устройство интернета — понятным языком.",
    category: "networks",
    icon: "radio",
    level: "beginner",
    lessons: 17,
    lessonsDone: 15,
    progress: 88,
    accent: "from-indigo-400 to-blue-500",
    tags: ["TCP/IP", "DNS", "IP"],
  },
  {
    id: "net-applications",
    title: "Сети: от теории к практике",
    description: "HTTP-запросы, клиент-сервер и школьные проекты по сетям.",
    category: "networks",
    icon: "wifi",
    level: "intermediate",
    lessons: 13,
    lessonsDone: 6,
    progress: 46,
    accent: "from-blue-400 to-indigo-500",
    tags: ["HTTP", "Клиент-сервер", "Практика"],
  },
  {
    id: "ai-start",
    title: "Введение в искусственный интеллект",
    description: "Как работают нейросети, машинное обучение и где применяется ИИ вокруг нас.",
    category: "ai",
    icon: "brain",
    level: "beginner",
    lessons: 16,
    lessonsDone: 16,
    progress: 100,
    accent: "from-emerald-400 to-green-500",
    tags: ["Нейросети", "ML", "Этика ИИ"],
  },
  {
    id: "ai-ml",
    title: "Машинное обучение для школьников",
    description: "Признаки, обучающие выборки и первые эксперименты с моделями.",
    category: "ai",
    icon: "sparkles",
    level: "intermediate",
    lessons: 21,
    lessonsDone: 3,
    progress: 14,
    accent: "from-green-400 to-emerald-500",
    tags: ["ML", "Признаки", "Модели"],
  },
];

export const LEVEL_META: Record<
  Level,
  { label: string; classes: string }
> = {
  beginner: { label: "Начальный", classes: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  intermediate: { label: "Средний", classes: "bg-sky-50 text-sky-600 border-sky-200" },
  advanced: { label: "Продвинутый", classes: "bg-violet-50 text-violet-600 border-violet-200" },
};