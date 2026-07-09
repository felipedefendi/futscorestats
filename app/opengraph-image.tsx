import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "FutScoreStats — Painel de Estatísticas de Futebol";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0b0f0d",
          color: "#e6f0ea",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 84,
            height: 84,
            borderRadius: 18,
            background: "linear-gradient(135deg, #22c55e, #0b0f0d)",
            fontSize: 44,
          }}
        >
          ⚽
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 800,
            marginTop: 36,
            letterSpacing: -2,
          }}
        >
          FutScoreStats
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 600,
            marginTop: 8,
            color: "#22c55e",
          }}
        >
          Painel de Estatísticas de Futebol
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 24,
            color: "#93a39a",
          }}
        >
          Classificação · Forma recente · Estatísticas por time
        </div>
      </div>
    ),
    { ...size },
  );
}
