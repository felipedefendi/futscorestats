import "server-only";
import type { League, Match, Team } from "@/lib/types/football";
import { demoLeague, demoMatches, demoTeamsList } from "@/lib/data/demo";
import { fetchCompetitionMatches } from "./football-api";
import { readLeagueCache, writeLeagueCache } from "./league-cache";

export const LEAGUE_CODE = "BSA";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 horas — respeita o limite de 10 req/min da API gratuita

export type DataSource = "live" | "cache" | "demo";

export type FootballData = {
  league: League;
  teams: Team[];
  matches: Match[];
  source: DataSource;
};

/**
 * Busca os dados da liga com fallback em cascata: API real -> cache no Postgres -> dados demo.
 * Nunca lança erro — na pior das hipóteses, cai no modo demo (o app nunca fica inutilizável).
 */
export async function getFootballData(): Promise<FootballData> {
  const hasApiKey = Boolean(process.env.FOOTBALL_API_KEY);
  const hasDatabase = Boolean(process.env.DATABASE_URL);

  if (!hasDatabase) {
    return { league: demoLeague, teams: demoTeamsList, matches: demoMatches, source: "demo" };
  }

  try {
    const cached = await readLeagueCache(LEAGUE_CODE);
    const isStale = !cached || Date.now() - cached.lastFetchedAt.getTime() > CACHE_TTL_MS;

    if (isStale && hasApiKey) {
      try {
        const fresh = await fetchCompetitionMatches(LEAGUE_CODE);
        await writeLeagueCache(LEAGUE_CODE, fresh.league, fresh.teams, fresh.matches);
        return { ...fresh, source: "live" };
      } catch (apiError) {
        console.error("[futscorestats] falha ao buscar dados reais, usando cache/demo:", apiError);
      }
    }

    if (cached) {
      return { league: cached.league, teams: cached.teams, matches: cached.matches, source: "cache" };
    }
  } catch (dbError) {
    console.error("[futscorestats] falha ao acessar o banco, usando modo demo:", dbError);
  }

  return { league: demoLeague, teams: demoTeamsList, matches: demoMatches, source: "demo" };
}
