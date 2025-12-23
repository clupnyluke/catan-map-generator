import {
  hexBorderLocations,
  hexLocations,
  hexVertexLocations,
} from "../constants";
import { Border, HexMap, Vertex } from ".";

const SQRT3 = Math.sqrt(3);

type CatanResource = "wheat" | "brick" | "ore" | "wood" | "sheep";
type CatanTile = CatanResource | "desert" | "gold" | "hidden";

export interface IHexData {
  number: number | "random";
  tile: CatanTile | "random";
  hidden: boolean;
}

export class HexData implements IHexData {
  number: number | "random";
  tile: CatanTile | "random";
  hidden: boolean;

  constructor(data: IHexData) {
    this.number = data.number;
    this.tile = data.tile;
    this.hidden = data.hidden || true;
  }
}

export class Hex<H, B, V> {
  location: [number, number];
  data: H;
  hexMap: HexMap<H, B, V>;
  borders: Border<H, B, V>[];
  vertices: Vertex<H, B, V>[];
  constructor(_location: [number, number], _data: H, _hexMap: HexMap<H, B, V>) {
    this.location = _location;
    this.data = _data;
    this.hexMap = _hexMap;
    this.borders = [];
    this.vertices = [];

    let i = 0;
    for (const border of hexBorderLocations) {
      this.borders.push(
        Border.getOrCreate(
          this.location.map((val, j) => val + border[j]) as [
            number,
            number,
            number
          ],
          this.hexMap,
          i
        )
      );
      i++;
    }

    i = 0;
    for (const vertex of hexVertexLocations) {
      this.vertices.push(
        Vertex.getOrCreate(
          this.location.map((val, j) => val + vertex[j]) as [
            number,
            number,
            number
          ],
          this.hexMap
        )
      );
      i++;
    }
  }

  static getOrCreate<H, B, V>(
    location: [number, number],
    hexMap: HexMap<H, B, V>
  ) {
    let hex = hexMap.hexes.get(location.join());
    if (!hex) {
      hex = new Hex(location, new Object() as H, hexMap);
      hexMap.hexes.set(location.join(), hex);
    }
    return hex;
  }

  //NEEDS FIXED DONT USE
  static pixelCoordinatesToOffset([x, y]: [number, number], size = 1) {
    const q = ((SQRT3 / 3) * x - (1 / 3) * y) / size;
    const r = ((2 / 3) * y) / size;
    return [q, r];
  }

  static axialLocationtoPixelCoordinates(
    location: [number, number],
    size = 1
  ): [number, number] {
    const [q, r] = location;
    const x = (2 * q + r) * size;
    const y = r * SQRT3 * size;
    return [x, y];
  }

  addNeighbor(direction: number) {
    const loc = this.location.map(
      (val, i) => val + hexLocations[direction][i]
    ) as [number, number];
    if (this.hexMap.hexes.get(loc.join())) {
      throw new Error("Hex exists");
    }
    return Hex.getOrCreate(loc, this.hexMap);
  }

  getNeighbors(): Hex<H, B, V>[] {
    const hexes: Hex<H, B, V>[] = [];
    for (const dir in hexLocations) {
      const hex = this.hexMap.hexes.get(
        this.location.map((val, i) => val + dir[i]).join()
      );
      if (hex) {
        hexes.push(hex);
      }
    }
    return hexes;
  }
}
