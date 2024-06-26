import { useContext, useState } from "react";
import { MapContext } from "../../context/map.context";
import { StateContext } from "../../context/state.context";

const CyclingInfo = () => {
  const { setIsLoading, setCurrentLocation } = useContext(StateContext);
  const { currentMuseum, setCyclePath, setCycleDistance, setCycleDuration } =
    useContext(MapContext);

  const [error, setError] = useState<string | null>(null);

  const getLocation = async () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log("stop loading");
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);

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

  return (
    <>
      {error && <p>{error}</p>}
      <button onClick={getLocation}>Button</button>
    </>
  );
};
export default CyclingInfo;
