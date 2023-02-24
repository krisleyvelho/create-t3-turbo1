import { Coordinate } from "ol/coordinate";
import { useMapa } from "~/contexts/map";
import { usePointers } from "~/contexts/pointer";
import { api, RouterInputs } from "~/utils/api";
import { FormPointer } from "../FormPointer";

type PointCreatorProps = {
  coords: Coordinate;
  setCoords: (item: Coordinate | null) => void;
};

export function PointCreator({ coords, setCoords }: PointCreatorProps) {
  const { mapa } = useMapa();
  const { refetch } = usePointers();

  const { mutate } = api.pointerMap.create.useMutation({
    onSuccess: () => {
      refetch();
      setCoords(null);
    },
  });
  if (!mapa) return null;

  function generatePoint(data: RouterInputs["pointerMap"]["create"]) {
    if (!mapa) return;
    console.log("aquo");

    mutate(data);
  }

  function onCancel() {
    setCoords(null);
  }

  function onOk(data: RouterInputs["pointerMap"]["create"]) {
    generatePoint(data);
  }

  return (
    <FormPointer
      onCancel={onCancel}
      initialValue={{
        coordinateX: String(coords[0]),
        coordinateY: String(coords[1]),
      }}
      conditionalOk={onOk}
    />
  );
}
