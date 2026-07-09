import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="bg-gradient-to-r from-accent to-accent-amber bg-clip-text text-6xl font-extrabold text-transparent sm:text-7xl">
        404
      </p>
      <h1 className="text-xl font-bold">Página não encontrada</h1>
      <p className="text-sm text-muted-foreground">
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para a classificação
      </Link>
    </div>
  );
}
