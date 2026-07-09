# FutScoreStats

Painel de estatísticas de futebol: classificação, forma recente dos times e gráficos de desempenho.
Projeto de demonstração — **sem odds, sem apostas**, apenas estatística.

🔗 **Ao vivo:** _(adicionar após o deploy)_

## ✨ Funcionalidades

- 📊 Classificação completa (P, J, V/E/D, GP/GC, SG) com critérios de desempate
- 🔥 Forma recente dos últimos 5 jogos de cada time
- 📈 Gráfico de pontos por time
- 🧪 Modo demonstração: dados gerados localmente de forma determinística, sem depender de API externa
- ✅ Lógica estatística isolada em funções puras e testadas (Jest)

## 🛠️ Stack

- [Next.js](https://nextjs.org/) 16 (App Router) + [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Prisma](https://www.prisma.io/) + PostgreSQL (camada de cache dos dados da API — fase futura)
- [Recharts](https://recharts.org/) · [Zod](https://zod.dev/) · [Jest](https://jestjs.io/)
- Dados reais (fase futura): [football-data.org](https://www.football-data.org/) (plano gratuito)

## 🚀 Rodando localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). O app funciona **em modo demonstração** por padrão,
sem precisar de nenhuma chave de API.

## 🧪 Testes

```bash
npm test
```

## 📦 Build de produção

```bash
npm run build
npm start
```

## 📁 Estrutura

```
app/                 Rotas e layout (Navbar, Footer)
components/          Tabela de classificação, gráfico, badges de forma, escudo do time
lib/types/            Tipos e validação (Zod)
lib/utils/            Lógica estatística pura (classificação, forma, aproveitamento) + testes
lib/data/demo/        Times e gerador determinístico da temporada demo
prisma/               Schema da camada de cache (PostgreSQL) — usada quando a API real for integrada
```

## 🗺️ Roadmap

- [x] Modo demo com classificação e gráfico
- [ ] Integração com a API real (football-data.org) + cache em PostgreSQL
- [ ] Página de estatísticas por time
- [ ] Deploy

---

Feito por [Felipe Defendi](https://portfolio-felipe-sigma-jade.vercel.app).
