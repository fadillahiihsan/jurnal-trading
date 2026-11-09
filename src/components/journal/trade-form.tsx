import type { ReactNode } from "react";
import { X } from "lucide-react";
import { SETUP_SUGGESTIONS, type DraftErrors, type TradeDraft } from "@/lib/journal";
import { cn } from "@/lib/cn";

type Props = {
  draft: TradeDraft;
  errors: DraftErrors;
  editing: boolean;
  status: string | null;
  onChange: (next: TradeDraft) => void;
  onSubmit: () => void;
  onCancelEdit: () => void;
  onClose?: () => void;
};

const fieldClass =
  "h-11 w-full rounded-lg bg-bg px-3 text-sm text-fg shadow-ring outline-none placeholder:text-faint focus-visible:ring-2 focus-visible:ring-fg/30";

export function TradeForm({
  draft,
  errors,
  editing,
  status,
  onChange,
  onSubmit,
  onCancelEdit,
  onClose,
}: Props) {
  function patch(partial: Partial<TradeDraft>) {
    onChange({ ...draft, ...partial });
  }

  return (
    <form
      id="trade-logger"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-medium">{editing ? "Ubah trade" : "Catat trade"}</h2>
          <p className="mt-1 text-xs text-faint">PnL diisi manual, bukan dihitung dari harga.</p>
        </div>
        {onClose ? (
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg lg:hidden"
            aria-label="Tutup form"
            onClick={onClose}
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Field label="Tanggal" id="trade-date" error={errors.date}>
          <input
            id="trade-date"
            type="date"
            required
            value={draft.date}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "trade-date-error" : undefined}
            onChange={(event) => patch({ date: event.target.value })}
            className={fieldClass}
          />
        </Field>
        <Field label="Waktu" id="trade-time" error={errors.time}>
          <input
            id="trade-time"
            type="time"
            required
            value={draft.time}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={errors.time ? "trade-time-error" : undefined}
            onChange={(event) => patch({ time: event.target.value })}
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="mt-3">
        <Field label="Pair" id="trade-symbol" error={errors.symbol}>
          <input
            id="trade-symbol"
            value={draft.symbol}
            placeholder="EURUSD"
            autoCapitalize="characters"
            autoComplete="off"
            aria-invalid={Boolean(errors.symbol)}
            aria-describedby={errors.symbol ? "trade-symbol-error" : undefined}
            onChange={(event) => patch({ symbol: event.target.value.toUpperCase() })}
            className={cn(fieldClass, "font-mono uppercase")}
          />
        </Field>
      </div>

      <div className="mt-3">
        <p className="mb-1.5 text-xs text-muted">Arah</p>
        <div className="grid grid-cols-2 gap-1 rounded-lg bg-bg p-1 shadow-ring">
          {(
            [
              ["buy", "Beli"],
              ["sell", "Jual"],
            ] as const
          ).map(([side, label]) => (
            <button
              key={side}
              type="button"
              aria-pressed={draft.side === side}
              onClick={() => patch({ side })}
              className={cn(
                "h-10 rounded-md text-sm",
                draft.side === side ? "bg-surface-2 text-fg shadow-ring" : "text-muted hover:text-fg",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Field label="Harga masuk" id="trade-entry" error={errors.entry}>
          <input
            id="trade-entry"
            inputMode="decimal"
            value={draft.entry}
            placeholder="1.0842"
            aria-invalid={Boolean(errors.entry)}
            aria-describedby={errors.entry ? "trade-entry-error" : undefined}
            onChange={(event) => patch({ entry: event.target.value })}
            onWheel={(event) => event.currentTarget.blur()}
            className={cn(fieldClass, "font-mono tabular-nums")}
          />
        </Field>
        <Field label="Harga keluar" id="trade-exit" error={errors.exit}>
          <input
            id="trade-exit"
            inputMode="decimal"
            value={draft.exit}
            placeholder="1.0865"
            aria-invalid={Boolean(errors.exit)}
            aria-describedby={errors.exit ? "trade-exit-error" : undefined}
            onChange={(event) => patch({ exit: event.target.value })}
            onWheel={(event) => event.currentTarget.blur()}
            className={cn(fieldClass, "font-mono tabular-nums")}
          />
        </Field>
        <Field label="Lot / size" id="trade-size" error={errors.size}>
          <input
            id="trade-size"
            inputMode="decimal"
            value={draft.size}
            placeholder="0.50"
            aria-invalid={Boolean(errors.size)}
            aria-describedby={errors.size ? "trade-size-error" : undefined}
            onChange={(event) => patch({ size: event.target.value })}
            onWheel={(event) => event.currentTarget.blur()}
            className={cn(fieldClass, "font-mono tabular-nums")}
          />
        </Field>
        <Field label="PnL $" id="trade-pnl" error={errors.pnl}>
          <input
            id="trade-pnl"
            inputMode="decimal"
            value={draft.pnl}
            placeholder="-120 atau 340"
            aria-invalid={Boolean(errors.pnl)}
            aria-describedby={errors.pnl ? "trade-pnl-error" : undefined}
            onChange={(event) => patch({ pnl: event.target.value })}
            onWheel={(event) => event.currentTarget.blur()}
            className={cn(fieldClass, "font-mono tabular-nums")}
          />
        </Field>
      </div>

      <div className="mt-3">
        <Field label="Setup" id="trade-setup" error={errors.setup}>
          <input
            id="trade-setup"
            list="setup-suggestions"
            value={draft.setup}
            placeholder="Breakout, VWAP, ORB…"
            autoComplete="off"
            onChange={(event) => patch({ setup: event.target.value })}
            className={fieldClass}
          />
          <datalist id="setup-suggestions">
            {SETUP_SUGGESTIONS.map((setup) => (
              <option key={setup} value={setup} />
            ))}
          </datalist>
        </Field>
      </div>

      <div className="mt-3">
        <Field label="Catatan" id="trade-notes" error={errors.notes}>
          <textarea
            id="trade-notes"
            rows={3}
            value={draft.notes}
            placeholder="Konteks masuk, kesalahan, atau alasan keluar."
            onChange={(event) => patch({ notes: event.target.value })}
            className={cn(fieldClass, "h-auto resize-y py-2.5 leading-normal")}
          />
        </Field>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="submit"
          className="h-11 rounded-lg bg-fg px-4 text-sm font-medium text-bg hover:bg-fg/90"
        >
          {editing ? "Simpan perubahan" : "Simpan trade"}
        </button>
        {editing ? (
          <button
            type="button"
            onClick={onCancelEdit}
            className="h-11 rounded-lg text-sm text-muted hover:bg-surface-2 hover:text-fg"
          >
            Batal ubah
          </button>
        ) : null}
        {status ? <p className="text-center text-xs text-profit">{status}</p> : null}
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs text-muted">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-loss">
          {error}
        </p>
      ) : null}
    </div>
  );
}
