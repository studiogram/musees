import { createContext, useState } from "react";
import {
  MapContextType,
  MapProviderProps,
  MuseumType,
} from "../types/museum.types";
import { Feature } from "geojson";
import { CityType } from "../types/city.types";

export const MapContext = createContext<MapContextType>({
  zoom: 4,
  setZoom: () => null,
  currentCity: null,
  setCurrentCity: () => null,
  cycleDistance: null,
  setCycleDistance: () => null,
  cycleDuration: null,
  setCycleDuration: () => null,
  cyclePath: null,
  setCyclePath: () => null,
  pointSize: 10,
  setPointSize: () => null,
  isActiveMuseum: false,
  setIsActiveMuseum: () => null,
  currentMuseum: null,
  setCurrentMuseum: () => null,
});

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [zoom, setZoom] = useState<number>(4);
  const [currentCity, setCurrentCity] = useState<CityType | null>(null);
  const [cyclePath, setCyclePath] = useState<Feature | null>(null);
  const [cycleDistance, setCycleDistance] = useState<number | null>(null);
  const [cycleDuration, setCycleDuration] = useState<number | null>(null);
  const [pointSize, setPointSize] = useState<number>(10);
  const [isActiveMuseum, setIsActiveMuseum] = useState<boolean>(false);
  const [currentMuseum, setCurrentMuseum] = useState<MuseumType | null>(null);
  const value = {
    zoom,
    setZoom,
    currentCity,
    setCurrentCity,
    cyclePath,
    setCyclePath,
    cycleDistance,
    setCycleDistance,
    cycleDuration,
    setCycleDuration,
    pointSize,
    setPointSize,
    isActiveMuseum,
    setIsActiveMuseum,
    currentMuseum,
    setCurrentMuseum,
  };
  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
