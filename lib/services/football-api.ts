import "server-only";
import { z } from "zod";
import type { League, Match, Team } from "@/lib/types/football";
import { colorFromString } from "@/lib/utils/team-color";

const API_BASE = "https://api.football-data.org/v4";

const apiTeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  shortName: z.string().nullable(),
  tla: z.string().nullable(),
  crest: z.string().nullable(),
});

const apiMatchSchema = z.object({
  id: z.number(),
  utcDate: z.string(),
  status: z.string(),
  homeTeam: apiTeamSchema,
  awayTeam: apiTeamSchema,
  score: z.object({
    fullTime: z.object({
      home: z.number().nullable(),
      away: z.number().nullable(),
    }),
  }),
});

const apiResponseSchema = z.object({
  competition: z.object({
    name: z.string(),
    area: z.object({ name: z.string() }),
  }),
  filters: z.object({ season: z.string().optional() }).optional(),
  matches: z.array(apiMatchSchema),
});

export type FetchedLeagueData = {
  league: League;
  teams: Team[];
  matches: Match[];
};

/**
 * Busca as partidas finalizadas de uma competição na football-data.org e
 * converte para os tipos internos do app. Lança erro se a chave não estiver
 * configurada ou a API falhar — quem chama decide o fallback (ver league-data.ts).
 */
export async function fetchCompetitionMatches(competitionCode: string): Promise<FetchedLeagueData> {
  const apiKey = process.env.FOOTBALL_API_KEY;
  if (!apiKey) {
    throw new Error("FOOTBALL_API_KEY não configurada");
  }

  const response = await fetch(`${API_BASE}/competitions/${competitionCode}/matches?status=FINISHED`, {
    headers: { "X-Auth-Token": apiKey },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`football-data.org respondeu ${response.status}`);
  }

  const json = apiResponseSchema.parse(await response.json());

  const teamsById = new Map<string, Team>();
  const registerTeam = (apiTeam: z.infer<typeof apiTeamSchema>) => {
    const id = String(apiTeam.id);
    if (teamsById.has(id)) return;
    teamsById.set(id, {
      id,
      name: apiTeam.name,
      shortName: apiTeam.tla ?? apiTeam.shortName ?? apiTeam.name.slice(0, 3).toUpperCase(),
      crestUrl: apiTeam.crest ?? undefined,
      ...colorFromString(apiTeam.name),
    });
  };

  const matches: Match[] = json.matches.map((m) => {
    registerTeam(m.homeTeam);
    registerTeam(m.awayTeam);

    return {
      id: String(m.id),
      homeTeamId: String(m.homeTeam.id),
      awayTeamId: String(m.awayTeam.id),
      homeScore: m.score.fullTime.home,
      awayScore: m.score.fullTime.away,
      status: m.status === "FINISHED" ? "FINISHED" : "SCHEDULED",
      matchDate: m.utcDate,
    };
  });

  return {
    league: {
      id: competitionCode,
      name: json.competition.name,
      country: json.competition.area.name,
      season: json.filters?.season ?? String(new Date().getFullYear()),
    },
    teams: Array.from(teamsById.values()),
    matches,
  };
}
