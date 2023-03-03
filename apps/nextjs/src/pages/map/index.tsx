import { Coordinate } from "ol/coordinate";
import { useEffect, useRef, useState } from "react";
import { CardMap } from "~/components/Map/CardMap";
import { MapDrawer } from "~/components/Map/MapDrawer";
import { MapType } from "~/components/Map/MapType";
import { CustomMousePosition } from "~/components/Map/MousePosition";
import { PointCreator } from "~/components/Map/PointCreator";
import { PositionSelector } from "~/components/Map/PositionsSelector";
import { SaveGeometry } from "~/components/Map/SaveGeometry";
import { CustomRightClick } from "~/components/RighClick";

import { useMapa } from "~/contexts/map";

export default function Index() {
  /* BUG - https://github.com/typescript-eslint/typescript-eslint/issues/6314 */
  const { mapa } = useMapa();
  const mapRef = useRef<HTMLDivElement>(null);
  const [coordsClicked, setCoordsClicked] = useState<Coordinate | null>();

  useEffect(() => {
    if (mapa && mapRef.current) {
      mapa.setTarget(mapRef.current);
    }
  }, [mapa]);

  mapa?.on("click", (click) => {
    if (mapa.hasFeatureAtPixel(click.pixel)) {
      return;
    }
    const coords = mapa.getCoordinateFromPixel(click.pixel);

    setCoordsClicked(coords);
  });

  return (
    <div>
      <CustomRightClick>
        <div ref={mapRef} className="h-screen w-full px-5" />
      </CustomRightClick>

      <div className="w-100 flex flex-col flex-wrap justify-center gap-4 bg-slate-600 text-center text-white">
        {mapa && (
          <>
            <MapType />
            <MapDrawer />
            <CustomMousePosition />
            <PositionSelector />
            <CardMap />
            <SaveGeometry />
            {coordsClicked && (
              <PointCreator
                coords={coordsClicked}
                setCoords={setCoordsClicked}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
