import GeoJSON from "ol/format/GeoJSON";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import TileJSON from "ol/source/TileJSON.js";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { Fill, Style } from "ol/style";
import { useEffect, useState } from "react";
import { useMapa } from "~/contexts/map";

export function MapType() {
  const { mapa } = useMapa();
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

  const style = new Style({
    fill: new Fill({
      color: "#eeeeee",
    }),
  });

  const rasterEcologico = new VectorLayer({
    background: "#1a2b39",
    source: new VectorSource({
      
      url: "https://openlayers.org/data/vector/ecoregions.json",
      format: new GeoJSON(),
    }),
    style: function (feature) {
      const color = feature.get("COLOR_NNH") || "#eeeeee";
      style.getFill().setColor(color);
      return style;
    },
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
        case "ecologico":
          rasterImage.setProperties({ name: "rasterEcologico" });
          mapa.addLayer(rasterEcologico);
          return;
        default:
          break;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapOption, mapa]);

  return (
    <div className="flex flex-col">
      <span>Tipo do mapa</span>
      <select
        onChange={(e) => setMapOption(e.target?.value)}
        defaultValue={"default"}
        className="bg-transparent outline-none"
      >
        <option value="default">Default</option>
        <option value="politic">Politico</option>
        <option value="image">Imagem</option>
        <option value="ecologico">Ecologico</option>
      </select>
    </div>
  );
}
