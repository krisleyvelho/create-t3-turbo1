import { Feature, View } from "ol";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style.js";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "~/contexts/map";

type PredefinetionsType = {
  zoom: number;
  center: [number, number];
  name: string;
};

export function PositionSelector() {
  const { mapa } = useContext(MapContext);
  const predefinetions: PredefinetionsType[] = [
    { zoom: 15, center: [-49.3002, -28.3588], name: "Casa" },
    { zoom: 15, center: [-49.3544, -28.6806], name: "Trabalho" },
  ];
  const [localSelected, setLocalSelected] = useState<PredefinetionsType>();

  useEffect(() => {
    if (mapa) {
      const view = new View({
        projection: "EPSG:4326",
        center: localSelected?.center || [0, 0],
        zoom: localSelected?.zoom || 0,
      });

      if (localSelected && localSelected.center) {
        const iconStyle = new Style({
          image: new Icon({
            src: "https://picsum.photos/50/50",
            rotateWithView: true,
          }),
        });

        const pointer = new Feature({
          geometry: new Point(localSelected?.center),
        });

        pointer.setStyle(iconStyle);
        const vectorLayer = new VectorLayer({
          zIndex: 99,
          source: new VectorSource({
            features: [pointer],
          }),
        });

        mapa.addLayer(vectorLayer);
      }
      mapa.setView(view);
    }
  }, [localSelected, mapa]);

  return (
    <div className="flex flex-col">
      <span>Selecione um local pré-definido</span>

      <select
        onChange={(e) =>
          e.target.value &&
          setLocalSelected(predefinetions[Number(e.target?.value)])
        }
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
