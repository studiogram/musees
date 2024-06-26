import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../context/map.context";
import { StateContext } from "../../context/state.context";
import { getDistance } from "../../utils/distance";

import "./Cycling.scss";
import { formatTime } from "../../utils/duration";
import { formatDoubleDigit } from "../../utils/numbers";

const CyclingInfo = () => {
  const { setIsLoading, setCurrentLocation } = useContext(StateContext);
  const {
    currentMuseum,
    setCyclePath,
    cycleDistance,
    setCycleDistance,
    cycleDuration,
    setCycleDuration,
  } = useContext(MapContext);

  const [error, setError] = useState<string | null>(null);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const getLocation = async () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/cycling/${position.coords.longitude},${position.coords.latitude};${currentMuseum?.longitude},${currentMuseum?.latitude}?alternatives=true&annotations=duration,distance&continue_straight=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setIsLoading(false);
        setCyclePath(data.routes[0].geometry);
        setCycleDistance(data.routes[0].distance);
        setCycleDuration(data.routes[0].duration);
        setCurrentLocation([
          position.coords.longitude,
          position.coords.latitude,
        ]);
      },
      (error) => {
        setIsLoading(false);
        setCyclePath(null);
        setCycleDistance(null);
        setCycleDuration(null);
        setCurrentLocation(null);
        setError("Ooops, il y a eu une erreur avec votre géolocalisation ...");
      }
    );
  };

  useEffect(() => {
    if (cycleDuration) {
      const { hours, minutes } = formatTime(cycleDuration);
      setHours(hours ? hours : 0);
      setMinutes(minutes ? minutes : 0);
    }
  }, [cycleDuration]);

  return (
    <>
      {cycleDistance && cycleDuration ? (
        <div className="flex flex-wrap pt-4 md:py-6 font-bold">
          <p className=" text-white pe-4">
            <span className="text-5xl">{getDistance(cycleDistance)}</span>km
          </p>
          <p>
            <span className="text-5xl">
              {formatDoubleDigit(hours ? hours : 0)}
            </span>
            h
            <span className="text-5xl">
              {formatDoubleDigit(minutes ? minutes : 0)}
            </span>
          </p>
        </div>
      ) : (
        <>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            className="cycling | text-green bg-black py-2 px-5"
            onClick={getLocation}
          >
            M'y rendre en vélo
          </button>
        </>
      )}
    </>
  );
};
export default CyclingInfo;
