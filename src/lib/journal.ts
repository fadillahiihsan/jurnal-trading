import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

export type Side = "buy" | "sell";

export type Trade = {
  id: string;
  date: string;
  time: string;
  symbol: string;
  side: Side;
  entry: number;
  exit: number;
  size: number;
  pnl: number;
  notes: string;
  setup: string;
};

export type TradeDraft = {
  date: string;
  time: string;
  symbol: string;
  side: Side;
  entry: string;
  exit: string;
  size: string;
  pnl: string;
  notes: string;
  setup: string;
};

export type DraftErrors = Partial<Record<keyof TradeDraft, string>>;

export type DayRollup = {
  pnl: number;
  count: number;
};

export type DayExtreme = {
  date: string;
  pnl: number;
};

export type JournalStats = {
  net: number;
  winRate: number;
  count: number;
  wins: number;
  losses: number;
  breakeven: number;
  profitFactor: number;
  best: DayExtreme | null;
  worst: DayExtreme | null;
  activeDays: number;
  avgDay: number;
};

export const STORAGE_KEY = "tape-journal-v1";

export const SETUP_SUGGESTIONS = [
  "Breakout",
  "ORB",
  "VWAP",
  "Pullback",
  "Mean reversion",
  "Sweep",
  "News",
  "Scalp",
];

export const SEED_TRADES: Trade[] = [
  {
    id: "seed-1",
    date: "2026-11-02",
    time: "15:10",
    symbol: "EURUSD",
    side: "buy",
    entry: 1.0842,
    exit: 1.0865,
    size: 1,
    pnl: 230,
    setup: "Breakout",
    notes: "London close continuation. Partial di resistensi harian.",
  },
  {
    id: "seed-2",
    date: "2026-11-03",
    time: "09:05",
    symbol: "GBPUSD",
    side: "sell",
    entry: 1.3124,
    exit: 1.3141,
    size: 0.8,
    pnl: -136,
    setup: "Sweep",
    notes: "Sweep Asia high gagal. Stop keburu kena sebelum NY.",
  },
  {
    id: "seed-3",
    date: "2026-11-03",
    time: "20:40",
    symbol: "NAS100",
    side: "buy",
    entry: 20120,
    exit: 20245,
    size: 2,
    pnl: 250,
    setup: "ORB",
    notes: "Open range NY, hold sampai imbalance terisi.",
  },
  {
    id: "seed-4",
    date: "2026-11-04",
    time: "16:22",
    symbol: "XAUUSD",
    side: "buy",
    entry: 2642.5,
    exit: 2658.2,
    size: 0.5,
    pnl: 785,
    setup: "Pullback",
    notes: "Pullback ke VWAP setelah data, target swing high.",
  },
  {
    id: "seed-5",
    date: "2026-11-05",
    time: "19:30",
    symbol: "USDJPY",
    side: "sell",
    entry: 152.4,
    exit: 152.85,
    size: 1.2,
    pnl: -540,
    setup: "News",
    notes: "Fade rilis. Spread melebar, ukuran terlalu besar.",
  },
  {
    id: "seed-6",
    date: "2026-11-06",
    time: "10:15",
    symbol: "BTCUSD",
    side: "buy",
    entry: 68420,
    exit: 69110,
    size: 0.15,
    pnl: 1035,
    setup: "Breakout",
    notes: "Break range Asia. Trail di atas low H1.",
  },
  {
    id: "seed-7",
    date: "2026-11-06",
    time: "14:48",
    symbol: "ETHUSD",
    side: "sell",
    entry: 3420,
    exit: 3388,
    size: 2,
    pnl: 640,
    setup: "Mean reversion",
    notes: "Deviasi dari session VWAP, tutup sebelum US cash.",
  },
  {
    id: "seed-8",
    date: "2026-11-07",
    time: "08:55",
    symbol: "EURUSD",
    side: "sell",
    entry: 1.091,
    exit: 1.0934,
    size: 1,
    pnl: -240,
    setup: "Sweep",
    notes: "Session sweep tanpa konfirmasi. Harusnya skip.",
  },
  {
    id: "seed-9",
    date: "2026-11-09",
    time: "11:05",
    symbol: "XAUUSD",
    side: "sell",
    entry: 2688,
    exit: 2674.4,
    size: 0.4,
    pnl: 544,
    setup: "VWAP",
    notes: "Reject VWAP harian. Keluar di demand kemarin.",
  },
];

export function parseDay(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year || 1970, (month || 1) - 1, day || 1);
}

export function isTrade(value: unknown): value is Trade {
  if (!value || typeof value !== "object") return false;
  const trade = value as Partial<Trade>;
  return (
    typeof trade.id === "string" &&
    typeof trade.date === "string" &&
    typeof trade.time === "string" &&
    typeof trade.symbol === "string" &&
    (trade.side === "buy" || trade.side === "sell") &&
    typeof trade.entry === "number" &&
    Number.isFinite(trade.entry) &&
    typeof trade.exit === "number" &&
    Number.isFinite(trade.exit) &&
    typeof trade.size === "number" &&
    Number.isFinite(trade.size) &&
    typeof trade.pnl === "number" &&
    Number.isFinite(trade.pnl) &&
    typeof trade.notes === "string" &&
    typeof trade.setup === "string"
  );
}

export function emptyDraft(date = "2026-11-09", time = "09:30"): TradeDraft {
  return {
    date,
    time,
    symbol: "",
    side: "buy",
    entry: "",
    exit: "",
    size: "",
    pnl: "",
    notes: "",
    setup: "",
  };
}

export function tradeToDraft(trade: Trade): TradeDraft {
  return {
    date: trade.date,
    time: trade.time,
    symbol: trade.symbol,
    side: trade.side,
    entry: String(trade.entry),
    exit: String(trade.exit),
    size: String(trade.size),
    pnl: String(trade.pnl),
    notes: trade.notes,
    setup: trade.setup,
  };
}

function toNumber(value: string): number | null {
  const trimmed = value.trim().replace(",", ".");
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function validateDraft(
  draft: TradeDraft,
): { ok: true; trade: Omit<Trade, "id"> } | { ok: false; errors: DraftErrors } {
  const errors: DraftErrors = {};
  if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.date)) errors.date = "Pilih tanggal.";
  if (!/^\d{2}:\d{2}$/.test(draft.time)) errors.time = "Isi waktu.";

  const symbol = draft.symbol.trim().toUpperCase();
  if (!symbol) errors.symbol = "Isi pair.";
  else if (symbol.length > 16) errors.symbol = "Maksimal 16 karakter.";

  const entry = toNumber(draft.entry);
  const exit = toNumber(draft.exit);
  const size = toNumber(draft.size);
  const pnl = toNumber(draft.pnl);
  if (entry == null) errors.entry = "Isi harga masuk.";
  if (exit == null) errors.exit = "Isi harga keluar.";
  if (size == null || size <= 0) errors.size = "Lot harus lebih dari 0.";
  if (pnl == null) errors.pnl = "Isi PnL. Boleh negatif.";

  if (Object.keys(errors).length > 0 || entry == null || exit == null || size == null || pnl == null) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    trade: {
      date: draft.date,
      time: draft.time,
      symbol,
      side: draft.side,
      entry,
      exit,
      size,
      pnl,
      notes: draft.notes.trim(),
      setup: draft.setup.trim(),
    },
  };
}

export function rollupByDate(trades: Trade[]): Map<string, DayRollup> {
  const map = new Map<string, DayRollup>();
  for (const trade of trades) {
    const current = map.get(trade.date) ?? { pnl: 0, count: 0 };
    current.pnl += trade.pnl;
    current.count += 1;
    map.set(trade.date, current);
  }
  return map;
}

export function summarize(trades: Trade[]): JournalStats {
  let net = 0;
  let wins = 0;
  let losses = 0;
  let breakeven = 0;
  let grossProfit = 0;
  let grossLoss = 0;

  for (const trade of trades) {
    net += trade.pnl;
    if (trade.pnl > 0) {
      wins += 1;
      grossProfit += trade.pnl;
    } else if (trade.pnl < 0) {
      losses += 1;
      grossLoss += Math.abs(trade.pnl);
    } else {
      breakeven += 1;
    }
  }

  const byDay = rollupByDate(trades);
  let best: DayExtreme | null = null;
  let worst: DayExtreme | null = null;
  for (const [date, rollup] of byDay) {
    if (!best || rollup.pnl > best.pnl) best = { date, pnl: rollup.pnl };
    if (!worst || rollup.pnl < worst.pnl) worst = { date, pnl: rollup.pnl };
  }

  const activeDays = byDay.size;
  const profitFactor = grossLoss === 0 ? (grossProfit > 0 ? Infinity : 0) : grossProfit / grossLoss;

  return {
    net,
    winRate: trades.length ? (wins / trades.length) * 100 : 0,
    count: trades.length,
    wins,
    losses,
    breakeven,
    profitFactor,
    best,
    worst,
    activeDays,
    avgDay: activeDays ? net / activeDays : 0,
  };
}

export type EquityPoint = {
  label: string;
  when: string;
  equity: number;
};

export function equityCurve(trades: Trade[]): EquityPoint[] {
  const sorted = [...trades].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    if (a.time !== b.time) return a.time.localeCompare(b.time);
    return a.id.localeCompare(b.id);
  });

  let equity = 0;
  return sorted.map((trade) => {
    equity = Math.round((equity + trade.pnl) * 100) / 100;
    const label = format(parseDay(trade.date), "d MMM", { locale: localeId });
    return {
      label,
      when: `${label} ${trade.time} · ${trade.symbol}`,
      equity,
    };
  });
}

export function formatMoney(value: number): string {
  const abs = Math.abs(value);
  const digits = Number.isInteger(abs) ? 0 : 2;
  const body = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(abs);
  if (value > 0) return `+${body}`;
  if (value < 0) return `−${body}`;
  return body;
}

export function formatCellPnl(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  const abs = Math.abs(value);
  if (abs >= 1000) {
    const thousands = abs / 1000;
    const body = thousands >= 10 ? thousands.toFixed(0) : thousands.toFixed(1).replace(/\.0$/, "");
    return `${sign}${body}k`;
  }
  const rounded = Number.isInteger(abs) ? String(Math.round(abs)) : abs.toFixed(0);
  return `${sign}${rounded}`;
}

export function formatPrice(value: number): string {
  const abs = Math.abs(value);
  const digits = abs >= 100 ? 2 : 5;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatSize(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(value);
}

export function formatPercent(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}%` : `${rounded.toFixed(1)}%`;
}

export function formatFactor(value: number): string {
  if (!Number.isFinite(value)) return "∞";
  if (value === 0) return "0";
  return value.toFixed(2);
}

export function formatDayLabel(iso: string): string {
  return format(parseDay(iso), "d MMM", { locale: localeId });
}

export function formatLongDay(iso: string): string {
  return format(parseDay(iso), "EEEE, d MMMM yyyy", { locale: localeId });
}

export function sideLabel(side: Side): string {
  return side === "buy" ? "Beli" : "Jual";
}

export function moneyTone(value: number): string {
  if (value > 0) return "text-profit";
  if (value < 0) return "text-loss";
  return "text-fg";
}

export function compareTradesDesc(a: Trade, b: Trade): number {
  if (a.date !== b.date) return b.date.localeCompare(a.date);
  if (a.time !== b.time) return b.time.localeCompare(a.time);
  return b.id.localeCompare(a.id);
}
