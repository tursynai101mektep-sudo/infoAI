export interface StudentStats {
  overallProgress: number;
  tasksSolved: number;
  tasksTotal: number;
  lessonsDone: number;
  lessonsTotal: number;
  avgTestScore: number;
  streakDays: number;
  xp: number;
}

export interface ActivityPoint {
  day: string;
  minutes: number;
  xp: number;
}

export interface DailyXpPoint {
  day: string;
  xp: number;
}

export interface ScorePoint {
  week: string;
  score: number;
}

export interface TopicProgress {
  name: string;
  percent: number;
  lessons: string;
  color: string;
}

export interface TestHistoryItem {
  id: string;
  test: string;
  category: string;
  date: string;
  score: number;
  percent: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

export interface RecentActivityItem {
  id: string;
  type: "task" | "lesson" | "test" | "ai";
  title: string;
  time: string;
  detail: string;
  positive?: boolean;
}

export const PROGRESS: StudentStats = {
  overallProgress: 68,
  tasksSolved: 37,
  tasksTotal: 42,
  lessonsDone: 74,
  lessonsTotal: 118,
  avgTestScore: 82,
  streakDays: 7,
  xp: 2450,
};

export const WEEKLY_ACTIVITY: DailyXpPoint[] = [
  { day: "Пн", xp: 60 },
  { day: "Вт", xp: 110 },
  { day: "Ср", xp: 40 },
  { day: "Чт", xp: 160 },
  { day: "Пт", xp: 90 },
  { day: "Сб", xp: 30 },
  { day: "Вс", xp: 120 },
];

export const TEST_SCORES: ScorePoint[] = [
  { week: "Н1", score: 55 },
  { week: "Н2", score: 70 },
  { week: "Н3", score: 64 },
  { week: "Н4", score: 78 },
  { week: "Н5", score: 84 },
  { week: "Н6", score: 82 },
];

export const TOPIC_PROGRESS: TopicProgress[] = [
  { name: "Основы Python", percent: 86, lessons: "12/14 уроков", color: "#10B981" },
  { name: "Циклы и ветвления", percent: 72, lessons: "8/11 уроков", color: "#38BDF8" },
  { name: "Списки и словари", percent: 55, lessons: "6/11 уроков", color: "#8B5CF6" },
  { name: "Алгоритмы", percent: 38, lessons: "4/10 уроков", color: "#F59E0B" },
  { name: "Базы данных", percent: 68, lessons: "7/10 уроков", color: "#22D3EE" },
  { name: "Компьютерные сети", percent: 88, lessons: "10/11 уроков", color: "#6366F1" },
];

export const TEST_HISTORY: TestHistoryItem[] = [
  { id: "t1", test: "Python. Основы", category: "Python", date: "18 сент", score: 5, percent: 100 },
  { id: "t2", test: "Python. Основы", category: "Python", date: "16 сент", score: 4, percent: 80 },
  { id: "t3", test: "Компьютерные сети", category: "Сети", date: "12 сент", score: 4, percent: 80 },
  { id: "t4", test: "Информационная безопасность", category: "Безопасность", date: "9 сент", score: 3, percent: 60 },
  { id: "t5", test: "Алгоритмы и сложность", category: "Алгоритмы", date: "5 сент", score: 3, percent: 60 },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-code",
    title: "Первый код",
    description: "Написал и запустил первую программу",
    icon: "terminal",
    unlocked: true,
    date: "2 сент",
  },
  {
    id: "ten-tasks",
    title: "10 задач решено",
    description: "10 задач в код-студии",
    icon: "check",
    unlocked: true,
    date: "10 сент",
  },
  {
    id: "week-streak",
    title: "Неделя обучения",
    description: "7 дней занятий подряд",
    icon: "flame",
    unlocked: true,
    date: "16 сент",
  },
  {
    id: "century",
    title: "Точность 100%",
    description: "Пройти тест без ошибок",
    icon: "star",
    unlocked: true,
    date: "18 сент",
  },
  {
    id: "thirty-tasks",
    title: "30 задач решено",
    description: "Три десятка задач в студии",
    icon: "target",
    unlocked: true,
    date: "15 сент",
  },
  {
    id: "python-master",
    title: "Python Master",
    description: "Завершить курс «Python с нуля»",
    icon: "crown",
    unlocked: false,
  },
  {
    id: "ai-friend",
    title: "Друг ИИ",
    description: "Провести 10 бесед с AI-наставником",
    icon: "bot",
    unlocked: false,
  },
  {
    id: "top-student",
    title: "Лидер класса",
    description: "Войти в топ-3 класса",
    icon: "trophy",
    unlocked: false,
  },
];

export const RECENT_ACTIVITY: RecentActivityItem[] = [
  { id: "r1", type: "task", title: "Чётные числа", time: "Сегодня, 17:12", detail: "Задача принята · +12 XP", positive: true },
  { id: "r2", type: "ai", title: "Спросил про цикл for", time: "Сегодня, 16:40", detail: "AI-наставник ответил", positive: true },
  { id: "r3", type: "test", title: "Python. Основы", time: "Сегодня, 15:58", detail: "Результат: 5/5 · 100%", positive: true },
  { id: "r4", type: "lesson", title: "Урок «Списки в Python»", time: "Вчера, 18:30", detail: "Урок пройден", positive: true },
  { id: "r5", type: "lesson", title: "Урок «Устройство сетей»", time: "Вчера, 12:05", detail: "Урок пройден", positive: true },
];

export const STUDENT = {
  name: "Уали Жарылгап",
  firstName: "Уали",
  className: "9Б",
  grade: "9 класс",
  school: "Школа №21",
  avatarColor: "from-emerald-400 to-accent-blue",
  bio: "Люблю Python и собираю роботов из LEGO. Мечтаю сделать свой проект с нейросетью.",
};