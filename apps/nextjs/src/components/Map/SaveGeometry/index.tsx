import { Feature } from "ol";
import { MultiPoint, Polygon } from "ol/geom";
import { Draw } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { useEffect, useState } from "react";
import { useMapa } from "~/contexts/map";
import { api } from "~/utils/api";

export function SaveGeometry() {
  const { mapa } = useMapa();
  const [canDraw, setCanDraw] = useState<boolean>(false);
  const [showGeometry, setShowGeometry] = useState<boolean>(false);

  const { data: dbTeste } = api.polygonMap.all.useQuery();

  console.log(dbTeste);

  const staticCoordnate = [
    [
      [12977816.497878488, -5948165.894860974],
      [5677794.71782184, -3935402.688014077],
      [5647753.475928601, -6398784.523259532],
      [9823486.09908858, -7630475.440882258],
      [12977816.497878488, -5948165.894860974],
    ],

    [
      [-2e6, -1e6],
      [-1e6, 1e6],
      [0, -1e6],
      [-2e6, -1e6],
    ],
  ];

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

          geometry: function (feature) {
            const coordinates = feature?.getGeometry()?.getCoordinates()[0];
            console.log(coordinates);

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

  function unMountDrawer() {
    const vector = mapa
      ?.getLayers()
      .getArray()
      .find((layer) => layer.getProperties()?.name === "drawerVector");
    const interaction = mapa
      ?.getInteractions()
      .getArray()
      .find((interaction) => interaction.getProperties()?.name === "drawer");

    if (vector) mapa?.removeLayer(vector);
    if (interaction) mapa?.removeInteraction(interaction);
  }

  function mountLayers() {
    const features: Feature[] = [];

    staticCoordnate.map((location) =>
      features.push(new Feature(new Polygon([location]))),
    );

    const styles = new Style({
      stroke: new Stroke({
        color: "blue",
        width: 3,
      }),
      fill: new Fill({
        color: "rgba(0, 0, 255, 0.1)",
      }),
    });

    const source = new VectorSource({
      features: features,
    });

    const layer = new VectorLayer({
      source: source,
      style: styles,
      properties: { name: "layersVector" },
    });
    mapa?.addLayer(layer);
  }

  function unMountLayers() {
    const finded = mapa
      ?.getLayers()
      .getArray()
      .find((item) => item.getProperties()?.name === "layersVector");

    if (finded) mapa?.removeLayer(finded);
  }

  useEffect(() => {
    mountLayers();
    /* mountDrawer(); */
  }, []);

  useEffect(() => {
    const finded = mapa
      ?.getLayers()
      .getArray()
      .find((item) => item.getProperties()?.name === "layersVector");

    if (!finded) return;

    finded.setVisible(showGeometry);
  }, [mapa, showGeometry]);

  useEffect(() => {
    const vector = mapa
      ?.getLayers()
      .getArray()
      .find((layer) => layer.getProperties()?.name === "drawerVector");

    if (vector) vector.setVisible(canDraw);
  }, [canDraw, mapa]);

  return (
    <div className="flex flex-col">
      <button onClick={() => setCanDraw(!canDraw)}>
        {canDraw ? "Cancelar" : "Gravar"} geometria
      </button>
      <button onClick={() => setShowGeometry(!showGeometry)}>{`${
        showGeometry ? "Esconder" : "Mostrar"
      } Geometrias`}</button>
    </div>
  );
}
