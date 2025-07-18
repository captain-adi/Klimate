import type { ICordinates } from "@/api/type";
import { useEffect, useState } from "react";

interface IGeoLocationState {
  isLoading: boolean;
  coordinates: null | ICordinates;
  error: null | string;
}

export const useGetCurrentLocationCoordinates = () => {
  const [locationData, setLocationData] = useState<IGeoLocationState>({
    isLoading: true,
    error: null,
    coordinates: null,
  });

  const getLoacation = () => {
    if (!navigator.geolocation) {
      setLocationData({
        isLoading: false,
        error: "Geolocation is not supported",
        coordinates: null,
      });
      return ;
    }
    navigator.geolocation.getCurrentPosition((myPosition) => {
      setLocationData({
        isLoading: false,
        error: null,
        coordinates: {
          lat: myPosition.coords.latitude,
          lon: myPosition.coords.longitude,
        },
      });
    },(error)=>{
       setLocationData({
      isLoading: false,
      error: error.message, // shows 'User denied Geolocation', etc.
      coordinates:{
      lat : 28.644800,
      lon : 77.216721 
    },
    });
    });
  };
  useEffect(() => {
    getLoacation();
  }, []);

  return {
    ...locationData,
    getLoacation
  }
};
