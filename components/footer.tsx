export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:px-6">
        <p>
          Dados via{" "}
          <a
            href="https://www.football-data.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted hover:text-foreground"
          >
            football-data.org
          </a>
          , com modo demonstração como contingência caso a API esteja
          indisponível — este projeto é apenas estatístico e não envolve odds
          ou apostas.
        </p>
        <p>
          Feito por{" "}
          <a
            href="https://portfolio-felipe-sigma-jade.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground transition-colors hover:text-accent"
          >
            Felipe Defendi
          </a>
        </p>
      </div>
    </footer>
  );
}
