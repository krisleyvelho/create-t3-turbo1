import { View } from "ol";
import { useEffect, useState } from "react";
import { useMapa } from "~/contexts/map";
import { RouterOutputs } from "~/utils/api";

type NavigateGeometryProps = {
  options: RouterOutputs["polygonMap"]["all"];
};

export function NavigateGeometry({ options }: NavigateGeometryProps) {
  const { mapa } = useMapa();
  const [geometrySelected, setGeometrySelected] =
    useState<RouterOutputs["polygonMap"]["byId"]>();

  useEffect(() => {
    if (geometrySelected) {
      console.log(geometrySelected.location[0]);

      const view = new View({
        center: geometrySelected.location[0],
        zoom: 22,
      });

      mapa?.setView(view);
    }
  }, [geometrySelected]);

  if (!options) return null;
  return (
    <div className="flex flex-col justify-center">
      <select
        className="bg-transparent outline-none"
        onChange={(e) => {
          const selected = options.find((item) => item.id === e.target.value);

          selected && setGeometrySelected(selected);
        }}
      >
        <option value={-1} className="bg-gray-600">
          Selecione...
        </option>
        {options.map((option, index) => (
          <option key={index} className="bg-gray-600" value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
