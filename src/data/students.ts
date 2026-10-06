export interface Student {
  id: string;
  name: string;
  className: string;
  avgScore: number;
  tasksDone: number;
  streak: number;
  status: "online" | "active" | "offline" | "help";
  lastActive: string;
}

export interface ClassPerformancePoint {
  week: string;
  avgScore: number;
  completion: number;
}

export interface ClassTestResult {
  id: string;
  student: string;
  test: string;
  score: number;
  percent: number;
}

export interface HardTopic {
  name: string;
  avgScore: number;
  attempts: number;
}

export const STUDENTS: Student[] = [
  { id: "s1", name: "Уали Жарылгап", className: "9Б", avgScore: 92, tasksDone: 37, streak: 7, status: "online", lastActive: "сейчас" },
  { id: "s2", name: "Алина Петрова", className: "9Б", avgScore: 88, tasksDone: 34, streak: 5, status: "active", lastActive: "15 мин назад" },
  { id: "s3", name: "Максим Гусев", className: "9А", avgScore: 84, tasksDone: 29, streak: 4, status: "online", lastActive: "сейчас" },
  { id: "s4", name: "Дарья Смирнова", className: "9Б", avgScore: 79, tasksDone: 24, streak: 3, status: "offline", lastActive: "2 ч назад" },
  { id: "s5", name: "Иван Козлов", className: "9А", avgScore: 74, tasksDone: 21, streak: 2, status: "active", lastActive: "10 мин назад" },
  { id: "s6", name: "София Орлова", className: "9Б", avgScore: 69, tasksDone: 18, streak: 1, status: "offline", lastActive: "1 дн назад" },
  { id: "s7", name: "Артём Никитин", className: "9Б", avgScore: 63, tasksDone: 14, streak: 2, status: "help", lastActive: "сейчас" },
  { id: "s8", name: "Егор Лебедев", className: "9А", avgScore: 58, tasksDone: 11, streak: 1, status: "help", lastActive: "5 мин назад" },
];

export const CLASS_PERFORMANCE: ClassPerformancePoint[] = [
  { week: "Сент 1", avgScore: 60, completion: 42 },
  { week: "Сент 2", avgScore: 66, completion: 51 },
  { week: "Сент 3", avgScore: 71, completion: 58 },
  { week: "Сент 4", avgScore: 76, completion: 66 },
  { week: "Окт 1", avgScore: 82, completion: 74 },
  { week: "Окт 2", avgScore: 85, completion: 80 },
];

export const CLASS_TEST_RESULTS: ClassTestResult[] = [
  { id: "r1", student: "Алина Петрова", test: "Python. Основы", score: 5, percent: 100 },
  { id: "r2", student: "Максим Гусев", test: "Алгоритмы", score: 5, percent: 100 },
  { id: "r3", student: "Уали Жарылгап", test: "Компьютерные сети", score: 4, percent: 80 },
  { id: "r4", student: "Дарья Смирнова", test: "Python. Основы", score: 4, percent: 80 },
  { id: "r5", student: "Артём Никитин", test: "Безопасность", score: 3, percent: 60 },
  { id: "r6", student: "София Орлова", test: "Сети", score: 3, percent: 60 },
];

export const HARD_TOPICS: HardTopic[] = [
  { name: "Рекурсия", avgScore: 48, attempts: 23 },
  { name: "Работа с файлами", avgScore: 55, attempts: 19 },
  { name: "SQL JOIN", avgScore: 59, attempts: 27 },
  { name: "Сложность алгоритмов", avgScore: 62, attempts: 21 },
  { name: "Стек и очередь", avgScore: 71, attempts: 17 },
];

export const TEACHER_STATS = {
  studentCount: 28,
  avgClassScore: 84,
  tasksCompleted: 156,
  onlineNow: 9,
  activeClass: "9Б",
};