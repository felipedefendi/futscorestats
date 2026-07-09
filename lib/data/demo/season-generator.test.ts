import { generateDemoMatches } from "./season-generator";
import { demoTeams } from "./teams";
import { buildStandings } from "@/lib/utils/standings";

describe("generateDemoMatches", () => {
  it("gera um turno e returno completo e determinístico", () => {
    const matches = generateDemoMatches(demoTeams);
    const expectedMatches = demoTeams.length * (demoTeams.length - 1); // todos x todos, ida e volta

    expect(matches).toHaveLength(expectedMatches);
    expect(matches.every((m) => m.status === "FINISHED")).toBe(true);
    expect(matches.every((m) => (m.homeScore ?? -1) >= 0 && (m.awayScore ?? -1) >= 0)).toBe(true);

    // mesma semente -> mesmo resultado sempre (build reproduzível)
    const again = generateDemoMatches(demoTeams);
    expect(again).toEqual(matches);
  });

  it("produz uma classificação válida quando combinado com buildStandings", () => {
    const matches = generateDemoMatches(demoTeams);
    const table = buildStandings(demoTeams, matches);

    const expectedPlayedPerTeam = (demoTeams.length - 1) * 2; // turno e returno

    expect(table).toHaveLength(demoTeams.length);
    expect(table.every((row) => row.played === expectedPlayedPerTeam)).toBe(true);

    const positions = table.map((row) => row.position).sort((a, b) => a - b);
    expect(positions).toEqual(demoTeams.map((_, i) => i + 1));
  });
});
