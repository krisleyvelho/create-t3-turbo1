import { useState } from "react";
import { useMapa } from "~/contexts/map";

export function HeaderMap() {
  const { mapa } = useMapa();
  const [zoomValue, setZoomValue] = useState<number>();

  setInterval(() => {
    const zoom = mapa?.getView().getZoom();
    if (zoom) {
      setZoomValue(Math.round(zoom));
    }
  }, 500);

  return (
    <header className="w-100 flex justify-between bg-slate-600 p-4">
      <div>Header</div>
      <div>
        <p>Zoom: </p>
        <span>{zoomValue}</span>
      </div>
    </header>
  );
}
