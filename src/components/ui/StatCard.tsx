import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
  iconClasses?: string;
  trend?: string;
  trendPositive?: boolean;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  iconClasses = "bg-emerald-50 text-emerald-600",
  trend,
  trendPositive = true,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClasses}`}>
          <Icon size={20} />
        </div>
        {trend && (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-bold ${
              trendPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-3xl font-bold tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}