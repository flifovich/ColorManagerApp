export type Color = {
  id: number;
  name: string;
  hex: string;
};

let colors: Color[] = [
  { id: 1, name: "Red", hex: "#FF0000" },
  { id: 2, name: "Green", hex: "#00FF00" },
  { id: 3, name: "Blue", hex: "#0000FF" },
];

export const setColors = (newColors: Color[]) => {
  colors = newColors;
};

export { colors };
