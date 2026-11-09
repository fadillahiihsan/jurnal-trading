import { useEffect, useMemo, useState } from "react";
import { format, startOfMonth } from "date-fns";
import { Activity, Plus } from "lucide-react";
import { DayDialog } from "@/components/journal/day-dialog";
import { EquityChart } from "@/components/journal/equity-chart";
import { Metrics } from "@/components/journal/metrics";
import { PnlCalendar } from "@/components/journal/pnl-calendar";
import { TradeForm } from "@/components/journal/trade-form";
import { TradeTable, type TradeFilters } from "@/components/journal/trade-table";
import { cn } from "@/lib/cn";
import {
  emptyDraft,
  isTrade,
  parseDay,
  rollupByDate,
  SEED_TRADES,
  STORAGE_KEY,
  summarize,
  tradeToDraft,
  validateDraft,
  type DraftErrors,
  type Trade,
  type TradeDraft,
} from "@/lib/journal";

function readStoredTrades(): Trade[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(isTrade);
  } catch {
    return null;
  }
}

export function JournalApp() {
  const [trades, setTrades] = useState<Trade[]>(SEED_TRADES);
  const [ready, setReady] = useState(false);
  const [cursor, setCursor] = useState(() => new Date(2026, 10, 1));
  const [today, setToday] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<TradeDraft>(() => emptyDraft());
  const [errors, setErrors] = useState<DraftErrors>({});
  const [status, setStatus] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [filters, setFilters] = useState<TradeFilters>({ symbol: "all", status: "all", date: "" });

  useEffect(() => {
    const stored = readStoredTrades();
    if (stored) {
      setTrades(stored);
      const latest = [...stored].sort((a, b) => b.date.localeCompare(a.date))[0];
      if (latest) setCursor(startOfMonth(parseDay(latest.date)));
    }
    setToday(format(new Date(), "yyyy-MM-dd"));
    setDraft((current) => ({
      ...current,
      date: format(new Date(), "yyyy-MM-dd"),
      time: format(new Date(), "HH:mm"),
    }));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trades));
  }, [ready, trades]);

  useEffect(() => {
    if (!sheetOpen || !window.matchMedia("(max-width: 1023px)").matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSheetOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [sheetOpen]);

  const stats = useMemo(() => summarize(trades), [trades]);
  const pnlByDate = useMemo(() => rollupByDate(trades), [trades]);
  const symbols = useMemo(
    () => [...new Set(trades.map((trade) => trade.symbol))].sort((a, b) => a.localeCompare(b)),
    [trades],
  );

  function focusLogger() {
    setSheetOpen(true);
    document.getElementById("trade-logger")?.scrollIntoView({ block: "nearest" });
  }

  function beginCreate(date?: string) {
    setEditingId(null);
    setErrors({});
    setStatus(null);
    setDraft(
      emptyDraft(
        date ?? today ?? format(new Date(), "yyyy-MM-dd"),
        format(new Date(), "HH:mm"),
      ),
    );
    setSelected(null);
    focusLogger();
  }

  function beginEdit(trade: Trade) {
    setEditingId(trade.id);
    setDraft(tradeToDraft(trade));
    setErrors({});
    setStatus(null);
    setSelected(null);
    setPendingDelete(null);
    focusLogger();
  }

  function cancelEdit() {
    setEditingId(null);
    setErrors({});
    setStatus(null);
    setDraft(emptyDraft(today ?? format(new Date(), "yyyy-MM-dd"), format(new Date(), "HH:mm")));
  }

  function saveDraft() {
    const result = validateDraft(draft);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus(null);
      return;
    }
    setErrors({});
    if (editingId) {
      setTrades((current) =>
        current.map((trade) => (trade.id === editingId ? { ...result.trade, id: editingId } : trade)),
      );
      setStatus("Perubahan disimpan.");
    } else {
      setTrades((current) => [...current, { ...result.trade, id: crypto.randomUUID() }]);
      setStatus("Trade tersimpan.");
    }
    setEditingId(null);
    setCursor(startOfMonth(parseDay(result.trade.date)));
    setDraft(emptyDraft(result.trade.date, draft.time));
    setSheetOpen(false);
  }

  function removeTrade(id: string) {
    setTrades((current) => current.filter((trade) => trade.id !== id));
    if (editingId === id) cancelEdit();
    setPendingDelete(null);
    setStatus("Trade dihapus.");
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-profit-soft text-profit">
              <Activity className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-xs tracking-widest text-faint">TAPE</p>
              <h1 className="text-xl font-medium tracking-tight sm:text-2xl">Trading journal</h1>
            </div>
          </div>
          <p className="mt-3 max-w-xl text-sm text-pretty text-muted">
            Kalender PnL harian, metrik, dan riwayat eksekusi. Tersimpan di perangkat ini.
          </p>
        </div>
        <button
          type="button"
          onClick={() => beginCreate()}
          className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-lg bg-fg px-3 text-sm font-medium text-bg hover:bg-fg/90 lg:hidden"
        >
          <Plus className="size-4" />
          Catat
        </button>
      </header>

      <div className="mt-6">
        <Metrics stats={stats} />
      </div>

      <div className="mt-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-4">
        <div className="min-w-0 space-y-4 lg:col-span-2">
          <PnlCalendar
            cursor={cursor}
            today={today}
            selected={selected}
            pnlByDate={pnlByDate}
            onCursor={setCursor}
            onSelect={setSelected}
          />
          <EquityChart trades={trades} />
        </div>

        <div
          className={cn(
            "lg:sticky lg:top-4",
            sheetOpen
              ? "fixed inset-0 z-40 flex items-end bg-overlay p-3 lg:static lg:inset-auto lg:z-auto lg:block lg:bg-transparent lg:p-0"
              : "mt-4 hidden lg:mt-0 lg:block",
          )}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSheetOpen(false);
          }}
        >
          <div className="max-h-[85vh] w-full overflow-y-auto rounded-2xl bg-surface p-4 shadow-pop sm:mx-auto sm:max-w-md sm:p-5 lg:max-h-none lg:max-w-none lg:overflow-visible lg:shadow-ring">
            <TradeForm
              draft={draft}
              errors={errors}
              editing={Boolean(editingId)}
              status={status}
              onChange={(next) => {
                setDraft(next);
                setStatus(null);
              }}
              onSubmit={saveDraft}
              onCancelEdit={cancelEdit}
              onClose={() => setSheetOpen(false)}
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <TradeTable
          trades={trades}
          filters={filters}
          symbols={symbols}
          pendingDelete={pendingDelete}
          onFilters={setFilters}
          onEdit={beginEdit}
          onAskDelete={setPendingDelete}
          onConfirmDelete={removeTrade}
          onCancelDelete={() => setPendingDelete(null)}
          onRestoreSample={() => {
            setTrades(SEED_TRADES);
            setCursor(new Date(2026, 10, 1));
            setStatus(null);
          }}
        />
      </div>

      <DayDialog
        date={selected}
        trades={trades}
        pendingDelete={pendingDelete}
        onClose={() => {
          setSelected(null);
          setPendingDelete(null);
        }}
        onLog={beginCreate}
        onEdit={beginEdit}
        onAskDelete={setPendingDelete}
        onConfirmDelete={removeTrade}
        onCancelDelete={() => setPendingDelete(null)}
      />
    </main>
  );
}
