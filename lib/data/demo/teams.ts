import type { Team } from "@/lib/types/football";

export const demoTeams: Team[] = [
  { id: "fla", name: "Flamengo", shortName: "FLA", colorFrom: "#C8102E", colorTo: "#1B1B1B" },
  { id: "pal", name: "Palmeiras", shortName: "PAL", colorFrom: "#006437", colorTo: "#0B8A3E" },
  { id: "bot", name: "Botafogo", shortName: "BOT", colorFrom: "#111111", colorTo: "#6F6F6F" },
  { id: "cam", name: "Atlético-MG", shortName: "CAM", colorFrom: "#1B1B1B", colorTo: "#D4AF37" },
  { id: "for", name: "Fortaleza", shortName: "FOR", colorFrom: "#0033A0", colorTo: "#C8102E" },
  { id: "sao", name: "São Paulo", shortName: "SAO", colorFrom: "#7A1F2B", colorTo: "#FFD200" },
  { id: "cor", name: "Corinthians", shortName: "COR", colorFrom: "#1B1B1B", colorTo: "#9C9C9C" },
  { id: "gre", name: "Grêmio", shortName: "GRE", colorFrom: "#003DA5", colorTo: "#0B0B0B" },
];

/** Forças relativas usadas apenas para gerar os placares do modo demo. */
export const demoTeamStrength: Record<string, number> = {
  fla: 88,
  pal: 90,
  bot: 82,
  cam: 78,
  for: 74,
  sao: 80,
  cor: 76,
  gre: 79,
};
