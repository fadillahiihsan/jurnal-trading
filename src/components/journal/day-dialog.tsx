import * as Dialog from "@radix-ui/react-dialog";
import { Pencil, Trash2, X } from "lucide-react";
import {
  compareTradesDesc,
  formatLongDay,
  formatMoney,
  formatPrice,
  formatSize,
  moneyTone,
  sideLabel,
  type Trade,
} from "@/lib/journal";
import { cn } from "@/lib/cn";

type Props = {
  date: string | null;
  trades: Trade[];
  pendingDelete: string | null;
  onClose: () => void;
  onLog: (date: string) => void;
  onEdit: (trade: Trade) => void;
  onAskDelete: (id: string) => void;
  onConfirmDelete: (id: string) => void;
  onCancelDelete: () => void;
};

export function DayDialog({
  date,
  trades,
  pendingDelete,
  onClose,
  onLog,
  onEdit,
  onAskDelete,
  onConfirmDelete,
  onCancelDelete,
}: Props) {
  const dayTrades = date ? trades.filter((trade) => trade.date === date).sort(compareTradesDesc) : [];
  const net = dayTrades.reduce((sum, trade) => sum + trade.pnl, 0);

  return (
    <Dialog.Root open={Boolean(date)} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-overlay" />
        <Dialog.Content className="rise fixed inset-x-3 bottom-3 z-50 max-h-[85vh] overflow-y-auto rounded-2xl bg-surface p-4 shadow-pop focus:outline-none sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:p-5">
          {date ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Dialog.Title className="text-base font-medium capitalize">
                    {formatLongDay(date)}
                  </Dialog.Title>
                  <Dialog.Description className="mt-1 text-xs text-faint">
                    {dayTrades.length
                      ? `${dayTrades.length} eksekusi`
                      : "Tidak ada eksekusi di tanggal ini."}
                  </Dialog.Description>
                </div>
                <Dialog.Close
                  className="grid size-11 shrink-0 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg"
                  aria-label="Tutup"
                >
                  <X className="size-4" />
                </Dialog.Close>
              </div>

              <p className={cn("mt-4 font-mono text-3xl font-medium tabular-nums", dayTrades.length ? moneyTone(net) : "text-faint")}>
                {dayTrades.length ? formatMoney(net) : "—"}
              </p>
              <p className="text-xs text-faint">Net hari ini</p>

              <ul className="mt-4 divide-y divide-line">
                {dayTrades.map((trade) => (
                  <li key={trade.id} className="py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{trade.symbol}</span>
                          <span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-xs text-muted">
                            {sideLabel(trade.side)}
                          </span>
                          {trade.setup ? (
                            <span className="truncate text-xs text-faint">{trade.setup}</span>
                          ) : null}
                        </div>
                        <p className="mt-1 font-mono text-xs tabular-nums text-muted">
                          {trade.time} · {formatPrice(trade.entry)} → {formatPrice(trade.exit)} · {formatSize(trade.size)} lot
                        </p>
                        {trade.notes ? (
                          <p className="mt-1 text-sm text-pretty text-muted">{trade.notes}</p>
                        ) : null}
                      </div>
                      <span className={cn("shrink-0 font-mono text-sm tabular-nums", moneyTone(trade.pnl))}>
                        {formatMoney(trade.pnl)}
                      </span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(trade)}
                        className="inline-flex h-11 items-center gap-1.5 rounded-lg px-3 text-sm text-muted hover:bg-surface-2 hover:text-fg"
                      >
                        <Pencil className="size-3.5" />
                        Ubah
                      </button>
                      {pendingDelete === trade.id ? (
                        <>
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
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onAskDelete(trade.id)}
                          className="inline-flex h-11 items-center gap-1.5 rounded-lg px-3 text-sm text-muted hover:bg-surface-2 hover:text-fg"
                        >
                          <Trash2 className="size-3.5" />
                          Hapus
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => onLog(date)}
                className="mt-2 h-11 w-full rounded-lg bg-fg text-sm font-medium text-bg hover:bg-fg/90"
              >
                Catat trade di tanggal ini
              </button>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
