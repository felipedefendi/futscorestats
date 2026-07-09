import { getFootballData, type DataSource } from "@/lib/services/league-data";
import { buildStandings } from "@/lib/utils/standings";
import { StandingsTable } from "@/components/standings-table";
import { PointsChart } from "@/components/points-chart";

// O cache real vive no Postgres (ver lib/services/league-data.ts), não no Next —
// por isso a rota roda a cada request, senão os dados ficariam presos no build.
export const dynamic = "force-dynamic";

const sourceLabel: Record<DataSource, string> = {
  live: "Dados ao vivo",
  cache: "Dados em cache",
  demo: "Modo demonstração",
};

export default async function Home() {
  const { league, teams, matches, source } = await getFootballData();
  const standings = buildStandings(teams, matches);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {league.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Temporada {league.season} · {league.country}
          </p>
        </div>
        <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          {sourceLabel[source]}
        </span>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Classificação</h2>
        <StandingsTable rows={standings} />
      </section>

      <section className="mt-8">
        <PointsChart rows={standings} />
      </section>
    </div>
  );
}
