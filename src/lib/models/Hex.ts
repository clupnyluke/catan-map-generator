import { hexBorderLocations, hexVertexLocations } from "../constants";
import { Border, HexMap, Vertex } from ".";

const SQRT3 = Math.sqrt(3);

type CatanResource = "wheat" | "brick" | "ore" | "wood" | "sheep";
type CatanTile = CatanResource | "desert" | "gold" | "hidden";

const round = (num: number) => Math.floor(num + 0.5);
const differenceFromRound = (num: number) => Math.abs(num - round(num));

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
          this.location.map((val, j) => val + border[j]) as [number, number],
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
          this.location.map((val, j) => val + vertex[j]) as [number, number],
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
    const [q, r] = Hex.pixelCoordinatesToOffset(location);
    if (differenceFromRound(q) > 1e-6 || differenceFromRound(r) > 1e-6)
      throw new Error("Off Grid");
    let hex = hexMap.hexes.get(location.join());
    if (!hex) {
      hex = new Hex(location, new Object() as H, hexMap);
      hexMap.hexes.set(location.join(), hex);
    }
    return hex;
  }

  static offsetCoordinatesToPixel([q, r]: [number, number], size = 1) {
    const x = (SQRT3 * q + (SQRT3 / 2) * r) * size;
    const y = (3 / 2) * r * size;
    return [x, y];
  }

  static pixelCoordinatesToOffset([x, y]: [number, number], size = 1) {
    const q = ((SQRT3 / 3) * x - (1 / 3) * y) / size;
    const r = ((2 / 3) * y) / size;
    return [q, r];
  }

  static resizePixelCoordinates(
    location: [number, number],
    endSize = 1,
    startSize = 1
  ) {
    const intermediateLocation = this.pixelCoordinatesToOffset(
      location,
      startSize
    );
    return this.offsetCoordinatesToPixel(
      intermediateLocation as [number, number],
      endSize
    );
  }

  addNeighbor(direction: number) {
    const loc = this.location.map(
      (val, i) => val + 2 * hexBorderLocations[direction][i]
    ) as [number, number];
    if (this.hexMap.hexes.get(loc.join())) {
      throw new Error("Hex exists");
    }
    return Hex.getOrCreate(loc, this.hexMap);
  }
}
