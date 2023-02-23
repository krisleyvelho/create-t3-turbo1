import MousePosition from "ol/control/MousePosition.js";
import { createStringXY } from "ol/coordinate";
import { useEffect, useRef, useState } from "react";
import { useMapa } from "~/contexts/map";

export function CustomMousePosition() {
  const { mapa } = useMapa();
  const spanRef = useRef<HTMLSpanElement>(null);
  const [showMouseCoordinates, setShowMouseCoordinates] =
    useState<boolean>(false);

  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
  });

  useEffect(() => {
    if (mapa) {
      if (showMouseCoordinates) {
        mousePositionControl.setProperties({ name: "mouseEvent" });
        mapa.addControl(mousePositionControl);
      } else {
        mapa
          .getControls()
          .getArray()
          .map((control) => {
            if (control.getProperties()?.name === "mouseEvent") {
              mapa.removeControl(control);
            }
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapa, showMouseCoordinates]);
  return (
    <div>
      <div className="flex gap-2">
        <input
          type="checkbox"
          defaultChecked={showMouseCoordinates}
          onChange={(e) => setShowMouseCoordinates(e.target.checked)}
        />
        <span>Coordenadas do Mouse</span>
      </div>
      <div>
        <span ref={spanRef} />
      </div>
    </div>
  );
}
