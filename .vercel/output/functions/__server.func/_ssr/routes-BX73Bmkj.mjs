import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Pencil, c as Activity, i as Plus, o as ChevronRight, r as Trash2, s as ChevronLeft, t as X } from "../_libs/lucide-react.mjs";
import { a as startOfMonth, c as startOfWeek, i as endOfWeek, l as addMonths, n as isSameMonth, o as eachDayOfInterval, r as format, s as endOfMonth, t as id } from "../_libs/date-fns.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as Tooltip, i as ResponsiveContainer, n as YAxis, r as Area, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BX73Bmkj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "tape-journal-v1";
var SETUP_SUGGESTIONS = [
	"Breakout",
	"ORB",
	"VWAP",
	"Pullback",
	"Mean reversion",
	"Sweep",
	"News",
	"Scalp"
];
var SEED_TRADES = [
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
		notes: "London close continuation. Partial di resistensi harian."
	},
	{
		id: "seed-2",
		date: "2026-11-03",
		time: "09:05",
		symbol: "GBPUSD",
		side: "sell",
		entry: 1.3124,
		exit: 1.3141,
		size: .8,
		pnl: -136,
		setup: "Sweep",
		notes: "Sweep Asia high gagal. Stop keburu kena sebelum NY."
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
		notes: "Open range NY, hold sampai imbalance terisi."
	},
	{
		id: "seed-4",
		date: "2026-11-04",
		time: "16:22",
		symbol: "XAUUSD",
		side: "buy",
		entry: 2642.5,
		exit: 2658.2,
		size: .5,
		pnl: 785,
		setup: "Pullback",
		notes: "Pullback ke VWAP setelah data, target swing high."
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
		notes: "Fade rilis. Spread melebar, ukuran terlalu besar."
	},
	{
		id: "seed-6",
		date: "2026-11-06",
		time: "10:15",
		symbol: "BTCUSD",
		side: "buy",
		entry: 68420,
		exit: 69110,
		size: .15,
		pnl: 1035,
		setup: "Breakout",
		notes: "Break range Asia. Trail di atas low H1."
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
		notes: "Deviasi dari session VWAP, tutup sebelum US cash."
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
		notes: "Session sweep tanpa konfirmasi. Harusnya skip."
	},
	{
		id: "seed-9",
		date: "2026-11-09",
		time: "11:05",
		symbol: "XAUUSD",
		side: "sell",
		entry: 2688,
		exit: 2674.4,
		size: .4,
		pnl: 544,
		setup: "VWAP",
		notes: "Reject VWAP harian. Keluar di demand kemarin."
	}
];
function parseDay(iso) {
	const [year, month, day] = iso.split("-").map(Number);
	return new Date(year || 1970, (month || 1) - 1, day || 1);
}
function isTrade(value) {
	if (!value || typeof value !== "object") return false;
	const trade = value;
	return typeof trade.id === "string" && typeof trade.date === "string" && typeof trade.time === "string" && typeof trade.symbol === "string" && (trade.side === "buy" || trade.side === "sell") && typeof trade.entry === "number" && Number.isFinite(trade.entry) && typeof trade.exit === "number" && Number.isFinite(trade.exit) && typeof trade.size === "number" && Number.isFinite(trade.size) && typeof trade.pnl === "number" && Number.isFinite(trade.pnl) && typeof trade.notes === "string" && typeof trade.setup === "string";
}
function emptyDraft(date = "2026-11-09", time = "09:30") {
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
		setup: ""
	};
}
function tradeToDraft(trade) {
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
		setup: trade.setup
	};
}
function toNumber(value) {
	const trimmed = value.trim().replace(",", ".");
	if (!trimmed) return null;
	const parsed = Number(trimmed);
	return Number.isFinite(parsed) ? parsed : null;
}
function validateDraft(draft) {
	const errors = {};
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
	if (Object.keys(errors).length > 0 || entry == null || exit == null || size == null || pnl == null) return {
		ok: false,
		errors
	};
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
			setup: draft.setup.trim()
		}
	};
}
function rollupByDate(trades) {
	const map = /* @__PURE__ */ new Map();
	for (const trade of trades) {
		const current = map.get(trade.date) ?? {
			pnl: 0,
			count: 0
		};
		current.pnl += trade.pnl;
		current.count += 1;
		map.set(trade.date, current);
	}
	return map;
}
function summarize(trades) {
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
		} else breakeven += 1;
	}
	const byDay = rollupByDate(trades);
	let best = null;
	let worst = null;
	for (const [date, rollup] of byDay) {
		if (!best || rollup.pnl > best.pnl) best = {
			date,
			pnl: rollup.pnl
		};
		if (!worst || rollup.pnl < worst.pnl) worst = {
			date,
			pnl: rollup.pnl
		};
	}
	const activeDays = byDay.size;
	const profitFactor = grossLoss === 0 ? grossProfit > 0 ? Infinity : 0 : grossProfit / grossLoss;
	return {
		net,
		winRate: trades.length ? wins / trades.length * 100 : 0,
		count: trades.length,
		wins,
		losses,
		breakeven,
		profitFactor,
		best,
		worst,
		activeDays,
		avgDay: activeDays ? net / activeDays : 0
	};
}
function equityCurve(trades) {
	const sorted = [...trades].sort((a, b) => {
		if (a.date !== b.date) return a.date.localeCompare(b.date);
		if (a.time !== b.time) return a.time.localeCompare(b.time);
		return a.id.localeCompare(b.id);
	});
	let equity = 0;
	return sorted.map((trade) => {
		equity = Math.round((equity + trade.pnl) * 100) / 100;
		const label = format(parseDay(trade.date), "d MMM", { locale: id });
		return {
			label,
			when: `${label} ${trade.time} · ${trade.symbol}`,
			equity
		};
	});
}
function formatMoney(value) {
	const abs = Math.abs(value);
	const digits = Number.isInteger(abs) ? 0 : 2;
	const body = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	}).format(abs);
	if (value > 0) return `+${body}`;
	if (value < 0) return `−${body}`;
	return body;
}
function formatCellPnl(value) {
	const sign = value > 0 ? "+" : value < 0 ? "−" : "";
	const abs = Math.abs(value);
	if (abs >= 1e3) {
		const thousands = abs / 1e3;
		return `${sign}${thousands >= 10 ? thousands.toFixed(0) : thousands.toFixed(1).replace(/\.0$/, "")}k`;
	}
	return `${sign}${Number.isInteger(abs) ? String(Math.round(abs)) : abs.toFixed(0)}`;
}
function formatPrice(value) {
	const digits = Math.abs(value) >= 100 ? 2 : 5;
	return new Intl.NumberFormat("en-US", {
		minimumFractionDigits: 0,
		maximumFractionDigits: digits
	}).format(value);
}
function formatSize(value) {
	return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(value);
}
function formatPercent(value) {
	const rounded = Math.round(value * 10) / 10;
	return Number.isInteger(rounded) ? `${rounded}%` : `${rounded.toFixed(1)}%`;
}
function formatFactor(value) {
	if (!Number.isFinite(value)) return "∞";
	if (value === 0) return "0";
	return value.toFixed(2);
}
function formatDayLabel(iso) {
	return format(parseDay(iso), "d MMM", { locale: id });
}
function formatLongDay(iso) {
	return format(parseDay(iso), "EEEE, d MMMM yyyy", { locale: id });
}
function sideLabel(side) {
	return side === "buy" ? "Beli" : "Jual";
}
function moneyTone(value) {
	if (value > 0) return "text-profit";
	if (value < 0) return "text-loss";
	return "text-fg";
}
function compareTradesDesc(a, b) {
	if (a.date !== b.date) return b.date.localeCompare(a.date);
	if (a.time !== b.time) return b.time.localeCompare(a.time);
	return b.id.localeCompare(a.id);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function DayDialog({ date, trades, pendingDelete, onClose, onLog, onEdit, onAskDelete, onConfirmDelete, onCancelDelete }) {
	const dayTrades = date ? trades.filter((trade) => trade.date === date).sort(compareTradesDesc) : [];
	const net = dayTrades.reduce((sum, trade) => sum + trade.pnl, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: Boolean(date),
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "rise fixed inset-x-3 bottom-3 z-50 max-h-[85vh] overflow-y-auto rounded-2xl bg-surface p-4 shadow-pop focus:outline-none sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:p-5",
			children: date ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-base font-medium capitalize",
						children: formatLongDay(date)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "mt-1 text-xs text-faint",
						children: dayTrades.length ? `${dayTrades.length} eksekusi` : "Tidak ada eksekusi di tanggal ini."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						className: "grid size-11 shrink-0 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg",
						"aria-label": "Tutup",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-4 font-mono text-3xl font-medium tabular-nums", dayTrades.length ? moneyTone(net) : "text-faint"),
					children: dayTrades.length ? formatMoney(net) : "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-faint",
					children: "Net hari ini"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-line",
					children: dayTrades.map((trade) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: trade.symbol
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-md bg-surface-2 px-1.5 py-0.5 text-xs text-muted",
												children: sideLabel(trade.side)
											}),
											trade.setup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate text-xs text-faint",
												children: trade.setup
											}) : null
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-mono text-xs tabular-nums text-muted",
										children: [
											trade.time,
											" · ",
											formatPrice(trade.entry),
											" → ",
											formatPrice(trade.exit),
											" · ",
											formatSize(trade.size),
											" lot"
										]
									}),
									trade.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-pretty text-muted",
										children: trade.notes
									}) : null
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("shrink-0 font-mono text-sm tabular-nums", moneyTone(trade.pnl)),
								children: formatMoney(trade.pnl)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onEdit(trade),
								className: "inline-flex h-11 items-center gap-1.5 rounded-lg px-3 text-sm text-muted hover:bg-surface-2 hover:text-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), "Ubah"]
							}), pendingDelete === trade.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onConfirmDelete(trade.id),
								className: "h-11 rounded-lg px-3 text-sm text-loss hover:bg-loss-soft",
								children: "Hapus"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onCancelDelete,
								className: "h-11 rounded-lg px-3 text-sm text-muted hover:bg-surface-2",
								children: "Batal"
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onAskDelete(trade.id),
								className: "inline-flex h-11 items-center gap-1.5 rounded-lg px-3 text-sm text-muted hover:bg-surface-2 hover:text-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Hapus"]
							})]
						})]
					}, trade.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onLog(date),
					className: "mt-2 h-11 w-full rounded-lg bg-fg text-sm font-medium text-bg hover:bg-fg/90",
					children: "Catat trade di tanggal ini"
				})
			] }) : null
		})] })
	});
}
function EquityChart({ trades }) {
	const points = equityCurve(trades);
	const last = points.at(-1)?.equity ?? 0;
	const stroke = last >= 0 ? "var(--color-profit)" : "var(--color-loss)";
	const values = points.map((point) => point.equity);
	const min = Math.min(0, ...values, 0);
	const max = Math.max(0, ...values, 0);
	const span = Math.max(max - min, 1);
	const domain = [min - span * .08, max + span * .12];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl bg-surface p-4 shadow-ring sm:p-5",
		"aria-label": "Ekuitas kumulatif",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-medium",
				children: "Ekuitas kumulatif"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-faint",
				children: "Diurutkan dari eksekusi paling awal"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("font-mono text-lg font-medium tabular-nums", moneyTone(last)),
				children: trades.length ? formatMoney(last) : "—"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 h-40 w-full min-w-0",
			children: points.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-full place-items-center text-sm text-faint",
				children: "Belum ada kurva."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
					data: points,
					margin: {
						top: 8,
						right: 4,
						left: 0,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							hide: true,
							domain
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							cursor: { stroke: "var(--color-line)" },
							content: ({ active, payload }) => {
								if (!active || !payload?.length) return null;
								const point = payload[0]?.payload;
								if (!point || typeof point.equity !== "number") return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-surface-2 px-3 py-2 shadow-ring",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: point.when
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("font-mono text-sm tabular-nums", moneyTone(point.equity)),
										children: formatMoney(point.equity)
									})]
								});
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "equity",
							stroke,
							strokeWidth: 1.75,
							fill: stroke,
							fillOpacity: .16,
							dot: false,
							activeDot: {
								r: 3,
								fill: stroke,
								stroke: "var(--color-bg)"
							}
						})
					]
				})
			})
		})]
	});
}
function metrics(stats) {
	return [
		{
			label: "Net PnL",
			value: stats.count ? formatMoney(stats.net) : "—",
			hint: stats.activeDays ? `${formatMoney(stats.avgDay)} / hari` : "Belum ada trade",
			tone: stats.count ? moneyTone(stats.net) : "text-fg"
		},
		{
			label: "Win rate",
			value: stats.count ? formatPercent(stats.winRate) : "—",
			hint: stats.count ? `${stats.wins} menang · ${stats.losses} kalah${stats.breakeven ? ` · ${stats.breakeven} BE` : ""}` : "Menang / semua trade"
		},
		{
			label: "Trades",
			value: stats.count ? String(stats.count) : "—",
			hint: stats.activeDays ? `${stats.activeDays} hari aktif` : "Total eksekusi"
		},
		{
			label: "Profit factor",
			value: stats.count ? formatFactor(stats.profitFactor) : "—",
			hint: "Profit kotor / loss kotor"
		},
		{
			label: "Best day",
			value: stats.best ? formatMoney(stats.best.pnl) : "—",
			hint: stats.best ? formatDayLabel(stats.best.date) : "Hari dengan net tertinggi",
			tone: stats.best ? "text-profit" : "text-fg"
		},
		{
			label: "Worst day",
			value: stats.worst ? formatMoney(stats.worst.pnl) : "—",
			hint: stats.worst ? formatDayLabel(stats.worst.date) : "Hari dengan net terendah",
			tone: stats.worst ? "text-loss" : "text-fg"
		}
	];
}
function Metrics({ stats }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"aria-label": "Ringkasan",
		className: "grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line shadow-ring sm:grid-cols-3 xl:grid-cols-6",
		children: metrics(stats).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-surface px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: item.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-2 font-mono text-xl font-medium tabular-nums tracking-tight", item.tone),
					children: item.value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 truncate text-xs text-faint",
					children: item.hint
				})
			]
		}, item.label))
	});
}
var WEEKDAYS = [
	"Sn",
	"Sl",
	"Rb",
	"Km",
	"Jm",
	"Sb",
	"Mg"
];
function toneClass(pnl, outside) {
	if (outside && pnl == null) return "text-faint/70";
	if (pnl == null) return "text-muted hover:bg-surface-2";
	if (pnl > 0) return "bg-profit-soft text-profit hover:bg-profit-soft";
	if (pnl < 0) return "bg-loss-soft text-loss hover:bg-loss-soft";
	return "bg-flat text-muted hover:bg-flat";
}
function PnlCalendar({ cursor, today, selected, pnlByDate, onCursor, onSelect }) {
	const days = eachDayOfInterval({
		start: startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 }),
		end: endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 })
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl bg-surface p-3 shadow-ring sm:p-5",
		"aria-label": "Kalender PnL",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium capitalize",
						children: format(cursor, "LLLL yyyy", { locale: id })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-0.5 text-xs", monthTrades ? "text-muted" : "text-faint"),
						children: monthTrades ? `${formatMoney(monthNet)} · ${monthDays} hari · ${monthTrades} trade` : "Tidak ada eksekusi bulan ini"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg",
							"aria-label": "Bulan sebelumnya",
							onClick: () => onCursor(addMonths(cursor, -1)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-11 rounded-lg px-2 text-sm text-muted hover:bg-surface-2 hover:text-fg",
							onClick: () => onCursor(startOfMonth(today ? /* @__PURE__ */ new Date() : cursor)),
							children: "Hari ini"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg",
							"aria-label": "Bulan berikutnya",
							onClick: () => onCursor(addMonths(cursor, 1)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-7 gap-1",
				children: [WEEKDAYS.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pb-1 text-center font-mono text-xs text-faint",
					children: day
				}, day)), days.map((day) => {
					const iso = format(day, "yyyy-MM-dd");
					const rollup = pnlByDate.get(iso) ?? null;
					const outside = !isSameMonth(day, cursor);
					const isSelected = selected === iso;
					const isToday = today === iso;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSelect(iso),
						"aria-pressed": isSelected,
						"aria-current": isToday ? "date" : void 0,
						"aria-label": rollup ? `${format(day, "d MMMM yyyy", { locale: id })}, ${formatMoney(rollup.pnl)}, ${rollup.count} trade` : `${format(day, "d MMMM yyyy", { locale: id })}, tidak ada trade`,
						className: cn("flex h-16 flex-col justify-between rounded-lg px-1 py-1.5 text-left sm:h-24 sm:px-2 sm:py-2", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40", toneClass(rollup?.pnl ?? null, outside), outside && "opacity-45", isSelected && "ring-2 ring-fg/80", !isSelected && isToday && "ring-1 ring-fg/35"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs tabular-nums",
							children: format(day, "d")
						}), rollup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate font-mono text-xs font-medium tabular-nums sm:text-sm",
							children: formatCellPnl(rollup.pnl)
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "kosong"
						})]
					}, iso);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-sm bg-profit-soft ring-1 ring-profit/50" }), "Profit"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-sm bg-loss-soft ring-1 ring-loss/50" }), "Loss"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-sm bg-flat ring-1 ring-line" }), "Impas"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-sm bg-surface ring-1 ring-line" }), "Tanpa trade"]
					})
				]
			})
		]
	});
}
var fieldClass = "h-11 w-full rounded-lg bg-bg px-3 text-sm text-fg shadow-ring outline-none placeholder:text-faint focus-visible:ring-2 focus-visible:ring-fg/30";
function TradeForm({ draft, errors, editing, status, onChange, onSubmit, onCancelEdit, onClose }) {
	function patch(partial) {
		onChange({
			...draft,
			...partial
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		id: "trade-logger",
		onSubmit: (event) => {
			event.preventDefault();
			onSubmit();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium",
					children: editing ? "Ubah trade" : "Catat trade"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-faint",
					children: "PnL diisi manual, bukan dihitung dari harga."
				})] }), onClose ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-11 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg lg:hidden",
					"aria-label": "Tutup form",
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Tanggal",
					id: "trade-date",
					error: errors.date,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "trade-date",
						type: "date",
						required: true,
						value: draft.date,
						"aria-invalid": Boolean(errors.date),
						"aria-describedby": errors.date ? "trade-date-error" : void 0,
						onChange: (event) => patch({ date: event.target.value }),
						className: fieldClass
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Waktu",
					id: "trade-time",
					error: errors.time,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "trade-time",
						type: "time",
						required: true,
						value: draft.time,
						"aria-invalid": Boolean(errors.time),
						"aria-describedby": errors.time ? "trade-time-error" : void 0,
						onChange: (event) => patch({ time: event.target.value }),
						className: fieldClass
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Pair",
					id: "trade-symbol",
					error: errors.symbol,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "trade-symbol",
						value: draft.symbol,
						placeholder: "EURUSD",
						autoCapitalize: "characters",
						autoComplete: "off",
						"aria-invalid": Boolean(errors.symbol),
						"aria-describedby": errors.symbol ? "trade-symbol-error" : void 0,
						onChange: (event) => patch({ symbol: event.target.value.toUpperCase() }),
						className: cn(fieldClass, "font-mono uppercase")
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1.5 text-xs text-muted",
					children: "Arah"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-1 rounded-lg bg-bg p-1 shadow-ring",
					children: [["buy", "Beli"], ["sell", "Jual"]].map(([side, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": draft.side === side,
						onClick: () => patch({ side }),
						className: cn("h-10 rounded-md text-sm", draft.side === side ? "bg-surface-2 text-fg shadow-ring" : "text-muted hover:text-fg"),
						children: label
					}, side))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Harga masuk",
						id: "trade-entry",
						error: errors.entry,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "trade-entry",
							inputMode: "decimal",
							value: draft.entry,
							placeholder: "1.0842",
							"aria-invalid": Boolean(errors.entry),
							"aria-describedby": errors.entry ? "trade-entry-error" : void 0,
							onChange: (event) => patch({ entry: event.target.value }),
							onWheel: (event) => event.currentTarget.blur(),
							className: cn(fieldClass, "font-mono tabular-nums")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Harga keluar",
						id: "trade-exit",
						error: errors.exit,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "trade-exit",
							inputMode: "decimal",
							value: draft.exit,
							placeholder: "1.0865",
							"aria-invalid": Boolean(errors.exit),
							"aria-describedby": errors.exit ? "trade-exit-error" : void 0,
							onChange: (event) => patch({ exit: event.target.value }),
							onWheel: (event) => event.currentTarget.blur(),
							className: cn(fieldClass, "font-mono tabular-nums")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Lot / size",
						id: "trade-size",
						error: errors.size,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "trade-size",
							inputMode: "decimal",
							value: draft.size,
							placeholder: "0.50",
							"aria-invalid": Boolean(errors.size),
							"aria-describedby": errors.size ? "trade-size-error" : void 0,
							onChange: (event) => patch({ size: event.target.value }),
							onWheel: (event) => event.currentTarget.blur(),
							className: cn(fieldClass, "font-mono tabular-nums")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "PnL $",
						id: "trade-pnl",
						error: errors.pnl,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "trade-pnl",
							inputMode: "decimal",
							value: draft.pnl,
							placeholder: "-120 atau 340",
							"aria-invalid": Boolean(errors.pnl),
							"aria-describedby": errors.pnl ? "trade-pnl-error" : void 0,
							onChange: (event) => patch({ pnl: event.target.value }),
							onWheel: (event) => event.currentTarget.blur(),
							className: cn(fieldClass, "font-mono tabular-nums")
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					label: "Setup",
					id: "trade-setup",
					error: errors.setup,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "trade-setup",
						list: "setup-suggestions",
						value: draft.setup,
						placeholder: "Breakout, VWAP, ORB…",
						autoComplete: "off",
						onChange: (event) => patch({ setup: event.target.value }),
						className: fieldClass
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
						id: "setup-suggestions",
						children: SETUP_SUGGESTIONS.map((setup) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: setup }, setup))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Catatan",
					id: "trade-notes",
					error: errors.notes,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "trade-notes",
						rows: 3,
						value: draft.notes,
						placeholder: "Konteks masuk, kesalahan, atau alasan keluar.",
						onChange: (event) => patch({ notes: event.target.value }),
						className: cn(fieldClass, "h-auto resize-y py-2.5 leading-normal")
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-11 rounded-lg bg-fg px-4 text-sm font-medium text-bg hover:bg-fg/90",
						children: editing ? "Simpan perubahan" : "Simpan trade"
					}),
					editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onCancelEdit,
						className: "h-11 rounded-lg text-sm text-muted hover:bg-surface-2 hover:text-fg",
						children: "Batal ubah"
					}) : null,
					status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-profit",
						children: status
					}) : null
				]
			})
		]
	});
}
function Field({ label, id, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			className: "mb-1.5 block text-xs text-muted",
			children: label
		}),
		children,
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			id: `${id}-error`,
			className: "mt-1 text-xs text-loss",
			children: error
		}) : null
	] });
}
var controlClass = "h-11 w-full rounded-lg bg-bg px-3 text-sm text-fg shadow-ring outline-none focus-visible:ring-2 focus-visible:ring-fg/30 sm:w-auto";
function filterTrades(trades, filters) {
	return trades.filter((trade) => {
		if (filters.symbol !== "all" && trade.symbol !== filters.symbol) return false;
		if (filters.date && trade.date !== filters.date) return false;
		if (filters.status === "win" && trade.pnl <= 0) return false;
		if (filters.status === "loss" && trade.pnl >= 0) return false;
		return true;
	}).sort(compareTradesDesc);
}
function TradeTable({ trades, filters, symbols, pendingDelete, onFilters, onEdit, onAskDelete, onConfirmDelete, onCancelDelete, onRestoreSample }) {
	const symbol = filters.symbol === "all" || symbols.includes(filters.symbol) ? filters.symbol : "all";
	const applied = {
		...filters,
		symbol
	};
	const rows = filterTrades(trades, applied);
	const filtering = applied.symbol !== "all" || applied.status !== "all" || Boolean(applied.date);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl bg-surface p-3 shadow-ring sm:p-5",
		"aria-label": "Riwayat trade",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-medium",
				children: "Riwayat"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-0.5 text-xs text-faint",
				children: [
					rows.length,
					" dari ",
					trades.length,
					" trade"
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 sm:flex sm:flex-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						"aria-label": "Filter pair",
						className: controlClass,
						value: symbol,
						onChange: (event) => onFilters({
							...filters,
							symbol: event.target.value
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "Semua pair"
						}), symbols.map((symbol) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: symbol,
							children: symbol
						}, symbol))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						"aria-label": "Filter hasil",
						className: controlClass,
						value: filters.status,
						onChange: (event) => onFilters({
							...filters,
							status: event.target.value
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "Semua hasil"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "win",
								children: "Menang"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "loss",
								children: "Kalah"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"aria-label": "Filter tanggal",
						type: "date",
						className: cn(controlClass, "col-span-2 sm:col-span-1"),
						value: filters.date,
						onChange: (event) => onFilters({
							...filters,
							date: event.target.value
						})
					}),
					filtering ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "col-span-2 h-11 rounded-lg px-3 text-sm text-muted hover:bg-surface-2 hover:text-fg sm:col-span-1",
						onClick: () => onFilters({
							symbol: "all",
							status: "all",
							date: ""
						}),
						children: "Reset filter"
					}) : null
				]
			})]
		}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-2 py-10 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: trades.length === 0 ? "Jurnal masih kosong." : "Tidak ada trade untuk filter ini."
			}), trades.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRestoreSample,
				className: "mt-3 h-11 rounded-lg px-4 text-sm text-fg hover:bg-surface-2",
				children: "Muat contoh"
			}) : null]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-2 md:hidden",
			children: rows.map((trade) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl bg-bg p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: trade.symbol
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-faint",
									children: sideLabel(trade.side)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted",
								children: [
									formatDayLabel(trade.date),
									" ",
									trade.time,
									trade.setup ? ` · ${trade.setup}` : ""
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("font-mono text-sm tabular-nums", moneyTone(trade.pnl)),
							children: formatMoney(trade.pnl)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-xs tabular-nums text-faint",
						children: [
							formatPrice(trade.entry),
							" → ",
							formatPrice(trade.exit),
							" · ",
							formatSize(trade.size),
							" lot"
						]
					}),
					trade.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-2 text-sm text-muted",
						children: trade.notes
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowActions, {
						trade,
						pendingDelete,
						onEdit,
						onAskDelete,
						onConfirmDelete,
						onCancelDelete
					})
				]
			}, trade.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 hidden max-h-[32rem] overflow-auto md:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full border-collapse text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "sticky top-0 bg-surface text-xs text-faint",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "Tanggal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "Pair"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "Arah"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 text-right font-medium",
							children: "Masuk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 text-right font-medium",
							children: "Keluar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 text-right font-medium",
							children: "Lot"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 text-right font-medium",
							children: "PnL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "Setup"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "Catatan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Aksi"
							})
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((trade) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "whitespace-nowrap px-2 py-2 font-mono text-xs tabular-nums text-muted",
							children: [formatDayLabel(trade.date), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-faint",
								children: trade.time
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-2 font-medium",
							children: trade.symbol
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-2 text-muted",
							children: sideLabel(trade.side)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-2 text-right font-mono text-xs tabular-nums",
							children: formatPrice(trade.entry)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-2 text-right font-mono text-xs tabular-nums",
							children: formatPrice(trade.exit)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-2 text-right font-mono text-xs tabular-nums",
							children: formatSize(trade.size)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("px-2 py-2 text-right font-mono text-xs tabular-nums", moneyTone(trade.pnl)),
							children: formatMoney(trade.pnl)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "max-w-32 truncate px-2 py-2 text-muted",
							children: trade.setup || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "max-w-48 truncate px-2 py-2 text-muted",
							children: trade.notes || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowActions, {
								trade,
								pendingDelete,
								compact: true,
								onEdit,
								onAskDelete,
								onConfirmDelete,
								onCancelDelete
							})
						})
					]
				}, trade.id)) })]
			})
		})] })]
	});
}
function RowActions({ trade, pendingDelete, compact = false, onEdit, onAskDelete, onConfirmDelete, onCancelDelete }) {
	if (pendingDelete === trade.id) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-1", compact ? "" : "mt-2"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onConfirmDelete(trade.id),
			className: "h-11 rounded-lg px-3 text-sm text-loss hover:bg-loss-soft",
			children: "Hapus"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onCancelDelete,
			className: "h-11 rounded-lg px-3 text-sm text-muted hover:bg-surface-2",
			children: "Batal"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center", compact ? "" : "mt-2"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": `Ubah ${trade.symbol}`,
			onClick: () => onEdit(trade),
			className: "grid size-11 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": `Hapus ${trade.symbol}`,
			onClick: () => onAskDelete(trade.id),
			className: "grid size-11 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
		})]
	});
}
function readStoredTrades() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return null;
		return parsed.filter(isTrade);
	} catch {
		return null;
	}
}
function JournalApp() {
	const [trades, setTrades] = (0, import_react.useState)(SEED_TRADES);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [cursor, setCursor] = (0, import_react.useState)(() => new Date(2026, 10, 1));
	const [today, setToday] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [sheetOpen, setSheetOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)(() => emptyDraft());
	const [errors, setErrors] = (0, import_react.useState)({});
	const [status, setStatus] = (0, import_react.useState)(null);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const [filters, setFilters] = (0, import_react.useState)({
		symbol: "all",
		status: "all",
		date: ""
	});
	(0, import_react.useEffect)(() => {
		const stored = readStoredTrades();
		if (stored) {
			setTrades(stored);
			const latest = [...stored].sort((a, b) => b.date.localeCompare(a.date))[0];
			if (latest) setCursor(startOfMonth(parseDay(latest.date)));
		}
		setToday(format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"));
		setDraft((current) => ({
			...current,
			date: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
			time: format(/* @__PURE__ */ new Date(), "HH:mm")
		}));
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(trades));
	}, [ready, trades]);
	(0, import_react.useEffect)(() => {
		if (!sheetOpen || !window.matchMedia("(max-width: 1023px)").matches) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		function onKey(event) {
			if (event.key === "Escape") setSheetOpen(false);
		}
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = previous;
			window.removeEventListener("keydown", onKey);
		};
	}, [sheetOpen]);
	const stats = (0, import_react.useMemo)(() => summarize(trades), [trades]);
	const pnlByDate = (0, import_react.useMemo)(() => rollupByDate(trades), [trades]);
	const symbols = (0, import_react.useMemo)(() => [...new Set(trades.map((trade) => trade.symbol))].sort((a, b) => a.localeCompare(b)), [trades]);
	function focusLogger() {
		setSheetOpen(true);
		document.getElementById("trade-logger")?.scrollIntoView({ block: "nearest" });
	}
	function beginCreate(date) {
		setEditingId(null);
		setErrors({});
		setStatus(null);
		setDraft(emptyDraft(date ?? today ?? format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"), format(/* @__PURE__ */ new Date(), "HH:mm")));
		setSelected(null);
		focusLogger();
	}
	function beginEdit(trade) {
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
		setDraft(emptyDraft(today ?? format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"), format(/* @__PURE__ */ new Date(), "HH:mm")));
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
			setTrades((current) => current.map((trade) => trade.id === editingId ? {
				...result.trade,
				id: editingId
			} : trade));
			setStatus("Perubahan disimpan.");
		} else {
			setTrades((current) => [...current, {
				...result.trade,
				id: crypto.randomUUID()
			}]);
			setStatus("Trade tersimpan.");
		}
		setEditingId(null);
		setCursor(startOfMonth(parseDay(result.trade.date)));
		setDraft(emptyDraft(result.trade.date, draft.time));
		setSheetOpen(false);
	}
	function removeTrade(id) {
		setTrades((current) => current.filter((trade) => trade.id !== id));
		if (editingId === id) cancelEdit();
		setPendingDelete(null);
		setStatus("Trade dihapus.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 shrink-0 place-items-center rounded-xl bg-profit-soft text-profit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
								className: "size-5",
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-widest text-faint",
							children: "TAPE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-medium tracking-tight sm:text-2xl",
							children: "Trading journal"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-sm text-pretty text-muted",
						children: "Kalender PnL harian, metrik, dan riwayat eksekusi. Tersimpan di perangkat ini."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => beginCreate(),
					className: "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-lg bg-fg px-3 text-sm font-medium text-bg hover:bg-fg/90 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Catat"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metrics, { stats })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 space-y-4 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PnlCalendar, {
						cursor,
						today,
						selected,
						pnlByDate,
						onCursor: setCursor,
						onSelect: setSelected
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquityChart, { trades })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("lg:sticky lg:top-4", sheetOpen ? "fixed inset-0 z-40 flex items-end bg-overlay p-3 lg:static lg:inset-auto lg:z-auto lg:block lg:bg-transparent lg:p-0" : "mt-4 hidden lg:mt-0 lg:block"),
					onMouseDown: (event) => {
						if (event.target === event.currentTarget) setSheetOpen(false);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-h-[85vh] w-full overflow-y-auto rounded-2xl bg-surface p-4 shadow-pop sm:mx-auto sm:max-w-md sm:p-5 lg:max-h-none lg:max-w-none lg:overflow-visible lg:shadow-ring",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TradeForm, {
							draft,
							errors,
							editing: Boolean(editingId),
							status,
							onChange: (next) => {
								setDraft(next);
								setStatus(null);
							},
							onSubmit: saveDraft,
							onCancelEdit: cancelEdit,
							onClose: () => setSheetOpen(false)
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TradeTable, {
					trades,
					filters,
					symbols,
					pendingDelete,
					onFilters: setFilters,
					onEdit: beginEdit,
					onAskDelete: setPendingDelete,
					onConfirmDelete: removeTrade,
					onCancelDelete: () => setPendingDelete(null),
					onRestoreSample: () => {
						setTrades(SEED_TRADES);
						setCursor(new Date(2026, 10, 1));
						setStatus(null);
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayDialog, {
				date: selected,
				trades,
				pendingDelete,
				onClose: () => {
					setSelected(null);
					setPendingDelete(null);
				},
				onLog: beginCreate,
				onEdit: beginEdit,
				onAskDelete: setPendingDelete,
				onConfirmDelete: removeTrade,
				onCancelDelete: () => setPendingDelete(null)
			})
		]
	});
}
var SplitComponent = JournalApp;
//#endregion
export { SplitComponent as component };
