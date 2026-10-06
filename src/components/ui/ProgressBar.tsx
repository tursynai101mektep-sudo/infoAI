interface ProgressBarProps {
  value: number;
  className?: string;
  barClassName?: string;
  animated?: boolean;
}

export default function ProgressBar({
  value,
  className = "",
  barClassName = "bg-gradient-to-r from-primary-400 via-accent-blue to-accent-violet",
  animated = true,
}: ProgressBarProps) {
  const width = Math.max(0, Math.min(100, value));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-100 ${className}`}>
      <div
        className={`h-full rounded-full ${barClassName} ${
          animated ? "transition-all duration-1000 ease-out" : ""
        }`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}