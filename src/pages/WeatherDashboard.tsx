import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useGetCurrentLocationCoordinates } from "@/hooks/userLocation";
import { IoIosRefresh, IoMdAlert } from "react-icons/io";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useForecastQuery,
  useReverseGeoQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import CurrentWeather from "@/components/currentWeather";
import TodayTemp from "@/components/TodayTemp";
import { data } from "react-router-dom";

const WeatherDashboard = () => {
  const { coordinates, isLoading, error, getLoacation } =
    useGetCurrentLocationCoordinates();
  const location = useReverseGeoQuery(coordinates);
  const forecast = useForecastQuery(coordinates);
  const weather = useWeatherQuery(coordinates);
  const handleRefresh = () => {
    getLoacation();
    if (coordinates) {
      weather.refetch();
      forecast.refetch();
      location.refetch();
    }
  };
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
          <IoIosRefresh
            onClick={handleRefresh}
            className={`${weather.isFetching ? "animate-spin" : ""}`}
          />
        </Button>
      </div>
      {/* current and hourly weather  */}
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4 ">
          <CurrentWeather data={weather.data} location={location.data?.[0]}/>
          <TodayTemp data={forecast.data}/>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
