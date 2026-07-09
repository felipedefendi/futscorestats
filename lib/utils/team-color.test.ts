import { colorFromString } from "./team-color";

describe("colorFromString", () => {
  it("é determinístico para a mesma entrada", () => {
    expect(colorFromString("Flamengo")).toEqual(colorFromString("Flamengo"));
  });

  it("gera cores diferentes para nomes diferentes", () => {
    expect(colorFromString("Flamengo")).not.toEqual(colorFromString("Palmeiras"));
  });
});
