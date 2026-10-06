export interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explain: string;
}

export interface Test {
  id: string;
  title: string;
  category: string;
  icon: string;
  difficulty: string;
  minutes: number;
  description: string;
  questions: TestQuestion[];
}

export const TESTS: Test[] = [
  {
    id: "python-basics",
    title: "Python. Основы",
    category: "Python",
    icon: "python",
    difficulty: "Средний",
    minutes: 7,
    description: "Переменные, типы данных и синтаксис.",
    questions: [
      {
        id: 1,
        question: "Какой оператор выводит данные в Python?",
        options: ["echo()", "print()", "output()", "write()"],
        correct: 1,
        explain: "Функция print() выводит данные в консоль.",
      },
      {
        id: 2,
        question: "Какой тип данных у значения 3.14?",
        options: ["int", "str", "float", "bool"],
        correct: 2,
        explain: "Числа с плавающей точкой — это тип float.",
      },
      {
        id: 3,
        question: "Что вернёт выражение 2 ** 3?",
        options: ["6", "8", "9", "23"],
        correct: 1,
        explain: "Оператор ** возводит в степень: 2³ = 8.",
      },
      {
        id: 4,
        question: "Какой из этих литералов является корректным списком?",
        options: ["{1, 2, 3}", "(1, 2, 3)", "[1, 2, 3]", "\"1, 2, 3\""],
        correct: 2,
        explain: "Списки в Python записываются в квадратных скобках.",
      },
      {
        id: 5,
        question: "Чему равен len(\"InfoAI\")?",
        options: ["5", "6", "7", "8"],
        correct: 1,
        explain: "В строке «InfoAI» 6 символов.",
      },
    ],
  },
  {
    id: "algorithms",
    title: "Алгоритмы и сложность",
    category: "Алгоритмы",
    icon: "git-branch",
    difficulty: "Сложный",
    minutes: 8,
    description: "Сортировки, поиск и оценка сложности.",
    questions: [
      {
        id: 1,
        question: "Какова средняя сложность быстрой сортировки?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correct: 1,
        explain: "Quick sort в среднем работает за O(n log n).",
      },
      {
        id: 2,
        question: "Какой алгоритм ищет элемент в сортированном массиве за O(log n)?",
        options: ["Линейный поиск", "Бинарный поиск", "Пузырьковая сортировка", "Поиск в ширину"],
        correct: 1,
        explain: "Бинарный поиск каждый раз делит диапазон пополам.",
      },
      {
        id: 3,
        question: "Что делает операция «удалить из начала очереди»?",
        options: ["Pop_front", "Dequeue", "Push", "Enqueue"],
        correct: 1,
        explain: "Dequeue — удаление элемента из начала очереди.",
      },
      {
        id: 4,
        question: "Какая структура данных работает по принципу «последний пришёл — первый вышел»?",
        options: ["Очередь", "Стек", "Список", "Хеш-таблица"],
        correct: 1,
        explain: "Стек — это LIFO-структура.",
      },
      {
        id: 5,
        question: "Какой обход графа использует очередь для обработки вершин?",
        options: ["DFS", "BFS", "QuickSort", "MergeSort"],
        correct: 1,
        explain: "BFS (поиск в ширину) использует очередь.",
      },
    ],
  },
  {
    id: "networks",
    title: "Компьютерные сети",
    category: "Сети",
    icon: "wifi",
    difficulty: "Средний",
    minutes: 6,
    description: "IP, протоколы и устройство интернета.",
    questions: [
      {
        id: 1,
        question: "Что означает аббревиатура IP?",
        options: [
          "Internet Protocol",
          "Internal Program",
          "Information Packet",
          "Input Processor",
        ],
        correct: 0,
        explain: "IP — Internet Protocol, протокол адресации в сети.",
      },
      {
        id: 2,
        question: "Какой протокол обеспечивает надёжную доставку данных?",
        options: ["UDP", "TCP", "HTTP", "FTP"],
        correct: 1,
        explain: "TCP гарантирует доставку и проверку целостности.",
      },
      {
        id: 3,
        question: "Какой порт по умолчанию используется для HTTPS?",
        options: ["80", "443", "8080", "21"],
        correct: 1,
        explain: "HTTPS работает на порту 443.",
      },
      {
        id: 4,
        question: "Что выполняет DNS-сервер?",
        options: [
          "Проверяет пароли",
          "Преобразует доменные имена в IP-адреса",
          "Шифрует трафик",
          "Хранит веб-страницы",
        ],
        correct: 1,
        explain: "DNS превращает имена сайтов в IP-адреса.",
      },
      {
        id: 5,
        question: "Какая топология соединяет все устройства с общим кабелем?",
        options: ["Звезда", "Кольцо", "Шина", "Сетка"],
        correct: 2,
        explain: "В топологии «шина» устройства соединены общим каналом.",
      },
    ],
  },
  {
    id: "security",
    title: "Информационная безопасность",
    category: "Безопасность",
    icon: "shield",
    difficulty: "Средний",
    minutes: 6,
    description: "Пароли, шифрование и защита данных.",
    questions: [
      {
        id: 1,
        question: "Какой пароль считается самым устойчивым?",
        options: [
          "123456",
          "password",
          "Kb#7!qR2@xM",
          "qwerty",
        ],
        correct: 2,
        explain: "Сложный пароль содержит цифры, знаки и буквы разного регистра.",
      },
      {
        id: 2,
        question: "Что такое двухфакторная аутентификация?",
        options: [
          "Два разных пароля",
          "Подтверждение входа вторым способом",
          "Два логина",
          "Двойное шифрование файлов",
        ],
        correct: 1,
        explain: "2FA требует дополнительное подтверждение — код или приложение.",
      },
      {
        id: 3,
        question: "Что защищает HTTPS-соединение?",
        options: [
          "Скорость интернета",
          "Данные при передаче",
          "Устройство от вирусов",
          "Пароли от кражи",
        ],
        correct: 1,
        explain: "HTTPS шифрует данные между браузером и сервером.",
      },
      {
        id: 4,
        question: "Как называется попытка обмануть пользователя поддельным сайтом?",
        options: ["Фишинг", "Спам", "DDoS", "Кеширование"],
        correct: 0,
        explain: "Фишинг — мошенничество с поддельными страницами.",
      },
      {
        id: 5,
        question: "Что из этого является публичным ключом?",
        options: [
          "Им можно зашифровать сообщение",
          "Его нельзя никому показывать",
          "Им расшифровывают всё",
          "Это пароль от почты",
        ],
        correct: 0,
        explain: "Публичный ключ распространяется свободно и шифрует данные.",
      },
    ],
  },
];

export function getTestRecommendations(testId: string): string[] {
  const map: Record<string, string[]> = {
    "python-basics": [
      "Повтори тему «Переменные и типы данных»",
      "Реши 5 задач на print() и len()",
      "Пройди код-практику «Сумма чисел от 1 до 10»",
    ],
    algorithms: [
      "Изучи визуализацию бинарного поиска",
      "Запиши сложность основных сортировок в шпаргалку",
      "Реши задачи на стек и очередь",
    ],
    networks: [
      "Повтори таблицу портов (80, 443, 21, 22)",
      "Собери схему «звезда» в тренажёре",
      "Пройди курс «Компьютерные сети»",
    ],
    security: [
      "Составь пароль по правилам сложности",
      "Пройди тему «Шифрование»",
      "Найди признаки фишингового письма на практике",
    ],
  };
  return map[testId] ?? ["Повтори материалы курса", "Пройди сопровождающий тест"];
}