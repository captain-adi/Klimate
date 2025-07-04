import type { ICordinates } from "@/api/type";
import { useQuery } from "@tanstack/react-query";
import { weatherAPI } from "@/api/weatherEndPoints";
import type { IconBaseProps } from "react-icons/lib";

export function useWeatherQuery(coordinates: ICordinates | null) {
  return useQuery({
    queryKey: ["weather", coordinates],
    enabled: !!coordinates,
    queryFn: async () => {
      if (!coordinates) throw new Error("No coordinates provided");
      return weatherAPI.getCurrentWeatherData(coordinates);
    },
  });
}

export function useForecastQuery(coordinates: ICordinates | null) {
  return useQuery({
    queryKey: ["forecast", coordinates],
    enabled: !!coordinates,
    queryFn: async () => {
      if (!coordinates) throw new Error("No coordinates provided");
      return weatherAPI.getForeCast(coordinates);
    },
  });
}

export function useReverseGeoQuery(coordinates : ICordinates|null){
 return useQuery({
    queryKey :["reverseGeo",coordinates] ,
    queryFn: ()=>{
        if(!coordinates) throw new Error("no coordinates Provided");
        return weatherAPI.reverseGeoCode(coordinates)
    }
 })
}