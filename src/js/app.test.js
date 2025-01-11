import { getCoords } from "./components/getcoords";

describe("Test correct getCoords", () => {
  test.each([
    {
      str: "51.50851, -0.12572",
      expected: { latitude: 51.50851, longitude: -0.12572 },
    },
    {
      str: "51.50851,-0.12572",
      expected: { latitude: 51.50851, longitude: -0.12572 },
    },
    {
      str: "[51.50851, -0.12572]",
      expected: { latitude: 51.50851, longitude: -0.12572 },
    },
  ])("getCoords($str)", ({ str, expected }) => {
    expect(getCoords(str)).toEqual(expected);
  });
});

describe("Test incorrect getCoords", () => {
  test.each([
    {
      str: "51.50851, -0.12572, -3",
      expected: new Error("Неверный формат ввода координат"),
    },
    {
      str: "51.50851, 'abc'",
      expected: new Error("Неверный формат ввода координат"),
    },
    {
      str: "[51.50851, ",
      expected: new Error("Неверный формат ввода координат"),
    },
  ])("getCoords($str)", ({ str, expected }) => {
    expect(() => {
      getCoords(str);
    }).toThrow(expected);
  });
});
