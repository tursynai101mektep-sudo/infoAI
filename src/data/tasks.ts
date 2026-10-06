export type Difficulty = "easy" | "medium" | "hard";

export interface Task {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  description: string;
  starter: string[];
  solution: string[];
  expectedOutput: string;
  hint: string;
  evaluation: number;
}

export const DIFFICULTY_META: Record<Difficulty, { label: string; classes: string }> = {
  easy: { label: "Лёгкая", classes: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  medium: { label: "Средняя", classes: "bg-amber-50 text-amber-600 border-amber-200" },
  hard: { label: "Сложная", classes: "bg-rose-50 text-rose-600 border-rose-200" },
};

export const TASKS: Task[] = [
  {
    id: "sum-1-10",
    title: "Сумма чисел от 1 до 10",
    difficulty: "easy",
    category: "Циклы",
    description:
      "Напиши программу, которая вычисляет и выводит сумму всех чисел от 1 до 10. Подсказка: используй функцию sum() вместе с range().",
    starter: [
      "# Сумма чисел от 1 до 10",
      "numbers = range(1, 11)",
      "total = sum(numbers)",
      "print(f\"Сумма: {total}\")",
    ],
    solution: [
      "numbers = range(1, 11)",
      "total = sum(numbers)",
      "print(f\"Сумма: {total}\")",
    ],
    expectedOutput: "Сумма: 55",
    hint: "range(1, 11) создаст последовательность от 1 до 10 включительно.",
    evaluation: 10,
  },
  {
    id: "even-numbers",
    title: "Чётные числа",
    difficulty: "easy",
    category: "Циклы",
    description:
      "Выведи все чётные числа от 1 до 10. Перебирай числа в цикле and проверяй остаток от деления на 2.",
    starter: [
      "# Чётные числа от 1 до 10",
      "for n in range(1, 11):",
      "    if n % 2 == 0:",
      "        print(n)",
    ],
    solution: [
      "for n in range(1, 11):",
      "    if n % 2 == 0:",
      "        print(n)",
    ],
    expectedOutput: "2\n4\n6\n8\n10",
    hint: "Число чётное, если n % 2 == 0.",
    evaluation: 12,
  },
  {
    id: "factorial",
    title: "Факториал числа",
    difficulty: "medium",
    category: "Циклы",
    description:
      "Вычисли факториал числа 5 (5! = 1·2·3·4·5) и выведи результат. Используй цикл и переменную-аккумулятор.",
    starter: [
      "# Факториал числа 5",
      "n = 5",
      "result = 1",
      "for i in range(1, n + 1):",
      "    result *= i",
      "print(result)",
    ],
    solution: [
      "n = 5",
      "result = 1",
      "for i in range(1, n + 1):",
      "    result *= i",
      "print(result)",
    ],
    expectedOutput: "120",
    hint: "На каждом шаге умножаем result на очередное число.",
    evaluation: 15,
  },
  {
    id: "list-average",
    title: "Среднее арифметическое",
    difficulty: "medium",
    category: "Списки",
    description:
      "Дан список оценок. Найди их среднее значение и выведи его с помощью round().",
    starter: [
      "# Среднее арифметическое",
      "marks = [4, 5, 3, 5, 4, 5]",
      "average = sum(marks) / len(marks)",
      "print(round(average, 2))",
    ],
    solution: [
      "marks = [4, 5, 3, 5, 4, 5]",
      "average = sum(marks) / len(marks)",
      "print(round(average, 2))",
    ],
    expectedOutput: "4.33",
    hint: "Среднее = сумма всех оценок, делённая на их количество.",
    evaluation: 12,
  },
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    difficulty: "medium",
    category: "Ветвления",
    description:
      "Для чисел от 1 до 15 выведи: «Fizz», если число делится на 3; «Buzz», если на 5; «FizzBuzz», если на 3 и на 5 одновременно; иначе само число.",
    starter: [
      "# FizzBuzz для 1..15",
      "for n in range(1, 16):",
      "    if n % 15 == 0:",
      "        print(\"FizzBuzz\")",
      "    elif n % 3 == 0:",
      "        print(\"Fizz\")",
      "    elif n % 5 == 0:",
      "        print(\"Buzz\")",
      "    else:",
      "        print(n)",
    ],
    solution: [
      "for n in range(1, 16):",
      "    if n % 15 == 0:",
      "        print(\"FizzBuzz\")",
      "    elif n % 3 == 0:",
      "        print(\"Fizz\")",
      "    elif n % 5 == 0:",
      "        print(\"Buzz\")",
      "    else:",
      "        print(n)",
    ],
    expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
    hint: "Сначала проверяй признак делимости сразу на 15.",
    evaluation: 20,
  },
  {
    id: "reverse-list",
    title: "Обратный порядок",
    difficulty: "hard",
    category: "Списки",
    description:
      "Дан список слов. Выведи его в обратном порядке — по одному слову на строке.",
    starter: [
      "# Обратный порядок слов",
      "words = [\"ии\", \"алгоритм\", \"python\"]",
      "for word in reversed(words):",
      "    print(word)",
    ],
    solution: [
      "words = [\"ии\", \"алгоритм\", \"python\"]",
      "for word in reversed(words):",
      "    print(word)",
    ],
    expectedOutput: "python\nалгоритм\nии",
    hint: "reversed() разворачивает последовательность.",
    evaluation: 15,
  },
];