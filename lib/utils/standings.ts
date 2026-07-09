import type { Match, MatchResult, StandingRow, Team } from "@/lib/types/football";

function resultForTeam(match: Match, teamId: string): MatchResult | null {
  if (match.status !== "FINISHED" || match.homeScore == null || match.awayScore == null) {
    return null;
  }

  const isHome = match.homeTeamId === teamId;
  const isAway = match.awayTeamId === teamId;
  if (!isHome && !isAway) return null;

  const goalsFor = isHome ? match.homeScore : match.awayScore;
  const goalsAgainst = isHome ? match.awayScore : match.homeScore;

  if (goalsFor > goalsAgainst) return "V";
  if (goalsFor < goalsAgainst) return "D";
  return "E";
}

/** Últimos resultados de um time, do mais antigo para o mais recente. */
export function recentForm(teamId: string, matches: Match[], limit = 5): MatchResult[] {
  return matches
    .filter((m) => m.homeTeamId === teamId || m.awayTeamId === teamId)
    .sort((a, b) => new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime())
    .slice(0, limit)
    .map((m) => resultForTeam(m, teamId))
    .filter((r): r is MatchResult => r !== null)
    .reverse();
}

/** Percentual de aproveitamento de pontos (0 a 100, uma casa decimal). */
export function winPercentage(points: number, played: number): number {
  if (played === 0) return 0;
  const maxPoints = played * 3;
  return Math.round((points / maxPoints) * 1000) / 10;
}

type Accumulator = {
  played: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
};

function emptyAccumulator(): Accumulator {
  return { played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 };
}

/**
 * Monta a tabela de classificação a partir dos times e resultados das partidas.
 * Critérios de desempate: pontos -> saldo de gols -> gols marcados -> nome.
 */
export function buildStandings(teams: Team[], matches: Match[]): StandingRow[] {
  const stats = new Map<string, Accumulator>();
  for (const team of teams) {
    stats.set(team.id, emptyAccumulator());
  }

  for (const match of matches) {
    if (match.status !== "FINISHED" || match.homeScore == null || match.awayScore == null) {
      continue;
    }

    const home = stats.get(match.homeTeamId);
    const away = stats.get(match.awayTeamId);
    if (!home || !away) continue;

    home.played += 1;
    away.played += 1;
    home.goalsFor += match.homeScore;
    home.goalsAgainst += match.awayScore;
    away.goalsFor += match.awayScore;
    away.goalsAgainst += match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.won += 1;
      home.points += 3;
      away.lost += 1;
    } else if (match.homeScore < match.awayScore) {
      away.won += 1;
      away.points += 3;
      home.lost += 1;
    } else {
      home.draw += 1;
      away.draw += 1;
      home.points += 1;
      away.points += 1;
    }
  }

  const rows = teams.map((team) => {
    const s = stats.get(team.id) ?? emptyAccumulator();
    return {
      team,
      ...s,
      goalDifference: s.goalsFor - s.goalsAgainst,
      form: recentForm(team.id, matches),
    };
  });

  rows.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.team.name.localeCompare(b.team.name);
  });

  return rows.map((row, index) => ({ ...row, position: index + 1 }));
}
