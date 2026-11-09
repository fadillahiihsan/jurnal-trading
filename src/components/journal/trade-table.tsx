import { Pencil, Trash2 } from "lucide-react";
import {
  compareTradesDesc,
  formatDayLabel,
  formatMoney,
  formatPrice,
  formatSize,
  moneyTone,
  sideLabel,
  type Trade,
} from "@/lib/journal";
import { cn } from "@/lib/cn";

export type TradeFilters = {
  symbol: string;
  status: "all" | "win" | "loss";
  date: string;
};

type Props = {
  trades: Trade[];
  filters: TradeFilters;
  symbols: string[];
  pendingDelete: string | null;
  onFilters: (next: TradeFilters) => void;
  onEdit: (trade: Trade) => void;
  onAskDelete: (id: string) => void;
  onConfirmDelete: (id: string) => void;
  onCancelDelete: () => void;
  onRestoreSample: () => void;
};

const controlClass =
  "h-11 w-full rounded-lg bg-bg px-3 text-sm text-fg shadow-ring outline-none focus-visible:ring-2 focus-visible:ring-fg/30 sm:w-auto";

export function filterTrades(trades: Trade[], filters: TradeFilters): Trade[] {
  return trades
    .filter((trade) => {
      if (filters.symbol !== "all" && trade.symbol !== filters.symbol) return false;
      if (filters.date && trade.date !== filters.date) return false;
      if (filters.status === "win" && trade.pnl <= 0) return false;
      if (filters.status === "loss" && trade.pnl >= 0) return false;
      return true;
    })
    .sort(compareTradesDesc);
}

export function TradeTable({
  trades,
  filters,
  symbols,
  pendingDelete,
  onFilters,
  onEdit,
  onAskDelete,
  onConfirmDelete,
  onCancelDelete,
  onRestoreSample,
}: Props) {
  const symbol =
    filters.symbol === "all" || symbols.includes(filters.symbol) ? filters.symbol : "all";
  const applied = { ...filters, symbol };
  const rows = filterTrades(trades, applied);
  const filtering = applied.symbol !== "all" || applied.status !== "all" || Boolean(applied.date);

  return (
    <section className="rounded-2xl bg-surface p-3 shadow-ring sm:p-5" aria-label="Riwayat trade">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-base font-medium">Riwayat</h2>
          <p className="mt-0.5 text-xs text-faint">
            {rows.length} dari {trades.length} trade
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <select
            aria-label="Filter pair"
            className={controlClass}
            value={symbol}
            onChange={(event) => onFilters({ ...filters, symbol: event.target.value })}
          >
            <option value="all">Semua pair</option>
            {symbols.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter hasil"
            className={controlClass}
            value={filters.status}
            onChange={(event) =>
              onFilters({ ...filters, status: event.target.value as TradeFilters["status"] })
            }
          >
            <option value="all">Semua hasil</option>
            <option value="win">Menang</option>
            <option value="loss">Kalah</option>
          </select>
          <input
            aria-label="Filter tanggal"
            type="date"
            className={cn(controlClass, "col-span-2 sm:col-span-1")}
            value={filters.date}
            onChange={(event) => onFilters({ ...filters, date: event.target.value })}
          />
          {filtering ? (
            <button
              type="button"
              className="col-span-2 h-11 rounded-lg px-3 text-sm text-muted hover:bg-surface-2 hover:text-fg sm:col-span-1"
              onClick={() => onFilters({ symbol: "all", status: "all", date: "" })}
            >
              Reset filter
            </button>
          ) : null}
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="px-2 py-10 text-center">
          <p className="text-sm text-muted">
            {trades.length === 0 ? "Jurnal masih kosong." : "Tidak ada trade untuk filter ini."}
          </p>
          {trades.length === 0 ? (
            <button
              type="button"
              onClick={onRestoreSample}
              className="mt-3 h-11 rounded-lg px-4 text-sm text-fg hover:bg-surface-2"
            >
              Muat contoh
            </button>
          ) : null}
        </div>
      ) : (
        <>
          <ul className="mt-4 space-y-2 md:hidden">
            {rows.map((trade) => (
              <li key={trade.id} className="rounded-xl bg-bg p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{trade.symbol}</span>
                      <span className="text-xs text-faint">{sideLabel(trade.side)}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted">
                      {formatDayLabel(trade.date)} {trade.time}
                      {trade.setup ? ` · ${trade.setup}` : ""}
                    </p>
                  </div>
                  <span className={cn("font-mono text-sm tabular-nums", moneyTone(trade.pnl))}>
                    {formatMoney(trade.pnl)}
                  </span>
                </div>
                <p className="mt-2 font-mono text-xs tabular-nums text-faint">
                  {formatPrice(trade.entry)} → {formatPrice(trade.exit)} · {formatSize(trade.size)} lot
                </p>
                {trade.notes ? <p className="mt-1 line-clamp-2 text-sm text-muted">{trade.notes}</p> : null}
                <RowActions
                  trade={trade}
                  pendingDelete={pendingDelete}
                  onEdit={onEdit}
                  onAskDelete={onAskDelete}
                  onConfirmDelete={onConfirmDelete}
                  onCancelDelete={onCancelDelete}
                />
              </li>
            ))}
          </ul>

          <div className="mt-4 hidden max-h-[32rem] overflow-auto md:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="sticky top-0 bg-surface text-xs text-faint">
                <tr>
                  <th className="px-2 py-2 font-medium">Tanggal</th>
                  <th className="px-2 py-2 font-medium">Pair</th>
                  <th className="px-2 py-2 font-medium">Arah</th>
                  <th className="px-2 py-2 text-right font-medium">Masuk</th>
                  <th className="px-2 py-2 text-right font-medium">Keluar</th>
                  <th className="px-2 py-2 text-right font-medium">Lot</th>
                  <th className="px-2 py-2 text-right font-medium">PnL</th>
                  <th className="px-2 py-2 font-medium">Setup</th>
                  <th className="px-2 py-2 font-medium">Catatan</th>
                  <th className="px-2 py-2 font-medium">
                    <span className="sr-only">Aksi</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((trade) => (
                  <tr key={trade.id} className="border-t border-line">
                    <td className="whitespace-nowrap px-2 py-2 font-mono text-xs tabular-nums text-muted">
                      {formatDayLabel(trade.date)}
                      <span className="block text-faint">{trade.time}</span>
                    </td>
                    <td className="px-2 py-2 font-medium">{trade.symbol}</td>
                    <td className="px-2 py-2 text-muted">{sideLabel(trade.side)}</td>
                    <td className="px-2 py-2 text-right font-mono text-xs tabular-nums">{formatPrice(trade.entry)}</td>
                    <td className="px-2 py-2 text-right font-mono text-xs tabular-nums">{formatPrice(trade.exit)}</td>
                    <td className="px-2 py-2 text-right font-mono text-xs tabular-nums">{formatSize(trade.size)}</td>
                    <td className={cn("px-2 py-2 text-right font-mono text-xs tabular-nums", moneyTone(trade.pnl))}>
                      {formatMoney(trade.pnl)}
                    </td>
                    <td className="max-w-32 truncate px-2 py-2 text-muted">{trade.setup || "—"}</td>
                    <td className="max-w-48 truncate px-2 py-2 text-muted">{trade.notes || "—"}</td>
                    <td className="px-2 py-2">
                      <RowActions
                        trade={trade}
                        pendingDelete={pendingDelete}
                        compact
                        onEdit={onEdit}
                        onAskDelete={onAskDelete}
                        onConfirmDelete={onConfirmDelete}
                        onCancelDelete={onCancelDelete}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

function RowActions({
  trade,
  pendingDelete,
  compact = false,
  onEdit,
  onAskDelete,
  onConfirmDelete,
  onCancelDelete,
}: {
  trade: Trade;
  pendingDelete: string | null;
  compact?: boolean;
  onEdit: (trade: Trade) => void;
  onAskDelete: (id: string) => void;
  onConfirmDelete: (id: string) => void;
  onCancelDelete: () => void;
}) {
  if (pendingDelete === trade.id) {
    return (
      <div className={cn("flex items-center gap-1", compact ? "" : "mt-2")}>
        <button
          type="button"
          onClick={() => onConfirmDelete(trade.id)}
          className="h-11 rounded-lg px-3 text-sm text-loss hover:bg-loss-soft"
        >
          Hapus
        </button>
        <button
          type="button"
          onClick={onCancelDelete}
          className="h-11 rounded-lg px-3 text-sm text-muted hover:bg-surface-2"
        >
          Batal
        </button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", compact ? "" : "mt-2")}>
      <button
        type="button"
        aria-label={`Ubah ${trade.symbol}`}
        onClick={() => onEdit(trade)}
        className="grid size-11 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg"
      >
        <Pencil className="size-4" />
      </button>
      <button
        type="button"
        aria-label={`Hapus ${trade.symbol}`}
        onClick={() => onAskDelete(trade.id)}
        className="grid size-11 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
