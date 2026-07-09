import Link from "next/link";
import type { StandingRow } from "@/lib/types/football";
import { TeamCrest } from "./team-crest";
import { FormBadges } from "./form-badges";

const headers = [
  "#",
  "Time",
  "P",
  "J",
  "V",
  "E",
  "D",
  "GP",
  "GC",
  "SG",
  "Últimos 5",
];

export function StandingsTable({ rows }: { rows: StandingRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-muted-foreground">
            {headers.map((h) => (
              <th key={h} scope="col" className="whitespace-nowrap px-3 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.team.id}
              className="border-b border-border last:border-0 hover:bg-card"
            >
              <td className="px-3 py-3 font-semibold text-muted-foreground">
                {row.position}
              </td>
              <td className="px-3 py-3">
                <Link
                  href={`/team/${row.team.id}`}
                  className="flex items-center gap-2 whitespace-nowrap font-medium text-foreground hover:text-accent"
                >
                  <TeamCrest team={row.team} size="sm" />
                  {row.team.name}
                </Link>
              </td>
              <td className="px-3 py-3 font-bold text-foreground">{row.points}</td>
              <td className="px-3 py-3 text-muted-foreground">{row.played}</td>
              <td className="px-3 py-3 text-muted-foreground">{row.won}</td>
              <td className="px-3 py-3 text-muted-foreground">{row.draw}</td>
              <td className="px-3 py-3 text-muted-foreground">{row.lost}</td>
              <td className="px-3 py-3 text-muted-foreground">{row.goalsFor}</td>
              <td className="px-3 py-3 text-muted-foreground">{row.goalsAgainst}</td>
              <td className="px-3 py-3 text-muted-foreground">
                {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
              </td>
              <td className="px-3 py-3">
                <FormBadges form={row.form} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
