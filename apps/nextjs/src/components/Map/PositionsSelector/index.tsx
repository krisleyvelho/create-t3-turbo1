import { Feature, View } from "ol";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Text } from "ol/style";
import { Style } from "ol/style.js";
import { useEffect, useState } from "react";
import { useMapa } from "~/contexts/map";
import { usePointers } from "~/contexts/pointer";
import { RouterOutputs } from "~/utils/api";

export function PositionSelector() {
  const { mapa } = useMapa();
  const { predefinetions } = usePointers();

  const [localSelected, setLocalSelected] =
    useState<RouterOutputs["pointerMap"]["byId"]>();

  useEffect(() => {
    mapa?.setView(
      new View({
        projection: "EPSG:4326",
        center: [
          Number(localSelected?.coordinateX),
          Number(localSelected?.coordinateY),
        ],
        zoom: localSelected?.zoom || 0,
      }),
    );
  }, [localSelected, mapa]);

  useEffect(() => {
    if (predefinetions) {
      const view = new View({
        projection: "EPSG:4326",
        center: [0, 0],
        zoom: 0,
      });
      predefinetions.map((mark) => {
        const center = [Number(mark.coordinateX), Number(mark.coordinateY)];

        const iconStyle = [
          new Style({
            text: new Text({
              text: mark?.name,
              font: "24px Calibri,sans-serif",
              textAlign: "left",
              padding: [20, 20, 20, 20],
            }),
          }),
        ];

        const pointer = new Feature({
          geometry: new Point(center),
        });

        pointer.setStyle(iconStyle);
        if (mark) {
          pointer.setProperties(mark);
        }

        const vectorLayer = new VectorLayer({
          zIndex: 99,
          source: new VectorSource({
            features: [pointer],
          }),
        });

        mapa?.addLayer(vectorLayer);
      });
      mapa?.setView(view);
    }
  }, [predefinetions]);

  if (!predefinetions) return null;

  return (
    <div className="flex flex-col">
      <span>Selecione um local pré-definido</span>

      <select
        onChange={(e) => {
          const position = e.target.value && Number(e.target.value);

          if (position) setLocalSelected(predefinetions[position]);
        }}
        defaultValue={-1}
      >
        {predefinetions.map((local, index) => (
          <option value={index} key={index}>
            {local.name}
          </option>
        ))}
        <option value={-1}>Selecione...</option>
      </select>
    </div>
  );
}
