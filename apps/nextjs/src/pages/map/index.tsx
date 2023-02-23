import { Coordinate } from "ol/coordinate";
import { useEffect, useRef, useState } from "react";
import { CardMap } from "~/components/CardMap";
import { HeaderMap } from "~/components/Map/HeaderMap";
import { MapDrawer } from "~/components/Map/MapDrawer";
import { MapType } from "~/components/Map/MapType";
import { CustomMousePosition } from "~/components/Map/MousePosition";
import { PointCreator } from "~/components/Map/PointCreator";
import { PositionSelector } from "~/components/Map/PositionsSelector";
import { RegionSelect } from "~/components/Map/RegionSeletec";
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
      <HeaderMap />
      <CustomRightClick>
        <div ref={mapRef} style={{ height: 600, width: "100%" }} />
      </CustomRightClick>

      {mapa && (
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
      )}
    </div>
  );
}
