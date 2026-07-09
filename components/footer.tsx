export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:px-6">
        <p>
          Dados de demonstração, gerados localmente para fins ilustrativos —
          este projeto é apenas estatístico e não envolve odds ou apostas.
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
