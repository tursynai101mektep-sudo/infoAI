interface RingProgressProps {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
  trackClass?: string;
  barClass?: string;
}

export default function RingProgress({
  value,
  size = 140,
  stroke = 12,
  label,
  sublabel,
  trackClass = "stroke-slate-100",
  barClass = "stroke-ink",
}: RingProgressProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, value)) / 100) * c;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className={trackClass}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className={`${barClass} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        {label && (
          <span className="font-display font-bold text-ink" style={{ fontSize: size / 4.4 }}>
            {label}
          </span>
        )}
        {sublabel && <span className="mt-1 text-xs font-medium text-slate-400">{sublabel}</span>}
      </div>
    </div>
  );
}