import TileLayer from "ol/layer/Tile";
import TileJSON from "ol/source/TileJSON.js";
import XYZ from "ol/source/XYZ";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "~/contexts/map";
export function MapType() {
  const { mapa } = useContext(MapContext);
  const [mapOption, setMapOption] = useState<string>("default");

  const rasterImage = new TileLayer({
    source: new XYZ({
      url: "https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
      maxZoom: 30,
      opaque: true,
    }),
    properties: { name: "rasterImage" },
  });

  const rasterpolitic = new TileLayer({
    source: new TileJSON({
      url: "https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1",
      crossOrigin: "",
    }),
  });

  useEffect(() => {
    const arrayLayers = mapa?.getLayers().getArray();

    if (mapa) {
      arrayLayers?.map((layer) => {
        if (layer.getProperties()?.name) {
          mapa.removeLayer(layer);
        }
      });
      switch (mapOption) {
        case "politic":
          rasterpolitic.setProperties({ name: "rasterpolitic" });
          mapa.addLayer(rasterpolitic);
          return;
        case "image":
          rasterImage.setProperties({ name: "rasterImage" });
          mapa.addLayer(rasterImage);
          return;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapOption, mapa]);
  return (
    <div>
      <select
        onChange={(e) => setMapOption(e.target?.value)}
        defaultValue={"default"}
      >
        <option value="default">Default</option>
        <option value="politic">Politico</option>
        <option value="image">Imagem</option>
      </select>
    </div>
  );
}
