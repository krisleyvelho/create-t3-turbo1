import { Coordinate } from "ol/coordinate";
import { useContext, useEffect, useRef, useState } from "react";
import { MapDrawer } from "~/components/Map/MapDrawer";
import { MapType } from "~/components/Map/MapType";
import { CustomMousePosition } from "~/components/Map/MousePosition";
import { PointCreator } from "~/components/Map/PointCreator";
import { PositionSelector } from "~/components/Map/PositionsSelector";

import { MapContext } from "~/contexts/map";

export default function Index() {
  const { mapa } = useContext(MapContext);
  const mapRef = useRef<any>();
  const [coordsClicked, setCoordsClicked] = useState<Coordinate>();

  useEffect(() => {
    if (mapa) {
      mapa.setTarget(mapRef.current);
    }
  }, [mapa]);
  if (!mapa) return null;

  mapa.on("click", (teste) => {
    const tempCord = mapa.getCoordinateFromPixel(teste.pixel);
    setCoordsClicked(tempCord);
  });

  return (
    <div className="block ">
      <div
        ref={mapRef}
        style={{ height: 600, width: "100%" }}
        className="mb-4"
      />
      <div className="w-100 flex flex-row justify-between gap-5 px-5">
        <MapType />
        <MapDrawer />
        <CustomMousePosition />
        <PositionSelector />
        {coordsClicked && (
          <PointCreator coords={coordsClicked} setCoords={setCoordsClicked} />
        )}
      </div>
    </div>
  );
}
