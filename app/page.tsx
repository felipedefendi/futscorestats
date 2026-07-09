import { demoLeague, demoMatches, demoTeamsList } from "@/lib/data/demo";
import { buildStandings } from "@/lib/utils/standings";
import { StandingsTable } from "@/components/standings-table";
import { PointsChart } from "@/components/points-chart";

export default function Home() {
  const standings = buildStandings(demoTeamsList, demoMatches);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {demoLeague.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Temporada {demoLeague.season} · {demoLeague.country}
          </p>
        </div>
        <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          Modo demonstração
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
