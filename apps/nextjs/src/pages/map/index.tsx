import { Feature } from "ol";
import { Point } from "ol/geom";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useContext, useEffect, useRef } from "react";
import { MapDrawer } from "~/components/Map/MapDrawer";
import { MapType } from "~/components/Map/MapType";
import { CustomMousePosition } from "~/components/Map/MousePosition";

import { MapContext } from "~/contexts/map";

export default function Index() {
  const { mapa } = useContext(MapContext);
  const mapRef = useRef<any>();

  useEffect(() => {
    if (mapa) {
      mapa?.setTarget(mapRef.current);
    }

    const point = new Feature({
      geometry: new Point([0, 0]),
      name: "krisley",
      type: "icon",
    });

    const point2 = new Feature({
      geometry: new Point([-49.3002, -28.3588]),
      name: "kelven",
      type: "icon",
    });

    const vectorLayer = new VectorLayer({
      zIndex: 99,
      source: new VectorSource({
        features: [point, point2],
      }),
    });
    if (mapa) {
      mapa.addLayer(vectorLayer);
    }
  }, [mapa]);
  if (!mapa) return;

  return (
    <div className="block ">
      <div
        ref={mapRef}
        style={{ height: 600, width: "100%" }}
        className="mb-4"
      />
      <div className="flex flex-row gap-5">
        <MapType />
        <MapDrawer />
        <CustomMousePosition />
      </div>
    </div>
  );
}
