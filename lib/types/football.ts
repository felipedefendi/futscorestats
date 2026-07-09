import { z } from "zod";

export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  colorFrom: z.string(),
  colorTo: z.string(),
});
export type Team = z.infer<typeof teamSchema>;

export const matchStatusSchema = z.enum(["SCHEDULED", "FINISHED"]);
export type MatchStatus = z.infer<typeof matchStatusSchema>;

export const matchSchema = z.object({
  id: z.string(),
  homeTeamId: z.string(),
  awayTeamId: z.string(),
  homeScore: z.number().int().nullable(),
  awayScore: z.number().int().nullable(),
  status: matchStatusSchema,
  matchDate: z.string(),
});
export type Match = z.infer<typeof matchSchema>;

export const matchResultSchema = z.enum(["V", "E", "D"]);
export type MatchResult = z.infer<typeof matchResultSchema>;

export const standingRowSchema = z.object({
  position: z.number().int(),
  team: teamSchema,
  played: z.number().int(),
  won: z.number().int(),
  draw: z.number().int(),
  lost: z.number().int(),
  goalsFor: z.number().int(),
  goalsAgainst: z.number().int(),
  goalDifference: z.number().int(),
  points: z.number().int(),
  form: z.array(matchResultSchema),
});
export type StandingRow = z.infer<typeof standingRowSchema>;

export const leagueSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  season: z.string(),
});
export type League = z.infer<typeof leagueSchema>;
