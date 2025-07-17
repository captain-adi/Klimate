import type { ICordinates } from "@/api/type";
import { useQuery } from "@tanstack/react-query";
import {weatherAPI} from "@/api/weatherEndPoints"

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
export function useSearchLocation(query: string | null) {
 return useQuery({
    queryKey :["searchlocation",query] ,
    queryFn: ()=>{
        if(!query) throw new Error("no coordinates Provided");
        return weatherAPI.searchLocation(query)
    }
 })
}