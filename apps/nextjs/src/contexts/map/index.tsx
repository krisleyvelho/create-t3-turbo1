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
};

export const MapContext = createContext<MapContextType>({} as MapContextType);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [mapa, setMapa] = useState<Map>();

  function mountMapa() {
    const options = {
      view: new View({ zoom: 0, center: [0, 0] }),
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      overlays: [],
    };

    const mapObject: Map = new Map(options);
    setMapa(mapObject);
  }

  useEffect(() => mountMapa(), []);

  return (
    <MapContext.Provider value={{ mapa, setMapa }}>
      {children}
    </MapContext.Provider>
  );
};

export function useMapa() {
  return useContext<MapContextType>(MapContext);
}
