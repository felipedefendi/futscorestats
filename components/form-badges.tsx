import type { MatchResult } from "@/lib/types/football";

const style: Record<MatchResult, string> = {
  V: "bg-accent text-accent-foreground",
  E: "bg-accent-amber text-[#221600]",
  D: "bg-accent-red text-white",
};

export function FormBadges({ form }: { form: MatchResult[] }) {
  if (form.length === 0) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }

  return (
    <div className="flex gap-1">
      {form.map((result, i) => (
        <span
          key={i}
          className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${style[result]}`}
        >
          {result}
        </span>
      ))}
    </div>
  );
}
