import {
  formatDayLabel,
  formatFactor,
  formatMoney,
  formatPercent,
  moneyTone,
  type JournalStats,
} from "@/lib/journal";
import { cn } from "@/lib/cn";

type Metric = {
  label: string;
  value: string;
  hint: string;
  tone?: string;
};

function metrics(stats: JournalStats): Metric[] {
  return [
    {
      label: "Net PnL",
      value: stats.count ? formatMoney(stats.net) : "—",
      hint: stats.activeDays ? `${formatMoney(stats.avgDay)} / hari` : "Belum ada trade",
      tone: stats.count ? moneyTone(stats.net) : "text-fg",
    },
    {
      label: "Win rate",
      value: stats.count ? formatPercent(stats.winRate) : "—",
      hint: stats.count
        ? `${stats.wins} menang · ${stats.losses} kalah${stats.breakeven ? ` · ${stats.breakeven} BE` : ""}`
        : "Menang / semua trade",
    },
    {
      label: "Trades",
      value: stats.count ? String(stats.count) : "—",
      hint: stats.activeDays ? `${stats.activeDays} hari aktif` : "Total eksekusi",
    },
    {
      label: "Profit factor",
      value: stats.count ? formatFactor(stats.profitFactor) : "—",
      hint: "Profit kotor / loss kotor",
    },
    {
      label: "Best day",
      value: stats.best ? formatMoney(stats.best.pnl) : "—",
      hint: stats.best ? formatDayLabel(stats.best.date) : "Hari dengan net tertinggi",
      tone: stats.best ? "text-profit" : "text-fg",
    },
    {
      label: "Worst day",
      value: stats.worst ? formatMoney(stats.worst.pnl) : "—",
      hint: stats.worst ? formatDayLabel(stats.worst.date) : "Hari dengan net terendah",
      tone: stats.worst ? "text-loss" : "text-fg",
    },
  ];
}

export function Metrics({ stats }: { stats: JournalStats }) {
  return (
    <section
      aria-label="Ringkasan"
      className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line shadow-ring sm:grid-cols-3 xl:grid-cols-6"
    >
      {metrics(stats).map((item) => (
        <div key={item.label} className="bg-surface px-4 py-4">
          <p className="text-xs text-muted">{item.label}</p>
          <p className={cn("mt-2 font-mono text-xl font-medium tabular-nums tracking-tight", item.tone)}>
            {item.value}
          </p>
          <p className="mt-1 truncate text-xs text-faint">{item.hint}</p>
        </div>
      ))}
    </section>
  );
}
