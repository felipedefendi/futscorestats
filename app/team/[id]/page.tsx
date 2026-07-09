import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getFootballData } from "@/lib/services/league-data";
import { buildStandings } from "@/lib/utils/standings";
import { teamMatchHistory, upcomingTeamMatches } from "@/lib/utils/team-matches";
import { TeamCrest } from "@/components/team-crest";
import { MatchList } from "@/components/match-list";
import { TeamGoalsChart } from "@/components/team-goals-chart";

export const dynamic = "force-dynamic";

export default async function TeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { teams, matches } = await getFootballData();
  const team = teams.find((t) => t.id === id);

  if (!team) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-lg font-semibold">Time não encontrado</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Ele pode ter saído da competição ou o link está incorreto.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-1 text-sm text-accent hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para a classificação
        </Link>
      </div>
    );
  }

  const standings = buildStandings(teams, matches);
  const row = standings.find((r) => r.team.id === id);
  const history = teamMatchHistory(id, matches, 10);
  const upcoming = upcomingTeamMatches(id, matches, 5);

  const stats = row
    ? [
        { label: "Posição", value: `${row.position}º` },
        { label: "Pontos", value: row.points },
        { label: "Jogos", value: row.played },
        { label: "V-E-D", value: `${row.won}-${row.draw}-${row.lost}` },
        { label: "Gols", value: `${row.goalsFor}:${row.goalsAgainst}` },
        {
          label: "Saldo",
          value: row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference,
        },
      ]
    : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Classificação
      </Link>

      <header className="mb-8 flex items-center gap-4">
        <TeamCrest team={team} size="lg" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {team.name}
          </h1>
          {row ? (
            <p className="text-sm text-muted-foreground">
              {row.position}º colocado · {row.points} pontos
            </p>
          ) : null}
        </div>
      </header>

      {stats.length > 0 ? (
        <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card p-4 text-center"
            >
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </section>
      ) : null}

      <div className="grid gap-8 md:grid-cols-2">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Últimos jogos</h2>
          <MatchList matches={history} teams={teams} emptyLabel="Nenhum jogo finalizado ainda." />
        </section>
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Próximos jogos</h2>
          <MatchList
            matches={upcoming}
            teams={teams}
            emptyLabel="Nenhum próximo jogo agendado no momento."
          />
        </section>
      </div>

      <section className="mt-8">
        <TeamGoalsChart history={history} teams={teams} />
      </section>
    </div>
  );
}
