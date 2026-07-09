import type { Team } from "@/lib/types/football";
import type { TeamMatchSummary } from "@/lib/utils/team-matches";
import { TeamCrest } from "./team-crest";

const resultStyle: Record<string, string> = {
  V: "text-accent",
  E: "text-accent-amber",
  D: "text-accent-red",
};

export function MatchList({
  matches,
  teams,
  emptyLabel,
}: {
  matches: TeamMatchSummary[];
  teams: Team[];
  emptyLabel: string;
}) {
  const teamsById = new Map(teams.map((t) => [t.id, t]));

  if (matches.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
        {emptyLabel}
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border rounded-xl border border-border">
      {matches.map((m) => {
        const opponent = teamsById.get(m.opponentId);
        const date = new Date(m.matchDate).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        return (
          <li
            key={m.matchId}
            className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className="w-10 shrink-0 text-xs text-muted-foreground">
                {m.isHome ? "casa" : "fora"}
              </span>
              {opponent ? <TeamCrest team={opponent} size="sm" /> : null}
              <span className="truncate font-medium text-foreground">
                {opponent?.name ?? "Adversário"}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {m.goalsFor != null && m.goalsAgainst != null ? (
                <span className={`font-bold ${m.result ? resultStyle[m.result] : ""}`}>
                  {m.goalsFor} - {m.goalsAgainst}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">{date}</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
