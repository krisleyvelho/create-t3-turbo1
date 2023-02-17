import GeoJSON from "ol/format/GeoJSON.js";
import Draw from "ol/interaction/Draw.js";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "~/contexts/map";
export function MapDrawer() {
  const { mapa } = useContext(MapContext);
  const [canDraw, setCanDraw] = useState<boolean>(false);

  const baseVector = new VectorLayer({
    source: new VectorSource({
      format: new GeoJSON(),
      url: "https://api.npoint.io/7e667a9b874a4dcc77e3",
    }),
    style: {
      "fill-color": "rgba(255, 0, 0, 0.3)",
      "stroke-color": "rgba(255, 0, 0, 0.9)",
      "stroke-width": 0.5,
    },
  });

  const drawInteraction = new Draw({
    type: "LineString",
    trace: true,
    style: {
      "stroke-color": "rgba(255, 255, 100, 1)",
      "stroke-width": 3.5,
      "fill-color": "rgba(255, 255, 100, 1)",
      "circle-radius": 6,
      "circle-fill-color": "rgba(255, 255, 100, 1)",
    },
  });

  useEffect(() => {
    if (canDraw) {
      mapa?.addInteraction(drawInteraction);
    } else {
      const arrayInteractions = mapa?.getInteractions().getArray();
      if (arrayInteractions) {
        const eventDelete = arrayInteractions.findIndex(
          (interact) =>
            Object.getPrototypeOf(interact).constructor.name === "Draw",
        );

        if (eventDelete > 0) {
          arrayInteractions.splice(eventDelete);
          mapa?.renderSync();
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canDraw, mapa]);

  return (
    <button onClick={() => setCanDraw(!canDraw)}>
      {canDraw ? "Desabilitar" : "Habilitar"} desenho
    </button>
  );
}
