import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type MapContextType = {
  mapa: Map | undefined;
  setMapa: (item: any) => void;
  setZoom: (item: number) => void;
  setCenter: (item: []) => void;
  center: number[];
  zoom: number;
};

export const MapContext = createContext<MapContextType>({} as MapContextType);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [mapa, setMapa] = useState<Map>();
  const [zoom, setZoom] = useState(0);
  const [center, setCenter] = useState([0, 0]);

  function mountMapa() {
    const options = {
      view: new View({ zoom, center }),
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      controls: [],
      overlays: [],
    };

    const mapObject: Map = new Map(options);
    setMapa(mapObject);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountMapa(), []);

  useEffect(() => {
    if (!mapa) return;
    const view = new View({ zoom, center });

    mapa.setView(view);
  }, [center, mapa, zoom]);
  return (
    <MapContext.Provider
      value={{ mapa, setMapa, setZoom, setCenter, center, zoom }}
    >
      {children}
    </MapContext.Provider>
  );
};

export function useMapa() {
  return useContext<MapContextType>(MapContext);
}
