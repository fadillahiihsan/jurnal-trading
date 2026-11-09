import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { id as localeId } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatCellPnl, formatMoney, type DayRollup } from "@/lib/journal";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["Sn", "Sl", "Rb", "Km", "Jm", "Sb", "Mg"];

type Props = {
  cursor: Date;
  today: string | null;
  selected: string | null;
  pnlByDate: Map<string, DayRollup>;
  onCursor: (next: Date) => void;
  onSelect: (iso: string) => void;
};

function toneClass(pnl: number | null, outside: boolean): string {
  if (outside && pnl == null) return "text-faint/70";
  if (pnl == null) return "text-muted hover:bg-surface-2";
  if (pnl > 0) return "bg-profit-soft text-profit hover:bg-profit-soft";
  if (pnl < 0) return "bg-loss-soft text-loss hover:bg-loss-soft";
  return "bg-flat text-muted hover:bg-flat";
}

export function PnlCalendar({ cursor, today, selected, pnlByDate, onCursor, onSelect }: Props) {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 }),
  });

  const monthKey = format(cursor, "yyyy-MM");
  let monthNet = 0;
  let monthDays = 0;
  let monthTrades = 0;
  for (const [date, rollup] of pnlByDate) {
    if (!date.startsWith(monthKey)) continue;
    monthNet += rollup.pnl;
    monthDays += 1;
    monthTrades += rollup.count;
  }

  return (
    <section className="rounded-2xl bg-surface p-3 shadow-ring sm:p-5" aria-label="Kalender PnL">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-medium capitalize">
            {format(cursor, "LLLL yyyy", { locale: localeId })}
          </h2>
          <p className={cn("mt-0.5 text-xs", monthTrades ? "text-muted" : "text-faint")}>
            {monthTrades
              ? `${formatMoney(monthNet)} · ${monthDays} hari · ${monthTrades} trade`
              : "Tidak ada eksekusi bulan ini"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg"
            aria-label="Bulan sebelumnya"
            onClick={() => onCursor(addMonths(cursor, -1))}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            className="h-11 rounded-lg px-2 text-sm text-muted hover:bg-surface-2 hover:text-fg"
            onClick={() => onCursor(startOfMonth(today ? new Date() : cursor))}
          >
            Hari ini
          </button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg"
            aria-label="Bulan berikutnya"
            onClick={() => onCursor(addMonths(cursor, 1))}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day) => (
          <div key={day} className="pb-1 text-center font-mono text-xs text-faint">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const iso = format(day, "yyyy-MM-dd");
          const rollup = pnlByDate.get(iso) ?? null;
          const outside = !isSameMonth(day, cursor);
          const isSelected = selected === iso;
          const isToday = today === iso;
          return (
            <button
              key={iso}
              type="button"
              onClick={() => onSelect(iso)}
              aria-pressed={isSelected}
              aria-current={isToday ? "date" : undefined}
              aria-label={
                rollup
                  ? `${format(day, "d MMMM yyyy", { locale: localeId })}, ${formatMoney(rollup.pnl)}, ${rollup.count} trade`
                  : `${format(day, "d MMMM yyyy", { locale: localeId })}, tidak ada trade`
              }
              className={cn(
                "flex h-16 flex-col justify-between rounded-lg px-1 py-1.5 text-left sm:h-24 sm:px-2 sm:py-2",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40",
                toneClass(rollup?.pnl ?? null, outside),
                outside && "opacity-45",
                isSelected && "ring-2 ring-fg/80",
                !isSelected && isToday && "ring-1 ring-fg/35",
              )}
            >
              <span className="font-mono text-xs tabular-nums">{format(day, "d")}</span>
              {rollup ? (
                <span className="truncate font-mono text-xs font-medium tabular-nums sm:text-sm">
                  {formatCellPnl(rollup.pnl)}
                </span>
              ) : (
                <span className="sr-only">kosong</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-sm bg-profit-soft ring-1 ring-profit/50" />
          Profit
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-sm bg-loss-soft ring-1 ring-loss/50" />
          Loss
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-sm bg-flat ring-1 ring-line" />
          Impas
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-sm bg-surface ring-1 ring-line" />
          Tanpa trade
        </span>
      </div>
    </section>
  );
}
