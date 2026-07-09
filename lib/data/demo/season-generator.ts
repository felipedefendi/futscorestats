import type { Match, Team } from "@/lib/types/football";
import { demoTeamStrength } from "./teams";

/** PRNG determinístico (mesma semente = mesmo resultado sempre) para o modo demo. */
function mulberry32(seed: number) {
  let state = seed;
  return function random() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Amostra de uma distribuição de Poisson aproximada — suficiente para gerar placares plausíveis. */
function poissonGoals(random: () => number, expected: number): number {
  const limit = Math.exp(-expected);
  let k = 0;
  let p = 1;
  do {
    k += 1;
    p *= random();
  } while (p > limit);
  return k - 1;
}

const SEED = 20260709;
const HOME_ADVANTAGE = 5;

/** Gera um turno-e-returno (todos contra todos, ida e volta) com placares determinísticos. */
export function generateDemoMatches(teams: Team[]): Match[] {
  const random = mulberry32(SEED);
  const matches: Match[] = [];
  const startDate = new Date("2026-04-05T16:00:00Z");
  let matchId = 1;

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const fixtures: [Team, Team][] = [
        [teams[i], teams[j]],
        [teams[j], teams[i]],
      ];

      for (const [home, away] of fixtures) {
        const homeStrength = (demoTeamStrength[home.id] ?? 75) + HOME_ADVANTAGE;
        const awayStrength = demoTeamStrength[away.id] ?? 75;
        const homeExpectedGoals = 0.9 + homeStrength / 60;
        const awayExpectedGoals = 0.5 + awayStrength / 75;

        const matchDate = new Date(startDate);
        matchDate.setDate(matchDate.getDate() + matches.length * 3);

        matches.push({
          id: `m${matchId++}`,
          homeTeamId: home.id,
          awayTeamId: away.id,
          homeScore: poissonGoals(random, homeExpectedGoals),
          awayScore: poissonGoals(random, awayExpectedGoals),
          status: "FINISHED",
          matchDate: matchDate.toISOString(),
        });
      }
    }
  }

  return matches;
}
