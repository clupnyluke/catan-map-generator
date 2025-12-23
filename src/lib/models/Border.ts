/* eslint-disable @typescript-eslint/no-explicit-any */
import { hexVertexLocations } from "../constants";
import { HexMap, Printable, Vertex } from "./index";

const SQRT3 = Math.sqrt(3);

export interface IBorderData {
  data: any;
}

export class BorderData implements IBorderData {
  data: any;
  constructor(data: IBorderData) {
    this.data = data;
  }
}

export class Border<H, B, V> extends Printable {
  location: [number, number, number];
  distanceFromCenter = SQRT3 / 2;
  data: B;
  hexMap: HexMap<H, B, V>;
  CCWVertex: Vertex<H, B, V> | undefined;
  CWVertex: Vertex<H, B, V> | undefined;
  constructor(
    _location: [number, number, number],
    _orientation: number,
    _data: B,
    _hexMap: HexMap<H, B, V>
  ) {
    super({
      location: _location,
      type: "Border",
      data: { ..._data, orientation: _orientation },
    });
    this.location = _location;
    this.data = _data;
    this.hexMap = _hexMap;

    this.CWVertex = Vertex.getOrCreate(
      this.location.map(
        (val, i) => val + hexVertexLocations[_orientation % 5][i]
      ) as [number, number, number],
      this.hexMap
    );
    this.CCWVertex = Vertex.getOrCreate(
      this.location.map(
        (val, i) => val + hexVertexLocations[(_orientation + 1) % 5][i]
      ) as [number, number, number],
      this.hexMap
    );
  }

  static getOrCreate<H, B, V>(
    location: [number, number, number],
    hexMap: HexMap<H, B, V>,
    orientation: number
  ) {
    let border = hexMap.borders.get(location.join());
    if (!border) {
      border = new Border(location, orientation, undefined as B, hexMap);
      hexMap.borders.set(location.join(), border);
    }

    return border;
  }
}
