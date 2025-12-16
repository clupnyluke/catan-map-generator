import type { Graphics } from "pixi.js";

const drawHexagon = (
  obj: Graphics,
  location: [number, number],
  inscribedRadius: number,
  color = 0x000
) => {
  obj.fill(color);
  obj.regularPoly(location[0], location[1], inscribedRadius, 6, 0);
};

export default drawHexagon;
