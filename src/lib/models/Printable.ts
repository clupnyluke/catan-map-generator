/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPrintable {
  data: any;
  location: [number, number] | [number, number, number];
  type: string;
}

export default class Printable {
  type: string;
  data: any;
  location: [number, number] | [number, number, number];
  constructor(obj: IPrintable) {
    this.type = obj.type;
    this.data = obj.data;
    this.location = obj.location;
  }

  print() {
    JSON.stringify({
      type: this.type,
      location: this.location,
      data: this.data,
    });
  }

  static parse(stream: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = JSON.parse(stream);
    //todo
  }
}
