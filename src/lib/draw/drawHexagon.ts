import { hexVertexLocations } from "../constants";
import type { Graphics } from "pixi.js";

const drawHexagon = (
  obj: Graphics,
  location: [number, number],
  circumradius: number,
  color = 0x000
) => {
  obj.beginFill(color);
  obj.drawPolygon(
    hexVertexLocations.reduce(
      (pnts: number[], pnt: number[]) => [
        ...pnts,
        ...(pnt.map((val, i) => val * circumradius + location[i]) as number[]),
      ],
      []
    )
  );
  obj.endFill();
};

export default drawHexagon;
