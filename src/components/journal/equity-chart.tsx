import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { equityCurve, formatMoney, moneyTone, type Trade } from "@/lib/journal";
import { cn } from "@/lib/cn";

export function EquityChart({ trades }: { trades: Trade[] }) {
  const points = equityCurve(trades);
  const last = points.at(-1)?.equity ?? 0;
  const positive = last >= 0;
  const stroke = positive ? "var(--color-profit)" : "var(--color-loss)";
  const values = points.map((point) => point.equity);
  const min = Math.min(0, ...values, 0);
  const max = Math.max(0, ...values, 0);
  const span = Math.max(max - min, 1);
  const domain: [number, number] = [min - span * 0.08, max + span * 0.12];

  return (
    <section className="rounded-2xl bg-surface p-4 shadow-ring sm:p-5" aria-label="Ekuitas kumulatif">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-medium">Ekuitas kumulatif</h2>
          <p className="mt-0.5 text-xs text-faint">Diurutkan dari eksekusi paling awal</p>
        </div>
        <p className={cn("font-mono text-lg font-medium tabular-nums", moneyTone(last))}>
          {trades.length ? formatMoney(last) : "—"}
        </p>
      </div>
      <div className="mt-3 h-40 w-full min-w-0">
        {points.length === 0 ? (
          <div className="grid h-full place-items-center text-sm text-faint">Belum ada kurva.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={points} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
              <YAxis hide domain={domain} />
              <Tooltip
                cursor={{ stroke: "var(--color-line)" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const point = payload[0]?.payload as { when?: string; equity?: number } | undefined;
                  if (!point || typeof point.equity !== "number") return null;
                  return (
                    <div className="rounded-lg bg-surface-2 px-3 py-2 shadow-ring">
                      <p className="text-xs text-muted">{point.when}</p>
                      <p className={cn("font-mono text-sm tabular-nums", moneyTone(point.equity))}>
                        {formatMoney(point.equity)}
                      </p>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="equity"
                stroke={stroke}
                strokeWidth={1.75}
                fill={stroke}
                fillOpacity={0.16}
                dot={false}
                activeDot={{ r: 3, fill: stroke, stroke: "var(--color-bg)" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
