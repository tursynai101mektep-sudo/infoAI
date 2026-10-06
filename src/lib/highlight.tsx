import type { ReactNode } from "react";

const KEYWORDS = new Set([
  "def", "return", "import", "from", "in", "if", "elif", "else", "while",
  "for", "and", "or", "not", "True", "False", "None", "global", "lambda",
  "pass", "break", "continue", "class", "with", "as", "try", "except",
  "finally", "raise", "is", "del", "print",
]);

const TOKEN = /(#[^\n]*|f?"[^"]*"|f?'[^']*'|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_]\w*\b|[^\w\s])/g;

export function highlightLine(line: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let key = 0;
  let match: RegExpExecArray | null;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(line)) !== null) {
    const tok = match[0];
    const next = line[match.index + tok.length];
    let cls = "text-slate-300";

    if (tok.startsWith("#")) {
      cls = "text-slate-500 italic";
    } else if (tok.includes('"') || tok.includes("'")) {
      cls = "text-emerald-400";
    } else if (KEYWORDS.has(tok)) {
      cls = "text-violet-400";
    } else if (/^\d/.test(tok)) {
      cls = "text-amber-300";
    } else if (/^[a-zA-Z_]/.test(tok) && next === "(") {
      cls = "text-sky-300";
    } else if (/^[=<>+\-*/%!&|]+$/.test(tok)) {
      cls = "text-rose-300";
    }

    nodes.push(
      <span key={key++} className={cls}>
        {tok}
      </span>
    );
  }

  return nodes;
}