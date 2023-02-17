import MousePosition from "ol/control/MousePosition.js";
import { createStringXY } from "ol/coordinate";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "~/contexts/map";

export function CustomMousePosition({}) {
  const { mapa } = useContext(MapContext);
  const [showMouseCoordinates, setShowMouseCoordinates] =
    useState<boolean>(false);

  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: "EPSG:4326",
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
    <div className="flex gap-2">
      <input
        type="checkbox"
        defaultChecked={showMouseCoordinates}
        onChange={(e) => setShowMouseCoordinates(e.target.checked)}
      />
      <span>Coordenadas do Mouse</span>
    </div>
  );
}
