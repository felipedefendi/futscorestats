import type { Team } from "@/lib/types/football";

const sizeClasses = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-14 w-14 text-base",
} as const;

export function TeamCrest({
  team,
  size = "md",
}: {
  team: Team;
  size?: keyof typeof sizeClasses;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white ${sizeClasses[size]}`}
      style={{
        background: `linear-gradient(135deg, ${team.colorFrom}, ${team.colorTo})`,
      }}
      title={team.name}
    >
      {team.shortName.slice(0, 3)}
    </span>
  );
}
