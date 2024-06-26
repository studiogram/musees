import { useContext } from "react";
import { SingleValue } from "react-select";
import { MapContext } from "../../context/map.context";
import { CityAPIType, CityType } from "../../types/city.types";
import AsyncSelect from "react-select/async";

import "./Cities.scss";

const Cities = () => {
  const { setCurrentCity } = useContext(MapContext);
  // const [options, setOptions] = useState([]);

  // useEffect(() => {
  //   fetch("https://geo.api.gouv.fr/communes?fields=nom")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const cities = data.map((city: { nom: string }) => ({
  //         value: city.nom,
  //         label: city.nom,
  //       }));
  //       setOptions(cities);
  //     });
  // }, []);

  const loadOptions = (
    inputValue: string,
    callback: (options: any) => void
  ) => {
    fetch(
      `https://geo.api.gouv.fr/communes?fields=nom,centre&nom=${inputValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        const cities = data.map((city: CityAPIType) => ({
          value: {
            name: city.nom,
            longitude: city.centre.coordinates[0],
            latitude: city.centre.coordinates[1],
          },
          label: city.nom,
        }));
        callback(cities);
      });
  };
  return (
    <div className="select">
      <AsyncSelect
        cacheOptions
        classNamePrefix="react-select"
        onChange={(e: SingleValue<{ value: CityType }>) =>
          e && setCurrentCity(e.value!)
        }
        loadOptions={loadOptions}
        noOptionsMessage={() => null}
        loadingMessage={() => "Chargement..."}
        placeholder="Choisir une ville"
        styles={{
          control: (base) => ({
            ...base,
            border: 0,
            boxShadow: "none",
            borderRadius: "1rem",
          }),
          option: (provided) => ({
            ...provided,
            color: "black",
            background: "white",
            "&:hover": {
              color: "white",
              background: process.env.REACT_APP_COLOR,
            },
          }),
        }}
      />
    </div>
  );
};
export default Cities;
