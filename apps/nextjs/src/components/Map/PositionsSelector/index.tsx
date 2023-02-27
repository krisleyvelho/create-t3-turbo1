import { Feature,View } from "ol";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill,Text } from "ol/style";
import { Style } from "ol/style.js";
import { useEffect,useState } from "react";
import { useMapa } from "~/contexts/map";
import { usePointers } from "~/contexts/pointer";
import { RouterOutputs } from "~/utils/api";

export function PositionSelector() {
  const { mapa } = useMapa();
  const { predefinetions } = usePointers();

  const [localSelected, setLocalSelected] =
    useState<RouterOutputs["pointerMap"]["byId"]>();

  useEffect(() => {
    if (localSelected) {
      mapa?.setView(
        new View({
          center: [
            Number(localSelected?.coordinateX),
            Number(localSelected?.coordinateY),
          ],
          zoom: localSelected?.zoom,
        }),
      );
    }
  }, [localSelected, mapa]);

  useEffect(() => {
    if (predefinetions) {
      const layerCached = mapa
        ?.getLayers()
        .getArray()
        .find((layer) => layer.getProperties()?.id === "pointers");
      layerCached && mapa?.removeLayer(layerCached);

      const pointers: Feature[] = [];

      predefinetions.map((mark) => {
        const center = [Number(mark.coordinateX), Number(mark.coordinateY)];

        const iconStyle = [
          new Style({
            text: new Text({
              text: mark?.name,
              font: "24px Calibri,sans-serif",
              textAlign: "left",
              backgroundFill: new Fill({
                color: "#0000001a",
              }),
              scale: 1,
            }),
          }),
        ];

        const pointer = new Feature({
          geometry: new Point(center),
        });

        pointer.setStyle(iconStyle);
        pointer.setProperties(mark);

        pointers.push(pointer);
      });
      const vectorLayer = new VectorLayer({
        zIndex: 99,
        source: new VectorSource({
          features: pointers,
        }),
        properties: { id: "pointers" },
      });

      mapa?.addLayer(vectorLayer);
    }
  }, [mapa, predefinetions]);

  if (!predefinetions) return null;

  return (
    <div className="flex flex-col">
      <span>Selecione um local pré-definido</span>

      <select
        onChange={(e) => {
          const selected = predefinetions.find(
            (item) => item.id === e.target.value,
          );
          setLocalSelected(selected);
        }}
        className="bg-transparent outline-none"
      >
        <option value={-1}>Selecione...</option>
        {predefinetions.map((local, index) => (
          <option value={local.id} key={index}>
            {local.name}
          </option>
        ))}
      </select>
    </div>
  );
}
