import "server-only";
import type { League as LeagueRow, Team as TeamRow, Match as MatchRow } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { League, Match, MatchStatus, Team } from "@/lib/types/football";

export type CachedLeagueData = {
  league: League;
  teams: Team[];
  matches: Match[];
  lastFetchedAt: Date;
};

function toLeague(row: LeagueRow): League {
  return { id: row.id, name: row.name, country: row.country, season: row.season };
}

function toTeam(row: TeamRow): Team {
  return {
    id: row.id,
    name: row.name,
    shortName: row.shortName,
    crestUrl: row.crestUrl ?? undefined,
    colorFrom: row.colorFrom,
    colorTo: row.colorTo,
  };
}

function toMatch(row: MatchRow): Match {
  return {
    id: row.id,
    homeTeamId: row.homeTeamId,
    awayTeamId: row.awayTeamId,
    homeScore: row.homeScore,
    awayScore: row.awayScore,
    status: row.status as MatchStatus,
    matchDate: row.matchDate.toISOString(),
  };
}

/** Lê os dados em cache do banco. Retorna null se nunca foram buscados ainda. */
export async function readLeagueCache(leagueId: string): Promise<CachedLeagueData | null> {
  const league = await prisma.league.findUnique({ where: { id: leagueId } });
  if (!league || !league.lastFetchedAt) return null;

  const [teams, matches] = await Promise.all([
    prisma.team.findMany({ where: { leagueId } }),
    prisma.match.findMany({ where: { leagueId } }),
  ]);

  if (teams.length === 0 || matches.length === 0) return null;

  return {
    league: toLeague(league),
    teams: teams.map(toTeam),
    matches: matches.map(toMatch),
    lastFetchedAt: league.lastFetchedAt,
  };
}

/** Grava os dados buscados da API real no banco (upsert de liga, times e partidas). */
export async function writeLeagueCache(leagueId: string, league: League, teams: Team[], matches: Match[]): Promise<void> {
  await prisma.$transaction([
    prisma.league.upsert({
      where: { id: leagueId },
      create: { id: leagueId, name: league.name, country: league.country, season: league.season, lastFetchedAt: new Date() },
      update: { name: league.name, country: league.country, season: league.season, lastFetchedAt: new Date() },
    }),
    ...teams.map((team) =>
      prisma.team.upsert({
        where: { id: team.id },
        create: {
          id: team.id,
          leagueId,
          name: team.name,
          shortName: team.shortName,
          crestUrl: team.crestUrl,
          colorFrom: team.colorFrom,
          colorTo: team.colorTo,
        },
        update: {
          name: team.name,
          shortName: team.shortName,
          crestUrl: team.crestUrl,
          colorFrom: team.colorFrom,
          colorTo: team.colorTo,
        },
      }),
    ),
    ...matches.map((match) =>
      prisma.match.upsert({
        where: { id: match.id },
        create: {
          id: match.id,
          leagueId,
          homeTeamId: match.homeTeamId,
          awayTeamId: match.awayTeamId,
          homeScore: match.homeScore,
          awayScore: match.awayScore,
          status: match.status,
          matchDate: new Date(match.matchDate),
        },
        update: {
          homeScore: match.homeScore,
          awayScore: match.awayScore,
          status: match.status,
          matchDate: new Date(match.matchDate),
        },
      }),
    ),
  ]);
}
