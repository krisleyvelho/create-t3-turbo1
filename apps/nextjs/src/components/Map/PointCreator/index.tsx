import * as Tabs from "@radix-ui/react-tabs";
import { Feature } from "ol";
import { Coordinate } from "ol/coordinate";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import { useContext, useState } from "react";
import { MapContext } from "~/contexts/map";

type PointCreatorProps = {
  coords: Coordinate;
  setCoords: (item: Coordinate | undefined) => void;
};

export function PointCreator({ coords, setCoords }: PointCreatorProps) {
  const { mapa } = useContext(MapContext);
  const [nome, setNome] = useState<string | undefined>();

  if (!mapa) return null;

  function generatePoint() {
    if (!mapa) return;
    const iconStyle = new Style({
      image: new Icon({
        src: "https://picsum.photos/50/50",
        rotateWithView: true,
      }),
    });

    const pointer = new Feature({
      geometry: new Point(coords),
    });

    pointer.setStyle(iconStyle);
    const vectorLayer = new VectorLayer({
      zIndex: 99,
      source: new VectorSource({
        features: [pointer],
      }),
    });

    mapa.addLayer(vectorLayer);
    setCoords(undefined);
  }

  return (
    <Tabs.Root className="shadow-blackA4 fixed top-1/3 right-1/3 flex w-[300px] flex-col rounded-sm bg-white p-4 shadow-[0_2px_10px]">
      <fieldset className="mb-[15px] flex w-full flex-col justify-start">
        <label
          className="text-violet12 mb-2.5 block text-[13px] leading-none"
          htmlFor="name"
        >
          Nome
        </label>
        <input
          className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="name"
          onChange={(e) => setNome(e.target.value)}
        />
      </fieldset>
      <div className="mt-3 flex justify-end">
        <button
          className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] cursor-default items-center justify-center rounded px-[15px] text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
          onClick={() => setCoords(undefined)}
        >
          Cancelar
        </button>
        <button
          className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] cursor-default items-center justify-center rounded px-[15px] text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
          onClick={() => generatePoint()}
        >
          Salvar
        </button>
      </div>
    </Tabs.Root>
  );
}
