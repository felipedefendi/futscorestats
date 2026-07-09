"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { StandingRow } from "@/lib/types/football";

export function PointsChart({ rows }: { rows: StandingRow[] }) {
  const data = rows.map((row) => ({
    name: row.team.shortName,
    points: row.points,
    color: row.team.colorFrom,
  }));

  return (
    <div className="h-80 w-full rounded-xl border border-border p-4">
      <p className="mb-2 text-sm font-medium text-muted-foreground">
        Pontos por time
      </p>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
          <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
          <YAxis
            type="category"
            dataKey="name"
            stroke="var(--muted-foreground)"
            fontSize={12}
            width={48}
          />
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--foreground)",
            }}
            cursor={{ fill: "var(--border)", opacity: 0.3 }}
          />
          <Bar dataKey="points" radius={[0, 4, 4, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
