import MarkerMuseum from "../marker/Marker";
import CyclingPath from "../cycling/CyclingPath";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Layer, LayerProps, Map, MapRef, Source } from "react-map-gl";
import { GeoJSONSource, MapLayerMouseEvent } from "mapbox-gl";
import { StateContext } from "../../context/state.context";
import { MapContext } from "../../context/map.context";

import "./Map.scss";
import "mapbox-gl/dist/mapbox-gl.css";

const MapMuseum = ({ mapSize }: { mapSize: number | undefined }) => {
  const mapRef = useRef<MapRef>(null);
  const [cursor, setCursor] = useState("auto");
  const { setIsLoading } = useContext(StateContext);
  const {
    setZoom,
    pointSize,
    setPointSize,
    currentMuseum,
    currentCity,
    setCurrentMuseum,
    setCyclePath,
    setCycleDistance,
    setCycleDuration,
    setIsActiveMuseum,
  } = useContext(MapContext);
  const unclusteredMuseum = useMemo<LayerProps>(() => {
    return {
      id: "musees-point",
      type: "circle",
      source: "musees",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#000000",
        "circle-radius": pointSize,
        "circle-radius-transition": { duration: 500 },
        "circle-stroke-color": "#fff",
        "circle-stroke-opacity": 0.85,
        "circle-stroke-width": pointSize > 0 ? 10 : 0,
      },
    };
  }, [pointSize]);

  const clusterMuseum = useMemo<LayerProps>(() => {
    return {
      id: "musees-clusters",
      type: "circle",
      source: "musees",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": process.env.REACT_APP_COLOR,
        "circle-radius": currentMuseum ? 0 : 40,
        "circle-radius-transition": { duration: 500 },
        "circle-stroke-width": currentMuseum ? 0 : 2,
        "circle-stroke-width-transition": { duration: 500 },
        "circle-stroke-color": "#fff",
      },
    };
  }, [currentMuseum]);

  const clusterCountMuseum = useMemo<LayerProps>(() => {
    return {
      id: "musees-count",
      type: "symbol",
      source: "musees",
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": currentMuseum ? 0 : 18,
        "text-size-transition": { duration: 500 },
      },
      paint: {
        "text-color": "#FFFFFF",
      },
    };
  }, [currentMuseum]);

  const clusterBackgroundMuseum = useMemo<LayerProps>(() => {
    return {
      id: "musees-small-clusters",
      type: "circle",
      source: "musees",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": process.env.REACT_APP_COLOR,
        "circle-radius": currentMuseum ? 0 : 20,
        "circle-radius-transition": { duration: 500 },
      },
    };
  }, [currentMuseum]);

  const onMouseEnter = useCallback(() => setCursor("pointer"), []);
  const onMouseLeave = useCallback(() => setCursor("grab"), []);

  const handleMapClick = (e: MapLayerMouseEvent) => {
    const features = e.features || [];
    if (features.length > 0 && mapRef.current) {
      const feature = features[0];
      if (feature?.properties?.cluster_id) {
        const clusterId = feature.properties.cluster_id;
        const mapboxSource = mapRef.current.getSource(
          "museums"
        ) as GeoJSONSource;
        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) {
            return;
          } else if (mapRef.current && feature.geometry.type === "Point") {
            mapRef.current.easeTo({
              center: [
                feature.geometry.coordinates[0],
                feature.geometry.coordinates[1],
              ],
              zoom,
              duration: 500,
            });
            setZoom(zoom);
          }
        });
      } else if (feature.geometry.type === "Point" && feature.properties) {
        setIsActiveMuseum(true);
        setCurrentMuseum({
          name: feature.properties.nom_officiel_du_musee,
          address: feature.properties.adresse || feature.properties.lieu,
          city: feature.properties.commune,
          postalCode: feature.properties.code_postal,
          phone: feature.properties.telephone,
          website: feature.properties.url,
          latitude: feature.properties.latitude,
          longitude: feature.properties.longitude,
        });
      }
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.resize();
  }, [currentMuseum, mapRef, mapSize]);

  useEffect(() => {
    if (!mapRef.current || !currentCity) return;
    setIsActiveMuseum(false);
    setCurrentMuseum(null);
    setPointSize(10);
    setZoom(12);
    setCyclePath(null);
    setCycleDistance(null);
    setCycleDuration(null);
    mapRef.current.flyTo({
      center: [currentCity.longitude, currentCity.latitude],
      zoom: 12,
      duration: 3500,
      pitch: 0,
    });
  }, [currentCity]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        latitude: 46.227638,
        longitude: 2.213749,
        zoom: 4,
      }}
      minZoom={4}
      cursor={cursor}
      onLoad={() => setIsLoading(false)}
      onClick={handleMapClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      interactiveLayerIds={[clusterMuseum.id!, unclusteredMuseum.id!]}
    >
      <Source
        id="museums"
        type="geojson"
        data="https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/liste-et-localisation-des-musees-de-france/exports/geojson"
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...unclusteredMuseum} />
        <Layer {...clusterMuseum} />
        <Layer {...clusterBackgroundMuseum} />
        <Layer {...clusterCountMuseum} />
      </Source>

      <MarkerMuseum />
      <CyclingPath />
    </Map>
  );
};

export default MapMuseum;
