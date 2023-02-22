import { Coordinate } from "ol/coordinate";
import { useEffect, useRef, useState } from "react";
import CardMap from "~/components/CardMap";
import { MapDrawer } from "~/components/Map/MapDrawer";
import { MapType } from "~/components/Map/MapType";
import { CustomMousePosition } from "~/components/Map/MousePosition";
import { PointCreator } from "~/components/Map/PointCreator";
import { PositionSelector } from "~/components/Map/PositionsSelector";
import RegionSelect from "~/components/Map/RegionSeletec";

import { useMapa } from "~/contexts/map";

export default function Index() {
  const { mapa } = useMapa();
  const mapRef = useRef<any>();
  const [coordsClicked, setCoordsClicked] = useState<Coordinate>();
  const [callbackRefetch, setCallbackRefetch] = useState();

  useEffect(() => {
    if (mapa) {
      mapa.setTarget(mapRef.current);
    }
  }, [mapa]);

  if (!mapa) return null;

  mapa.on("dblclick", (click) => {
    const tempCord = mapa.getCoordinateFromPixel(click.pixel);

    if (mapa.hasFeatureAtPixel(click.pixel, { hitTolerance: 50 })) {
      return;
    }

    setCoordsClicked(tempCord);
  });

  return (
    <div className="block ">
      <div ref={mapRef} style={{ height: 600, width: "100%" }} />
      <div className="w-100 flex flex-row justify-between gap-5 px-5">
        <MapType />
        <MapDrawer />
        <CustomMousePosition />
        <PositionSelector />
        <RegionSelect />
        <CardMap />
        {coordsClicked && (
          <PointCreator coords={coordsClicked} setCoords={setCoordsClicked} />
        )}
      </div>
    </div>
  );
}
