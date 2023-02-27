/* import { Overlay, View } from "ol";
import { FeatureLike } from "ol/Feature";
import { Draw } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import Map from "ol/Map";
import { fromLonLat } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import { Circle, Fill, Stroke, Style } from "ol/style";

const map = new Map({
  target: "map",
  view: new View({
    center: fromLonLat([-74.006, 40.7128]),
    zoom: 14,
  }),
});

const source = new VectorSource();
const layer = new VectorLayer({
  source: source,
  style: new Style({
    fill: new Fill({
      color: "rgba(255, 255, 255, 0.2)",
    }),
    stroke: new Stroke({
      color: "#ffcc33",
      width: 2,
    }),
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: "#ffcc33",
      }),
    }),
  }),
});

map.addLayer(layer);

const draw = new Draw({
  source: source,
  type: "Polygon",
});

map.addInteraction(draw);

const overlay = new Overlay({
  element: document.getElementById("popup"),
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

map.addOverlay(overlay);

map.on("click", function (evt) {
  const feature = map.forEachFeatureAtPixel(
    evt.pixel,
    function (feature: FeatureLike) {
      return feature;
    },
  );
  if (feature) {
    const geometry = feature.getGeometry();
    const coord = geometry.getCoordinates();
    const content = `<p>Coordinates: ${coord}</p>`;
    overlay.setPosition(evt.coordinate);
    overlay.getElement().innerHTML = content;
  }
});

draw.on("drawend", function (evt) {
  const feature = evt.feature;
  const geometry = feature.getGeometry();
  const coord = geometry.getCoordinates();
  const content = `<p>Coordinates: ${coord}</p>`;
  if (overlay) {
    overlay.setPosition(coord[0][0]);
    overlay.getElement().innerHTML = content;
  }
});
 */