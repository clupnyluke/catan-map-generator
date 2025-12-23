/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect } from "react";
import "./App.css";
import { Application, Graphics } from "pixi.js";
import { drawHexagon } from "./lib/draw";
import { standardMap } from "./lib/models/HexMap";
import { Hex } from "./lib/models";

function App() {
  const hexColor = (tile: string) => {
    let color = 0x000;
    switch (tile) {
      case "brick":
        color = 0xc04657;
        break;
      case "wheat":
        color = 0xf5deb3;
        break;
      case "wood":
        color = 0x8b5a2b;
        break;
      case "ore":
        color = 0x777777;
        break;
      case "sheep":
        color = 0xcccccc;
        break;
      case "desert":
        color = 0xffa54f;
        break;
    }
    return color;
  };

  const map = standardMap();
  map.generate();

  const app = new Application();

  useEffect(() => {
    (async () => {
      const renderer = document.getElementById("renderer");
      await app?.init({ background: "0xffffff", resizeTo: window });
      renderer?.appendChild(app?.canvas as HTMLCanvasElement);
      const hexagons = new Graphics();
      app.stage.addChild(hexagons);
      const center: [number, number] = [
        app.canvas.width / 2,
        app.canvas.height / 2,
      ];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [_, hex] of map.hexMap.hexes) {
        const loc = Hex.axialLocationtoPixelCoordinates(hex.location, 95);
        drawHexagon(
          hexagons,
          center.map((val, i) => loc[i] + val) as [number, number],
          100,
          hexColor(hex.data.tile)
        );
      }
      drawHexagon(
        hexagons,
        center,
        100,
        hexColor(map.hexMap.rootHex.data.tile)
      );
    })();
  });
  return (
    <>
      <div id="renderer"></div>
    </>
  );
}

export default App;
