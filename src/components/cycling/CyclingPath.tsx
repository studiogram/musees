import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/map.context";
import { Layer, LineLayer, LngLat, Marker, Source, useMap } from "react-map-gl";
import { StateContext } from "../../context/state.context";

const layerStyle: LineLayer = {
  id: "point",
  type: "line",
  paint: {
    "line-color": process.env.REACT_APP_COLOR,
    "line-width": 5,
  },
};

const CyclingPath = () => {
  const { current: map } = useMap();
  const { currentLocation } = useContext(StateContext);
  const { currentMuseum, cyclePath } = useContext(MapContext);

  useEffect(() => {
    if (!cyclePath || !map || !currentLocation) return;
    map.fitBounds(
      [
        [currentLocation[0]!, currentLocation[1]!],
        [currentMuseum?.longitude!, currentMuseum?.latitude!],
      ],
      { padding: 100, pitch: 0, duration: 2000 }
    );
  }, [cyclePath, map]);

  return (
    <>
      {cyclePath && currentLocation && (
        <>
          <Source id="my-data" type="geojson" data={cyclePath}>
            <Layer {...layerStyle} />
          </Source>
          <Marker
            longitude={currentLocation[0]}
            latitude={currentLocation[1]}
            anchor="center"
            style={{ width: 25, height: 25 }}
          >
            <img
              alt="current location"
              src="./init.svg"
              style={{ width: 25, height: 25 }}
            />
          </Marker>
        </>
      )}
    </>
  );
};
export default CyclingPath;
