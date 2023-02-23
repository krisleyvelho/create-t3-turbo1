import { MultiPoint } from "ol/geom";
import { Draw } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import { useEffect, useState } from "react";
import { useMapa } from "~/contexts/map";

export function MapDrawer() {
  const { mapa } = useMapa();
  const [canDraw, setCanDraw] = useState<boolean>(false);

  const source = new VectorSource();
  const vector = new VectorLayer({
    source: source,
    style: [
      new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)",
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#ffcc33",
          }),
        }),
      }),
      new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: "orange",
          }),
        }),

        text: new Text({
          text: "Alt-Click to delete",
          font: "12px Calibri,sans-serif",
          fill: new Fill({
            color: "rgba(255, 255, 255, 1)",
          }),
          backgroundFill: new Fill({
            color: "rgba(0, 0, 0, 0.7)",
          }),
          padding: [2, 2, 2, 2],
          textAlign: "left",
          offsetX: 15,
        }),
        geometry: function (feature) {
          // return the coordinates of the first ring of the polygon
          const coordinates = feature?.getGeometry()?.getCoordinates()[0];
          return new MultiPoint(coordinates);
        },
      }),
    ],
  });

  const draw = new Draw({
    source: source,
    type: "Polygon",
  });

  function addInteractions() {
    draw.setProperties({ name: "drawInteraction" });
    vector.setProperties({ name: "vectorDraw" });
    mapa?.addLayer(vector);
    mapa?.addInteraction(draw);
  }

  function clearDraw() {
    const layer = mapa
      ?.getLayers()
      .getArray()
      .find((item) => item.getProperties()?.name === "vectorDraw");
    if (layer) {
      mapa?.removeLayer(layer);
    }
  }

  useEffect(() => {
    if (canDraw) {
      addInteractions();
    } else {
      const interaction = mapa
        ?.getInteractions()
        .getArray()
        .find((item) => item.getProperties()?.name === "drawInteraction");
      if (interaction) {
        mapa?.removeInteraction(interaction);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canDraw, mapa]);

  return (
    <div className="flex flex-col">
      <button onClick={() => setCanDraw(!canDraw)}>
        {canDraw ? "Desabilitar" : "Habilitar"} desenho
      </button>
      <button onClick={clearDraw}>Limpar Desenhos</button>
    </div>
  );
}
