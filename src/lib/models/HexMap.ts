import { Hex } from "./Hex";
import { Border, BorderData, HexData, Vertex, VertexData } from "./index";

export class HexMap<H, B, V> {
  vertices: Map<string, Vertex<H, B, V>>;
  borders: Map<string, Border<H, B, V>>;
  hexes: Map<string, Hex<H, B, V>>;
  rootHex: Hex<H, B, V>;

  constructor() {
    this.vertices = new Map();
    this.borders = new Map();
    this.hexes = new Map();
    this.rootHex = Hex.getOrCreate([0, 0], this);
  }
}

type CatanResource = "wheat" | "brick" | "ore" | "wood" | "sheep";
type CatanTile = CatanResource | "desert" | "gold" | "hidden";

interface ICatanMap {
  isolatedNumbersPool: number[];
  numberPool: number[];
  tilePool: CatanTile[];
  hexMap: HexMap<HexData, BorderData, VertexData>;
}

class CatanMap implements ICatanMap {
  isolatedNumbersPool: number[];
  numberPool: number[];
  tilePool: CatanTile[];
  hexMap: HexMap<HexData, BorderData, VertexData>;

  constructor(map: ICatanMap) {
    this.isolatedNumbersPool = map.isolatedNumbersPool;
    this.numberPool = map.numberPool;
    this.tilePool = map.tilePool;
    this.hexMap = map.hexMap;
  }

  generate() {
    this.placeTiles();
    this.placeNumbers();
  }

  placeTiles() {
    const remainingTiles = [...this.tilePool];
    for (const [location, hex] of this.hexMap.hexes) {
      hex.data.tile = remainingTiles.splice(
        Math.floor(Math.random() * remainingTiles.length),
        1
      )[0];
    }
  }

  placeNumbers() {
    const remainingNumbers = [...this.numberPool];
    const hexes = this.hexMap.hexes;
    for (const [location, hex] of this.hexMap.hexes) {
      //
    }
  }
}

export function standardMap() {
  const hexMap = new HexMap();
  const hex0 = hexMap.rootHex.addNeighbor(0);
  hex0.addNeighbor(0);
  hex0.addNeighbor(1);
  const hex1 = hexMap.rootHex.addNeighbor(1);
  hex1.addNeighbor(1);
  hex1.addNeighbor(2);
  const hex2 = hexMap.rootHex.addNeighbor(2);
  hex2.addNeighbor(2);
  hex2.addNeighbor(3);
  const hex3 = hexMap.rootHex.addNeighbor(3);
  hex3.addNeighbor(3);
  hex3.addNeighbor(4);
  const hex4 = hexMap.rootHex.addNeighbor(4);
  hex4.addNeighbor(4);
  hex4.addNeighbor(5);
  const hex5 = hexMap.rootHex.addNeighbor(5);
  hex5.addNeighbor(5);
  hex5.addNeighbor(0);
  return new CatanMap({
    isolatedNumbersPool: [6, 6, 8, 8],
    numberPool: [2, 3, 3, 4, 4, 5, 5, 9, 9, 10, 10, 11, 11, 12],
    tilePool: [
      "brick",
      "brick",
      "brick",
      "desert",
      "ore",
      "ore",
      "ore",
      "sheep",
      "sheep",
      "sheep",
      "sheep",
      "wheat",
      "wheat",
      "wheat",
      "wheat",
      "wood",
      "wood",
      "wood",
      "wood",
    ],
    hexMap: hexMap as HexMap<HexData, BorderData, VertexData>,
  });
}
