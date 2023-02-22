import * as Tabs from "@radix-ui/react-tabs";
import { Feature } from "ol";
import { Coordinate } from "ol/coordinate";
import { Point } from "ol/geom";
import { Style, Text } from "ol/style";
import { useState } from "react";
import { useMapa } from "~/contexts/map";
import { usePointers } from "~/contexts/pointer";
import { api, RouterInputs } from "~/utils/api";

type PointCreatorProps = {
  coords: Coordinate;
  setCoords: (item: Coordinate | undefined) => void;
};

export function PointCreator({ coords, setCoords }: PointCreatorProps) {
  const { mapa } = useMapa();
  const { refetch } = usePointers();
  const [formValues, setFormValues] = useState<
    RouterInputs["pointerMap"]["create"]
  >({} as RouterInputs["pointerMap"]["create"]);

  const iconStyle = [
    new Style({
      text: new Text({
        text: formValues?.name,
        font: "36px Calibri,sans-serif",
        padding: [2, 2, 2, 2],
        textAlign: "left",
        offsetX: 15,
      }),
    }),
  ];

  const pointer = new Feature({
    geometry: new Point(coords),
  });

  pointer.setStyle(iconStyle);

  const { mutate } = api.pointerMap.create.useMutation({
    onSuccess: () => {
      refetch();
      setCoords(undefined);
    },
  });
  if (!mapa) return null;

  function generatePoint() {
    if (!mapa) return;

    mutate({
      ...formValues,
      coordinateX: String(coords[0]),
      coordinateY: String(coords[1]),
    });
  }

  return (
    <Tabs.Root className="shadow-blackA4 fixed top-1/3 right-1/3 flex w-[300px] flex-col rounded-sm bg-white p-4 shadow-[0_2px_10px]">
      <label className="text-violet12 mb-2.5 block text-[13px] leading-none">
        Nome
      </label>
      <input
        className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
        onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
      />
      <label
        className="text-violet12 mb-2.5 block text-[13px] leading-none"
        htmlFor="name"
      >
        Coordenadas X
      </label>
      <input
        className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
        id="name"
        value={coords[0]}
        readOnly
      />
      <label
        className="text-violet12 mb-2.5 block text-[13px] leading-none"
        htmlFor="name"
      >
        Coordenadas Y
      </label>
      <input
        className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
        id="name"
        value={coords[1]}
        readOnly
      />
      <label
        className="text-violet12 mb-2.5 block text-[13px] leading-none"
        htmlFor="name"
      >
        Zoom
      </label>
      <input
        className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
        type={"number"}
        onChange={(e) =>
          setFormValues({ ...formValues, zoom: Number(e.target.value) })
        }
      />

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
