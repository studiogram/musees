import { Marker, useMap } from "react-map-gl";
import { useContext, useEffect } from "react";
import { MapContext } from "../../context/map.context";

const MarkerMuseum = () => {
  const { current: map } = useMap();
  const {
    zoom,
    setCyclePath,
    setCycleDuration,
    setCycleDistance,
    currentMuseum,
    setCurrentMuseum,
    setPointSize,
  } = useContext(MapContext);

  useEffect(() => {
    if (currentMuseum && map) {
      setPointSize(0);
      setTimeout(() => {
        map
          .flyTo({
            center: [currentMuseum.longitude, currentMuseum.latitude],
            duration: 2500,
            essential: true,
            zoom: zoom < 15 ? 15 : zoom + 1,
            pitch: 70,
          })
          .resize();
      }, 750);
    }
  }, [currentMuseum]);

  const handleMuseeClick = () => {
    if (map && currentMuseum) {
      map.flyTo({
        center: [currentMuseum.longitude, currentMuseum.latitude],
        duration: 2000,
        essential: true,
        zoom,
        pitch: 0,
      });
    }
    setCurrentMuseum(null);
    setPointSize(10);
    setCyclePath(null);
    setCycleDistance(null);
    setCycleDuration(null);
  };

  return (
    currentMuseum && (
      <Marker
        longitude={currentMuseum.longitude}
        latitude={currentMuseum.latitude}
        anchor="bottom"
        style={{ width: 47, height: 60, cursor: "pointer" }}
        onClick={handleMuseeClick}
      >
        <img
          alt="remove current museum"
          src="./delete.svg"
          style={{ width: 47, height: 60 }}
        />
      </Marker>
    )
  );
};
export default MarkerMuseum;
