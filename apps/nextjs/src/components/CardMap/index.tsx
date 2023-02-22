import * as HoverCard from "@radix-ui/react-hover-card";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useMapa } from "~/contexts/map";
import { usePointers } from "~/contexts/pointer";
import { api } from "~/utils/api";

export default function CardMap() {
  const { mapa } = useMapa();
  const { refetch } = usePointers();
  const [hoverPosition, setHoverPosition] = useState<number[]>([]);
  const [dataPoint, setDataPoint] = useState<any>();

  const { mutate } = api.pointerMap.delete.useMutation({
    onSuccess: () => {
      refetch();
      setDataPoint(undefined);
    },
  });

  if (!mapa) return null;

  mapa.on("click", (evt) => {
    if (mapa.hasFeatureAtPixel(evt.pixel)) {
      const properties = mapa
        .getFeaturesAtPixel(evt.pixel, { hitTolerance: 0 })[0]
        ?.getProperties();
      if (properties?.zoom) {
        setHoverPosition(evt.pixel);
        setDataPoint(properties);
      }
    } else {
      setDataPoint(undefined);
    }
  });

  return (
    <div
      className={`absolute`}
      style={{ left: hoverPosition[0], top: hoverPosition[1] }}
    >
      {dataPoint && (
        <HoverCard.Root open={!!hoverPosition.length}>
          <HoverCard.Trigger asChild>
            <span></span>
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content
              className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
              sideOffset={5}
            >
              <div className="flex justify-between">
                <div>
                  <span>{dataPoint.name}</span>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => mutate(dataPoint.id)}>
                    <TrashIcon width={25} height={30} />
                  </button>
                  <button>
                    <Pencil2Icon width={25} height={30} />
                  </button>
                </div>
              </div>
              <HoverCard.Arrow className="fill-white" />
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      )}
    </div>
  );
}
