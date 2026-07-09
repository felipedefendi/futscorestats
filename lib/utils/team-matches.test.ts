import { teamMatchHistory, upcomingTeamMatches } from "./team-matches";
import type { Match } from "@/lib/types/football";

const matches: Match[] = [
  { id: "1", homeTeamId: "a", awayTeamId: "b", homeScore: 2, awayScore: 0, status: "FINISHED", matchDate: "2026-01-01" },
  { id: "2", homeTeamId: "b", awayTeamId: "a", homeScore: 1, awayScore: 1, status: "FINISHED", matchDate: "2026-01-08" },
  { id: "3", homeTeamId: "a", awayTeamId: "b", homeScore: null, awayScore: null, status: "SCHEDULED", matchDate: "2026-02-01" },
  { id: "4", homeTeamId: "b", awayTeamId: "a", homeScore: null, awayScore: null, status: "SCHEDULED", matchDate: "2026-02-10" },
];

describe("teamMatchHistory", () => {
  it("retorna só os jogos finalizados, do mais recente para o mais antigo", () => {
    const history = teamMatchHistory("a", matches);

    expect(history).toHaveLength(2);
    expect(history[0]).toMatchObject({ matchId: "2", isHome: false, goalsFor: 1, goalsAgainst: 1, result: "E" });
    expect(history[1]).toMatchObject({ matchId: "1", isHome: true, goalsFor: 2, goalsAgainst: 0, result: "V" });
  });

  it("respeita o limite", () => {
    expect(teamMatchHistory("a", matches, 1)).toHaveLength(1);
  });
});

describe("upcomingTeamMatches", () => {
  it("retorna só os jogos agendados, do mais próximo para o mais distante", () => {
    const upcoming = upcomingTeamMatches("a", matches);

    expect(upcoming).toHaveLength(2);
    expect(upcoming[0]).toMatchObject({ matchId: "3", isHome: true, goalsFor: null, result: null });
    expect(upcoming[1].matchId).toBe("4");
  });
});
