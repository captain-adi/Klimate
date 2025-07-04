import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/userLocation";
import { IoIosRefresh, IoMdAlert } from "react-icons/io";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForecastQuery, useReverseGeoQuery, useWeatherQuery } from "@/hooks/useWeather";

const WeatherDashboard = () => {
  const { coordinates, isLoading, error, getLoacation } = useGeoLocation();
  const location = useReverseGeoQuery(coordinates);
  const forecast = useForecastQuery(coordinates)
  const weather = useWeatherQuery(coordinates)
console.log(location)
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <IoMdAlert />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>
          <p>{error}</p>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl tracking-tight">My Location</h1>
        <Button variant={"outline"} size={"icon"} onClick={getLoacation}>
          <IoIosRefresh />
        </Button>
      </div>
      {/* Example: Show reverse geocoded location */}
      {location.isLoading && <p>Loading location name...</p>}
      {location.data && (
        <p>
          {location.data[0]?.name}, {location.data[0]?.country}
        </p>
      )}
      {location.error && (
        <Alert variant="destructive">
          <IoMdAlert />
          <AlertTitle>Reverse Geocoding Error</AlertTitle>
          <AlertDescription>
            <p>{location.error.message}</p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default WeatherDashboard;
