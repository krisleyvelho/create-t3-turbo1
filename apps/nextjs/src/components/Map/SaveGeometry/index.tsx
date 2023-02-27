import { Feature, Overlay } from "ol";
import { FeatureLike } from "ol/Feature";
import { MultiPoint, Polygon } from "ol/geom";
import { Draw } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style, Text } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { useEffect, useRef, useState } from "react";
import { useMapa } from "~/contexts/map";
import { api, RouterOutputs } from "~/utils/api";
import { FormVector } from "../FormVector";

type dataType = NonNullable<RouterOutputs["polygonMap"]["byId"]>;

export function SaveGeometry() {
  const { mapa } = useMapa();
  const [canDraw, setCanDraw] = useState<boolean>(false);
  const [showGeometry, setShowGeometry] = useState<boolean>(false);
  const [coordinatesVector, setCoordinatesVector] = useState();
  const [data, setData] = useState<dataType[]>();
  const cardRef = useRef<HTMLDivElement>(null);

  const { data: dbTeste, refetch } = api.polygonMap.all.useQuery();

  function unionVector() {
    const data: dataType[] = [];
    function createVector(array: number[][]) {
      const parVector: number[][] = [];

      const data = array[0];
      if (data) {
        data.map((item, index) => {
          const indexPar = (index + 1) % 2 === 0;

          if (indexPar) {
            parVector.push([data[index - 1] as number, item]);
          }
        });
      }
      return parVector;
    }

    dbTeste?.map((itemVector) => {
      const parsedJsonLocation = JSON.parse(itemVector.location) as number[][];

      if (parsedJsonLocation) {
        const newObjectVector = {
          ...itemVector,
          location: createVector(parsedJsonLocation),
        };
        data.push(newObjectVector);
      }
    });
    setData(data);
  }

  useEffect(() => {
    if (dbTeste) {
      unionVector();
    }
  }, [dbTeste]);

  function mountDrawer() {
    const sourceDraw = new VectorSource();
    const vector = new VectorLayer({
      source: sourceDraw,
      properties: { name: "drawerVector" },
      style: [
        new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)",
          }),
          stroke: new Stroke({
            color: "#ffcc33",
            width: 2,
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: "#ffcc33",
            }),
          }),
        }),
        new Style({
          image: new CircleStyle({
            radius: 5,
            fill: new Fill({
              color: "orange",
            }),
          }),

          geometry: function (feature: FeatureLike) {
            setCoordinatesVector(feature.getGeometry()?.flatCoordinates);

            const coordinates = feature?.getGeometry()?.getCoordinates()[0];

            return new MultiPoint(coordinates);
          },
        }),
      ],
    });

    const draw = new Draw({
      source: sourceDraw,
      type: "Polygon",
    });
    draw.setProperties({ name: "drawer" });
    mapa?.addLayer(vector);
    mapa?.addInteraction(draw);
  }

  function mountLayers() {
    const features: Feature[] = [];
    data?.map((item) => {
      const featureStyle = new Style({
        text: new Text({
          text: item.name,
          font: "24px Calibri,sans-serif",
          textAlign: "left",
          backgroundFill: new Fill({
            color: "#0000001a",
          }),
          scale: 1,
        }),
        stroke: new Stroke({
          color: "blue",
          width: 3,
        }),
        fill: new Fill({
          color: "rgba(0, 0, 255, 0.1)",
        }),
      });

      const polygon: Polygon = new Polygon([item.location]);
      polygon.setProperties({ name: item.name });
      const feature = new Feature(polygon);
      feature.setStyle(featureStyle);
      features.push(feature);
    });

    const source = new VectorSource({ features });

    const layer = new VectorLayer({
      source: source,
      properties: { name: "layersVector" },
    });
    mapa?.addLayer(layer);
  }

  useEffect(() => {
    if (cardRef.current && coordinatesVector) {
      const overlay = new Overlay({
        element: cardRef.current,
      });

      overlay.setPosition([coordinatesVector[0], coordinatesVector[1]]);

      mapa?.addOverlay(overlay);
    }
  }, [coordinatesVector, mapa]);

  useEffect(() => {
    if (data) {
      mountLayers();
    }
  }, [data]);

  useEffect(() => {
    const finded = mapa
      ?.getLayers()
      .getArray()
      .find((item) => item.getProperties()?.name === "layersVector");

    if (!finded) return;

    finded.setVisible(showGeometry);
  }, [mapa, showGeometry, data]);

  useEffect(() => {
    const vector = mapa
      ?.getLayers()
      .getArray()
      .find((layer) => layer.getProperties()?.name === "drawerVector");

    if (canDraw && !vector) mountDrawer();

    if (vector) vector.setVisible(canDraw);

    if (!canDraw) {
      const interaction = mapa
        ?.getInteractions()
        .getArray()
        .find((interaction) => interaction.getProperties()?.name === "drawer");
      interaction && mapa?.removeInteraction(interaction);
    }
  }, [canDraw, mapa]);

  function onSuccessRecord(operation?: string) {
    setCoordinatesVector(undefined);
    setCanDraw(false);
    if (!operation) {
      refetch();
    }
  }

  return (
    <div className="flex flex-col">
      <button onClick={() => setCanDraw(!canDraw)}>
        {canDraw ? "Cancelar" : "Gravar"} geometria
      </button>
      <button onClick={() => setShowGeometry(!showGeometry)}>{`${
        showGeometry ? "Esconder" : "Mostrar"
      } Geometrias`}</button>
      <div ref={cardRef} className="absolute mt-5 min-w-[300px]">
        {coordinatesVector && (
          <FormVector
            inputs={[{ key: "name", name: "Nome", type: "text" }]}
            coordinatesVector={coordinatesVector}
            onSuccessRecord={onSuccessRecord}
          />
        )}
      </div>
    </div>
  );
}
