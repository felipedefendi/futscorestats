import type { League } from "@/lib/types/football";
import { demoTeams } from "./teams";
import { generateDemoMatches } from "./season-generator";

export const demoLeague: League = {
  id: "BSA",
  name: "Brasileirão Série A",
  country: "Brasil",
  season: "2026",
};

export const demoTeamsList = demoTeams;
export const demoMatches = generateDemoMatches(demoTeams);
