import { buildStandings, recentForm, winPercentage } from "./standings";
import type { Match, Team } from "@/lib/types/football";

const teamA: Team = { id: "a", name: "Time A", shortName: "TMA", colorFrom: "#111", colorTo: "#222" };
const teamB: Team = { id: "b", name: "Time B", shortName: "TMB", colorFrom: "#333", colorTo: "#444" };

const matches: Match[] = [
  { id: "1", homeTeamId: "a", awayTeamId: "b", homeScore: 2, awayScore: 0, status: "FINISHED", matchDate: "2026-01-01" },
  { id: "2", homeTeamId: "b", awayTeamId: "a", homeScore: 1, awayScore: 1, status: "FINISHED", matchDate: "2026-01-08" },
  { id: "3", homeTeamId: "a", awayTeamId: "b", homeScore: 0, awayScore: 3, status: "FINISHED", matchDate: "2026-01-15" },
];

describe("buildStandings", () => {
  it("calcula pontos, saldo de gols e critérios de desempate corretamente", () => {
    const table = buildStandings([teamA, teamB], matches);

    const a = table.find((r) => r.team.id === "a")!;
    const b = table.find((r) => r.team.id === "b")!;

    expect(a).toMatchObject({
      played: 3,
      won: 1,
      draw: 1,
      lost: 1,
      goalsFor: 3,
      goalsAgainst: 4,
      goalDifference: -1,
      points: 4,
    });
    expect(b).toMatchObject({
      played: 3,
      won: 1,
      draw: 1,
      lost: 1,
      goalsFor: 4,
      goalsAgainst: 3,
      goalDifference: 1,
      points: 4,
    });

    // Mesmo número de pontos: o time com melhor saldo de gols fica em 1º.
    expect(b.position).toBe(1);
    expect(a.position).toBe(2);
  });

  it("ignora jogos que ainda não aconteceram", () => {
    const scheduled: Match = {
      id: "4",
      homeTeamId: "a",
      awayTeamId: "b",
      homeScore: null,
      awayScore: null,
      status: "SCHEDULED",
      matchDate: "2026-02-01",
    };
    const table = buildStandings([teamA, teamB], [...matches, scheduled]);
    const a = table.find((r) => r.team.id === "a")!;
    expect(a.played).toBe(3);
  });
});

describe("recentForm", () => {
  it("retorna os resultados em ordem cronológica (mais recente por último)", () => {
    expect(recentForm("a", matches)).toEqual(["V", "E", "D"]);
    expect(recentForm("b", matches)).toEqual(["D", "E", "V"]);
  });

  it("respeita o limite informado", () => {
    expect(recentForm("a", matches, 2)).toEqual(["E", "D"]);
  });
});

describe("winPercentage", () => {
  it("calcula o percentual de aproveitamento", () => {
    expect(winPercentage(4, 3)).toBeCloseTo(44.4, 1);
    expect(winPercentage(9, 3)).toBe(100);
  });

  it("retorna 0 quando não há jogos", () => {
    expect(winPercentage(0, 0)).toBe(0);
  });
});
