import { Feature } from "geojson";
import { ReactNode } from "react";
import { CityType } from "./city.types";

export type MuseumType = {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  website: string;
  latitude: number;
  longitude: number;
};

export type MapContextType = {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  currentCity: CityType | null;
  setCurrentCity: React.Dispatch<React.SetStateAction<CityType | null>>;
  cycleDistance: number | null;
  setCycleDistance: React.Dispatch<React.SetStateAction<number | null>>;
  cycleDuration: number | null;
  setCycleDuration: React.Dispatch<React.SetStateAction<number | null>>;
  cyclePath: Feature | null;
  setCyclePath: React.Dispatch<React.SetStateAction<Feature | null>>;
  pointSize: number;
  setPointSize: React.Dispatch<React.SetStateAction<number>>;
  isActiveMuseum: boolean;
  setIsActiveMuseum: React.Dispatch<React.SetStateAction<boolean>>;
  currentMuseum: MuseumType | null;
  setCurrentMuseum: React.Dispatch<React.SetStateAction<MuseumType | null>>;
};

export type MapProviderProps = {
  children: ReactNode;
};
