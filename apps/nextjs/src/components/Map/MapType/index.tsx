import { View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "~/contexts/map";

export function MapType() {
  const { mapa } = useContext(MapContext);
  const [mapOption, setMapOption] = useState<string>("revelo");

  const view = new View({
    center: [-5701523.274225562, -3508003.9130105707],
    zoom: 20,
  });

  const raster = new TileLayer({
    source: new XYZ({
      url: "https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
      maxZoom: 30,
      opaque: true,
    }),
    properties: { name: "relevo" },
  });

  useEffect(() => {
    const arrayLayers = mapa?.getLayers().getArray();

    if (mapa) {
      const indexRelevo = arrayLayers?.findIndex(
        (layer) => layer.getProperties()?.name === "relevo",
      );
      switch (mapOption) {
        case "relevo":
          mapa.addLayer(raster);
          return;
        case "branco":
          if (indexRelevo && indexRelevo > 0) {
            arrayLayers?.splice(indexRelevo);

            mapa.renderSync();
          }
          return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapOption, mapa]);
  return (
    <div>
      <button
        className="bg-cyan-300 text-white"
        onClick={() => mapa?.setView(view)}
      >
        ALterar view
      </button>
      <select
        onChange={(e) => setMapOption(e.target?.value)}
        defaultValue={"relevo"}
      >
        <option value="branco">Branco</option>
        <option value="relevo">Relevo</option>
      </select>
    </div>
  );
}
