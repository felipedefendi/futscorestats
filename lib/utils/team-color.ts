/**
 * Gera um par de cores determinístico a partir de um texto — usado como
 * fallback visual para times reais (da API) que não tenham escudo disponível.
 */
export function colorFromString(input: string): { colorFrom: string; colorTo: string } {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }

  const hue = Math.abs(hash) % 360;
  const colorFrom = `hsl(${hue}, 65%, 40%)`;
  const colorTo = `hsl(${(hue + 40) % 360}, 65%, 25%)`;
  return { colorFrom, colorTo };
}
