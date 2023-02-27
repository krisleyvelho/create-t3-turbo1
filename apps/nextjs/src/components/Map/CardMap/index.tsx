import { useEffect, useRef, useState } from "react";
import { useMapa } from "~/contexts/map";
import { usePointers } from "~/contexts/pointer";
import { api } from "~/utils/api";

import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Overlay } from "ol";
import { FormPointer } from "../FormPointer";

type DataPoint = { [x: string]: any };

export function CardMap() {
  const { mapa } = useMapa();
  const { refetch } = usePointers();
  const [dataPoint, setDataPoint] = useState<DataPoint | null>();
  const [showEditPoint, setShowEditPoint] = useState<boolean>(false);
  const hoverCardRef = useRef<HTMLDivElement>(null);

  const { mutate } = api.pointerMap.delete.useMutation({
    onSuccess: () => {
      refetch();
      setDataPoint(null);
    },
  });

  mapa?.on("click", (evt) => {
    if (mapa.hasFeatureAtPixel(evt.pixel)) {
      const properties = mapa
        .getFeaturesAtPixel(evt.pixel, { hitTolerance: 300 })[0]
        ?.getProperties();

      if (properties?.zoom) {
        setDataPoint(properties);
      }
    } else {
      dataPoint && setDataPoint(undefined);
    }
  });

  useEffect(() => {
    if (dataPoint && hoverCardRef.current) {
      const card = new Overlay({
        element: hoverCardRef.current,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
        id: "tempCard",
      });

      card.setPosition([dataPoint.coordinateX, dataPoint.coordinateY]);

      mapa?.addOverlay(card);
    } else {
      const cardToRemove = mapa
        ?.getOverlays()
        .getArray()
        .find((overlay) => overlay.getId() === "tempCard");
      cardToRemove && mapa?.removeOverlay(cardToRemove);
    }
  }, [dataPoint, mapa]);

  function disableForm() {
    setShowEditPoint(false);
    setDataPoint(null);
  }

  return (
    <div ref={hoverCardRef} className="absolute mt-5 min-w-[300px]">
      {dataPoint && !showEditPoint && (
        <div className="flex justify-between rounded-md bg-white p-5">
          <div>
            <span>{dataPoint?.name || ""}</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => mutate(dataPoint.id)}>
              <TrashIcon width={25} height={30} />
            </button>
            <button onClick={() => setShowEditPoint(true)}>
              <Pencil2Icon width={25} height={30} />
            </button>
          </div>
        </div>
      )}
      {showEditPoint && dataPoint && (
        <FormPointer onCancel={disableForm} initialValue={dataPoint} />
      )}
    </div>
  );
}
