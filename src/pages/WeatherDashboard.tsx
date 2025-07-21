import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useGetCurrentLocationCoordinates } from "@/hooks/userLocation";
import { IoIosRefresh} from "react-icons/io";
import {
  useForecastQuery,
  useReverseGeoQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import CurrentWeather from "@/components/currentWeather";
import TodayTemp from "@/components/TodayTemp";
import WeatherDetails from "@/components/weatherDetails";
import FutureDaysForeCast from "@/components/5DayForeCast";
const WeatherDashboard = () => {
  const { coordinates, isLoading,  getLoacation } =
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
  
  if(!weather.data || !forecast.data){
    return <h1>no data found...</h1>
  }

  return (
    <div className="px-4 md:px-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-xl tracking-tight ">My Location</h1>
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
        <div className="grid lg:grid-cols-2 gap-6  ">
          <WeatherDetails data={forecast.data} pressure={weather.data?.main.pressure}/>
          <FutureDaysForeCast data={forecast.data}/>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
