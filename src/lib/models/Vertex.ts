/* eslint-disable @typescript-eslint/no-explicit-any */
import { HexMap, Printable } from "./index";

export interface IVertexData {
  data: any;
}

export class VertexData implements IVertexData {
  data: any;
  constructor(data: IVertexData) {
    this.data = data;
  }
}

export class Vertex<H, B, V> extends Printable {
  location: [number, number, number];
  data: V;
  hexMap: HexMap<H, B, V>;
  constructor(
    _location: [number, number, number],
    _data: V,
    _hexMap: HexMap<H, B, V>
  ) {
    super({ data: _data, type: "Vertex", location: _location });
    this.location = _location;
    this.data = _data;
    this.hexMap = _hexMap;
  }

  static getOrCreate<H, B, V>(
    location: [number, number, number],
    hexMap: HexMap<H, B, V>
  ) {
    let vertex = hexMap.vertices.get(location.join());
    if (!vertex) {
      vertex = new Vertex(location, undefined as V, hexMap);
      hexMap.vertices.set(location.join(), vertex);
    }

    return vertex;
  }
}
