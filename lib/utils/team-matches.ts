import type { Match, MatchResult } from "@/lib/types/football";

export type TeamMatchSummary = {
  matchId: string;
  opponentId: string;
  isHome: boolean;
  goalsFor: number | null;
  goalsAgainst: number | null;
  result: MatchResult | null;
  matchDate: string;
};

function toSummary(match: Match, teamId: string): TeamMatchSummary {
  const isHome = match.homeTeamId === teamId;
  const goalsFor = isHome ? match.homeScore : match.awayScore;
  const goalsAgainst = isHome ? match.awayScore : match.homeScore;

  let result: MatchResult | null = null;
  if (goalsFor != null && goalsAgainst != null) {
    result = goalsFor > goalsAgainst ? "V" : goalsFor < goalsAgainst ? "D" : "E";
  }

  return {
    matchId: match.id,
    opponentId: isHome ? match.awayTeamId : match.homeTeamId,
    isHome,
    goalsFor,
    goalsAgainst,
    result,
    matchDate: match.matchDate,
  };
}

/** Últimos jogos finalizados de um time, do mais recente para o mais antigo. */
export function teamMatchHistory(teamId: string, matches: Match[], limit = 10): TeamMatchSummary[] {
  return matches
    .filter((m) => (m.homeTeamId === teamId || m.awayTeamId === teamId) && m.status === "FINISHED")
    .sort((a, b) => new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime())
    .slice(0, limit)
    .map((m) => toSummary(m, teamId));
}

/** Próximos jogos agendados de um time, do mais próximo para o mais distante. */
export function upcomingTeamMatches(teamId: string, matches: Match[], limit = 5): TeamMatchSummary[] {
  return matches
    .filter((m) => (m.homeTeamId === teamId || m.awayTeamId === teamId) && m.status !== "FINISHED")
    .sort((a, b) => new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime())
    .slice(0, limit)
    .map((m) => toSummary(m, teamId));
}
