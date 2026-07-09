"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-accent-red">
        <AlertTriangle className="h-6 w-6" />
      </span>
      <h1 className="text-xl font-bold">Algo deu errado</h1>
      <p className="text-sm text-muted-foreground">
        Não foi possível carregar os dados agora. Você pode tentar de novo ou
        voltar para a página inicial.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          <RotateCcw className="h-4 w-4" />
          Tentar de novo
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Página inicial
        </Link>
      </div>
    </div>
  );
}
