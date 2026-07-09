"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Team } from "@/lib/types/football";
import type { TeamMatchSummary } from "@/lib/utils/team-matches";

export function TeamGoalsChart({
  history,
  teams,
}: {
  history: TeamMatchSummary[];
  teams: Team[];
}) {
  const teamsById = new Map(teams.map((t) => [t.id, t]));

  // Exibe do jogo mais antigo para o mais recente (esquerda -> direita).
  const data = [...history].reverse().map((m) => ({
    name: teamsById.get(m.opponentId)?.shortName ?? "?",
    marcados: m.goalsFor ?? 0,
    sofridos: m.goalsAgainst ?? 0,
  }));

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        Sem jogos finalizados para exibir no gráfico ainda.
      </div>
    );
  }

  return (
    <div className="h-72 w-full rounded-xl border border-border p-4">
      <p className="mb-2 text-sm font-medium text-muted-foreground">
        Gols nos últimos jogos
      </p>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--foreground)",
            }}
            cursor={{ fill: "var(--border)", opacity: 0.3 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="marcados" name="Gols marcados" fill="var(--accent)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="sofridos" name="Gols sofridos" fill="var(--accent-red)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
