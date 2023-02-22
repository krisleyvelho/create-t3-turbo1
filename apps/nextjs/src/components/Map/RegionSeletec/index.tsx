import GeoJSON from "ol/format/GeoJSON.js";
import VectorLayer from "ol/layer/Vector.js";

import VectorSource from "ol/source/Vector.js";
import { Fill, Style } from "ol/style.js";
import { useEffect, useState } from "react";
import { useMapa } from "~/contexts/map";

export default function RegionSelect() {
  const { mapa } = useMapa();
  const [texto, setTexto] = useState("");
  const [showEcoRegions, setShowEcoRegions] = useState<boolean>(false);
  const style = new Style({
    fill: new Fill({
      color: "#eeeeee",
    }),
  });

  const vectorLayer = new VectorLayer({
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

  const displayFeatureInfo = function (pixel: any) {
    vectorLayer
      .getFeatures(pixel)
      .then((features) => setTexto(features[0]?.get("NNH_NAME") || ""));
  };

  useEffect(() => {
    if (showEcoRegions) {
      mapa?.addLayer(vectorLayer);
    } else {
      mapa?.removeLayer(vectorLayer);
    }
  }, [showEcoRegions]);

  mapa?.on("click", function (evt) {
    if (showEcoRegions) {
      displayFeatureInfo(evt.pixel);
    }
  });

  return (
    <div className="flex flex-col">
      <button onClick={() => setShowEcoRegions(!showEcoRegions)}>
        {showEcoRegions ? "Esconder" : "Mostrar"} regioes
      </button>
      <span>{texto}</span>
    </div>
  );
}
