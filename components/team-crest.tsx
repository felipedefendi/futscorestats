"use client";

import { useState } from "react";
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
  const [imgFailed, setImgFailed] = useState(false);

  if (team.crestUrl && !imgFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- escudo remoto (crest oficial da API), tamanho pequeno e fixo
      <img
        src={team.crestUrl}
        alt={team.name}
        title={team.name}
        loading="lazy"
        onError={() => setImgFailed(true)}
        className={`shrink-0 object-contain ${sizeClasses[size]}`}
      />
    );
  }

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
